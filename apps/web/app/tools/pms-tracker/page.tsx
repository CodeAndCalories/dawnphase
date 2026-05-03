import type { Metadata } from "next";
import PmsTrackerTool from "@/components/ui/PmsTrackerTool";

export const metadata: Metadata = {
  title: "PMS Symptom Checker — How Severe Is Your PMS?",
  description:
    "Rate 10 premenstrual symptoms on a 1–5 scale and get a PMS severity score with guidance on next steps. Not a diagnostic tool.",
  keywords: ["pms symptom checker", "pms severity test", "do i have pms quiz"],
  openGraph: {
    title: "PMS Symptom Checker — How Severe Is Your PMS?",
    description:
      "Rate your premenstrual symptoms and get a severity score. Free, takes 2 minutes, not a diagnostic tool.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PMS%20Symptom%20Checker&subtitle=How%20severe%20is%20your%20PMS%3F%20%E2%80%94%20Dawn%20Phase",
      width: 1200,
      height: 630,
    }],
  },
};

export default function PmsTrackerPage() {
  return (
    <main className="min-h-screen dawn-gradient py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <a href="/" className="inline-block mb-8">
            <span className="text-xl font-bold bg-gradient-to-r from-[#c94f68] to-[#e06e40] bg-clip-text text-transparent">
              Dawn Phase
            </span>
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PMS Symptom Checker
          </h1>
          <p className="text-lg text-gray-600">
            Rate your premenstrual symptoms on a scale of 1–5 and find out
            whether your PMS is mild, moderate, or severe.
          </p>
        </div>

        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800 font-medium mb-1">
            Important: this is not a diagnostic tool
          </p>
          <p className="text-sm text-amber-700">
            This checker is for informational purposes only. It cannot diagnose
            PMS, PMDD, or any other condition. Only a qualified healthcare
            provider can diagnose you. If your symptoms are severe or include
            thoughts of self-harm, please contact a doctor or crisis service
            promptly.
          </p>
        </div>

        <PmsTrackerTool />

        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900">
            About PMS severity
          </h2>
          <p className="text-gray-600">
            Premenstrual syndrome (PMS) affects the majority of people who
            menstruate to some degree. Symptoms range from mild (noticeable but
            manageable) to severe (significantly disrupting daily life). Severe
            premenstrual mood symptoms that resolve with your period may meet
            criteria for PMDD — Premenstrual Dysphoric Disorder — which is a
            recognised clinical condition requiring professional assessment.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Why tracking across cycles matters
          </h2>
          <p className="text-gray-600">
            A single self-assessment captures one moment in time. Tracking
            symptoms daily across two or more cycles reveals whether your
            pattern is truly premenstrual (symptoms that reliably appear in the
            luteal phase and clear after your period starts), which is the
            defining clinical criterion for both PMS and PMDD. Dawn Phase makes
            this easy with daily logs tied to your cycle phase.
          </p>
          <p className="text-gray-600 text-sm mt-4">
            <strong>Note:</strong> This content is for informational purposes
            only and is not a substitute for professional medical advice,
            diagnosis, or treatment.
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">More free tools:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/cycle-calculator" className="text-sm text-[#c94f68] hover:underline font-medium">
              Cycle Calculator
            </a>
            <span className="text-gray-300">·</span>
            <a href="/luteal-phase-calculator" className="text-sm text-[#c94f68] hover:underline font-medium">
              Luteal Phase Calculator
            </a>
            <span className="text-gray-300">·</span>
            <a href="/tools/ovulation-calculator" className="text-sm text-[#c94f68] hover:underline font-medium">
              Ovulation Calculator
            </a>
            <span className="text-gray-300">·</span>
            <a href="/tools/period-due-date" className="text-sm text-[#c94f68] hover:underline font-medium">
              Period Due Date
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
