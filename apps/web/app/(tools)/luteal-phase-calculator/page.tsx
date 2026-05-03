import type { Metadata } from "next";
import LutealPhaseCalculatorTool from "@/components/ui/LutealPhaseCalculatorTool";

export const metadata: Metadata = {
  title: "Free Luteal Phase Calculator",
  description:
    "Calculate your luteal phase length, when it starts, and what to expect during the second half of your cycle.",
};

export default function LutealPhaseCalculatorPage() {
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
            Luteal Phase Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Find out when your luteal phase starts and how long it lasts — the
            key to understanding PMS and progesterone health.
          </p>
        </div>

        <LutealPhaseCalculatorTool />

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What is the luteal phase?
          </h2>
          <p className="text-gray-600 mb-4">
            The luteal phase is the second half of your menstrual cycle,
            beginning after ovulation and ending when your next period starts.
            It typically lasts 10–16 days and is driven by progesterone
            production from the corpus luteum.
          </p>
          <p className="text-gray-600 mb-4">
            A luteal phase shorter than 10 days (luteal phase defect) may make
            it harder to sustain a pregnancy. Symptoms like bloating, mood
            changes, and breast tenderness during this phase are associated with
            PMS and PMDD.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Note:</strong> This calculator provides estimates only. If
            you have concerns about your cycle, consult a healthcare provider.
          </p>
        </div>
      </div>
    </main>
  );
}
