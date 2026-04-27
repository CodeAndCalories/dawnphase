import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { symptoms, PHASE_COLORS, type Phase } from "@/data/symptoms";

export const metadata: Metadata = {
  title: "Cycle Symptoms Library — Track Every Phase | Dawn Phase",
  description:
    "A complete library of cycle and perimenopause symptoms — causes, tracking guides, and when to see a doctor. Organised by phase.",
  openGraph: {
    title: "Cycle Symptoms Library — Track Every Phase | Dawn Phase",
    description:
      "A complete library of cycle and perimenopause symptoms — causes, tracking guides, and when to see a doctor.",
  },
};

const PHASE_ORDER: Phase[] = [
  "Menstrual",
  "Follicular",
  "Ovulatory",
  "Luteal",
  "Perimenopause",
  "All",
];

const PHASE_LABELS: Record<Phase, string> = {
  Menstrual:     "Menstrual phase",
  Follicular:    "Follicular phase",
  Ovulatory:     "Ovulatory phase",
  Luteal:        "Luteal phase",
  Perimenopause: "Perimenopause",
  All:           "All phases",
};

export default function SymptomsIndexPage() {
  const byPhase = PHASE_ORDER.reduce<Record<Phase, typeof symptoms>>(
    (acc, phase) => {
      acc[phase] = symptoms.filter((s) => s.phase === phase);
      return acc;
    },
    {} as Record<Phase, typeof symptoms>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#C94B6D]">
            Cycle Symptoms Library
          </h1>
          <p className="text-[#8C6B5A] mt-2 text-lg">
            Causes, tracking guides, and when to see a doctor — organised by
            phase.
          </p>
          <p className="text-xs text-[#8C6B5A] mt-2">
            All content is for informational purposes only and is not a
            substitute for professional medical advice.
          </p>
        </div>

        <div className="space-y-12">
          {PHASE_ORDER.map((phase) => {
            const phaseSymptoms = byPhase[phase];
            if (!phaseSymptoms.length) return null;
            const colors = PHASE_COLORS[phase];
            return (
              <section key={phase}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {PHASE_LABELS[phase]}
                  </span>
                  <span className="text-sm text-[#8C6B5A]">
                    {phaseSymptoms.length} symptom{phaseSymptoms.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {phaseSymptoms.map((symptom) => (
                    <Link
                      key={symptom.slug}
                      href={`/symptoms/${symptom.slug}`}
                      className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-5 hover:shadow-md transition-shadow group"
                    >
                      <h2 className="text-base font-semibold text-[#2D1B1E] group-hover:text-[#C94B6D] transition-colors leading-snug mb-2">
                        {symptom.name}
                      </h2>
                      <p className="text-xs text-[#8C6B5A] leading-relaxed line-clamp-2">
                        {symptom.description.split(".")[0]}.
                      </p>
                      <span className="inline-block mt-3 text-xs font-semibold text-[#E8637A]">
                        Learn more →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-6 mt-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#8C6B5A]">
          <span>© 2026 Dawn Phase · Your data stays yours.</span>
          <nav className="flex gap-5">
            <Link href="/blog" className="hover:text-[#C94B6D] transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-[#C94B6D] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#C94B6D] transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
