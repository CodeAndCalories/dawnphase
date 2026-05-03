"use client";

import { useState } from "react";
import { addDays, formatDate } from "@/lib/utils";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? "";

export default function LutealPhaseCalculatorTool() {
  const [ovulationDate, setOvulationDate] = useState("");
  const [nextPeriodDate, setNextPeriodDate] = useState("");
  const [result, setResult] = useState<{
    lutealStart: Date;
    lutealEnd: Date;
    length: number;
    assessment: string;
  } | null>(null);

  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "exists">("idle");

  function calculate() {
    const ovulation = new Date(ovulationDate);
    const nextPeriod = new Date(nextPeriodDate);
    const length = Math.round(
      (nextPeriod.getTime() - ovulation.getTime()) / (1000 * 60 * 60 * 24)
    );
    const lutealStart = addDays(ovulation, 1);
    const lutealEnd = addDays(nextPeriod, -1);

    let assessment = "";
    if (length < 10) assessment = "Short (possible luteal phase defect — consider speaking to a doctor)";
    else if (length <= 16) assessment = "Normal range";
    else assessment = "Long (may indicate hormonal imbalance — consult a provider if concerned)";

    setResult({ lutealStart, lutealEnd, length, assessment });
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
          source: "luteal-calculator",
          results: {
            "Luteal phase length": `${result.length} days`,
            "Starts": formatDate(result.lutealStart),
            "Ends": formatDate(result.lutealEnd),
            "Assessment": result.assessment,
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
            Ovulation date (or estimated)
          </label>
          <input
            type="date"
            value={ovulationDate}
            onChange={(e) => setOvulationDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94f68]/30 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First day of next period
          </label>
          <input
            type="date"
            value={nextPeriodDate}
            onChange={(e) => setNextPeriodDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c94f68]/30 text-sm"
          />
        </div>

        <button
          onClick={calculate}
          disabled={!ovulationDate || !nextPeriodDate}
          className="w-full py-3 bg-gradient-to-r from-[#c94f68] to-[#e06e40] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
        >
          Calculate luteal phase
        </button>
      </div>

      {result && (
        <>
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Your luteal phase</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#ede8f7] border border-[rgba(130,80,170,0.2)]">
                <span className="text-sm font-medium text-[#5a3575]">Luteal phase length</span>
                <span className="text-sm font-bold text-[#5a3575]">{result.length} days</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">Starts</span>
                <span className="text-sm font-semibold text-gray-700">{formatDate(result.lutealStart)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">Ends</span>
                <span className="text-sm font-semibold text-gray-700">{formatDate(result.lutealEnd)}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-sm text-blue-700"><strong>Assessment:</strong> {result.assessment}</p>
              </div>
            </div>
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
