import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env } from "../types";
import { dbRun, newId } from "../lib/db";
import { verifyJWT } from "../lib/jwt";

const feedback = new Hono<{ Bindings: Env }>();

const feedbackSchema = z.object({
  type: z.enum(["signup_reason", "cancellation"]),
  value: z.string().min(1).max(500),
  notes: z.string().max(2000).optional(),
});

feedback.post("/", zValidator("json", feedbackSchema), async (c) => {
  const { type, value, notes } = c.req.valid("json");

  // Optional auth — attach user_id if a valid JWT is present
  let userId: string | null = null;
  const authorization = c.req.header("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const payload = await verifyJWT(authorization.slice(7), c.env.JWT_SECRET);
    if (payload) userId = payload.sub;
  }

  await dbRun(
    c.env.DB,
    "INSERT INTO feedback (id, user_id, type, value, notes) VALUES (?, ?, ?, ?, ?)",
    [newId(), userId, type, value, notes ?? null]
  );

  return c.json({ ok: true });
});

export default feedback;
