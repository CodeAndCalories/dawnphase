"use client";

import { useState } from "react";
import { WELLNESS_GUIDE } from "@/data/wellness-guide";

type Tab = "nutrition" | "movement" | "supplements" | "selfCare";

const TABS: { key: Tab; label: string }[] = [
  { key: "nutrition",   label: "Nutrition"   },
  { key: "movement",    label: "Movement"    },
  { key: "supplements", label: "Supplements" },
  { key: "selfCare",    label: "Self-care"   },
];

const PHASE_BADGE: Record<string, string> = {
  Menstrual:     "bg-rose-50   text-rose-700   border border-rose-200",
  Follicular:    "bg-violet-50 text-violet-700 border border-violet-200",
  Ovulatory:     "bg-amber-50  text-amber-700  border border-amber-200",
  Luteal:        "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Perimenopause: "bg-purple-50 text-purple-700 border border-purple-200",
};

export default function WellnessGuide({
  phase,
  mode,
}: {
  phase?: string;
  mode: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("nutrition");

  const guideKey =
    mode === "perimenopause" ? "Perimenopause" : phase;

  if (!guideKey || !(guideKey in WELLNESS_GUIDE)) return null;

  const guide = WELLNESS_GUIDE[guideKey as keyof typeof WELLNESS_GUIDE];
  const displayPhase = mode === "perimenopause" ? "Perimenopause" : phase;
  const badgeStyle = displayPhase ? PHASE_BADGE[displayPhase] : undefined;

  return (
    <div
      className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-6"
      style={{ borderLeft: "4px solid #E8637A" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            🌿 Phase wellness guide
          </p>
          {displayPhase && badgeStyle && (
            <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${badgeStyle}`}>
              {displayPhase}
            </span>
          )}
        </div>
        <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF0F3] text-[#C94B6D] border border-[rgba(232,99,122,0.2)] whitespace-nowrap">
          For subscribers
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-100 mb-5 -mx-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
              activeTab === tab.key
                ? "text-[#E8637A]"
                : "text-[#8C6B5A] hover:text-[#2D1B1E]"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                style={{ backgroundColor: "#E8637A" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <ul className="space-y-3">
        {guide[activeTab].map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-[#2D1B1E] leading-relaxed"
          >
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: "#E8637A" }}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Disclaimer */}
      <p className="mt-5 pt-4 border-t border-gray-100 text-[10px] text-[#8C6B5A]/70 leading-snug">
        Suggestions are general wellness information only and not medical advice.
        Discuss supplements with your healthcare provider before starting.
      </p>
    </div>
  );
}
