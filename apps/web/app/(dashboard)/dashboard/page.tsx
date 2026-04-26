"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription } from "@/lib/auth";
import { api } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Cycle {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  cycle_length: number | null;
}

interface DailyLog {
  id: string;
  user_id: string;
  date: string;
  mood: string | null;        // JSON: e.g. '["😊"]'
  energy: number | null;
  sleep_hours: number | null;
}

// ── Phase helpers ─────────────────────────────────────────────────────────────

type PhaseName = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

interface PhaseInfo {
  name: PhaseName;
  tip: string;
  accent: string;   // Tailwind text colour class
  dotColor: string; // hex for inline use
}

function getPhaseInfo(day: number): PhaseInfo {
  if (day <= 5)
    return {
      name: "Menstrual",
      tip: "Rest is productive. Gentle movement and warmth support your body right now.",
      accent: "text-rose-500",
      dotColor: "#F87171",
    };
  if (day <= 13)
    return {
      name: "Follicular",
      tip: "Energy is building. Great time to start new projects and connect socially.",
      accent: "text-violet-500",
      dotColor: "#8B5CF6",
    };
  if (day === 14)
    return {
      name: "Ovulatory",
      tip: "Peak energy and communication. Make the most of your clarity today.",
      accent: "text-amber-500",
      dotColor: "#F59E0B",
    };
  return {
    name: "Luteal",
    tip: "Wind down gradually. Reduce caffeine, prioritise sleep, and be gentle with yourself.",
    accent: "text-indigo-500",
    dotColor: "#6366F1",
  };
}

function daysToNextPhase(day: number): { label: string; days: number } {
  if (day <= 5)   return { label: "Follicular",  days: 6 - day };
  if (day <= 13)  return { label: "Ovulatory",   days: 14 - day };
  if (day === 14) return { label: "Luteal",      days: 1 };
  return            { label: "Next period",   days: Math.max(1, 29 - day) };
}

// ── Data helpers ──────────────────────────────────────────────────────────────

const MOOD_SCORE: Record<string, number> = {
  "😢": 1, "😟": 2, "😐": 3, "🙂": 4, "😊": 5,
};
const MOOD_EMOJI = ["", "😢", "😟", "😐", "🙂", "😊"];

function parseMood(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const arr = JSON.parse(raw) as string[];
    return arr[0] ?? null;
  } catch {
    return null;
  }
}

function avgMoodScore(logs: DailyLog[]): number | null {
  const scores = logs
    .map((l) => {
      const emoji = parseMood(l.mood);
      return emoji ? (MOOD_SCORE[emoji] ?? null) : null;
    })
    .filter((s): s is number => s !== null);
  if (!scores.length) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

function formatShortDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function predictedNext(latestCycle: Cycle, avgLen: number): Date {
  const d = new Date(latestCycle.start_date + "T00:00:00");
  d.setDate(d.getDate() + avgLen);
  return d;
}

// ── Small shared card shell ────────────────────────────────────────────────────

function Card({
  children,
  className = "",
  hero = false,
}: {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] p-6 ${
        hero ? "shadow-md" : "shadow-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // ── Auth + subscription gate ───────────────────────────────────────────────
  const { user, loading: authLoading, activating, statusMessage } =
    useRequireSubscription();

  // ── Data ───────────────────────────────────────────────────────────────────
  const [cycles,      setCycles]      = useState<Cycle[]>([]);
  const [logs,        setLogs]        = useState<DailyLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get<{ cycles: Cycle[] }>("/cycles"),
      api.get<{ logs: DailyLog[] }>("/logs?limit=7"),
    ])
      .then(([c, l]) => {
        setCycles(c.cycles);
        setLogs(l.logs);
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  const loading = authLoading || dataLoading;

  // ── Loading screen ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
        {statusMessage && (
          <p className="text-sm text-[#8C6B5A]">{statusMessage}</p>
        )}
      </div>
    );
  }

  if (!user) return null;

  // ── Derived values ─────────────────────────────────────────────────────────
  const latestCycle   = cycles[0] ?? null;
  const completedLens = cycles
    .map((c) => c.cycle_length)
    .filter((n): n is number => n !== null);
  const avgLen = completedLens.length
    ? Math.round(completedLens.reduce((a, b) => a + b, 0) / completedLens.length)
    : 28;

  const cycleDay = latestCycle
    ? Math.max(
        1,
        Math.ceil(
          (new Date().setHours(0, 0, 0, 0) -
            new Date(latestCycle.start_date).setHours(0, 0, 0, 0)) /
            86_400_000
        ) + 1
      )
    : null;

  const phase = cycleDay ? getPhaseInfo(cycleDay) : null;

  const nextPeriodDate = latestCycle ? predictedNext(latestCycle, avgLen) : null;
  const daysToNextPeriod = nextPeriodDate
    ? Math.max(1, Math.ceil((nextPeriodDate.getTime() - new Date().setHours(0,0,0,0)) / 86_400_000))
    : null;
  const nextPhase = cycleDay ? daysToNextPhase(cycleDay) : null;

  // Recent check-ins (last 3 logs)
  const recentLogs = logs.slice(0, 3);

  // This cycle stats (from fetched logs)
  const cycleMoodAvg = avgMoodScore(logs);
  const energyValues = logs.map((l) => l.energy).filter((e): e is number => e !== null);
  const cycleEnergyAvg = energyValues.length
    ? energyValues.reduce((a, b) => a + b, 0) / energyValues.length
    : null;

  // Quick insight
  const quickInsight =
    completedLens.length >= 2
      ? `Your average cycle is ${avgLen} days`
      : cycles.length >= 1
        ? "Log 2 full cycles to unlock insights"
        : null;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-4">
      {/* Activation banner */}
      {activating && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <span>✓ Payment received. Finishing setup… this usually takes a few seconds.</span>
          <button
            onClick={() => window.location.reload()}
            className="shrink-0 font-medium underline hover:no-underline"
          >
            Refresh
          </button>
        </div>
      )}

      {/* ── ROW 1: Hero + secondary cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Hero card — 2/3 width */}
        <Card hero className="md:col-span-2">
          <CardHeading>Your cycle today</CardHeading>

          {phase && cycleDay ? (
            <div className="space-y-4">
              {/* Phase name + day */}
              <div>
                <h1 className={`text-4xl font-bold tracking-tight ${phase.accent}`}>
                  {phase.name}
                </h1>
                <p className="text-[#8C6B5A] mt-1 text-sm font-medium">
                  Cycle day {cycleDay}
                  {nextPeriodDate && (
                    <> · Next period around{" "}
                      <span className="text-[#2D1B1E] font-semibold">
                        {nextPeriodDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Phase tip */}
              <p className="text-sm text-[#8C6B5A] leading-relaxed border-l-2 border-[#E8637A]/30 pl-3">
                {phase.tip}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="/log"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E8637A] to-[#F4956A] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-sm"
                >
                  Log today
                </a>
                <a
                  href="/cycles/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#E8637A] text-[#E8637A] text-sm font-semibold rounded-full hover:bg-[#E8637A] hover:text-white transition-all"
                >
                  Log period
                </a>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <span className="text-5xl" aria-hidden>🌸</span>
              <div>
                <p className="font-semibold text-[#2D1B1E] text-lg">
                  Start your cycle tracking
                </p>
                <p className="text-sm text-[#8C6B5A] mt-1">
                  Log your last period to unlock phase predictions, cycle day
                  tracking, and personalised insights.
                </p>
              </div>
              <a
                href="/cycles/new"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#E8637A] to-[#F4956A] text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-sm"
              >
                Log period start →
              </a>
            </div>
          )}
        </Card>

        {/* Right column — stacked secondary cards */}
        <div className="flex flex-col gap-5">
          {/* Upcoming */}
          <Card className="flex-1">
            <CardHeading>Upcoming</CardHeading>
            {cycleDay && nextPhase && daysToNextPeriod ? (
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm text-[#2D1B1E]">Next period</span>
                  <span className="text-xs font-semibold text-[#E8637A] bg-[#E8637A]/10 px-2.5 py-1 rounded-full">
                    in {daysToNextPeriod}d
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-[#2D1B1E]">{nextPhase.label} phase</span>
                  <span className="text-xs font-semibold text-[#8C6B5A] bg-gray-100 px-2.5 py-1 rounded-full">
                    in {nextPhase.days}d
                  </span>
                </li>
              </ul>
            ) : (
              <p className="text-sm text-[#8C6B5A]">
                Log a period to see predictions.
              </p>
            )}
          </Card>

          {/* Quick insight */}
          <Card className="flex-1">
            <CardHeading>Quick insight</CardHeading>
            {quickInsight ? (
              <p className="text-sm text-[#2D1B1E] font-medium leading-relaxed">
                {quickInsight}
              </p>
            ) : (
              <p className="text-sm text-[#8C6B5A]">
                Log your first period to start building insights.
              </p>
            )}
            {completedLens.length >= 2 && (
              <a
                href="/insights"
                className="inline-block mt-3 text-xs text-[#E8637A] font-semibold hover:underline"
              >
                See all insights →
              </a>
            )}
          </Card>
        </div>
      </div>

      {/* ── ROW 2: Recent check-ins + This cycle ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Recent check-ins */}
        <Card>
          <CardHeading>Recent check-ins</CardHeading>
          {recentLogs.length === 0 ? (
            <div className="text-center py-4 space-y-2">
              <p className="text-sm text-[#8C6B5A]">No logs yet.</p>
              <a
                href="/log"
                className="inline-block text-sm text-[#E8637A] font-semibold hover:underline"
              >
                Start logging today →
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentLogs.map((log) => {
                const moodEmoji = parseMood(log.mood);
                return (
                  <li key={log.date} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <span className="text-sm font-medium text-[#2D1B1E]">
                      {formatShortDate(log.date)}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-[#8C6B5A]">
                      {moodEmoji && (
                        <span className="text-base leading-none" title="Mood">
                          {moodEmoji}
                        </span>
                      )}
                      {log.energy != null && (
                        <span className="flex items-center gap-0.5">
                          <span className="text-[#C94B6D] font-semibold">
                            {log.energy}
                          </span>
                          <span>/5 energy</span>
                        </span>
                      )}
                      {log.sleep_hours != null && (
                        <span>{log.sleep_hours}h sleep</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {logs.length > 0 && (
            <a
              href="/log"
              className="inline-block mt-3 text-xs text-[#E8637A] font-semibold hover:underline"
            >
              Log today →
            </a>
          )}
        </Card>

        {/* This cycle */}
        <Card>
          <CardHeading>This cycle</CardHeading>
          {!latestCycle ? (
            <p className="text-sm text-[#8C6B5A]">No cycle logged yet.</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {/* Days logged */}
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-[#C94B6D]">
                  {logs.length}
                </p>
                <p className="text-xs text-[#8C6B5A] leading-tight">
                  days logged
                  <br />
                  <span className="text-[10px] opacity-70">(last 7)</span>
                </p>
              </div>

              {/* Avg mood */}
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-[#C94B6D]">
                  {cycleMoodAvg != null
                    ? MOOD_EMOJI[Math.round(cycleMoodAvg)]
                    : "—"}
                </p>
                <p className="text-xs text-[#8C6B5A] leading-tight">
                  avg mood
                </p>
              </div>

              {/* Avg energy */}
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-[#C94B6D]">
                  {cycleEnergyAvg != null
                    ? cycleEnergyAvg.toFixed(1)
                    : "—"}
                </p>
                <p className="text-xs text-[#8C6B5A] leading-tight">
                  avg energy
                  <br />
                  <span className="text-[10px] opacity-70">out of 5</span>
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
