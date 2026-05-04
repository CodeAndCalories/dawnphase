"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription } from "@/lib/auth";
import { api } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ReportData {
  user: {
    email: string;
    mode: string;
    created_at: string;
  };
  period: { from: string; to: string };
  cycles: {
    total: number;
    completed: number;
    avgLength: number | null;
    shortestLength: number | null;
    longestLength: number | null;
    irregular: { start_date: string; cycle_length: number }[];
  };
  topSymptoms: {
    symptom: string;
    count: number;
    dominantPhase: string | null;
  }[];
  phaseAverages: {
    phase: string;
    avgMood: number | null;
    avgEnergy: number | null;
    avgSleep: number | null;
  }[];
  logCount: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function moodLabel(score: number): string {
  if (score < 2) return "😢 Low";
  if (score < 3) return "😟 Below average";
  if (score < 4) return "😐 Moderate";
  if (score < 4.5) return "🙂 Good";
  return "😊 High";
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ReportPage() {
  const { user: authUser, loading: authLoading, statusMessage } =
    useRequireSubscription();

  const [report,   setReport]   = useState<ReportData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    if (!authUser) return;
    api.get<ReportData>("/export/report")
      .then(setReport)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load report"))
      .finally(() => setFetching(false));
  }, [authUser]);

  const loading = authLoading || fetching;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
        <p className="text-sm text-[#3d2855]">{statusMessage ?? "Loading your report…"}</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-3">
        <p className="text-[#C94B6D] font-semibold">Could not load report</p>
        <p className="text-sm text-[#3d2855]">{error ?? "Unknown error"}</p>
      </div>
    );
  }

  const { cycles, topSymptoms, phaseAverages } = report;
  const generatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* Print CSS — hides sidebar, resets layout offsets */}
      <style>{`
        @media print {
          aside, .no-print { display: none !important; }
          main { padding-left: 0 !important; padding-bottom: 0 !important; }
          body { background: white !important; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto py-8 space-y-8 text-[#1E0F30]">

        {/* Print button */}
        <div className="no-print flex items-center justify-between mb-2">
          <p className="text-sm text-[#3d2855]">
            Use your browser&apos;s print dialog to save as PDF.
          </p>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
          >
            Print / Save as PDF
          </button>
        </div>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#E6D7F3] p-8 shadow-sm"
             style={{ borderLeft: "4px solid #E8637A" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-[#C94B6D]">Dawn Phase</h1>
              <p className="text-lg font-semibold text-[#1E0F30] mt-0.5">
                Cycle &amp; Symptom Report
              </p>
            </div>
            <div className="text-right text-sm text-[#3d2855] space-y-0.5">
              <p><span className="font-medium text-[#1E0F30]">Patient:</span> {report.user.email}</p>
              <p>
                <span className="font-medium text-[#1E0F30]">Mode:</span>{" "}
                {report.user.mode === "perimenopause" ? "Perimenopause tracking" : "Cycle tracking"}
              </p>
              <p><span className="font-medium text-[#1E0F30]">Period:</span> {fmtDate(report.period.from)} – {fmtDate(report.period.to)}</p>
              <p><span className="font-medium text-[#1E0F30]">Generated:</span> {generatedDate}</p>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: Cycle Summary ──────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-[#E6D7F3] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#C94B6D] border-b border-gray-100 pb-2">
            1. Cycle Summary
          </h2>

          {cycles.total === 0 ? (
            <p className="text-sm text-[#3d2855]">No cycles logged in the last 90 days.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Cycles tracked", value: cycles.total.toString() },
                  { label: "Completed cycles", value: cycles.completed.toString() },
                  { label: "Avg cycle length", value: cycles.avgLength ? `${cycles.avgLength} days` : "—" },
                  { label: "Range", value: (cycles.shortestLength && cycles.longestLength)
                    ? `${cycles.shortestLength}–${cycles.longestLength} days` : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F3ECFA] rounded-xl p-3 text-center">
                    <p className="text-xs text-[#3d2855]">{label}</p>
                    <p className="text-xl font-bold text-[#C94B6D] mt-1">{value}</p>
                  </div>
                ))}
              </div>

              {cycles.irregular.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1.5">
                  <p className="text-sm font-semibold text-amber-800">
                    ⚠ Flagged irregular cycles ({cycles.irregular.length})
                  </p>
                  <p className="text-xs text-amber-700">
                    Cycles outside the typical 21–35 day range:
                  </p>
                  <ul className="text-xs text-amber-700 space-y-0.5 pl-2">
                    {cycles.irregular.map((c) => (
                      <li key={c.start_date}>
                        Started {fmtDate(c.start_date)} — {c.cycle_length} days
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        {/* ── SECTION 2: Symptom Patterns ──────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-[#E6D7F3] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#C94B6D] border-b border-gray-100 pb-2">
            2. Symptom Patterns
          </h2>

          {topSymptoms.length === 0 ? (
            <p className="text-sm text-[#3d2855]">No symptoms logged in the last 90 days.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F3ECFA]">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-[#C94B6D] rounded-tl-lg">Symptom</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-[#C94B6D]">Days logged</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-[#C94B6D] rounded-tr-lg">Most common phase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topSymptoms.map(({ symptom, count, dominantPhase }) => (
                  <tr key={symptom} className="bg-white">
                    <td className="px-3 py-2.5 font-medium">{symptom}</td>
                    <td className="px-3 py-2.5 text-center text-[#3d2855]">{count}</td>
                    <td className="px-3 py-2.5 text-center">
                      {dominantPhase ? (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E6D7F3] text-[#1E0F30]">
                          {dominantPhase}
                        </span>
                      ) : <span className="text-[#3d2855]">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* ── SECTION 3: Daily Averages by Phase ───────────────────────── */}
        <section className="bg-white rounded-2xl border border-[#E6D7F3] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#C94B6D] border-b border-gray-100 pb-2">
            3. Daily Averages by Phase
          </h2>
          <p className="text-xs text-[#3d2855]">
            Based on {report.logCount} daily log{report.logCount !== 1 ? "s" : ""} over the 90-day period.
          </p>

          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F3ECFA]">
                <th className="text-left px-3 py-2 text-xs font-semibold text-[#C94B6D]">Phase</th>
                <th className="text-center px-3 py-2 text-xs font-semibold text-[#C94B6D]">Avg mood</th>
                <th className="text-center px-3 py-2 text-xs font-semibold text-[#C94B6D]">Avg energy (1–5)</th>
                <th className="text-center px-3 py-2 text-xs font-semibold text-[#C94B6D]">Avg sleep (hrs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {phaseAverages.map(({ phase, avgMood, avgEnergy, avgSleep }) => (
                <tr key={phase} className="bg-white">
                  <td className="px-3 py-2.5 font-medium">{phase}</td>
                  <td className="px-3 py-2.5 text-center text-[#3d2855]">
                    {avgMood != null ? moodLabel(avgMood) : "—"}
                  </td>
                  <td className="px-3 py-2.5 text-center text-[#3d2855]">
                    {avgEnergy != null ? avgEnergy : "—"}
                  </td>
                  <td className="px-3 py-2.5 text-center text-[#3d2855]">
                    {avgSleep != null ? `${avgSleep}h` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── SECTION 4: Notes for your doctor ─────────────────────────── */}
        <section className="bg-white rounded-2xl border border-[#E6D7F3] p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-[#C94B6D] border-b border-gray-100 pb-2">
            4. Notes for your doctor
          </h2>

          <ul className="space-y-2 text-sm">
            {cycles.irregular.length > 0 && (
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                <span>
                  <strong>{cycles.irregular.length} irregular cycle{cycles.irregular.length > 1 ? "s" : ""}</strong>{" "}
                  detected (outside 21–35 day range) — worth discussing with your provider.
                </span>
              </li>
            )}

            {topSymptoms[0] && (
              <li className="flex items-start gap-2">
                <span className="text-[#E8637A] mt-0.5 shrink-0">●</span>
                <span>
                  Most frequent symptom: <strong>{topSymptoms[0].symptom}</strong>{" "}
                  ({topSymptoms[0].count} days){topSymptoms[0].dominantPhase
                    ? `, most common in the ${topSymptoms[0].dominantPhase} phase`
                    : ""}.
                </span>
              </li>
            )}

            {cycles.avgLength && (cycles.avgLength < 21 || cycles.avgLength > 35) && (
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                <span>
                  Average cycle length of <strong>{cycles.avgLength} days</strong> is outside the typical range.
                </span>
              </li>
            )}

            {topSymptoms.length === 0 && cycles.total === 0 && (
              <li className="text-[#3d2855]">Not enough data logged in the last 90 days to generate notes.</li>
            )}
          </ul>

          <p className="text-xs text-[#3d2855] pt-2 border-t border-gray-100">
            Data from Dawn Phase — dawnphase.com
          </p>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="text-xs text-[#3d2855] text-center leading-relaxed border-t border-gray-100 pt-6">
          <p className="font-medium text-[#1E0F30] mb-1">Medical disclaimer</p>
          <p>
            This report summarizes self-reported tracking data and is not a medical diagnosis.
            It is intended as a support tool for conversations with a qualified healthcare provider
            and should not replace professional medical advice, diagnosis, or treatment.
          </p>
          <p className="mt-1">Generated by Dawn Phase · dawnphase.com</p>
        </footer>
      </div>
    </>
  );
}
