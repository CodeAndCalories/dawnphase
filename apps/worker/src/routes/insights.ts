import { Hono } from "hono";
import type { Env, Cycle, DailyLog, User } from "../types";
import { dbAll, dbFirst } from "../lib/db";

const insights = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

// ── Types ─────────────────────────────────────────────────────────────────────

interface CorrelationItem {
  type: "symptom_phase" | "energy_phase" | "mood_phase" | "sleep_phase";
  symptom: string;
  phase: string;
  occurrences: number;
  total_logs: number;
  label: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PHASE_NAMES = ["Menstrual", "Follicular", "Ovulatory", "Luteal"] as const;

function phaseForDay(day: number): string {
  if (day <= 5)   return "Menstrual";
  if (day <= 13)  return "Follicular";
  if (day === 14) return "Ovulatory";
  return "Luteal";
}

function cycleDay(logDate: string, allCycles: Cycle[]): number | null {
  const sorted = [...allCycles].sort((a, b) => b.start_date.localeCompare(a.start_date));
  const found  = sorted.find((c) => c.start_date <= logDate);
  if (!found) return null;
  const day = Math.round(
    (new Date(logDate + "T00:00:00").getTime() -
     new Date(found.start_date + "T00:00:00").getTime()) / 86_400_000
  ) + 1;
  return day >= 1 && day <= 60 ? day : null;
}

// Symptom presence checkers
const SYMPTOM_CHECKS: { label: string; fn: (l: DailyLog) => boolean }[] = [
  { label: "Cramps",       fn: (l) => !!l.cramps       },
  { label: "Bloating",     fn: (l) => !!l.bloating     },
  { label: "Headache",     fn: (l) => !!l.headache     },
  { label: "Hot flashes",  fn: (l) => !!l.hot_flashes  },
  { label: "Night sweats", fn: (l) => !!l.night_sweats },
  { label: "Brain fog",    fn: (l) => !!l.brain_fog    },
];

// ── Route ─────────────────────────────────────────────────────────────────────

insights.get("/", async (c) => {
  const userId = c.get("userId");

  const [userRecord, allCycles, recentLogs] = await Promise.all([
    dbFirst<Pick<User, "mode">>(
      c.env.DB, "SELECT mode FROM users WHERE id = ?", [userId]
    ),
    dbAll<Cycle>(
      c.env.DB,
      "SELECT * FROM cycles WHERE user_id = ? ORDER BY start_date DESC LIMIT 12",
      [userId]
    ),
    dbAll<DailyLog>(
      c.env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT 90",
      [userId]
    ),
  ]);

  const userMode = userRecord?.mode ?? "cycle";

  // ── Existing aggregates ────────────────────────────────────────────────────
  const completedCycles = allCycles.filter((cy) => cy.cycle_length !== null);
  const cycleLengths    = completedCycles.map((cy) => cy.cycle_length!);
  const avgCycleLength  = cycleLengths.length
    ? Math.round(cycleLengths.reduce((a, b) => a + b) / cycleLengths.length)
    : null;

  const symptomCounts: Record<string, number> = {};
  for (const log of recentLogs) {
    if (log.custom_symptoms) {
      try {
        for (const s of JSON.parse(log.custom_symptoms) as string[]) {
          symptomCounts[s] = (symptomCounts[s] ?? 0) + 1;
        }
      } catch {}
    }
    if (log.cramps)       symptomCounts["Cramps"]       = (symptomCounts["Cramps"]       ?? 0) + 1;
    if (log.bloating)     symptomCounts["Bloating"]     = (symptomCounts["Bloating"]     ?? 0) + 1;
    if (log.headache)     symptomCounts["Headache"]     = (symptomCounts["Headache"]     ?? 0) + 1;
    if (log.hot_flashes)  symptomCounts["Hot flashes"]  = (symptomCounts["Hot flashes"]  ?? 0) + 1;
    if (log.night_sweats) symptomCounts["Night sweats"] = (symptomCounts["Night sweats"] ?? 0) + 1;
    if (log.brain_fog)    symptomCounts["Brain fog"]    = (symptomCounts["Brain fog"]    ?? 0) + 1;
  }

  const topSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([symptom, count]) => ({ symptom, count }));

  // ── Confidence tier ────────────────────────────────────────────────────────
  const logsCount    = recentLogs.length;
  const cyclesCount  = completedCycles.length;
  const confidence: "early" | "developing" | "established" =
    cyclesCount < 2 || logsCount < 14 ? "early" :
    cyclesCount === 2                   ? "developing"
                                        : "established";

  // ── Correlation computation ────────────────────────────────────────────────
  const correlations: CorrelationItem[] = [];

  if (userMode === "perimenopause") {
    // Time-based 30-day windows for perimenopause users
    const today      = new Date().toISOString().slice(0, 10);
    const d30 = new Date(); d30.setDate(d30.getDate() - 30);
    const d60 = new Date(); d60.setDate(d60.getDate() - 60);
    const iso30 = d30.toISOString().slice(0, 10);
    const iso60 = d60.toISOString().slice(0, 10);

    const thisMonth = recentLogs.filter((l) => l.date >= iso30 && l.date <= today);
    const lastMonth = recentLogs.filter((l) => l.date >= iso60 && l.date <  iso30);

    const hfThis = thisMonth.filter((l) => l.hot_flashes).length;
    const hfLast = lastMonth.filter((l) => l.hot_flashes).length;

    if (hfThis > 0) {
      correlations.push({
        type: "symptom_phase",
        symptom: "Hot flashes",
        phase: "last 30 days",
        occurrences: hfThis,
        total_logs: thisMonth.length,
        label: `Hot flashes were logged ${hfThis} times in the last 30 days.`,
      });
    }

    if (thisMonth.length >= 3 && lastMonth.length >= 3 && (hfThis > 0 || hfLast > 0)) {
      const diff  = hfThis - hfLast;
      const trend = diff > 2 ? "more frequent" : diff < -2 ? "less frequent" : "similar";
      correlations.push({
        type: "symptom_phase",
        symptom: "Hot flashes (vs last month)",
        phase: "monthly comparison",
        occurrences: hfThis,
        total_logs: hfLast,
        label: `Compared to last month: hot flashes are ${trend} (${hfThis} vs ${hfLast}).`,
      });
    }

    const sleepThisMonth = thisMonth.filter((l) => l.sleep_hours != null);
    if (sleepThisMonth.length >= 3) {
      const avg = +(sleepThisMonth.reduce((s, l) => s + l.sleep_hours!, 0) / sleepThisMonth.length).toFixed(1);
      correlations.push({
        type: "sleep_phase",
        symptom: "Sleep",
        phase: "last 30 days",
        occurrences: sleepThisMonth.length,
        total_logs: thisMonth.length,
        label: `Your sleep averaged ${avg} hours this month.`,
      });
    }

    const nsThis = thisMonth.filter((l) => l.night_sweats).length;
    if (nsThis > 0) {
      correlations.push({
        type: "symptom_phase",
        symptom: "Night sweats",
        phase: "last 30 days",
        occurrences: nsThis,
        total_logs: thisMonth.length,
        label: `Night sweats were logged ${nsThis} times in the last 30 days.`,
      });
    }

  } else {
    // Phase-based correlations for cycle users
    const phaseBuckets: Record<string, DailyLog[]> = {
      Menstrual: [], Follicular: [], Ovulatory: [], Luteal: [],
    };
    for (const log of recentLogs) {
      const day = cycleDay(log.date, allCycles);
      if (!day) continue;
      phaseBuckets[phaseForDay(Math.min(day, 28))].push(log);
    }

    // Symptom → dominant phase
    for (const { label, fn } of SYMPTOM_CHECKS) {
      let maxCount = 0;
      let domPhase = "";
      let domTotal = 0;
      for (const phase of PHASE_NAMES) {
        const phLogs = phaseBuckets[phase];
        const count  = phLogs.filter(fn).length;
        if (count > maxCount) { maxCount = count; domPhase = phase; domTotal = phLogs.length; }
      }
      if (maxCount < 3 || !domPhase) continue;

      const lbl = maxCount >= 10
        ? `${label} was logged ${maxCount} of ${domTotal} times during your ${domPhase} phase.`
        : `${label} showed up most often during your ${domPhase} phase.`;

      correlations.push({
        type: "symptom_phase",
        symptom: label,
        phase: domPhase,
        occurrences: maxCount,
        total_logs: domTotal,
        label: lbl,
      });
    }

    // Energy → best phase
    const MOOD_MAP: Record<string, number> = { "😢": 1, "😟": 2, "😐": 3, "🙂": 4, "😊": 5 };
    const energyBuckets: Record<string, { sum: number; n: number }> = {};
    const moodBuckets:   Record<string, { sum: number; n: number }> = {};
    for (const ph of PHASE_NAMES) { energyBuckets[ph] = { sum: 0, n: 0 }; moodBuckets[ph] = { sum: 0, n: 0 }; }

    for (const log of recentLogs) {
      const day = cycleDay(log.date, allCycles);
      if (!day) continue;
      const ph = phaseForDay(Math.min(day, 28));
      if (log.energy != null)  { energyBuckets[ph].sum += log.energy; energyBuckets[ph].n++; }
      if (log.mood) {
        try {
          const emoji = (JSON.parse(log.mood) as string[])[0];
          const score = emoji ? MOOD_MAP[emoji] : null;
          if (score) { moodBuckets[ph].sum += score; moodBuckets[ph].n++; }
        } catch {}
      }
    }

    let bestEnergyPhase = ""; let bestEnergyAvg = 0; let bestEnergyN = 0;
    let bestMoodPhase   = ""; let bestMoodAvg   = 0; let bestMoodN   = 0;
    for (const ph of PHASE_NAMES) {
      const eb = energyBuckets[ph];
      if (eb.n >= 3) { const avg = eb.sum / eb.n; if (avg > bestEnergyAvg) { bestEnergyAvg = avg; bestEnergyPhase = ph; bestEnergyN = eb.n; } }
      const mb = moodBuckets[ph];
      if (mb.n >= 3) { const avg = mb.sum / mb.n; if (avg > bestMoodAvg)   { bestMoodAvg   = avg; bestMoodPhase   = ph; bestMoodN   = mb.n; } }
    }

    if (bestEnergyPhase) {
      correlations.push({
        type: "energy_phase",
        symptom: "Energy",
        phase: bestEnergyPhase,
        occurrences: bestEnergyN,
        total_logs: recentLogs.length,
        label: `Your energy averaged highest during your ${bestEnergyPhase} phase.`,
      });
    }
    if (bestMoodPhase) {
      correlations.push({
        type: "mood_phase",
        symptom: "Mood",
        phase: bestMoodPhase,
        occurrences: bestMoodN,
        total_logs: recentLogs.length,
        label: `Your mood averaged highest during your ${bestMoodPhase} phase.`,
      });
    }
  }

  // ── Cycle comparison ────────────────────────────────────────────────────────
  const cycleComparison: { symptom: string; this_cycle: number; last_cycle: number }[] = [];

  if (allCycles.length >= 2) {
    const current  = allCycles[0];
    const previous = allCycles.find((cy) => cy.end_date !== null && cy.start_date < current.start_date);

    if (previous?.end_date) {
      const thisLogs = recentLogs.filter((l) => l.date >= current.start_date);
      const prevEnd  = previous.end_date!;
      const lastLogs = recentLogs.filter((l) => l.date >= previous.start_date && l.date <= prevEnd);

      for (const { label, fn } of SYMPTOM_CHECKS.slice(0, 3)) { // cramps, bloating, headache
        const t = thisLogs.filter(fn).length;
        const l = lastLogs.filter(fn).length;
        if (t > 0 || l > 0) {
          cycleComparison.push({ symptom: label, this_cycle: t, last_cycle: l });
        }
      }
    }
  }

  // ── Response ───────────────────────────────────────────────────────────────
  return c.json({
    // Existing fields (unchanged for backward compat)
    cycles_tracked:   completedCycles.length,
    avg_cycle_length: avgCycleLength,
    top_symptoms:     topSymptoms,
    cycle_lengths:    cycleLengths,
    // New fields
    confidence,
    logs_count:        logsCount,
    cycles_count:      cyclesCount,
    correlations,
    cycle_comparison:  cycleComparison,
    perimenopause_note: userMode === "perimenopause"
      ? "Because your cycles may vary, these are time-based patterns rather than phase estimates."
      : null,
  });
});

export default insights;
