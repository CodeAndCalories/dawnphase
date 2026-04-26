"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription } from "@/lib/auth";
import { api } from "@/lib/api";
import CycleCalendarWidget from "@/components/dashboard/CycleCalendarWidget";
import PhaseCard from "@/components/dashboard/PhaseCard";
import QuickLogButton from "@/components/dashboard/QuickLogButton";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

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
}

function getPhaseInfo(day: number) {
  if (day >= 1 && day <= 5)
    return {
      name: "Menstrual",
      color: "bg-rose-50 border-rose-200",
      badge: "bg-rose-100 text-rose-800",
      description:
        "Rest and restoration. Your body is shedding the uterine lining. Prioritize gentle movement and self-care.",
    };
  if (day >= 6 && day <= 13)
    return {
      name: "Follicular",
      color: "bg-purple-50 border-purple-200",
      badge: "bg-purple-100 text-purple-800",
      description:
        "Rising energy and creativity. Estrogen is climbing. Great time to start new projects and socialize.",
    };
  if (day === 14)
    return {
      name: "Ovulatory",
      color: "bg-amber-50 border-amber-200",
      badge: "bg-amber-100 text-amber-800",
      description:
        "Peak energy and confidence. Great time for big conversations and creative work.",
    };
  return {
    name: "Luteal",
    color: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-800",
    description:
      "Wind-down phase. Progesterone rises. Focus on calming activities and nourishing foods.",
  };
}

function formatTrialEnd(trialEndsAt: string): string {
  const end = new Date(trialEndsAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays <= 0) return "Trial ended";
  if (diffDays === 1) return "Trial ends tomorrow";
  return `Trial ends in ${diffDays} days`;
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export default function DashboardPage() {
  // ── Auth + subscription gate ────────────────────────────────────────────────
  const { user, loading: authLoading, redirecting, activating, statusMessage } = useRequireSubscription();

  // ── Page data ───────────────────────────────────────────────────────────────
  const [cycles,      setCycles]      = useState<Cycle[]>([]);
  const [logs,        setLogs]        = useState<DailyLog[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [billingLoading, setBillingLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get<{ cycles: Cycle[] }>("/cycles"),
      api.get<{ logs: DailyLog[] }>("/logs?limit=7"),
    ])
      .then(([cyclesRes, logsRes]) => {
        setCycles(cyclesRes.cycles);
        setLogs(logsRes.logs);
      })
      .finally(() => setDataLoading(false));
  }, [user]);

  // ── Combined loading state ──────────────────────────────────────────────────
  const loading = authLoading || dataLoading;

  async function handleBillingPortal() {
    setBillingLoading(true);
    try {
      const res = await api.post<{ url: string }>("/stripe/portal", {});
      window.location.href = res.url;
    } catch {
      window.location.href =
        "https://billing.stripe.com/p/login/eVq8wR3AQ3Aeejr5zEcs800";
    } finally {
      setBillingLoading(false);
    }
  }

  // ── Loading / redirect screens ──────────────────────────────────────────────
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

  // ── Derived display values ──────────────────────────────────────────────────
  const latestCycle = cycles[0] ?? null;
  const cycleDay = latestCycle
    ? Math.max(
        1,
        Math.ceil(
          (new Date().setHours(0, 0, 0, 0) -
            new Date(latestCycle.start_date).setHours(0, 0, 0, 0)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      )
    : null;

  const phase = cycleDay ? getPhaseInfo(cycleDay) : null;
  const logDates = new Set(logs.map((l) => l.date));
  const last7 = getLast7Days();

  const subStatus = user.subscription_status;
  const subBadge =
    subStatus === "active"
      ? "bg-green-100 text-green-800"
      : subStatus === "trialing"
        ? "bg-blue-100 text-blue-800"
        : "bg-red-100 text-red-800";

  return (
    <div className="space-y-6">
      {/* Activation banner — shown when webhook hasn't fired within 10 s */}
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your cycle</h1>
          <p className="text-gray-500 text-sm mt-1">
            {cycleDay
              ? <><span>Today is cycle day </span><strong>{cycleDay}</strong></>
              : "No cycle recorded yet — start logging to track your cycle"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/cycles/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E8637A] text-white text-sm font-medium rounded-full hover:bg-[#C94B6D] transition-colors"
          >
            <span aria-hidden>🩸</span>
            Log period
          </a>
          <QuickLogButton />
        </div>
      </div>

      {/* User status strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-500">{user.email}</span>
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium capitalize">
            {user.mode === "perimenopause" ? "Perimenopause mode" : "Cycle tracking"}
          </span>
          <span className={`px-2 py-0.5 rounded-full font-medium ${subBadge}`}>
            {subStatus === "trialing" && user.trial_ends_at
              ? formatTrialEnd(user.trial_ends_at)
              : subStatus === "active"
                ? "Active subscription"
                : subStatus === "canceled"
                  ? "Subscription canceled"
                  : "Payment past due"}
          </span>
        </div>
        <button
          onClick={handleBillingPortal}
          disabled={billingLoading}
          className="inline-flex items-center gap-1 text-gray-400 hover:text-[#E8637A] transition-colors disabled:opacity-50"
        >
          {billingLoading ? "Opening…" : "Manage billing"}
          {!billingLoading && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Phase grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {phase && cycleDay ? (
          <PhaseCard
            phase={phase.name}
            day={cycleDay}
            description={phase.description}
            color={phase.color}
            badge={phase.badge}
          />
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-[#E8637A]/30 bg-[#FDF6F0] p-6 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-3xl" aria-hidden>🩸</span>
            <p className="text-sm font-medium text-[#2D1B1E]">
              Start by logging your last period
            </p>
            <a
              href="/cycles/new"
              className="inline-flex items-center gap-1 px-4 py-2 bg-[#E8637A] text-white text-sm font-semibold rounded-full hover:bg-[#C94B6D] transition-colors"
            >
              Log period start →
            </a>
          </div>
        )}
        <UpcomingEvents cycleDay={cycleDay} />
        <CycleCalendarWidget cycleDay={cycleDay} />
      </div>

      {/* Recent 7-day log strip */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Last 7 days</h3>
          <a href="/log" className="text-xs text-purple-600 hover:underline font-medium">
            Log today →
          </a>
        </div>
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500">
            No logs yet.{" "}
            <a href="/log" className="text-purple-600 hover:underline font-medium">
              Start logging today →
            </a>
          </p>
        ) : (
          <div className="flex gap-2">
            {last7.map((date) => {
              const hasLog = logDates.has(date);
              const label = new Date(date + "T00:00:00").toLocaleDateString(
                "en-US",
                { weekday: "short", month: "short", day: "numeric" }
              );
              return (
                <div key={date} className="flex flex-col items-center gap-1">
                  <div
                    title={label}
                    className={`w-8 h-8 rounded-full ${hasLog ? "bg-purple-500" : "bg-gray-100"}`}
                  />
                  <span className="text-[10px] text-gray-400">
                    {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
