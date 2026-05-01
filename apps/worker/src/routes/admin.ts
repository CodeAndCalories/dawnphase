import { Hono } from "hono";
import type { Env } from "../types";
import { dbAll } from "../lib/db";

const admin = new Hono<{ Bindings: Env }>();

interface FeedbackRow {
  id: string;
  user_id: string | null;
  type: string;
  value: string;
  notes: string | null;
  created_at: string;
}

admin.get("/feedback", async (c) => {
  const adminKey = c.req.header("X-Admin-Key");
  if (!adminKey || adminKey !== c.env.ADMIN_KEY) {
    return c.json({ message: "Forbidden" }, 403);
  }

  const rows = await dbAll<FeedbackRow>(
    c.env.DB,
    "SELECT * FROM feedback ORDER BY created_at DESC LIMIT 1000",
    []
  );

  return c.json({ feedback: rows, count: rows.length });
});

export default admin;
