import type { Metadata } from "next";
import PeriodDueDateTool from "@/components/ui/PeriodDueDateTool";

export const metadata: Metadata = {
  title: "Period Due Date Calculator — When Is My Next Period",
  description:
    "Find out exactly when your next period is due, how many days away it is, and when your ovulation window falls. Free period due date calculator.",
  keywords: ["when is my next period", "period due date calculator", "next period calculator"],
  openGraph: {
    title: "Period Due Date Calculator — When Is My Next Period",
    description:
      "Find out when your next period is due and how many days away it is. Free and takes 10 seconds.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Period%20Due%20Date%20Calculator&subtitle=When%20is%20my%20next%20period%3F%20%E2%80%94%20Dawn%20Phase",
      width: 1200,
      height: 630,
    }],
  },
};

export default function PeriodDueDatePage() {
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
            Period Due Date Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Enter your last period date and cycle length to find out exactly
            when your next period is due — and how many days away it is.
          </p>
        </div>

        <PeriodDueDateTool />

        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900">
            How this calculator works
          </h2>
          <p className="text-gray-600">
            Your next period is estimated by adding your cycle length to the
            first day of your last period. If your cycle is 28 days and your
            last period started on the 1st, your next period is due on the 29th.
            The ovulation window shown is based on the standard assumption that
            ovulation occurs 14 days before your next period.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Why tracking matters more than calculating
          </h2>
          <p className="text-gray-600">
            Cycle length varies from month to month — sometimes by 3–5 days,
            and more if you have PCOS or are approaching perimenopause. A
            calculator gives you a one-time estimate based on a single cycle.
            Dawn Phase tracks your actual patterns across multiple cycles and
            improves its predictions the more you log.
          </p>
          <p className="text-gray-600 text-sm mt-4">
            <strong>Note:</strong> These are estimates only and should not be
            used for contraception or medical decision-making. Consult a
            healthcare provider with any concerns.
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
            <a href="/tools/pms-tracker" className="text-sm text-[#c94f68] hover:underline font-medium">
              PMS Tracker
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
