import { Hono } from "hono";
import type { Env, DailyLog } from "../types";
import { dbAll } from "../lib/db";
import {
  sendEmail,
  periodReminderEmail,
  monthlyReportEmail,
  weeklyDigestEmail,
  prePeriodCheckInEmail,
  type CyclePhase,
  type MonthlyReportOptions,
} from "../lib/email";

// ── Types ─────────────────────────────────────────────────────────────────────

interface WeeklyDigestUserRow {
  id: string;
  email: string;
  last_period_start: string | null;
  avg_cycle_length: number | null;
}

interface ReminderRow {
  id: string;
  email: string;
  reminder_days_before: number;
  avg_cycle_length: number | null;
  last_period_start: string | null;
}

interface PrePeriodUserRow {
  id: string;
  email: string;
  last_period_start: string | null;
  avg_cycle_length: number | null;
}

interface MonthlyUserRow {
  id: string;
  email: string;
  cycles_this_month: number;
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
  if (cycleDay <= 5)   return "Menstrual";
  if (cycleDay <= 13)  return "Follicular";
  if (cycleDay === 14) return "Ovulatory";
  return "Luteal";
}

const MOOD_MAP: Record<string, number> = {
  "😢": 1, "😟": 2, "😐": 3, "🙂": 4, "😊": 5,
};

// ── Phase wellness tips (condensed for digest email) ──────────────────────────

const PHASE_DIGEST_TIPS: Record<string, string[]> = {
  Menstrual: [
    "Iron-rich foods — spinach, lentils, and red meat support energy during blood loss",
    "Gentle movement this week: walking, yin yoga, or restorative stretching",
    "Prioritise warmth and sleep — progesterone has dropped and rest is productive",
  ],
  Follicular: [
    "Energy is building — a good week for higher intensity workouts or new projects",
    "Cruciferous vegetables (broccoli, cauliflower) support oestrogen metabolism as levels rise",
    "Social energy tends to be higher this week — great time for important conversations",
  ],
  Ovulatory: [
    "Peak performance week — try high intensity training or challenging activities",
    "Antioxidant-rich foods — berries and leafy greens support ovulation",
    "Communication and confidence often peak now — make the most of your clarity",
  ],
  Luteal: [
    "Complex carbohydrates — oats and sweet potato support serotonin and steady energy",
    "Moderate movement: walking, swimming, or yoga helps with bloating and mood",
    "Simplify your schedule in the final days — magnesium-rich foods may ease PMS",
  ],
  Perimenopause: [
    "Protein at every meal supports muscle mass as oestrogen shifts",
    "Weight-bearing exercise is especially important for bone density this week",
    "Track hot flashes, sleep, and mood daily — patterns support better doctor conversations",
  ],
};

// ── Weekly cycle digest ────────────────────────────────────────────────────────

export async function processWeeklyDigests(
  env: Env
): Promise<{ sent: number; skipped: number; errors: number }> {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;

  const todayStr     = now.toISOString().slice(0, 10);
  const sevenAgo     = addDays(now, -7).toISOString().slice(0, 10);
  const yesterdayStr = addDays(now, -1).toISOString().slice(0, 10);

  // Users who have opted in (or have no preference row — treated as opted in).
  // GROUP BY u.id prevents duplicate rows when a user has multiple reminders rows.
  const users = await dbAll<WeeklyDigestUserRow>(
    env.DB,
    `SELECT
       u.id,
       u.email,
       (SELECT c.start_date FROM cycles c WHERE c.user_id = u.id
        ORDER BY c.start_date DESC LIMIT 1) AS last_period_start,
       (SELECT CAST(ROUND(AVG(c2.cycle_length)) AS INTEGER)
        FROM cycles c2 WHERE c2.user_id = u.id
        AND c2.cycle_length IS NOT NULL) AS avg_cycle_length
     FROM users u
     LEFT JOIN reminders r ON r.user_id = u.id
     WHERE u.subscription_status IN ('active', 'trialing')
       AND COALESCE(r.weekly_digest_enabled, 1) = 1
     GROUP BY u.id`,
    []
  );

  console.log(`[WEEKLY] fetched ${users.length} users for digest`);

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  // Safety-net dedup in case the same email appears more than once in results
  const seenEmails = new Set<string>();

  for (const user of users) {
    if (seenEmails.has(user.email)) {
      console.warn(`[WEEKLY] duplicate skipped: ${user.email}`);
      skipped++;
      continue;
    }
    seenEmails.add(user.email);
    // Fetch up to 90 recent logs: full data for streak + top symptom
    const logs = await dbAll<DailyLog>(
      env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT 90",
      [user.id]
    );

    // ── Cycle day, phase, next period ───────────────────────────────────
    let cycleDay: number | null = null;
    let currentPhase: string | null = null;
    let daysUntilNextPeriod: number | null = null;

    if (user.last_period_start) {
      const lastPeriod = new Date(user.last_period_start + "T00:00:00Z");
      const daysSince  = Math.max(1, Math.round((now.getTime() - lastPeriod.getTime()) / msPerDay) + 1);
      const avgLen     = user.avg_cycle_length ?? 28;
      const nextPeriod = addDays(lastPeriod, avgLen);
      const daysLeft   = Math.round((nextPeriod.getTime() - now.getTime()) / msPerDay);

      cycleDay             = Math.min(daysSince, 90);
      currentPhase         = getPhase(Math.min(daysSince, 28));
      daysUntilNextPeriod  = daysLeft > 0 ? daysLeft : null;
    }

    // ── Streak (from up to 90 logs) ─────────────────────────────────────
    let streakDays = 0;
    if (logs.length > 0) {
      const mostRecent = logs[0].date;
      if (mostRecent === todayStr || mostRecent === yesterdayStr) {
        const dateSet = new Set(logs.map((l) => l.date));
        const cursor  = new Date(mostRecent + "T00:00:00Z");
        while (dateSet.has(cursor.toISOString().slice(0, 10))) {
          streakDays++;
          cursor.setUTCDate(cursor.getUTCDate() - 1);
        }
      }
    }

    // ── Top symptom from last 7 days ────────────────────────────────────
    const recentLogs = logs.filter((l) => l.date >= sevenAgo);
    const symptomCounts: Record<string, number> = {};

    for (const log of recentLogs) {
      if (log.cramps)       symptomCounts["Cramps"]       = (symptomCounts["Cramps"]       ?? 0) + 1;
      if (log.bloating)     symptomCounts["Bloating"]     = (symptomCounts["Bloating"]     ?? 0) + 1;
      if (log.headache)     symptomCounts["Headache"]     = (symptomCounts["Headache"]     ?? 0) + 1;
      if (log.brain_fog)    symptomCounts["Brain fog"]    = (symptomCounts["Brain fog"]    ?? 0) + 1;
      if (log.hot_flashes)  symptomCounts["Hot flashes"]  = (symptomCounts["Hot flashes"]  ?? 0) + 1;
      if (log.night_sweats) symptomCounts["Night sweats"] = (symptomCounts["Night sweats"] ?? 0) + 1;
      if (log.custom_symptoms) {
        try {
          for (const s of JSON.parse(log.custom_symptoms) as string[]) {
            symptomCounts[s] = (symptomCounts[s] ?? 0) + 1;
          }
        } catch {}
      }
    }

    const topSymptomThisWeek =
      Object.entries(symptomCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;

    // ── Wellness tips for current phase ─────────────────────────────────
    const tipsKey     = currentPhase ?? "Luteal";
    const wellnessTips = (PHASE_DIGEST_TIPS[tipsKey] ?? PHASE_DIGEST_TIPS.Luteal).slice(0, 3);

    // ── Send ─────────────────────────────────────────────────────────────
    try {
      console.log('[WEEKLY] sending to:', user.email);
      await sendEmail(env.RESEND_API_KEY, {
        to:      user.email,
        subject: "🌅 Your Dawn Phase week ahead",
        html:    weeklyDigestEmail({
          email: user.email,
          currentPhase,
          cycleDay,
          daysUntilNextPeriod,
          wellnessTips,
          streakDays,
          topSymptomThisWeek,
        }),
      });
      sent++;
      console.log(`[cron/weekly] sent → ${user.email}`);
    } catch (err) {
      errors++;
      console.error(`[cron/weekly] failed → ${user.email}:`, err);
    }
  }

  console.log(`[cron/weekly] complete — sent:${sent} skipped:${skipped} errors:${errors}`);
  return { sent, skipped, errors };
}

// ── Daily period reminders ─────────────────────────────────────────────────────

export async function processReminders(
  env: Env
): Promise<{ sent: number; skipped: number; errors: number }> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

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
    if (!row.last_period_start) { skipped++; continue; }

    const avgLength    = row.avg_cycle_length ?? 28;
    const lastPeriod   = new Date(row.last_period_start + "T00:00:00Z");
    const predictedNext = addDays(lastPeriod, avgLength);
    const msPerDay     = 1000 * 60 * 60 * 24;
    const daysUntil    = Math.round((predictedNext.getTime() - today.getTime()) / msPerDay);

    if (daysUntil !== row.reminder_days_before) { skipped++; continue; }

    const cycleDay = Math.max(
      1,
      Math.round((today.getTime() - lastPeriod.getTime()) / msPerDay) + 1
    );

    try {
      await sendEmail(env.RESEND_API_KEY, {
        to:      row.email,
        subject: `Your period may be coming in ${daysUntil} day${daysUntil === 1 ? "" : "s"} 🌸`,
        html:    periodReminderEmail({
          email:         row.email,
          daysAway:      daysUntil,
          predictedDate: formatDate(predictedNext),
          phase:         getPhase(cycleDay),
        }),
      });
      sent++;
      console.log(`[cron/reminders] sent → ${row.email} (in ${daysUntil}d)`);
    } catch (err) {
      errors++;
      console.error(`[cron/reminders] failed → ${row.email}:`, err);
    }
  }

  console.log(`[cron/reminders] complete — sent:${sent} skipped:${skipped} errors:${errors}`);
  return { sent, skipped, errors };
}

// ── Monthly cycle report ───────────────────────────────────────────────────────

export async function processMonthlyReports(
  env: Env
): Promise<{ sent: number; skipped: number; errors: number }> {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);

  // 30-day window ending today
  const cutoff = addDays(now, -30).toISOString().slice(0, 10);
  const today  = now.toISOString().slice(0, 10);

  // Report month label = previous calendar month (cron fires on the 1st)
  const prevMonthDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const month = prevMonthDate.toLocaleDateString("en-US", {
    month: "long",
    year:  "numeric",
    timeZone: "UTC",
  });

  // Single query: all eligible users + aggregate cycle info
  const users = await dbAll<MonthlyUserRow>(
    env.DB,
    `SELECT
       u.id,
       u.email,
       (SELECT COUNT(*) FROM cycles c WHERE c.user_id = u.id AND c.start_date >= ?) AS cycles_this_month,
       (SELECT CAST(ROUND(AVG(c2.cycle_length)) AS INTEGER)
        FROM cycles c2
        WHERE c2.user_id = u.id AND c2.cycle_length IS NOT NULL) AS avg_cycle_length,
       (SELECT c3.start_date FROM cycles c3 WHERE c3.user_id = u.id
        ORDER BY c3.start_date DESC LIMIT 1) AS last_period_start
     FROM users u
     WHERE u.subscription_status IN ('active', 'trialing')`,
    [cutoff]
  );

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const user of users) {
    // Fetch this user's logs for the 30-day window
    const logs = await dbAll<DailyLog>(
      env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? AND date >= ? AND date <= ? ORDER BY date DESC",
      [user.id, cutoff, today]
    );

    // Skip users with no activity at all
    if (logs.length === 0 && !user.last_period_start) {
      skipped++;
      continue;
    }

    // ── Compute stats from logs ─────────────────────────────────────────────
    const symptomCounts: Record<string, number> = {};
    let moodSum = 0;    let moodN = 0;
    let energySum = 0;  let energyN = 0;
    let sleepSum = 0;   let sleepN = 0;

    for (const log of logs) {
      if (log.cramps)       symptomCounts["Cramps"]       = (symptomCounts["Cramps"]       ?? 0) + 1;
      if (log.bloating)     symptomCounts["Bloating"]     = (symptomCounts["Bloating"]     ?? 0) + 1;
      if (log.headache)     symptomCounts["Headache"]     = (symptomCounts["Headache"]     ?? 0) + 1;
      if (log.brain_fog)    symptomCounts["Brain fog"]    = (symptomCounts["Brain fog"]    ?? 0) + 1;
      if (log.hot_flashes)  symptomCounts["Hot flashes"]  = (symptomCounts["Hot flashes"]  ?? 0) + 1;
      if (log.night_sweats) symptomCounts["Night sweats"] = (symptomCounts["Night sweats"] ?? 0) + 1;
      if (log.custom_symptoms) {
        try {
          for (const s of JSON.parse(log.custom_symptoms) as string[]) {
            symptomCounts[s] = (symptomCounts[s] ?? 0) + 1;
          }
        } catch {}
      }
      if (log.mood) {
        try {
          const emoji = (JSON.parse(log.mood) as string[])[0];
          const score = emoji ? MOOD_MAP[emoji] : null;
          if (score) { moodSum += score; moodN++; }
        } catch {}
      }
      if (log.energy      != null) { energySum += log.energy;      energyN++; }
      if (log.sleep_hours != null) { sleepSum  += log.sleep_hours; sleepN++;  }
    }

    const topSymptoms = Object.entries(symptomCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([s]) => s);

    const avgMood   = moodN   > 0 ? +(moodSum   / moodN).toFixed(1)   : null;
    const avgEnergy = energyN > 0 ? +(energySum / energyN).toFixed(1) : null;
    const avgSleep  = sleepN  > 0 ? +(sleepSum  / sleepN).toFixed(1)  : null;

    // ── Phase + predicted next period ──────────────────────────────────────
    let currentPhase: string | null = null;
    let daysUntilNextPeriod: number | null = null;

    if (user.last_period_start) {
      const lastPeriod = new Date(user.last_period_start + "T00:00:00Z");
      const msPerDay   = 1000 * 60 * 60 * 24;
      const daysSince  = Math.max(1, Math.round((now.getTime() - lastPeriod.getTime()) / msPerDay) + 1);
      const avgLen     = user.avg_cycle_length ?? 28;
      const predictedNext = addDays(lastPeriod, avgLen);
      const daysLeft   = Math.round((predictedNext.getTime() - now.getTime()) / msPerDay);

      currentPhase         = getPhase(Math.min(daysSince, 60));
      daysUntilNextPeriod  = daysLeft > 0 ? daysLeft : null;
    }

    // ── Send ───────────────────────────────────────────────────────────────
    const reportOpts: MonthlyReportOptions = {
      email: user.email,
      month,
      cyclesTracked:       user.cycles_this_month,
      avgCycleLength:      user.avg_cycle_length,
      topSymptoms,
      avgMood,
      avgEnergy,
      avgSleep,
      currentPhase,
      daysUntilNextPeriod,
    };

    try {
      await sendEmail(env.RESEND_API_KEY, {
        to:      user.email,
        subject: `Your Dawn Phase Report — ${month} 🌅`,
        html:    monthlyReportEmail(reportOpts),
      });
      sent++;
      console.log(`[cron/monthly] sent → ${user.email} (${month})`);
    } catch (err) {
      errors++;
      console.error(`[cron/monthly] failed → ${user.email}:`, err);
    }
  }

  console.log(`[cron/monthly] complete — sent:${sent} skipped:${skipped} errors:${errors}`);
  return { sent, skipped, errors };
}

// ── Pre-period check-in (daily cron, 0 9 * * *) ──────────────────────────────
// Sends a symptom-logging prompt to users whose predicted next period is
// exactly 2 or 3 days away. Requires reminders.active = 1.

export async function processPrePeriodCheckIns(
  env: Env
): Promise<{ sent: number; skipped: number; errors: number }> {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;

  // Only users with an active reminder row — GROUP BY guards against duplicate rows.
  const users = await dbAll<PrePeriodUserRow>(
    env.DB,
    `SELECT
       u.id,
       u.email,
       (SELECT c.start_date FROM cycles c WHERE c.user_id = u.id
        ORDER BY c.start_date DESC LIMIT 1) AS last_period_start,
       (SELECT CAST(ROUND(AVG(c2.cycle_length)) AS INTEGER)
        FROM cycles c2 WHERE c2.user_id = u.id
        AND c2.cycle_length IS NOT NULL) AS avg_cycle_length
     FROM users u
     JOIN reminders r ON r.user_id = u.id
     WHERE u.subscription_status IN ('active', 'trialing')
       AND r.active = 1
     GROUP BY u.id`,
    []
  );

  console.log(`[PRE-PERIOD] fetched ${users.length} users with active reminders`);

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  const seenEmails = new Set<string>();

  for (const user of users) {
    if (seenEmails.has(user.email)) {
      skipped++;
      continue;
    }
    seenEmails.add(user.email);

    if (!user.last_period_start) {
      skipped++;
      continue;
    }

    const avgLen       = user.avg_cycle_length ?? 28;
    const lastPeriod   = new Date(user.last_period_start + "T00:00:00Z");
    const predictedNext = addDays(lastPeriod, avgLen);
    const daysUntil    = Math.round((predictedNext.getTime() - now.getTime()) / msPerDay);

    if (daysUntil !== 2 && daysUntil !== 3) {
      skipped++;
      continue;
    }

    try {
      console.log('[PRE-PERIOD] sending to:', user.email, '| days until period:', daysUntil);
      await sendEmail(env.RESEND_API_KEY, {
        to:      user.email,
        subject: `Your period is coming in ~${daysUntil} days — how are you feeling?`,
        html:    prePeriodCheckInEmail(user.email, daysUntil),
      });
      sent++;
    } catch (err) {
      errors++;
      console.error(`[PRE-PERIOD] failed → ${user.email}:`, err);
    }
  }

  console.log(`[PRE-PERIOD] complete — sent:${sent} skipped:${skipped} errors:${errors}`);
  return { sent, skipped, errors };
}

// ── HTTP routes ────────────────────────────────────────────────────────────────

const cron = new Hono<{ Bindings: Env }>();

cron.get("/reminders", async (c) => {
  const result = await processReminders(c.env);
  return c.json(result);
});

cron.get("/monthly", async (c) => {
  const result = await processMonthlyReports(c.env);
  return c.json(result);
});

cron.get("/weekly", async (c) => {
  const result = await processWeeklyDigests(c.env);
  return c.json(result);
});

cron.get("/pre-period", async (c) => {
  const result = await processPrePeriodCheckIns(c.env);
  return c.json(result);
});

export default cron;
