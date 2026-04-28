"use client";

import { useState } from "react";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? "";

const QUESTIONS = [
  { id: "mood",       label: "Mood swings or irritability" },
  { id: "anxiety",    label: "Anxiety or inner tension" },
  { id: "sadness",    label: "Depressed mood or hopelessness" },
  { id: "control",    label: "Feeling overwhelmed or out of control" },
  { id: "focus",      label: "Difficulty concentrating or brain fog" },
  { id: "fatigue",    label: "Fatigue or low energy" },
  { id: "bloating",   label: "Bloating or physical discomfort" },
  { id: "breasts",    label: "Breast tenderness" },
  { id: "sleep",      label: "Sleep problems (too much or too little)" },
  { id: "cravings",   label: "Food cravings or appetite changes" },
] as const;

type QuestionId = (typeof QUESTIONS)[number]["id"];
type Scores = Partial<Record<QuestionId, number>>;

function getSeverity(total: number): {
  label: string;
  colour: string;
  explanation: string;
  pmddFlag: boolean;
} {
  if (total <= 20)
    return {
      label: "Mild PMS",
      colour: "text-green-700 bg-green-50 border-green-200",
      explanation:
        "Your score suggests mild premenstrual symptoms that are common and manageable for most people. Tracking them across a few cycles helps you spot patterns.",
      pmddFlag: false,
    };
  if (total <= 33)
    return {
      label: "Moderate PMS",
      colour: "text-amber-700 bg-amber-50 border-amber-200",
      explanation:
        "Your score suggests moderate PMS. Symptoms at this level can be disruptive. Tracking across 2+ cycles and discussing patterns with your doctor is a useful next step.",
      pmddFlag: false,
    };
  if (total <= 42)
    return {
      label: "Severe PMS",
      colour: "text-orange-700 bg-orange-50 border-orange-200",
      explanation:
        "Your score suggests severe premenstrual symptoms. At this level, symptoms may significantly affect daily life. Prospective tracking (recording symptoms day by day across cycles) is important — it's the main evidence doctors use.",
      pmddFlag: true,
    };
  return {
    label: "Very Severe",
    colour: "text-red-700 bg-red-50 border-red-200",
    explanation:
      "Your score is in the very severe range. Symptoms this disruptive deserve professional attention. Tracking across 2+ cycles and presenting that data to a doctor or mental health professional is strongly recommended.",
    pmddFlag: true,
  };
}

export default function PmsTrackerTool() {
  const [scores, setScores] = useState<Scores>({});
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "exists">("idle");

  const allAnswered = QUESTIONS.every((q) => scores[q.id] !== undefined);
  const total = allAnswered
    ? QUESTIONS.reduce((sum, q) => sum + (scores[q.id] ?? 0), 0)
    : 0;

  const severity = submitted ? getSeverity(total) : null;

  function handleScore(id: QuestionId, value: number) {
    setScores((prev) => ({ ...prev, [id]: value }));
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!severity) return;
    setLeadStatus("loading");
    try {
      const res = await fetch(`${WORKER_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "pms-tracker",
          results: {
            "PMS severity": severity.label,
            "Score": `${total} / 50`,
            ...(severity.pmddFlag
              ? { "Note": "Your score suggests tracking across 2+ cycles and speaking to a doctor." }
              : {}),
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
      {!submitted ? (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Rate each symptom based on how severely it affects you in the{" "}
            <strong>week before your period</strong>:
            <span className="ml-2 text-xs text-gray-400">1 = not at all · 5 = severely</span>
          </p>

          <div className="space-y-6">
            {QUESTIONS.map((q, i) => (
              <div key={q.id}>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {i + 1}. {q.label}
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleScore(q.id, v)}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                        scores[q.id] === v
                          ? "bg-gradient-to-r from-[#E8637A] to-[#A855C8] text-white border-transparent shadow-sm"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:border-[#E8637A]/40 hover:text-[#C94B6D]"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="mt-8 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
          >
            See my PMS score
          </button>
          {!allAnswered && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Answer all {QUESTIONS.length} questions to get your result
            </p>
          )}
        </>
      ) : (
        severity && (
          <>
            <div className={`rounded-xl border px-5 py-4 mb-6 ${severity.colour}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">{severity.label}</span>
                <span className="text-sm font-semibold opacity-80">{total} / 50</span>
              </div>
              <p className="text-sm leading-relaxed">{severity.explanation}</p>
            </div>

            {severity.pmddFlag && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-700 leading-relaxed">
                  Your score suggests severe premenstrual symptoms. This is not a
                  PMDD diagnosis — only a qualified healthcare professional can
                  diagnose PMDD. Consider speaking to your doctor and tracking your
                  symptoms across 2+ cycles.
                </p>
              </div>
            )}

            <button
              onClick={() => { setSubmitted(false); setScores({}); setLeadStatus("idle"); }}
              className="text-sm text-[#E8637A] hover:underline mb-6 inline-block"
            >
              ← Retake the quiz
            </button>

            {/* Email capture */}
            <div className="p-5 rounded-xl bg-[#FFF9F6] border border-[rgba(232,99,122,0.3)]">
              {leadStatus === "success" ? (
                <p className="text-sm font-semibold text-[#C94B6D]">✓ Check your inbox!</p>
              ) : leadStatus === "exists" ? (
                <p className="text-sm text-[#8C6B5A]">
                  You already have an account —{" "}
                  <a href="/login" className="text-[#C94B6D] font-semibold hover:underline">
                    log in to track your cycle →
                  </a>
                </p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <p className="font-semibold text-[#2D1B1E] text-sm mb-1">Save your results</p>
                    <p className="text-xs text-[#8C6B5A]">
                      Track PMS symptoms across cycles to build the evidence your doctor needs. Free for 7 days.
                    </p>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[rgba(232,99,122,0.3)] focus:outline-none focus:ring-2 focus:ring-[#E8637A]/30 text-sm bg-white"
                  />
                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="w-full py-3 rounded-xl bg-gradient-to-br from-[#E8637A] to-[#A855C8] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {leadStatus === "loading" ? "Sending…" : "Send me my results"}
                  </button>
                  <p className="text-xs text-[#8C6B5A] text-center">No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
}
