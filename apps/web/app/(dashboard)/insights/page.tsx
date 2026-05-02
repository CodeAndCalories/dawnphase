"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription } from "@/lib/auth";
import { api } from "@/lib/api";
import SymptomHeatmap from "@/components/dashboard/SymptomHeatmap";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CorrelationItem {
  type: "symptom_phase" | "energy_phase" | "mood_phase" | "sleep_phase";
  symptom: string;
  phase: string;
  occurrences: number;
  total_logs: number;
  label: string;
}

interface InsightsResponse {
  cycles_tracked: number;
  avg_cycle_length: number | null;
  top_symptoms: { symptom: string; count: number }[];
  cycle_lengths: number[];
  // Correlation engine fields
  confidence?: "early" | "developing" | "established";
  logs_count?: number;
  cycles_count?: number;
  correlations?: CorrelationItem[];
  cycle_comparison?: { symptom: string; this_cycle: number; last_cycle: number }[];
  perimenopause_note?: string | null;
}

interface Cycle {
  id: string;
  start_date: string;
  end_date: string | null;
  cycle_length: number | null;
}

interface DailyLog {
  date: string;
  energy: number | null;
  mood: string | null;       // JSON string: e.g. '["😊"]'
  cramps: number | null;
  bloating: number | null;
  headache: number | null;
  brain_fog: number | null;
  hot_flashes: number | null;
  night_sweats: number | null;
  custom_symptoms: string | null; // JSON string
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PHASES = ["Menstrual", "Follicular", "Ovulatory", "Luteal"] as const;
type Phase = (typeof PHASES)[number];

const PHASE_META: Record<Phase, { color: string; bg: string; days: string }> = {
  Menstrual:  { color: "#F87171", bg: "bg-rose-50",   days: "Days 1–5"   },
  Follicular: { color: "#A78BFA", bg: "bg-violet-50", days: "Days 6–13"  },
  Ovulatory:  { color: "#FBBF24", bg: "bg-amber-50",  days: "Day 14"     },
  Luteal:     { color: "#818CF8", bg: "bg-indigo-50", days: "Days 15–28" },
};

const MOOD_SCORE: Record<string, number> = {
  "😢": 1, "😟": 2, "😐": 3, "🙂": 4, "😊": 5,
};

// ── Phase helpers ─────────────────────────────────────────────────────────────

function getPhase(day: number): Phase {
  if (day <= 5)  return "Menstrual";
  if (day <= 13) return "Follicular";
  if (day === 14) return "Ovulatory";
  return "Luteal";
}

function getCycleDay(logDate: string, cycles: Cycle[]): number | null {
  // Find the most-recent cycle that started on or before this log date.
  const sorted = [...cycles].sort((a, b) =>
    b.start_date.localeCompare(a.start_date)
  );
  const cycle = sorted.find((c) => c.start_date <= logDate);
  if (!cycle) return null;
  const start = new Date(cycle.start_date + "T00:00:00");
  const log   = new Date(logDate         + "T00:00:00");
  const day   = Math.round((log.getTime() - start.getTime()) / 86_400_000) + 1;
  return day >= 1 && day <= 60 ? day : null; // sanity cap at 60 days
}

// ── Analysis ──────────────────────────────────────────────────────────────────

function energyByDay(logs: DailyLog[], cycles: Cycle[]): (number | null)[] {
  const sums   = new Array<number>(28).fill(0);
  const counts = new Array<number>(28).fill(0);
  for (const log of logs) {
    if (!log.energy) continue;
    const day = getCycleDay(log.date, cycles);
    if (!day || day > 28) continue;
    sums[day - 1]   += log.energy;
    counts[day - 1] += 1;
  }
  return sums.map((s, i) => (counts[i] > 0 ? s / counts[i] : null));
}

function symptomsByPhase(
  logs: DailyLog[],
  cycles: Cycle[]
): Record<Phase, { symptom: string; count: number }[]> {
  const acc: Record<Phase, Record<string, number>> = {
    Menstrual: {}, Follicular: {}, Ovulatory: {}, Luteal: {},
  };
  for (const log of logs) {
    const day = getCycleDay(log.date, cycles);
    if (!day) continue;
    const phase = getPhase(Math.min(day, 28));
    const p = acc[phase];
    if (log.cramps)       p["Cramps"]       = (p["Cramps"]       ?? 0) + 1;
    if (log.bloating)     p["Bloating"]     = (p["Bloating"]     ?? 0) + 1;
    if (log.headache)     p["Headache"]     = (p["Headache"]     ?? 0) + 1;
    if (log.brain_fog)    p["Brain fog"]    = (p["Brain fog"]    ?? 0) + 1;
    if (log.hot_flashes)  p["Hot flashes"]  = (p["Hot flashes"]  ?? 0) + 1;
    if (log.night_sweats) p["Night sweats"] = (p["Night sweats"] ?? 0) + 1;
    try {
      if (log.custom_symptoms) {
        (JSON.parse(log.custom_symptoms) as string[]).forEach(
          (s) => (p[s] = (p[s] ?? 0) + 1)
        );
      }
    } catch {}
  }
  return Object.fromEntries(
    PHASES.map((phase) => [
      phase,
      Object.entries(acc[phase])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([symptom, count]) => ({ symptom, count })),
    ])
  ) as Record<Phase, { symptom: string; count: number }[]>;
}

function moodByPhase(
  logs: DailyLog[],
  cycles: Cycle[]
): Record<Phase, number | null> {
  const sums   = { Menstrual: 0, Follicular: 0, Ovulatory: 0, Luteal: 0 };
  const counts = { Menstrual: 0, Follicular: 0, Ovulatory: 0, Luteal: 0 };
  for (const log of logs) {
    if (!log.mood) continue;
    const day = getCycleDay(log.date, cycles);
    if (!day) continue;
    const phase = getPhase(Math.min(day, 28));
    try {
      (JSON.parse(log.mood) as string[]).forEach((emoji) => {
        const score = MOOD_SCORE[emoji];
        if (score) { sums[phase] += score; counts[phase]++; }
      });
    } catch {}
  }
  return Object.fromEntries(
    PHASES.map((p) => [p, counts[p] > 0 ? sums[p] / counts[p] : null])
  ) as Record<Phase, number | null>;
}

function logStreak(logs: DailyLog[]): { streak: number; longest: number; total: number } {
  const total   = logs.length;
  const dateSet = new Set(logs.map((l) => l.date));

  // Current consecutive streak ending today or yesterday
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (dateSet.has(d.toISOString().slice(0, 10))) streak++;
    else break;
  }

  // Longest consecutive streak in available data
  const dates = [...dateSet].sort();
  let longest = dates.length > 0 ? 1 : 0;
  let current = dates.length > 0 ? 1 : 0;
  for (let i = 1; i < dates.length; i++) {
    const diff =
      (new Date(dates[i] + "T00:00:00").getTime() -
        new Date(dates[i - 1] + "T00:00:00").getTime()) /
      86_400_000;
    if (diff === 1) {
      current++;
      if (current > longest) longest = current;
    } else {
      current = 1;
    }
  }

  return { streak, longest, total };
}

// ── Small UI components ───────────────────────────────────────────────────────

function StatCard({
  label, value, sub,
}: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#FDF6F0] rounded-2xl p-5">
      <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-[#2D1B1E] leading-none">{value}</p>
      {sub && <p className="text-xs text-[#8C6B5A] mt-1">{sub}</p>}
    </div>
  );
}

function SectionCard({
  title, children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
      <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  // ── Auth + subscription gate ────────────────────────────────────────────────
  const { user, loading: authLoading, redirecting } = useRequireSubscription();

  const [dataLoading, setDataLoading] = useState(true);
  const [insights,    setInsights]    = useState<InsightsResponse | null>(null);
  const [cycles,      setCycles]      = useState<Cycle[]>([]);
  const [logs,        setLogs]        = useState<DailyLog[]>([]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get<InsightsResponse>("/insights"),
      api.get<{ cycles: Cycle[] }>("/cycles"),
      api.get<{ logs: DailyLog[] }>("/logs?limit=90"),
    ])
      .then(([ins, cyc, log]) => {
        setInsights(ins);
        setCycles(cyc.cycles);
        setLogs(log.logs);
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (authLoading || dataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
        {redirecting && (
          <p className="text-sm text-[#8C6B5A]">Setting up your account…</p>
        )}
      </div>
    );
  }

  // ── Empty state ───────────────────────────────────────────────────────────────
  if (cycles.length < 2) {
    const { total } = logStreak(logs);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 max-w-sm mx-auto">
        <span className="text-5xl" aria-hidden>📊</span>
        <div>
          <h2 className="text-xl font-semibold text-[#C94B6D]">
            Log for 2+ cycles to see your patterns
          </h2>
          <p className="text-sm text-[#8C6B5A] mt-1">
            Dawn Phase needs at least two period starts to calculate averages
            and phase trends.
          </p>
        </div>

        {/* Progress */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-xs text-[#8C6B5A]">
            <span>{cycles.length} / 2 period starts logged</span>
            <span>{total} day{total !== 1 ? "s" : ""} logged</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E8637A] rounded-full transition-all"
              style={{ width: `${Math.min(100, (cycles.length / 2) * 100)}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <a
            href="/cycles/new"
            className="w-full min-h-[44px] flex items-center justify-center bg-[#E8637A] text-white font-semibold text-sm rounded-2xl hover:bg-[#C94B6D] transition-colors"
          >
            Log period start →
          </a>
          <a
            href="/log"
            className="w-full min-h-[44px] flex items-center justify-center border-2 border-[#E8637A] text-[#E8637A] font-semibold text-sm rounded-2xl hover:bg-[#E8637A] hover:text-white transition-all"
          >
            Log today's symptoms
          </a>
        </div>
      </div>
    );
  }

  // ── Full insights ─────────────────────────────────────────────────────────────
  const { avg_cycle_length, top_symptoms } = insights!;
  const { streak, longest, total } = logStreak(logs);
  const energyData   = energyByDay(logs, cycles);
  const phaseSymptoms = symptomsByPhase(logs, cycles);
  const phaseMood    = moodByPhase(logs, cycles);

  // For the energy chart, determine max for scaling
  const energyMax = Math.max(
    ...energyData.filter((v): v is number => v !== null),
    1
  );

  return (
    <div className="max-w-3xl space-y-5 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#C94B6D]">Insights</h1>
        <p className="text-sm text-[#8C6B5A] mt-1">
          Patterns from your last {cycles.length} cycle{cycles.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Avg cycle"
          value={avg_cycle_length ? `${avg_cycle_length}d` : "—"}
          sub="based on completed cycles"
        />
        <StatCard
          label="Cycles tracked"
          value={cycles.length.toString()}
          sub={`${insights!.cycles_tracked} completed`}
        />
        <StatCard
          label="Days logged"
          value={total.toString()}
          sub={streak > 0 ? `${streak}-day streak 🔥` : "keep logging!"}
        />
      </div>

      {/* ── Your consistency ──────────────────────────────────────────────── */}
      <SectionCard title="Your consistency">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center space-y-1.5">
            <p className="text-3xl font-bold text-[#2D1B1E] leading-none">
              {streak > 0 ? streak : "—"}
            </p>
            <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
              Current streak
            </p>
            <p className="text-xs text-[#8C6B5A]">
              {streak > 0 ? "🔥 days in a row" : "log today to start"}
            </p>
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-3xl font-bold text-[#2D1B1E] leading-none">
              {longest > 0 ? longest : "—"}
            </p>
            <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
              Longest streak
            </p>
            <p className="text-xs text-[#8C6B5A]">days</p>
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-3xl font-bold text-[#2D1B1E] leading-none">{total}</p>
            <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
              Total logged
            </p>
            <p className="text-xs text-[#8C6B5A]">days overall</p>
          </div>
        </div>
      </SectionCard>

      {/* ── Symptom heatmap ───────────────────────────────────────────────── */}
      <SymptomHeatmap logs={logs} />

      {/* ── YOUR PATTERNS ───────────────────────────────────────────────── */}
      {(() => {
        const conf        = insights?.confidence;
        const correlations = insights?.correlations ?? [];
        const comparison  = insights?.cycle_comparison ?? [];
        const logsN       = insights?.logs_count ?? logs.length;
        const periNote    = insights?.perimenopause_note;
        const isPeri      = user?.mode === "perimenopause";

        // Warm label per confidence
        const warmLabel   = conf === "established" ? "Pattern spotted"
          : conf === "developing"                  ? "Worth noticing"
          :                                          "Your recent trend";

        return (
          <div className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-6 space-y-5">
            {/* Section header */}
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-[#2D1B1E]">
                {conf === "established" ? "Pattern spotlight"
                  : conf === "developing" ? "Possible patterns"
                  : "Building your picture"}
              </h2>
              {conf === "developing" && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Developing
                </span>
              )}
              {conf === "established" && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                  Established
                </span>
              )}
            </div>

            {/* ── Early state ────────────────────────────────────────────── */}
            {(conf === "early" || !conf) && (
              <div className="space-y-4">
                <p className="text-sm text-[#8C6B5A]">
                  Log for{" "}
                  <strong className="text-[#2D1B1E]">
                    {Math.max(0, 2 - cycles.length)} more cycle{cycles.length < 1 ? "s" : ""}
                  </strong>{" "}
                  to start seeing patterns.
                </p>
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#8C6B5A]">
                    <span>{cycles.length} / 2 cycles</span>
                    <span>{logsN} days logged</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E8637A] rounded-full transition-all"
                      style={{ width: `${Math.min(100, (cycles.length / 2) * 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-[#8C6B5A]">
                  Every day you log adds to your personal health picture.
                </p>
              </div>
            )}

            {/* ── Developing / Established correlations ──────────────────── */}
            {conf && conf !== "early" && (
              <>
                {conf === "developing" && (
                  <p className="text-xs text-[#8C6B5A] bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    These are early trends based on limited data. Keep logging for clearer patterns.
                  </p>
                )}

                {isPeri && periNote && (
                  <p className="text-xs text-[#8C6B5A] italic">{periNote}</p>
                )}

                {correlations.length === 0 ? (
                  <p className="text-sm text-[#8C6B5A]">Keep logging to build your first patterns.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {correlations.map((item, i) => (
                      <div
                        key={i}
                        className="bg-[#FDF6F0] rounded-xl p-4 space-y-1.5 border border-[rgba(232,99,122,0.08)]"
                      >
                        <p className="text-[10px] font-bold text-[#E8637A] uppercase tracking-wide">
                          {warmLabel}
                        </p>
                        <p className="text-sm text-[#2D1B1E] leading-snug">{item.label}</p>
                        <p className="text-[10px] text-[#8C6B5A]">
                          Based on your last {logsN} log{logsN !== 1 ? "s" : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cycle comparison */}
                {comparison.length > 0 && conf === "established" && (
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
                      This cycle vs last
                    </p>
                    <div className="space-y-2">
                      {comparison.map((row) => {
                        const diff  = row.this_cycle - row.last_cycle;
                        const trend = diff > 0 ? "up" : diff < 0 ? "down" : "same";
                        const trendColor = trend === "up" ? "text-rose-500" : trend === "down" ? "text-green-600" : "text-[#8C6B5A]";
                        return (
                          <div key={row.symptom} className="flex items-center justify-between text-sm">
                            <span className="text-[#2D1B1E]">{row.symptom}</span>
                            <span className={`font-medium ${trendColor}`}>
                              {row.this_cycle} {trend !== "same" && `(${trend === "up" ? "+" : ""}${diff} from last)`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-[10px] text-[#8C6B5A]/80 pt-1 border-t border-gray-50">
                  Insights are based on your logged data only and are for informational purposes.
                  They are not medical advice or a diagnosis.
                </p>
              </>
            )}
          </div>
        );
      })()}

      {/* ── Energy by cycle day ───────────────────────────────────────────── */}
      <SectionCard title="Energy across your cycle">
        <div className="space-y-2">
          {/* Bars */}
          <div className="flex items-end gap-px h-20" aria-label="Energy by cycle day">
            {energyData.map((val, i) => {
              const day   = i + 1;
              const phase = getPhase(day);
              const pct   = val != null ? (val / energyMax) * 100 : 0;
              return (
                <div
                  key={day}
                  title={`Day ${day} (${phase}): ${val != null ? val.toFixed(1) : "no data"}`}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: val != null ? `${Math.max(pct, 8)}%` : "4px",
                    backgroundColor:
                      val != null ? PHASE_META[phase].color : "#E5E7EB",
                    opacity: val != null ? 1 : 0.4,
                  }}
                />
              );
            })}
          </div>
          {/* Phase band labels */}
          <div className="flex text-[10px] text-[#8C6B5A]">
            {/* Menstrual 5/28, Follicular 8/28, Ovulatory 1/28, Luteal 14/28 */}
            {(
              [
                ["Menstrual", 5],
                ["Follicular", 8],
                ["Ovul.", 1],
                ["Luteal", 14],
              ] as [string, number][]
            ).map(([label, span]) => (
              <div
                key={label}
                className="text-center overflow-hidden"
                style={{ flex: span }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#8C6B5A]">
          Average energy (1–5) per cycle day across all your logs. Hover bars for detail.
        </p>
      </SectionCard>

      {/* ── Symptoms per phase ────────────────────────────────────────────── */}
      <SectionCard title="Common symptoms per phase">
        <div className="grid grid-cols-2 gap-3">
          {PHASES.map((phase) => {
            const syms = phaseSymptoms[phase];
            const meta = PHASE_META[phase];
            return (
              <div
                key={phase}
                className={`${meta.bg} rounded-xl p-4 space-y-2`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: meta.color }}
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-[#2D1B1E]">
                    {phase}
                  </span>
                  <span className="text-[10px] text-[#8C6B5A] ml-auto">
                    {meta.days}
                  </span>
                </div>
                {syms.length > 0 ? (
                  <ul className="space-y-1.5">
                    {syms.map(({ symptom, count }) => (
                      <li
                        key={symptom}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[#2D1B1E]">{symptom}</span>
                        <span className="text-xs text-[#8C6B5A] font-medium">
                          ×{count}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#8C6B5A] italic">
                    No symptoms logged
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* ── Mood by phase ─────────────────────────────────────────────────── */}
      <SectionCard title="Average mood by phase">
        <div className="space-y-3">
          {PHASES.map((phase) => {
            const val  = phaseMood[phase];
            const pct  = val != null ? (val / 5) * 100 : 0;
            const meta = PHASE_META[phase];
            const emoji =
              val == null       ? "—"
              : val < 2        ? "😢"
              : val < 3        ? "😟"
              : val < 4        ? "😐"
              : val < 4.5      ? "🙂"
              :                  "😊";
            return (
              <div key={phase} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#2D1B1E] font-medium w-24">{phase}</span>
                  <div className="flex-1 mx-3">
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: meta.color,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-[#8C6B5A] w-16 text-right">
                    {val != null ? `${val.toFixed(1)} / 5` : "no data"}{" "}
                    <span>{emoji}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* ── Top symptoms overall ──────────────────────────────────────────── */}
      {top_symptoms.length > 0 && (
        <SectionCard title="Most common symptoms (all cycles)">
          <div className="space-y-3">
            {top_symptoms.map(({ symptom, count }, i) => {
              const pct = (count / top_symptoms[0].count) * 100;
              return (
                <div key={symptom} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#2D1B1E]">
                      <span className="text-[#8C6B5A] w-4 inline-block">
                        {i + 1}.
                      </span>{" "}
                      {symptom}
                    </span>
                    <span className="text-[#8C6B5A] font-medium">
                      {count}×
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#E8637A] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
