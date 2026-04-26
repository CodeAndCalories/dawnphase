import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";

interface Reminder {
  id: string;
  user_id: string;
  reminder_days_before: number;
  active: number;
}

const DEFAULTS = { reminder_days_before: 3, active: 1 };

const reminders = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

reminders.get("/", async (c) => {
  const userId = c.get("userId");
  const row = await dbFirst<Reminder>(
    c.env.DB,
    "SELECT * FROM reminders WHERE user_id = ?",
    [userId]
  );
  return c.json({ reminder: row ?? { ...DEFAULTS, id: null, user_id: userId } });
});

const patchSchema = z.object({
  active: z.boolean(),
  reminder_days_before: z.number().int().min(1).max(14),
});

reminders.patch("/", zValidator("json", patchSchema), async (c) => {
  const userId = c.get("userId");
  const { active, reminder_days_before } = c.req.valid("json");

  const existing = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM reminders WHERE user_id = ?",
    [userId]
  );

  if (existing) {
    await dbRun(
      c.env.DB,
      "UPDATE reminders SET active = ?, reminder_days_before = ? WHERE user_id = ?",
      [active ? 1 : 0, reminder_days_before, userId]
    );
  } else {
    await dbRun(
      c.env.DB,
      "INSERT INTO reminders (id, user_id, active, reminder_days_before) VALUES (?, ?, ?, ?)",
      [newId(), userId, active ? 1 : 0, reminder_days_before]
    );
  }

  const row = await dbFirst<Reminder>(
    c.env.DB,
    "SELECT * FROM reminders WHERE user_id = ?",
    [userId]
  );
  return c.json({ reminder: row });
});

export default reminders;
