import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "8 Signs of Ovulation — What Your Body Is Telling You",
  description:
    "Cervical mucus changes, BBT shifts, light spotting, and more — here are eight signs that ovulation may be occurring and how to track them.",
  openGraph: {
    title: "8 Signs of Ovulation — What Your Body Is Telling You",
    description:
      "Cervical mucus changes, BBT shifts, light spotting, and more — here are eight signs that ovulation may be occurring and how to track them.",
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          8 Signs of Ovulation — What Your Body Is Telling You
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Ovulation signs vary widely between individuals and cycles. Do not use this information for contraceptive purposes — consult a healthcare provider for guidance on fertility or contraception. Ovulation signs and OPKs can help identify patterns, but should not be relied on alone to prevent pregnancy.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            Ovulation — the release of a mature egg from the ovary — typically occurs around the midpoint of your cycle. Your body produces several noticeable signals in the days surrounding it. Here are eight to watch for.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">1. Cervical mucus changes</h2>
          <p>
            The most reliable day-to-day ovulation indicator. As oestrogen rises ahead of ovulation, cervical mucus transitions from dry or sticky to watery, then to clear and stretchy — often described as resembling raw egg white. This egg-white mucus creates a sperm-friendly environment and typically signals your most fertile days. After ovulation, progesterone causes mucus to become thick and sticky again.
          </p>
          <p>To track it, check your mucus daily before urinating and record the type and consistency. The peak fertile day is usually the last day of egg-white mucus.</p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">2. Basal body temperature (BBT) rise</h2>
          <p>
            After ovulation, progesterone causes a small but measurable rise in resting body temperature — typically 0.2–0.5°C (0.4–1°F). Taking your temperature with a basal thermometer immediately on waking (before getting up, drinking, or speaking) and recording it daily reveals this shift. The temperature rises after ovulation has already occurred, so BBT is more useful for confirming ovulation than predicting it.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">3. Mid-cycle spotting</h2>
          <p>
            Some people experience light spotting or a pink or brownish discharge around ovulation. Research suggests this may be caused by the brief drop in oestrogen that precedes the LH surge, or by the follicle rupturing. Mid-cycle spotting is generally light and brief (one to two days), and is considered a normal variation. Spotting outside this window, or that is heavier than usual, is worth discussing with a doctor.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">4. Increased libido</h2>
          <p>
            Studies indicate a natural increase in sexual drive around ovulation, driven by rising oestrogen and a brief mid-cycle surge in testosterone. Many people notice this as a reliable signal that they are approaching or at their fertile window, even before other signs become obvious.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">5. Breast tenderness</h2>
          <p>
            Brief breast tenderness or sensitivity around ovulation — distinct from the more prolonged premenstrual breast pain — is caused by the rapid hormonal changes of the LH surge. It tends to be mild and resolves quickly. Some people notice it as one of their most consistent ovulation signals.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">6. Mild bloating</h2>
          <p>
            Bloating or abdominal fullness around mid-cycle can occur as oestrogen and LH peak. It is usually mild and distinct from the more pronounced luteal-phase bloating that occurs in the week before a period. Tracking the timing helps differentiate the two.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">7. Heightened senses</h2>
          <p>
            Research has found that some people experience heightened smell, taste, or vision sensitivity around ovulation — likely due to oestrogen's effects on sensory perception. This is one of the subtler signs and tends to be more noticeable when you are actively paying attention to your cycle.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">8. Positive ovulation predictor kit (OPK)</h2>
          <p>
            OPKs detect the luteinising hormone (LH) surge that triggers ovulation 24–36 hours later. A positive result (the test line as dark as or darker than the control line) typically precedes ovulation by one to two days, making it one of the most actionable predictive signs. Note that conditions such as PCOS can produce elevated LH throughout the cycle, which may cause persistent positive OPKs that do not correspond to ovulation.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to use these signs together</h2>
          <p>
            No single sign is conclusive. The most reliable approach is to combine observations: track cervical mucus daily, use OPKs in the days before your expected ovulation window, and chart BBT to confirm. Recording these observations alongside your cycle days over several months reveals your individual pattern.
          </p>
          <p>
            Dawn Phase lets you log ovulation symptoms daily alongside your cycle phase, so you can see patterns across multiple cycles and notice what&apos;s consistent for you specifically.
          </p>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your ovulation signs</h3>
          <p className="mb-6 opacity-90">Log symptoms daily and spot your patterns across cycles.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
