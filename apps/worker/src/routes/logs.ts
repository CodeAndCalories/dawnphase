import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env, DailyLog } from "../types";
import { dbAll, dbFirst, dbRun, newId } from "../lib/db";

const logs = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

logs.get("/", async (c) => {
  const userId = c.get("userId");
  const limit = Math.min(parseInt(c.req.query("limit") ?? "30", 10), 90);
  const rows = await dbAll<DailyLog>(
    c.env.DB,
    "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT ?",
    [userId, limit]
  );
  return c.json({ logs: rows });
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
