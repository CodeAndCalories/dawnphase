import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";
import { verifyJWT } from "../lib/jwt";
import { sendEmail } from "../lib/email";

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

// ── Dashboard feedback widget ──────────────────────────────────────────────────

const messageSchema = z.object({
  message: z.string().min(1).max(500),
});

feedback.post("/message", zValidator("json", messageSchema), async (c) => {
  const { message } = c.req.valid("json");

  // Require auth
  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const payload = await verifyJWT(authorization.slice(7), c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const userId    = payload.sub;
  const userEmail = payload.email;

  // Rate limit: one submission per user per 24 h
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const existing = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM user_feedback WHERE user_id = ? AND created_at > ?",
    [userId, cutoff]
  );
  if (existing) {
    return c.json({ ok: false, rateLimited: true });
  }

  // Persist
  await dbRun(
    c.env.DB,
    "INSERT INTO user_feedback (id, user_id, user_email, message, created_at) VALUES (?, ?, ?, ?, ?)",
    [newId(), userId, userEmail, message, new Date().toISOString()]
  );

  // Notify — fire-and-forget, same pattern as welcome/reset emails
  sendEmail(c.env.RESEND_API_KEY, {
    to: "hello@dawnphase.com",
    subject: `New feedback from ${userEmail}`,
    html: `
      <p style="margin:0 0 12px;font-size:15px;color:#2D1B1E">
        <strong>From:</strong> ${userEmail}
      </p>
      <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E">
        <strong>Message:</strong>
      </p>
      <p style="margin:0;padding:16px;background:#FDF6F0;border-radius:10px;font-size:15px;color:#2D1B1E;line-height:1.6;white-space:pre-wrap">
        ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </p>
    `,
  }).catch(() => {});

  return c.json({ ok: true });
});

export default feedback;
