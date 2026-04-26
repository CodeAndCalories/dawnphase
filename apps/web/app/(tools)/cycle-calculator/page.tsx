import type { Metadata } from "next";
import CycleCalculatorTool from "@/components/ui/CycleCalculatorTool";

export const metadata: Metadata = {
  title: "Free Cycle Calculator",
  description:
    "Calculate your next period, ovulation window, and fertile days with our free cycle calculator.",
};

export default function CycleCalculatorPage() {
  return (
    <main className="min-h-screen dawn-gradient py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <a href="/" className="inline-block mb-8">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Dawn Phase
            </span>
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Menstrual Cycle Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Enter your last period date and average cycle length to predict your
            next period, ovulation, and fertile window.
          </p>
        </div>

        <CycleCalculatorTool />

        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900">
            How to use this calculator
          </h2>
          <p className="text-gray-600">
            Enter the first day of your last menstrual period (LMP) and your
            typical cycle length (usually 21–35 days). The calculator will
            estimate your next period, your ovulation day, and your 6-day
            fertile window.
          </p>
          <p className="text-gray-600 text-sm mt-4">
            <strong>Note:</strong> This tool provides estimates only and is not
            medical advice. Cycle lengths vary naturally. For family planning or
            health concerns, consult a healthcare provider.
          </p>
        </div>
      </div>
    </main>
  );
}
