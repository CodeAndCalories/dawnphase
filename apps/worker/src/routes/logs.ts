import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env, DailyLog } from "../types";
import { dbAll, dbFirst, dbRun, newId } from "../lib/db";
import { sendEmail, streakMilestoneEmail } from "../lib/email";

const logs = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

const STREAK_MILESTONES = [7, 14, 30, 60, 90];

function computeStreak(datesSortedDesc: string[]): number {
  if (datesSortedDesc.length === 0) return 0;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const yest = new Date(now);
  yest.setDate(yest.getDate() - 1);
  const yesterdayStr = yest.toISOString().slice(0, 10);

  const mostRecent = datesSortedDesc[0];
  if (mostRecent !== todayStr && mostRecent !== yesterdayStr) return 0;

  const dateSet = new Set(datesSortedDesc);
  let streak = 0;
  const cursor = new Date(mostRecent + "T00:00:00");

  while (dateSet.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

logs.get("/", async (c) => {
  const userId = c.get("userId");
  const limit = Math.min(parseInt(c.req.query("limit") ?? "30", 10), 90);

  // Fetch enough rows to compute an accurate streak (up to 90 days)
  const fetchLimit = Math.max(limit, 90);
  const rows = await dbAll<DailyLog>(
    c.env.DB,
    "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT ?",
    [userId, fetchLimit]
  );

  const streak = computeStreak(rows.map((r) => r.date));
  return c.json({ logs: rows.slice(0, limit), streak });
});

const logSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  flow_intensity: z
    .enum(["none", "spotting", "light", "medium", "heavy"])
    .optional(),
  mood: z.array(z.string()).optional(),
  energy: z.number().int().min(1).max(5).optional(),
  cramps: z.number().int().min(0).max(3).optional(),
  bloating: z.number().int().min(0).max(3).optional(),
  headache: z.number().int().min(0).max(3).optional(),
  sleep_hours: z.number().min(0).max(24).optional(),
  notes: z.string().max(2000).optional(),
  // perimenopause
  hot_flashes: z.number().int().min(0).max(3).optional(),
  night_sweats: z.number().int().min(0).max(3).optional(),
  brain_fog: z.number().int().min(0).max(3).optional(),
  custom_symptoms: z.array(z.string()).optional(),
});

logs.post("/", zValidator("json", logSchema), async (c) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");

  const existing = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM daily_logs WHERE user_id = ? AND date = ?",
    [userId, body.date]
  );

  const moodJson = body.mood ? JSON.stringify(body.mood) : null;
  const customJson = body.custom_symptoms
    ? JSON.stringify(body.custom_symptoms)
    : null;

  if (existing) {
    await dbRun(
      c.env.DB,
      `UPDATE daily_logs SET
         flow_intensity  = COALESCE(?, flow_intensity),
         mood            = COALESCE(?, mood),
         energy          = COALESCE(?, energy),
         cramps          = COALESCE(?, cramps),
         bloating        = COALESCE(?, bloating),
         headache        = COALESCE(?, headache),
         sleep_hours     = COALESCE(?, sleep_hours),
         notes           = COALESCE(?, notes),
         hot_flashes     = COALESCE(?, hot_flashes),
         night_sweats    = COALESCE(?, night_sweats),
         brain_fog       = COALESCE(?, brain_fog),
         custom_symptoms = COALESCE(?, custom_symptoms)
       WHERE id = ? AND user_id = ?`,
      [
        body.flow_intensity ?? null,
        moodJson,
        body.energy ?? null,
        body.cramps ?? null,
        body.bloating ?? null,
        body.headache ?? null,
        body.sleep_hours ?? null,
        body.notes ?? null,
        body.hot_flashes ?? null,
        body.night_sweats ?? null,
        body.brain_fog ?? null,
        customJson,
        existing.id,
        userId,
      ]
    );
    const log = await dbFirst<DailyLog>(
      c.env.DB,
      "SELECT * FROM daily_logs WHERE id = ?",
      [existing.id]
    );
    return c.json({ log });
  }

  const id = newId();
  await dbRun(
    c.env.DB,
    `INSERT INTO daily_logs
       (id, user_id, date, flow_intensity, mood, energy,
        cramps, bloating, headache, sleep_hours, notes,
        hot_flashes, night_sweats, brain_fog, custom_symptoms)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id, userId, body.date,
      body.flow_intensity ?? null,
      moodJson,
      body.energy ?? null,
      body.cramps ?? null,
      body.bloating ?? null,
      body.headache ?? null,
      body.sleep_hours ?? null,
      body.notes ?? null,
      body.hot_flashes ?? null,
      body.night_sweats ?? null,
      body.brain_fog ?? null,
      customJson,
    ]
  );

  const log = await dbFirst<DailyLog>(
    c.env.DB,
    "SELECT * FROM daily_logs WHERE id = ?",
    [id]
  );

  // Streak milestone email — non-blocking, only on new inserts
  try {
    const recentDates = await dbAll<{ date: string }>(
      c.env.DB,
      "SELECT date FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT 90",
      [userId]
    );
    const currentStreak = computeStreak(recentDates.map((r) => r.date));
    if (STREAK_MILESTONES.includes(currentStreak)) {
      const userRow = await dbFirst<{ email: string }>(
        c.env.DB,
        "SELECT email FROM users WHERE id = ?",
        [userId]
      );
      if (userRow?.email && c.env.RESEND_API_KEY) {
        // Fire-and-forget: non-critical side effect
        sendEmail(c.env.RESEND_API_KEY, {
          to: userRow.email,
          subject: `🔥 ${currentStreak}-day streak — you're building real cycle insights!`,
          html: streakMilestoneEmail(userRow.email, currentStreak),
        }).catch(() => {});
      }
    }
  } catch {
    // Never block the response for analytics side-effects
  }

  return c.json({ log }, 201);
});

logs.get("/:date", async (c) => {
  const userId = c.get("userId");
  const log = await dbFirst<DailyLog>(
    c.env.DB,
    "SELECT * FROM daily_logs WHERE user_id = ? AND date = ?",
    [userId, c.req.param("date")]
  );
  if (!log) return c.json({ message: "Not found" }, 404);
  return c.json({ log });
});

export default logs;
