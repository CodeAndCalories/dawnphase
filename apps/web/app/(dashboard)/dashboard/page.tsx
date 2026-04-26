"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import CycleCalendarWidget from "@/components/dashboard/CycleCalendarWidget";
import PhaseCard from "@/components/dashboard/PhaseCard";
import QuickLogButton from "@/components/dashboard/QuickLogButton";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

interface User {
  id: string;
  email: string;
  mode: string;
  subscription_status: string;
  trial_ends_at: string | null;
  created_at: string;
}

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("dp_token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([
      api.get<{ user: User }>("/auth/me"),
      api.get<{ cycles: Cycle[] }>("/cycles"),
      api.get<{ logs: DailyLog[] }>("/logs?limit=7"),
    ])
      .then(([meRes, cyclesRes, logsRes]) => {
        setUser(meRes.user);
        setCycles(cyclesRes.cycles);
        setLogs(logsRes.logs);
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your cycle</h1>
          <p className="text-gray-500 text-sm mt-1">
            {cycleDay
              ? <>Today is cycle day <strong>{cycleDay}</strong></>
              : "No cycle recorded yet — start logging to track your cycle"}
          </p>
        </div>
        <QuickLogButton />
      </div>

      {/* User status strip */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
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
          <div className="rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-gray-500 mb-3">No cycle data yet</p>
            <a
              href="/log"
              className="text-sm font-medium text-purple-600 hover:underline"
            >
              Log your first day →
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
                    className={`w-8 h-8 rounded-full ${
                      hasLog
                        ? "bg-purple-500"
                        : "bg-gray-100"
                    }`}
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
