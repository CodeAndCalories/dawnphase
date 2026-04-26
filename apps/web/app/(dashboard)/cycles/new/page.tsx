"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface Cycle {
  id: string;
  start_date: string;
}

type FlowValue = "light" | "medium" | "heavy";

const FLOW_OPTIONS: { value: FlowValue; label: string }[] = [
  { value: "light",  label: "Light"  },
  { value: "medium", label: "Medium" },
  { value: "heavy",  label: "Heavy"  },
];

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function hasRecentCycle(cycles: Cycle[]): boolean {
  const cutoff = addDays(new Date(), -7).setHours(0, 0, 0, 0);
  return cycles.some(c => new Date(c.start_date + "T00:00:00").getTime() >= cutoff);
}

export default function NewCyclePage() {
  const router = useRouter();

  const today     = toISODate(new Date());
  const minDate   = toISODate(addDays(new Date(), -7));

  // state
  const [loading,     setLoading]     = useState(true);
  const [startDate,   setStartDate]   = useState(today);
  const [flow,        setFlow]        = useState<FlowValue>("medium");
  const [irregular,   setIrregular]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  // ── auth + preflight ──────────────────────────────────────────────────────
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("dp_token") : null;
    if (!token) { router.push("/login"); return; }

    api.get<{ cycles: Cycle[] }>("/cycles")
      .then(() => setLoading(false))
      .catch(() => router.push("/login"));
  }, [router]);

  // We fetch cycles inside submit so the check is always fresh.
  async function attemptSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const { cycles } = await api.get<{ cycles: Cycle[] }>("/cycles");
      if (hasRecentCycle(cycles)) {
        setShowWarning(true);
        setSubmitting(false);
        return;
      }
      await doPost();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  async function doPost() {
    setSubmitting(true);
    setError(null);
    try {
      // Backend only validates start_date; flow_intensity + is_irregular
      // are stripped by Zod but kept here for future schema expansion.
      await api.post("/cycles", {
        start_date:    startDate,
        flow_intensity: flow,
        is_irregular:  irregular,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    attemptSubmit();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-12">
      {/* ── Duplicate-period warning modal ───────────────────────────────── */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <h2 className="text-base font-semibold text-[#2D1B1E]">
              Already logged recently
            </h2>
            <p className="text-sm text-[#8C6B5A] leading-relaxed">
              You already logged a period within the last 7 days. Are you sure
              you want to add another?
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setShowWarning(false); setSubmitting(false); }}
                className="flex-1 min-h-[44px] rounded-xl border-2 border-gray-200 text-sm font-medium text-[#8C6B5A] hover:border-[#E8637A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowWarning(false); doPost(); }}
                disabled={submitting}
                className="flex-1 min-h-[44px] rounded-xl bg-[#E8637A] text-white text-sm font-semibold hover:bg-[#C94B6D] transition-colors disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#C94B6D]">
          When did your period start?
        </h1>
        <p className="text-sm text-[#8C6B5A] mt-1">
          This helps Dawn Phase estimate your cycle day and phase.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Date ─────────────────────────────────────────────────────── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-3">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Start date
          </h2>
          <input
            type="date"
            value={startDate}
            min={minDate}
            max={today}
            onChange={e => setStartDate(e.target.value)}
            required
            className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm text-[#2D1B1E] focus:outline-none focus:border-[#E8637A] transition-colors"
          />
          <p className="text-xs text-[#8C6B5A]">
            You can enter today or any date up to 7 days ago.
          </p>
        </section>

        {/* ── Flow intensity ────────────────────────────────────────────── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Flow intensity
          </h2>
          <div className="flex gap-3">
            {FLOW_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFlow(opt.value)}
                className={`flex-1 min-h-[44px] rounded-full font-medium text-sm border-2 transition-all ${
                  flow === opt.value
                    ? "bg-[#E8637A] border-[#E8637A] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#8C6B5A] hover:border-[#E8637A]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Irregular toggle ──────────────────────────────────────────── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={irregular}
              onChange={e => setIrregular(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 accent-[#E8637A] cursor-pointer"
            />
            <span className="text-sm text-[#2D1B1E] font-medium">
              My cycle is irregular
            </span>
          </label>
        </section>

        {error && (
          <p className="text-sm text-red-600 px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full min-h-[52px] bg-[#E8637A] hover:bg-[#C94B6D] text-white font-semibold text-base rounded-2xl transition-colors disabled:opacity-60 shadow-sm"
        >
          {submitting ? "Saving…" : "Log period start"}
        </button>
      </form>
    </div>
  );
}
