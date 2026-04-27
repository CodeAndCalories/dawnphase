import { Hono } from "hono";
import type { Env, Cycle, DailyLog, User } from "../types";
import { dbAll, dbFirst } from "../lib/db";

const exportRoute = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

// ── CSV export ─────────────────────────────────────────────────────────────────

exportRoute.get("/csv", async (c) => {
  const userId = c.get("userId");

  const [user, logs] = await Promise.all([
    dbFirst<Pick<User, "email">>(
      c.env.DB,
      "SELECT email FROM users WHERE id = ?",
      [userId]
    ),
    dbAll<DailyLog>(
      c.env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date ASC",
      [userId]
    ),
  ]);

  const headers = [
    "date", "flow_intensity", "mood", "energy",
    "cramps", "bloating", "headache", "sleep_hours",
    "hot_flashes", "night_sweats", "brain_fog", "custom_symptoms", "notes",
  ];

  const rows = logs.map((l) =>
    [
      l.date,
      l.flow_intensity ?? "",
      l.mood ? JSON.parse(l.mood).join(";") : "",
      l.energy ?? "",
      l.cramps ?? "",
      l.bloating ?? "",
      l.headache ?? "",
      l.sleep_hours ?? "",
      l.hot_flashes ?? "",
      l.night_sweats ?? "",
      l.brain_fog ?? "",
      l.custom_symptoms ? JSON.parse(l.custom_symptoms).join(";") : "",
      `"${(l.notes ?? "").replace(/"/g, '""')}"`,
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const filename = `dawnphase-export-${user?.email ?? userId}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});

// ── Cycles export ──────────────────────────────────────────────────────────────

exportRoute.get("/cycles", async (c) => {
  const userId = c.get("userId");
  const cycles = await dbAll<Cycle>(
    c.env.DB,
    "SELECT * FROM cycles WHERE user_id = ? ORDER BY start_date ASC",
    [userId]
  );
  return c.json({ cycles });
});

// ── Doctor visit report ────────────────────────────────────────────────────────

exportRoute.get("/report", async (c) => {
  const userId = c.get("userId");

  // Cutoff: 90 days ago
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90);
  const cutoff = cutoffDate.toISOString().slice(0, 10);
  const today  = new Date().toISOString().slice(0, 10);

  const [user, cycles, logs] = await Promise.all([
    dbFirst<Pick<User, "email" | "mode" | "created_at">>(
      c.env.DB,
      "SELECT email, mode, created_at FROM users WHERE id = ?",
      [userId]
    ),
    dbAll<Cycle>(
      c.env.DB,
      "SELECT * FROM cycles WHERE user_id = ? AND start_date >= ? ORDER BY start_date ASC",
      [userId, cutoff]
    ),
    dbAll<DailyLog>(
      c.env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? AND date >= ? ORDER BY date ASC",
      [userId, cutoff]
    ),
  ]);

  // ── Cycle stats ──────────────────────────────────────────────────────────────
  const completed = cycles.filter((c) => c.cycle_length !== null);
  const lengths   = completed.map((c) => c.cycle_length!);

  const avgCycleLength    = lengths.length ? Math.round(lengths.reduce((a, b) => a + b) / lengths.length) : null;
  const shortestCycleLen  = lengths.length ? Math.min(...lengths) : null;
  const longestCycleLen   = lengths.length ? Math.max(...lengths) : null;
  const irregularCycles   = completed
    .filter((c) => c.cycle_length! < 21 || c.cycle_length! > 35)
    .map((c) => ({ start_date: c.start_date, cycle_length: c.cycle_length! }));

  // ── Symptom frequency ────────────────────────────────────────────────────────
  const symptomCounts: Record<string, number> = {};
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
  }

  // ── Phase helpers ────────────────────────────────────────────────────────────
  const MOOD_MAP: Record<string, number> = { "😢": 1, "😟": 2, "😐": 3, "🙂": 4, "😊": 5 };

  function phase(day: number): string {
    if (day <= 5)   return "Menstrual";
    if (day <= 13)  return "Follicular";
    if (day === 14) return "Ovulatory";
    return "Luteal";
  }

  function cycleDay(logDate: string): number | null {
    const sorted = [...cycles].sort((a, b) => b.start_date.localeCompare(a.start_date));
    const found  = sorted.find((c) => c.start_date <= logDate);
    if (!found) return null;
    const day = Math.round(
      (new Date(logDate + "T00:00:00").getTime() - new Date(found.start_date + "T00:00:00").getTime()) / 86_400_000
    ) + 1;
    return day >= 1 && day <= 60 ? day : null;
  }

  // ── Phase averages ───────────────────────────────────────────────────────────
  const phaseBuckets: Record<string, {
    moodSum: number; moodN: number;
    energySum: number; energyN: number;
    sleepSum: number; sleepN: number;
  }> = {
    Menstrual:  { moodSum: 0, moodN: 0, energySum: 0, energyN: 0, sleepSum: 0, sleepN: 0 },
    Follicular: { moodSum: 0, moodN: 0, energySum: 0, energyN: 0, sleepSum: 0, sleepN: 0 },
    Ovulatory:  { moodSum: 0, moodN: 0, energySum: 0, energyN: 0, sleepSum: 0, sleepN: 0 },
    Luteal:     { moodSum: 0, moodN: 0, energySum: 0, energyN: 0, sleepSum: 0, sleepN: 0 },
  };

  for (const log of logs) {
    const day = cycleDay(log.date);
    if (!day) continue;
    const p = phaseBuckets[phase(Math.min(day, 28))];

    if (log.mood) {
      try {
        const emoji = (JSON.parse(log.mood) as string[])[0];
        const score = emoji ? MOOD_MAP[emoji] : null;
        if (score) { p.moodSum += score; p.moodN++; }
      } catch {}
    }
    if (log.energy != null)      { p.energySum += log.energy;      p.energyN++; }
    if (log.sleep_hours != null)  { p.sleepSum  += log.sleep_hours; p.sleepN++;  }
  }

  const phaseAverages = Object.entries(phaseBuckets).map(([ph, b]) => ({
    phase:     ph,
    avgMood:   b.moodN   > 0 ? +(b.moodSum   / b.moodN).toFixed(1)   : null,
    avgEnergy: b.energyN > 0 ? +(b.energySum / b.energyN).toFixed(1) : null,
    avgSleep:  b.sleepN  > 0 ? +(b.sleepSum  / b.sleepN).toFixed(1)  : null,
  }));

  // ── Dominant phase for each top-5 symptom ────────────────────────────────────
  const BUILTIN: Record<string, keyof DailyLog> = {
    "Cramps":       "cramps",
    "Bloating":     "bloating",
    "Headache":     "headache",
    "Brain fog":    "brain_fog",
    "Hot flashes":  "hot_flashes",
    "Night sweats": "night_sweats",
  };

  const topSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([symptom, count]) => {
      const pCounts: Record<string, number> = {};
      for (const log of logs) {
        const col = BUILTIN[symptom];
        const present = col
          ? (log[col] as number | null)
          : (() => {
              try { return (JSON.parse(log.custom_symptoms ?? "[]") as string[]).includes(symptom) ? 1 : 0; }
              catch { return 0; }
            })();
        if (!present) continue;
        const day = cycleDay(log.date);
        if (!day) continue;
        const ph = phase(Math.min(day, 28));
        pCounts[ph] = (pCounts[ph] ?? 0) + 1;
      }
      const dominantPhase = Object.entries(pCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;
      return { symptom, count, dominantPhase };
    });

  return c.json({
    user,
    period: { from: cutoff, to: today },
    cycles: {
      total:          cycles.length,
      completed:      completed.length,
      avgLength:      avgCycleLength,
      shortestLength: shortestCycleLen,
      longestLength:  longestCycleLen,
      irregular:      irregularCycles,
    },
    topSymptoms,
    phaseAverages,
    logCount: logs.length,
  });
});

export default exportRoute;
