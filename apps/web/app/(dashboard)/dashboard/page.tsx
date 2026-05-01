"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription } from "@/lib/auth";
import { api } from "@/lib/api";
import { getZodiacSign, getCosmicMessage, ZODIAC_SYMBOLS, type CyclePhase } from "@/lib/cosmic-messages";

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
  mood: string | null;
  energy: number | null;
  sleep_hours: number | null;
  notes: string | null;
}

// ── Phase helpers ─────────────────────────────────────────────────────────────

type PhaseName = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

interface PhaseInfo {
  name: PhaseName;
  tip: string;
  accent: string;
  dotColor: string;
  bgRgba: string; // for radial gradient
}

function getPhaseInfo(day: number): PhaseInfo {
  if (day <= 5)
    return {
      name: "Menstrual",
      tip: "Rest is productive. Gentle movement and warmth support your body right now.",
      accent: "text-rose-500",
      dotColor: "#E8637A",
      bgRgba: "rgba(232,99,122,0.08)",
    };
  if (day <= 13)
    return {
      name: "Follicular",
      tip: "Energy is building. Great time to start new projects and connect socially.",
      accent: "text-violet-500",
      dotColor: "#F4956A",
      bgRgba: "rgba(244,149,106,0.08)",
    };
  if (day === 14)
    return {
      name: "Ovulatory",
      tip: "Peak energy and communication. Make the most of your clarity today.",
      accent: "text-amber-500",
      dotColor: "#F5C842",
      bgRgba: "rgba(245,200,66,0.08)",
    };
  return {
    name: "Luteal",
    tip: "Wind down gradually. Reduce caffeine, prioritise sleep, and be gentle with yourself.",
    accent: "text-indigo-500",
    dotColor: "#8B7BB5",
    bgRgba: "rgba(139,123,181,0.08)",
  };
}

function daysToNextPhase(day: number): { label: string; days: number } {
  if (day <= 5)   return { label: "Follicular", days: 6 - day };
  if (day <= 13)  return { label: "Ovulatory",  days: 14 - day };
  if (day === 14) return { label: "Luteal",     days: 1 };
  return            { label: "Next period", days: Math.max(1, 29 - day) };
}

// ── Greeting ──────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 6  && h < 12) return "Good morning";
  if (h >= 12 && h < 18) return "Good afternoon";
  return "Good evening";
}

// ── Phase arc SVG ─────────────────────────────────────────────────────────────

function CycleArcSVG({
  cycleDay,
  totalDays,
  phaseColor,
}: {
  cycleDay: number;
  totalDays: number;
  phaseColor: string;
}) {
  const R   = 78;
  const CX  = 100;
  const CY  = 100;
  const GAP = 0.012;

  // Map a fraction (0–1) of the cycle to (x,y) on the upper semicircle
  function pt(f: number, r = R) {
    const θ = f * Math.PI;
    return {
      x: +((CX - r * Math.cos(θ)).toFixed(3)),
      y: +((CY - r * Math.sin(θ)).toFixed(3)),
    };
  }

  // SVG arc path for a stroke-based segment
  function arcPath(f1: number, f2: number): string {
    const p1 = pt(f1);
    const p2 = pt(f2);
    const large = (f2 - f1) > 0.5 ? 1 : 0;
    return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 0 ${p2.x} ${p2.y}`;
  }

  // Segment boundaries — ovulatory gets min 5% for visibility
  const menEnd  = 5 / totalDays;
  const folEnd  = 13 / totalDays;
  const ovuEnd  = Math.max(14 / totalDays, folEnd + 0.05);

  const segs = [
    { f1: 0,            f2: menEnd  - GAP, color: "#E8637A" },
    { f1: menEnd  + GAP, f2: folEnd  - GAP, color: "#F4956A" },
    { f1: folEnd  + GAP, f2: ovuEnd  - GAP, color: "#F5C842" },
    { f1: ovuEnd  + GAP, f2: 1,             color: "#8B7BB5" },
  ].filter(s => s.f2 > s.f1 + 0.001); // drop degenerate segments

  // Dot at middle of current day
  const dotFrac = Math.min((cycleDay - 0.5) / totalDays, 0.985);
  const dot = pt(dotFrac);

  return (
    <svg
      width="200"
      height="104"
      viewBox="0 0 200 104"
      role="img"
      aria-label="Cycle phase arc"
    >
      <defs>
        <radialGradient id="arcGlow" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor={phaseColor} stopOpacity="0.18" />
          <stop offset="70%"  stopColor={phaseColor} stopOpacity="0.04" />
          <stop offset="100%" stopColor={phaseColor} stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Soft glow ellipse */}
      <ellipse cx="100" cy="104" rx="100" ry="58" fill="url(#arcGlow)" />

      {/* Arc segments */}
      {segs.map((seg, i) => (
        <path
          key={i}
          d={arcPath(seg.f1, seg.f2)}
          stroke={seg.color}
          strokeWidth="10"
          strokeLinecap="butt"
          fill="none"
        />
      ))}

      {/* Current-day indicator dot */}
      <circle cx={dot.x} cy={dot.y} r="7.5" fill="white" stroke={phaseColor} strokeWidth="2.5" />
      <circle cx={dot.x} cy={dot.y} r="3.5" fill={phaseColor} />
    </svg>
  );
}

// ── Data helpers ──────────────────────────────────────────────────────────────

const MOOD_SCORE: Record<string, number> = {
  "😢": 1, "😟": 2, "😐": 3, "🙂": 4, "😊": 5,
};
const MOOD_EMOJI = ["", "😢", "😟", "😐", "🙂", "😊"];

// ── Cycle sync suggestions ────────────────────────────────────────────────────

const PHASE_SUGGESTIONS: Record<string, string[]> = {
  Menstrual: [
    "Prioritize rest and gentle movement today",
    "Hydrate well and keep meals simple and nourishing",
    "Good time to track cramps, flow intensity, and energy",
  ],
  Follicular: [
    "Energy tends to rise — good time for planning and creative work",
    "Notice any shifts in mood, focus, or motivation",
    "Great phase for higher intensity workouts if you feel up to it",
  ],
  Ovulatory: [
    "Social energy and confidence may feel naturally higher",
    "Notice changes in discharge, libido, or body temperature",
    "Log any peak energy or mood moments today",
  ],
  Luteal: [
    "Simplify your schedule where you can",
    "Prioritize sleep and steady, grounding meals",
    "Track PMS symptoms — bloating, headaches, mood shifts",
  ],
  Perimenopause: [
    "Track hot flashes, night sweats, and sleep quality today",
    "Note any mood or energy patterns across the week",
    "Bring your symptom log to your next doctor visit",
  ],
};

const PHASE_BADGE_STYLE: Record<string, string> = {
  Menstrual:     "bg-rose-50   text-rose-700   border border-rose-200",
  Follicular:    "bg-violet-50 text-violet-700 border border-violet-200",
  Ovulatory:     "bg-amber-50  text-amber-700  border border-amber-200",
  Luteal:        "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Perimenopause: "bg-purple-50 text-purple-700 border border-purple-200",
};

function parseMood(raw: string | null): string | null {
  if (!raw) return null;
  try { return (JSON.parse(raw) as string[])[0] ?? null; } catch { return null; }
}

function avgMoodScore(logs: DailyLog[]): number | null {
  const scores = logs
    .map(l => { const e = parseMood(l.mood); return e ? (MOOD_SCORE[e] ?? null) : null; })
    .filter((s): s is number => s !== null);
  if (!scores.length) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

function formatShortDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function predictedNext(latestCycle: Cycle, avgLen: number): Date {
  const d = new Date(latestCycle.start_date + "T00:00:00");
  d.setDate(d.getDate() + avgLen);
  return d;
}

// ── Card shell ────────────────────────────────────────────────────────────────

function Card({
  children, className = "", hero = false, padding = "p-6", style,
}: {
  children: React.ReactNode;
  className?: string;
  hero?: boolean;
  padding?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] ${padding} ${
        hero
          ? "shadow-md"
          : "shadow-sm md:hover:shadow-md md:hover:-translate-y-0.5 transition-all duration-200"
      } ${className}`}
      style={style}
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
  const { user, loading: authLoading, activating, statusMessage } =
    useRequireSubscription();

  const [cycles,      setCycles]      = useState<Cycle[]>([]);
  const [logs,        setLogs]        = useState<DailyLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [greeting,    setGreeting]    = useState("Welcome back");

  // Capture checkout=success synchronously at mount, before the auth hook
  // strips it from the URL in its useEffect.
  const [isCheckoutReturn] = useState(() =>
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("checkout") === "success"
  );

  // Onboarding modal state
  const [showOnboarding,   setShowOnboarding]   = useState(false);
  const [onboardMode,      setOnboardMode]      = useState<"cycle" | "perimenopause">("cycle");
  const [onboardBirthDate, setOnboardBirthDate] = useState("");
  const [onboardSaving,    setOnboardSaving]    = useState(false);

  // Post-signup feedback modal
  const [showFeedback,    setShowFeedback]    = useState(false);
  const [feedbackSending, setFeedbackSending] = useState(false);

  // Set time-of-day greeting on mount (client-only)
  useEffect(() => { setGreeting(getGreeting()); }, []);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get<{ cycles: Cycle[] }>("/cycles"),
      api.get<{ logs: DailyLog[] }>("/logs?limit=7"),
    ])
      .then(([c, l]) => { setCycles(c.cycles); setLogs(l.logs); })
      .finally(() => setDataLoading(false));
  }, [user]);

  // Show onboarding modal once after a successful checkout
  useEffect(() => {
    if (!user) return;
    if (!isCheckoutReturn) return;
    if (typeof window !== "undefined" && localStorage.getItem("dp_onboarded")) return;
    setOnboardMode(user.mode);
    setOnboardBirthDate(user.birth_date ?? "");
    setShowOnboarding(true);
  }, [user, isCheckoutReturn]);

  const loading = authLoading || dataLoading;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
        {statusMessage && <p className="text-sm text-[#8C6B5A]">{statusMessage}</p>}
      </div>
    );
  }

  if (!user) return null;

  // ── Derived values ─────────────────────────────────────────────────────────
  const latestCycle   = cycles[0] ?? null;
  const completedLens = cycles.map(c => c.cycle_length).filter((n): n is number => n !== null);
  const avgLen = completedLens.length
    ? Math.round(completedLens.reduce((a, b) => a + b, 0) / completedLens.length)
    : 28;

  const cycleDay = latestCycle
    ? Math.max(1, Math.ceil(
        (new Date().setHours(0,0,0,0) - new Date(latestCycle.start_date).setHours(0,0,0,0)) / 86_400_000
      ) + 1)
    : null;

  const phase = cycleDay ? getPhaseInfo(cycleDay) : null;

  const nextPeriodDate   = latestCycle ? predictedNext(latestCycle, avgLen) : null;
  const daysToNextPeriod = nextPeriodDate
    ? Math.max(1, Math.ceil((nextPeriodDate.getTime() - new Date().setHours(0,0,0,0)) / 86_400_000))
    : null;
  const nextPhase = cycleDay ? daysToNextPhase(cycleDay) : null;

  const recentLogs     = logs.slice(0, 3);
  const cycleMoodAvg   = avgMoodScore(logs);
  const energyValues   = logs.map(l => l.energy).filter((e): e is number => e !== null);
  const cycleEnergyAvg = energyValues.length
    ? energyValues.reduce((a, b) => a + b, 0) / energyValues.length
    : null;

  const quickInsight = completedLens.length >= 2
    ? `Your average cycle is ${avgLen} days`
    : cycles.length >= 1 ? "Log 2 full cycles to unlock insights" : null;

  // Phase-aware hero background
  const heroBackground = phase
    ? `radial-gradient(ellipse at top right, ${phase.bgRgba} 0%, transparent 70%), linear-gradient(135deg, #FFF0F0 0%, #FDF6F0 100%)`
    : "linear-gradient(135deg, #FFF0F0 0%, #FDF6F0 100%)";

  // Arc total days: use actual avg if we have completed cycles, else 28
  const arcTotalDays = completedLens.length > 0 ? avgLen : 28;

  async function handleOnboardSave() {
    setOnboardSaving(true);
    try {
      await api.patch("/auth/me", {
        mode: onboardMode,
        birth_date: onboardBirthDate || null,
      });
    } catch {
      // Best-effort — don't block dismissal on transient API error
    } finally {
      if (typeof window !== "undefined") localStorage.setItem("dp_onboarded", "1");
      setShowOnboarding(false);
      setOnboardSaving(false);
      // Show feedback modal 2 s after onboarding closes (if not already done)
      if (typeof window !== "undefined" && !localStorage.getItem("dp_feedback_done")) {
        setTimeout(() => setShowFeedback(true), 2000);
      }
    }
  }

  async function handleFeedbackSelect(value: string) {
    if (feedbackSending) return;
    setFeedbackSending(true);
    try {
      await api.post("/feedback", { type: "signup_reason", value });
    } catch {
      // Best-effort — don't block dismissal
    } finally {
      if (typeof window !== "undefined") localStorage.setItem("dp_feedback_done", "1");
      setShowFeedback(false);
      setFeedbackSending(false);
    }
  }

  return (
    <div className="w-full max-w-6xl space-y-5 pb-4">
      {/* ── Onboarding modal ─────────────────────────────────────────────── */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-5">
            <div className="text-center space-y-1">
              <p className="text-3xl">🌸</p>
              <h2 className="text-lg font-bold text-[#2D1B1E]">Welcome to Dawn Phase!</h2>
              <p className="text-sm text-[#8C6B5A]">Let&apos;s set up your experience in 30 seconds.</p>
            </div>

            {/* Mode */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
                What mode suits you?
              </p>
              <div className="flex gap-3">
                {(["cycle", "perimenopause"] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setOnboardMode(m)}
                    className={`flex-1 min-h-[44px] rounded-full text-sm font-medium border-2 transition-all ${
                      onboardMode === m
                        ? "bg-[#E8637A] border-[#E8637A] text-white shadow-sm"
                        : "border-gray-200 bg-white text-[#8C6B5A] hover:border-[#E8637A]"
                    }`}
                  >
                    {m === "cycle" ? "Cycle tracking" : "Perimenopause"}
                  </button>
                ))}
              </div>
            </div>

            {/* Birth date */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
                Date of birth{" "}
                <span className="font-normal normal-case text-[#8C6B5A]">
                  (optional — unlocks ✨ Cosmic view)
                </span>
              </p>
              <input
                type="date"
                value={onboardBirthDate}
                onChange={e => setOnboardBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl border-2 border-gray-200 bg-white text-sm text-[#2D1B1E] focus:outline-none focus:border-[#E8637A] transition-colors"
              />
            </div>

            <button
              onClick={handleOnboardSave}
              disabled={onboardSaving}
              className="w-full min-h-[52px] bg-[#E8637A] hover:bg-[#C94B6D] text-white font-semibold text-base rounded-2xl transition-colors disabled:opacity-60 shadow-sm"
            >
              {onboardSaving ? "Saving…" : "Let’s go →"}
            </button>
          </div>
        </div>
      )}

      {/* ── Post-signup feedback modal ───────────────────────────────── */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-5">
            <div className="text-center space-y-1">
              <p className="text-2xl">💬</p>
              <h2 className="text-base font-bold text-[#2D1B1E]">Quick question</h2>
              <p className="text-sm text-[#8C6B5A]">What brought you here today?</p>
            </div>
            <div className="space-y-2">
              {[
                "Privacy concerns with my current app",
                "PCOS or irregular cycles",
                "Perimenopause symptoms",
                "Just curious / trying it out",
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  disabled={feedbackSending}
                  onClick={() => handleFeedbackSelect(option)}
                  className="w-full min-h-[44px] px-4 py-3 text-sm text-left rounded-xl border-2 border-gray-200 bg-white text-[#2D1B1E] hover:border-[#E8637A] hover:bg-[#FFF0F3] transition-all disabled:opacity-60"
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") localStorage.setItem("dp_feedback_done", "1");
                setShowFeedback(false);
              }}
              className="w-full text-xs text-[#8C6B5A] hover:text-[#C94B6D] transition-colors pt-1"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Activation banner */}
      {activating && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <span>✓ Payment received. Finishing setup… this usually takes a few seconds.</span>
          <button onClick={() => window.location.reload()} className="shrink-0 font-medium underline hover:no-underline">
            Refresh
          </button>
        </div>
      )}

      {/* Welcome header — time-of-day greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#C94B6D]">{greeting}</h1>
        <p className="text-[#8C6B5A] text-sm mt-1">Here&apos;s your cycle at a glance.</p>
      </div>

      {/* ── ROW 1: Hero + right cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Hero card — coral left accent, phase-aware radial bg */}
        <Card
          hero
          padding="p-8"
          className="md:col-span-2 min-h-[220px]"
          style={{
            background: heroBackground,
            borderLeft: "3px solid #E8637A",
          }}
        >
          <CardHeading>Your cycle today</CardHeading>

          {phase && cycleDay ? (
            <div className="flex items-start gap-6">
              {/* Left: text content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className={`text-4xl font-bold tracking-tight ${phase.accent}`}>
                    {phase.name}
                  </h2>
                  <p className="text-[#8C6B5A] mt-1 text-sm font-medium">
                    Cycle day {cycleDay}
                    {nextPeriodDate && (
                      <> · Next period around{" "}
                        <span className="text-[#2D1B1E] font-semibold">
                          {nextPeriodDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <p className="text-sm text-[#8C6B5A] leading-relaxed border-l-2 border-[#E8637A]/30 pl-3">
                  {phase.tip}
                </p>

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

              {/* Right: phase arc SVG — hidden on small screens */}
              <div className="hidden sm:flex shrink-0 items-center justify-center">
                <CycleArcSVG
                  cycleDay={Math.min(cycleDay, arcTotalDays)}
                  totalDays={arcTotalDays}
                  phaseColor={phase.dotColor}
                />
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <span className="text-5xl" aria-hidden>🌸</span>
              <div>
                <p className="font-semibold text-[#2D1B1E] text-lg">Start your cycle tracking</p>
                <p className="text-sm text-[#8C6B5A] mt-1">
                  Log your last period to unlock phase predictions, cycle day tracking, and personalised insights.
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

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Upcoming — prominent days-until display */}
          <Card className="flex-1">
            <CardHeading>Upcoming</CardHeading>
            {cycleDay && daysToNextPeriod && nextPeriodDate ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-[#E8637A] leading-none">{daysToNextPeriod}</span>
                  <span className="text-base font-semibold text-[#E8637A]">days</span>
                </div>
                <p className="text-sm text-[#8C6B5A] mt-1">until your next period</p>
                <p className="text-xs text-[#8C6B5A] mt-1 font-medium">
                  {nextPeriodDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </p>
                {nextPhase && nextPhase.label !== "Next period" && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-[#8C6B5A]">
                      <span className="font-medium text-[#2D1B1E]">{nextPhase.label}</span> phase in{" "}
                      <span className="font-medium text-[#2D1B1E]">{nextPhase.days}d</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-[#8C6B5A]">Log a period to see predictions.</p>
            )}
          </Card>

          {/* Quick insight */}
          <Card className="flex-1">
            <CardHeading>Quick insight</CardHeading>
            {quickInsight ? (
              <p className="text-sm text-[#2D1B1E] font-medium leading-relaxed">{quickInsight}</p>
            ) : (
              <p className="text-sm text-[#8C6B5A]">Log your first period to start building insights.</p>
            )}
            {completedLens.length >= 2 && (
              <a href="/insights" className="inline-block mt-3 text-xs text-[#E8637A] font-semibold hover:underline">
                See all insights →
              </a>
            )}
          </Card>
        </div>
      </div>

      {/* ── ROW 2: Recent check-ins + This cycle + Suggestions ─────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Recent check-ins */}
        <Card>
          <CardHeading>Recent check-ins</CardHeading>
          {recentLogs.length === 0 ? (
            <div className="text-center py-4 space-y-2">
              <p className="text-sm text-[#8C6B5A]">No logs yet.</p>
              <a href="/log" className="inline-block text-sm text-[#E8637A] font-semibold hover:underline">
                Start logging today →
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentLogs.map(log => {
                const moodEmoji = parseMood(log.mood);
                return (
                  <li key={log.date} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#2D1B1E]">{formatShortDate(log.date)}</span>
                      <div className="flex items-center gap-3 text-xs text-[#8C6B5A]">
                        {moodEmoji && <span className="text-base leading-none" title="Mood">{moodEmoji}</span>}
                        {log.energy != null && (
                          <span className="flex items-center gap-0.5">
                            <span className="text-[#C94B6D] font-semibold">{log.energy}</span>
                            <span>/5 energy</span>
                          </span>
                        )}
                        {log.sleep_hours != null && <span>{log.sleep_hours}h sleep</span>}
                      </div>
                    </div>
                    {log.notes && (
                      <p className="text-xs italic text-[#8C6B5A] leading-relaxed line-clamp-2">
                        &ldquo;{log.notes}&rdquo;
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {logs.length > 0 && (
            <a href="/log" className="inline-block mt-3 text-xs text-[#E8637A] font-semibold hover:underline">
              Log today →
            </a>
          )}
        </Card>

        {/* This cycle */}
        <Card className="md:col-span-1">
          <CardHeading>This cycle</CardHeading>
          {!latestCycle ? (
            <p className="text-sm text-[#8C6B5A]">No cycle logged yet.</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-[#C94B6D]">{logs.length}</p>
                <p className="text-xs text-[#8C6B5A] leading-tight">
                  days logged<br /><span className="text-[10px] opacity-70">(last 7)</span>
                </p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-[#C94B6D]">
                  {cycleMoodAvg != null ? MOOD_EMOJI[Math.round(cycleMoodAvg)] : "—"}
                </p>
                <p className="text-xs text-[#8C6B5A] leading-tight">avg mood</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-3xl font-bold text-[#C94B6D]">
                  {cycleEnergyAvg != null ? cycleEnergyAvg.toFixed(1) : "—"}
                </p>
                <p className="text-xs text-[#8C6B5A] leading-tight">
                  avg energy<br /><span className="text-[10px] opacity-70">out of 5</span>
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* What to expect this week */}
        {(() => {
          const key = user.mode === "perimenopause"
            ? "Perimenopause"
            : phase?.name ?? null;
          const suggestions = key ? PHASE_SUGGESTIONS[key] : null;
          const badgeStyle  = key ? PHASE_BADGE_STYLE[key] : null;

          return (
            <Card className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <CardHeading>What to expect this week</CardHeading>
                {key && badgeStyle && (
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${badgeStyle}`}>
                    {key}
                  </span>
                )}
              </div>

              {suggestions ? (
                <ul className="space-y-3 flex-1">
                  {suggestions.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm text-[#2D1B1E]">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "#E8637A" }}
                        aria-hidden
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#8C6B5A] flex-1">
                  Log your period to unlock personalised suggestions.
                </p>
              )}

              <p className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-[#8C6B5A]/70 leading-snug">
                Suggestions are educational only and not medical advice.
              </p>
            </Card>
          );
        })()}
      </div>

      {/* ── Cosmic view ───────────────────────────────────────────────────── */}
      {(() => {
        if (!user.birth_date) return null;
        const sign = getZodiacSign(user.birth_date);
        const message = phase
          ? getCosmicMessage(sign, phase.name as CyclePhase)
          : null;
        return (
          <div
            className="rounded-2xl border border-purple-100 p-6 shadow-sm"
            style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest">
                ✨ Cosmic view
              </p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-500 border border-purple-200">
                Just for fun
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-2xl leading-none">{ZODIAC_SYMBOLS[sign]}</span>
              <span className="text-sm font-semibold text-purple-700">{sign}</span>
              {phase && (
                <>
                  <span className="text-purple-300 select-none">·</span>
                  <span className="text-sm text-purple-600">{phase.name} phase</span>
                </>
              )}
            </div>
            {message ? (
              <p className="text-sm text-purple-900 leading-relaxed italic">
                &ldquo;{message}&rdquo;
              </p>
            ) : (
              <p className="text-sm text-purple-600">
                Log your first period to unlock your personalised cosmic insight.
              </p>
            )}
            <p className="mt-4 text-[10px] text-purple-400 leading-snug">
              ★ For entertainment only — not medical or astrological advice.
            </p>
          </div>
        );
      })()}
    </div>
  );
}
