import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env, Cycle } from "../types";
import { dbAll, dbFirst, dbRun, newId } from "../lib/db";

const cycles = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

cycles.get("/", async (c) => {
  const userId = c.get("userId");
  const rows = await dbAll<Cycle>(
    c.env.DB,
    "SELECT * FROM cycles WHERE user_id = ? ORDER BY start_date DESC LIMIT 24",
    [userId]
  );
  return c.json({ cycles: rows });
});

const createSchema = z.object({
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

cycles.post("/", zValidator("json", createSchema), async (c) => {
  const userId = c.get("userId");
  const { start_date } = c.req.valid("json");

  // Close any open cycle
  await dbRun(
    c.env.DB,
    "UPDATE cycles SET end_date = date(?, '-1 day'), cycle_length = julianday(date(?, '-1 day')) - julianday(start_date) + 1 WHERE user_id = ? AND end_date IS NULL",
    [start_date, start_date, userId]
  );

  const id = newId();
  await dbRun(
    c.env.DB,
    "INSERT INTO cycles (id, user_id, start_date, created_at) VALUES (?, ?, ?, datetime('now'))",
    [id, userId, start_date]
  );

  const cycle = await dbFirst<Cycle>(c.env.DB, "SELECT * FROM cycles WHERE id = ?", [id]);
  return c.json({ cycle }, 201);
});

cycles.get("/:id", async (c) => {
  const userId = c.get("userId");
  const cycle = await dbFirst<Cycle>(
    c.env.DB,
    "SELECT * FROM cycles WHERE id = ? AND user_id = ?",
    [c.req.param("id"), userId]
  );
  if (!cycle) return c.json({ message: "Not found" }, 404);
  return c.json({ cycle });
});

export default cycles;
