import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env, CycleLog } from "../types";
import { dbAll, dbFirst, dbRun, newId } from "../lib/db";

const logs = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

logs.get("/", async (c) => {
  const userId = c.get("userId");
  const limit = Math.min(parseInt(c.req.query("limit") ?? "30", 10), 90);
  const rows = await dbAll<CycleLog>(
    c.env.DB,
    "SELECT * FROM cycle_logs WHERE user_id = ? ORDER BY date DESC LIMIT ?",
    [userId, limit]
  );
  return c.json({ logs: rows });
});

const logSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  flow: z.enum(["none", "spotting", "light", "medium", "heavy"]).optional(),
  mood: z.array(z.string()).optional(),
  symptoms: z.array(z.string()).optional(),
  energy: z.number().int().min(1).max(5).optional(),
  sleep_hours: z.number().min(0).max(24).optional(),
  notes: z.string().max(2000).optional(),
});

logs.post("/", zValidator("json", logSchema), async (c) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");

  const existing = await dbFirst<CycleLog>(
    c.env.DB,
    "SELECT id FROM cycle_logs WHERE user_id = ? AND date = ?",
    [userId, body.date]
  );

  if (existing) {
    // Upsert
    await dbRun(
      c.env.DB,
      `UPDATE cycle_logs SET
        flow = COALESCE(?, flow),
        mood = COALESCE(?, mood),
        symptoms = COALESCE(?, symptoms),
        energy = COALESCE(?, energy),
        sleep_hours = COALESCE(?, sleep_hours),
        notes = COALESCE(?, notes)
       WHERE id = ? AND user_id = ?`,
      [
        body.flow ?? null,
        body.mood ? JSON.stringify(body.mood) : null,
        body.symptoms ? JSON.stringify(body.symptoms) : null,
        body.energy ?? null,
        body.sleep_hours ?? null,
        body.notes ?? null,
        existing.id,
        userId,
      ]
    );
    const log = await dbFirst<CycleLog>(c.env.DB, "SELECT * FROM cycle_logs WHERE id = ?", [existing.id]);
    return c.json({ log });
  }

  const id = newId();
  await dbRun(
    c.env.DB,
    `INSERT INTO cycle_logs (id, user_id, date, flow, mood, symptoms, energy, sleep_hours, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [
      id, userId, body.date,
      body.flow ?? null,
      body.mood ? JSON.stringify(body.mood) : null,
      body.symptoms ? JSON.stringify(body.symptoms) : null,
      body.energy ?? null,
      body.sleep_hours ?? null,
      body.notes ?? null,
    ]
  );

  const log = await dbFirst<CycleLog>(c.env.DB, "SELECT * FROM cycle_logs WHERE id = ?", [id]);
  return c.json({ log }, 201);
});

logs.get("/:date", async (c) => {
  const userId = c.get("userId");
  const log = await dbFirst<CycleLog>(
    c.env.DB,
    "SELECT * FROM cycle_logs WHERE user_id = ? AND date = ?",
    [userId, c.req.param("date")]
  );
  if (!log) return c.json({ message: "Not found" }, 404);
  return c.json({ log });
});

export default logs;
