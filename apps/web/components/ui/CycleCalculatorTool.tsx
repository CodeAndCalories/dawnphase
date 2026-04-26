"use client";

import { useState } from "react";
import { addDays, formatDate } from "@/lib/utils";

export default function CycleCalculatorTool() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    nextPeriod: Date;
    ovulation: Date;
    fertileStart: Date;
    fertileEnd: Date;
  } | null>(null);

  function calculate() {
    const lmpDate = new Date(lmp);
    const length = parseInt(cycleLength, 10);
    const nextPeriod = addDays(lmpDate, length);
    const ovulation = addDays(nextPeriod, -14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    setResult({ nextPeriod, ovulation, fertileStart, fertileEnd });
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
          />
          <p className="mt-1.5 text-xs text-gray-500">Typically 21–35 days</p>
        </div>

        <button
          onClick={calculate}
          disabled={!lmp}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="border-t border-gray-100 pt-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Your estimates</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Next period", value: formatDate(result.nextPeriod), color: "bg-rose-50 border-rose-100 text-rose-700" },
              { label: "Ovulation day", value: formatDate(result.ovulation), color: "bg-amber-50 border-amber-100 text-amber-700" },
              { label: "Fertile window", value: `${formatDate(result.fertileStart)} – ${formatDate(result.fertileEnd)}`, color: "bg-green-50 border-green-100 text-green-700" },
            ].map((r) => (
              <div key={r.label} className={`flex justify-between items-center px-4 py-3 rounded-xl border ${r.color}`}>
                <span className="text-sm font-medium">{r.label}</span>
                <span className="text-sm font-semibold">{r.value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Want to track across cycles?{" "}
            <a href="/signup" className="text-purple-600 hover:underline font-medium">
              Try Dawn Phase free →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
