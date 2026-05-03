"use client";

import { useState } from "react";
import { addDays, formatDate, differenceInDays } from "@/lib/utils";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? "";

export default function OvulationCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    ovulation: Date;
    fertileStart: Date;
    fertileEnd: Date;
    nextPeriod: Date;
    cycleDay: number | null;
  } | null>(null);

  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "exists">("idle");

  function calculate() {
    const lmpDate = new Date(lmp);
    const length = parseInt(cycleLength, 10);
    const nextPeriod = addDays(lmpDate, length);
    const ovulation = addDays(lmpDate, length - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);

    const today = new Date();
    const rawCycleDay = differenceInDays(today, lmpDate) + 1;
    const cycleDay = rawCycleDay >= 1 && rawCycleDay <= length ? rawCycleDay : null;

    setResult({ ovulation, fertileStart, fertileEnd, nextPeriod, cycleDay });
    setLeadStatus("idle");
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setLeadStatus("loading");
    try {
      const res = await fetch(`${WORKER_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "ovulation-calculator",
          results: {
            "Fertile window": `${formatDate(result.fertileStart)} – ${formatDate(result.fertileEnd)}`,
            "Peak ovulation": formatDate(result.ovulation),
            "Next period": formatDate(result.nextPeriod),
            ...(result.cycleDay ? { "Current cycle day": `Day ${result.cycleDay}` } : {}),
          },
        }),
      });
      if (res.ok) {
        const data = await res.json() as { ok: boolean; hasAccount?: boolean };
        setLeadStatus(data.hasAccount ? "exists" : "success");
      } else {
        setLeadStatus("idle");
      }
    } catch {
      setLeadStatus("idle");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="space-y-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First day of last period
          </label>
          <input
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94f68]/30 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average cycle length (days)
          </label>
          <input
            type="number"
            min={21}
            max={45}
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94f68]/30 text-sm"
          />
          <p className="mt-1.5 text-xs text-gray-500">Typically 21–35 days</p>
        </div>
        <button
          onClick={calculate}
          disabled={!lmp}
          className="w-full py-3 bg-gradient-to-r from-[#c94f68] to-[#e06e40] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
        >
          Calculate fertile window
        </button>
      </div>

      {result && (
        <>
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Your estimates</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  label: "Fertile window",
                  value: `${formatDate(result.fertileStart)} – ${formatDate(result.fertileEnd)}`,
                  color: "bg-green-50 border-green-100 text-green-700",
                },
                {
                  label: "Peak ovulation",
                  value: formatDate(result.ovulation),
                  color: "bg-amber-50 border-amber-100 text-amber-700",
                },
                {
                  label: "Next period",
                  value: formatDate(result.nextPeriod),
                  color: "bg-rose-50 border-rose-100 text-rose-700",
                },
                ...(result.cycleDay
                  ? [
                      {
                        label: "Current cycle day",
                        value: `Day ${result.cycleDay}`,
                        color: "bg-purple-50 border-purple-100 text-purple-700",
                      },
                    ]
                  : []),
              ].map((r) => (
                <div
                  key={r.label}
                  className={`flex justify-between items-center px-4 py-3 rounded-xl border ${r.color}`}
                >
                  <span className="text-sm font-medium">{r.label}</span>
                  <span className="text-sm font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              These are estimates only. Do not use for contraception. See disclaimer below.
            </p>
          </div>

          {/* Email capture */}
          <div className="mt-6 p-5 rounded-xl bg-[#ede8f7] border border-[rgba(130,80,170,0.3)]">
            {leadStatus === "success" ? (
              <p className="text-sm font-semibold text-[#5a3575]">✓ Check your inbox!</p>
            ) : leadStatus === "exists" ? (
              <p className="text-sm text-[#3d2855]">
                You already have an account —{" "}
                <a href="/login" className="text-[#5a3575] font-semibold hover:underline">
                  log in to track your cycle →
                </a>
              </p>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <p className="font-semibold text-[#140c18] text-sm mb-1">Save your results</p>
                  <p className="text-xs text-[#3d2855]">
                    Get cycle insights and track changes over time. Free for 7 days.
                  </p>
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(130,80,170,0.3)] focus:outline-none focus:ring-2 focus:ring-[#c94f68]/30 text-sm bg-white"
                />
                <button
                  type="submit"
                  disabled={leadStatus === "loading"}
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-[#c94f68] to-[#7a2daa] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {leadStatus === "loading" ? "Sending…" : "Send me my results"}
                </button>
                <p className="text-xs text-[#3d2855] text-center">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
