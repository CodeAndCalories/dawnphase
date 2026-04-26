import { Hono } from "hono";
import type { Env } from "../types";
import { dbAll } from "../lib/db";
import { sendEmail, periodReminderEmail, type CyclePhase } from "../lib/email";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReminderRow {
  id: string;
  email: string;
  reminder_days_before: number;
  avg_cycle_length: number | null;
  last_period_start: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getPhase(cycleDay: number): CyclePhase {
  if (cycleDay <= 5)  return "Menstrual";
  if (cycleDay <= 13) return "Follicular";
  if (cycleDay === 14) return "Ovulatory";
  return "Luteal";
}

// ── Core reminder logic (shared by HTTP route and scheduled handler) ──────────

export async function processReminders(
  env: Env
): Promise<{ sent: number; skipped: number; errors: number }> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Fetch all users who have active reminders and an active/trialing subscription,
  // along with their average cycle length and most recent period start.
  const rows = await dbAll<ReminderRow>(
    env.DB,
    `SELECT
       u.id,
       u.email,
       r.reminder_days_before,
       (
         SELECT CAST(ROUND(AVG(c.cycle_length)) AS INTEGER)
         FROM cycles c
         WHERE c.user_id = u.id AND c.cycle_length IS NOT NULL
       ) AS avg_cycle_length,
       (
         SELECT c2.start_date
         FROM cycles c2
         WHERE c2.user_id = u.id
         ORDER BY c2.start_date DESC
         LIMIT 1
       ) AS last_period_start
     FROM users u
     JOIN reminders r ON r.user_id = u.id
     WHERE r.active = 1
       AND u.subscription_status IN ('active', 'trialing')`,
    []
  );

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const row of rows) {
    // Skip users with no cycle data — nothing to predict from.
    if (!row.last_period_start) {
      skipped++;
      continue;
    }

    const avgLength = row.avg_cycle_length ?? 28;
    const lastPeriod = new Date(row.last_period_start + "T00:00:00Z");
    const predictedNext = addDays(lastPeriod, avgLength);

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysUntil = Math.round(
      (predictedNext.getTime() - today.getTime()) / msPerDay
    );

    // Only send if today matches the user's chosen lead time exactly.
    if (daysUntil !== row.reminder_days_before) {
      skipped++;
      continue;
    }

    const cycleDay = Math.max(
      1,
      Math.round((today.getTime() - lastPeriod.getTime()) / msPerDay) + 1
    );

    try {
      await sendEmail(env.RESEND_API_KEY, {
        to: row.email,
        subject: `Your period may be coming in ${daysUntil} day${daysUntil === 1 ? "" : "s"} 🌸`,
        html: periodReminderEmail({
          email: row.email,
          daysAway: daysUntil,
          predictedDate: formatDate(predictedNext),
          phase: getPhase(cycleDay),
        }),
      });
      sent++;
      console.log(`[cron] Reminder sent → ${row.email} (in ${daysUntil}d)`);
    } catch (err) {
      errors++;
      console.error(`[cron] Failed to send reminder to ${row.email}:`, err);
    }
  }

  console.log(`[cron] Reminders complete — sent:${sent} skipped:${skipped} errors:${errors}`);
  return { sent, skipped, errors };
}

// ── HTTP route (GET /cron/reminders) ─────────────────────────────────────────
// Useful for manual triggering and debugging. In production the Cloudflare
// Cron Trigger fires the scheduled() handler directly.

const cron = new Hono<{ Bindings: Env }>();

cron.get("/reminders", async (c) => {
  const result = await processReminders(c.env);
  return c.json(result);
});

export default cron;
