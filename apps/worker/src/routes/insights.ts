import { Hono } from "hono";
import type { Env, Cycle, DailyLog } from "../types";
import { dbAll } from "../lib/db";

const insights = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

insights.get("/", async (c) => {
  const userId = c.get("userId");

  const [cycles, recentLogs] = await Promise.all([
    dbAll<Cycle>(
      c.env.DB,
      `SELECT * FROM cycles
       WHERE user_id = ? AND cycle_length IS NOT NULL
       ORDER BY start_date DESC LIMIT 12`,
      [userId]
    ),
    dbAll<DailyLog>(
      c.env.DB,
      "SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT 90",
      [userId]
    ),
  ]);

  const cycleLengths = cycles
    .map((c) => c.cycle_length)
    .filter((l): l is number => l !== null);

  const avgCycleLength =
    cycleLengths.length > 0
      ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
      : null;

  // Count symptom frequency from custom_symptoms + named columns
  const symptomCounts: Record<string, number> = {};
  for (const log of recentLogs) {
    if (log.custom_symptoms) {
      const syms = JSON.parse(log.custom_symptoms) as string[];
      for (const sym of syms) {
        symptomCounts[sym] = (symptomCounts[sym] ?? 0) + 1;
      }
    }
    if (log.cramps) symptomCounts["Cramps"] = (symptomCounts["Cramps"] ?? 0) + 1;
    if (log.bloating) symptomCounts["Bloating"] = (symptomCounts["Bloating"] ?? 0) + 1;
    if (log.headache) symptomCounts["Headache"] = (symptomCounts["Headache"] ?? 0) + 1;
    if (log.hot_flashes) symptomCounts["Hot flashes"] = (symptomCounts["Hot flashes"] ?? 0) + 1;
    if (log.night_sweats) symptomCounts["Night sweats"] = (symptomCounts["Night sweats"] ?? 0) + 1;
    if (log.brain_fog) symptomCounts["Brain fog"] = (symptomCounts["Brain fog"] ?? 0) + 1;
  }

  const topSymptoms = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([symptom, count]) => ({ symptom, count }));

  return c.json({
    cycles_tracked: cycles.length,
    avg_cycle_length: avgCycleLength,
    top_symptoms: topSymptoms,
    cycle_lengths: cycleLengths,
  });
});

export default insights;
