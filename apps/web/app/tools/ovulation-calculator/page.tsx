import type { Metadata } from "next";
import OvulationCalculatorTool from "@/components/ui/OvulationCalculatorTool";

export const metadata: Metadata = {
  title: "Ovulation Calculator — Find Your Fertile Window",
  description:
    "Calculate your fertile window, peak ovulation day, and next period date. Free ovulation calculator based on your cycle length.",
  keywords: ["ovulation calculator", "fertile window calculator", "when do i ovulate calculator"],
  openGraph: {
    title: "Ovulation Calculator — Find Your Fertile Window",
    description:
      "Calculate your fertile window, peak ovulation day, and next period date. Free and takes 10 seconds.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Ovulation%20Calculator&subtitle=Find%20your%20fertile%20window%20%E2%80%94%20Dawn%20Phase",
      width: 1200,
      height: 630,
    }],
  },
};

export default function OvulationCalculatorPage() {
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
            Ovulation Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Enter your last period date and cycle length to find your fertile
            window, peak ovulation day, and next period.
          </p>
        </div>

        <OvulationCalculatorTool />

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This calculator provides estimates only and is not medical advice.{" "}
            <strong>Do not use this tool as a method of contraception.</strong>{" "}
            Ovulation timing varies between cycles and individuals. For fertility
            support or contraceptive guidance, consult a qualified healthcare
            provider.
          </p>
        </div>

        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900">
            How the ovulation calculator works
          </h2>
          <p className="text-gray-600">
            Ovulation typically occurs about 14 days before your next period,
            regardless of overall cycle length. If your cycle is 28 days,
            ovulation is around day 14. If it&apos;s 35 days, ovulation is around
            day 21. Your fertile window is the 5 days before ovulation plus the
            ovulation day itself — the days when conception is most likely.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Why a single calculator isn&apos;t enough
          </h2>
          <p className="text-gray-600">
            A calculator assumes your cycle is perfectly regular. In reality,
            cycle length varies month to month — sometimes by several days.
            Tracking multiple cycles with an app like Dawn Phase lets you see
            your actual patterns and get more accurate predictions over time.
          </p>
          <p className="text-gray-600 text-sm mt-4">
            <strong>Note:</strong> These are estimates. This tool is not
            suitable for contraception or fertility treatment decisions.
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
            <a href="/tools/period-due-date" className="text-sm text-[#c94f68] hover:underline font-medium">
              Period Due Date
            </a>
            <span className="text-gray-300">·</span>
            <a href="/tools/pms-tracker" className="text-sm text-[#c94f68] hover:underline font-medium">
              PMS Tracker
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
