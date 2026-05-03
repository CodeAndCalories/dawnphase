import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Free Cycle Tools — Dawn Phase",
  description:
    "Free menstrual cycle calculators and trackers: cycle calculator, ovulation calculator, period due date, luteal phase calculator, and PMS symptom checker.",
};

const TOOLS = [
  {
    href: "/cycle-calculator",
    title: "Cycle Calculator",
    description:
      "Enter your last period date and cycle length to predict your next period, ovulation day, and fertile window.",
    badge: "Most popular",
  },
  {
    href: "/tools/ovulation-calculator",
    title: "Ovulation Calculator",
    description:
      "Find your fertile window and peak ovulation day. Useful for understanding your most fertile days.",
    badge: null,
  },
  {
    href: "/tools/period-due-date",
    title: "Period Due Date Calculator",
    description:
      "See exactly when your next period is due and how many days away it is — with an ovulation window too.",
    badge: null,
  },
  {
    href: "/luteal-phase-calculator",
    title: "Luteal Phase Calculator",
    description:
      "Calculate the length of your luteal phase and find out if it falls within the normal range.",
    badge: null,
  },
  {
    href: "/tools/pms-tracker",
    title: "PMS Symptom Checker",
    description:
      "Rate 10 premenstrual symptoms on a 1–5 scale and get a PMS severity score with guidance on next steps.",
    badge: "Quiz",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5a3575] border border-[#5a3575]/30 bg-[#5a3575]/5 rounded-full px-4 py-1.5 mb-5">
            Free tools
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-4">
            Cycle calculators &amp; trackers
          </h1>
          <p className="text-[#3d2855] text-lg leading-relaxed">
            Five free tools to understand your cycle, predict your period, and
            check your PMS symptoms. No account required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-2xl p-6 border border-[rgba(130,80,170,0.15)] shadow-sm hover:border-[#c94f68]/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="font-semibold text-[#140c18] group-hover:text-[#5a3575] transition-colors leading-snug">
                  {tool.title}
                </h2>
                {tool.badge && (
                  <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-[#5a3575] bg-[#5a3575]/10 rounded-full px-2.5 py-0.5">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#3d2855] leading-relaxed">{tool.description}</p>
              <p className="mt-4 text-sm font-semibold text-[#c94f68] group-hover:underline">
                Open tool →
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #c94f68, #7a2daa)" }}>
          <h3 className="text-xl font-bold mb-2">
            Track across multiple cycles
          </h3>
          <p className="mb-5 opacity-90 text-sm leading-relaxed">
            Calculators give you a one-time estimate. Dawn Phase tracks your
            actual patterns and improves predictions every cycle.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#c94f68] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm shadow-md"
          >
            Start free 7-day trial →
          </a>
          <p className="mt-3 text-xs opacity-70">No credit card required</p>
        </div>
      </main>
    </div>
  );
}
