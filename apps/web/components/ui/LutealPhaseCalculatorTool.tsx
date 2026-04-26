"use client";

import { useState } from "react";
import { addDays, formatDate } from "@/lib/utils";

export default function LutealPhaseCalculatorTool() {
  const [ovulationDate, setOvulationDate] = useState("");
  const [nextPeriodDate, setNextPeriodDate] = useState("");
  const [result, setResult] = useState<{
    lutealStart: Date;
    lutealEnd: Date;
    length: number;
    assessment: string;
  } | null>(null);

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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
          />
        </div>

        <button
          onClick={calculate}
          disabled={!ovulationDate || !nextPeriodDate}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
        >
          Calculate luteal phase
        </button>
      </div>

      {result && (
        <div className="border-t border-gray-100 pt-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Your luteal phase</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-purple-50 border border-purple-100">
              <span className="text-sm font-medium text-purple-700">Luteal phase length</span>
              <span className="text-sm font-bold text-purple-700">{result.length} days</span>
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
          <p className="text-xs text-gray-400 mt-2">
            Track your luteal phase every cycle with{" "}
            <a href="/signup" className="text-purple-600 hover:underline font-medium">
              Dawn Phase →
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
