import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";
import { sendEmail, leadCaptureEmail } from "../lib/email";

const leads = new Hono<{ Bindings: Env }>();

const leadsSchema = z.object({
  email: z.string().email(),
  source: z.string().min(1),
  results: z.record(z.string()).optional(),
});

leads.post("/", zValidator("json", leadsSchema), async (c) => {
  const { email, source, results } = c.req.valid("json");

  // Already a lead — return silently
  const existingLead = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM email_leads WHERE email = ?",
    [email]
  );
  if (existingLead) {
    return c.json({ ok: true });
  }

  // Already a full user — mark converted, return silently
  const existingUser = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  const id = newId();
  const converted = existingUser ? 1 : 0;

  await dbRun(
    c.env.DB,
    "INSERT INTO email_leads (id, email, source, converted) VALUES (?, ?, ?, ?)",
    [id, email, source, converted]
  );

  // Fire-and-forget: send email then record emailed_at
  sendEmail(c.env.RESEND_API_KEY, {
    to: email,
    subject: "Your Dawn Phase cycle results 🌅",
    html: leadCaptureEmail(email, source, results ?? {}),
  })
    .then(() =>
      dbRun(c.env.DB, "UPDATE email_leads SET emailed_at = datetime('now') WHERE id = ?", [id])
    )
    .catch(() => {});

  return c.json({ ok: true });
});

export default leads;
