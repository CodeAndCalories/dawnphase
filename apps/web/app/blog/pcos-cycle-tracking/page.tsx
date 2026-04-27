import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "How to Track Your Cycle With PCOS — A Complete Guide",
  description:
    "PCOS makes cycle tracking harder — but not impossible. Here's what to track, how to spot patterns, and how Dawn Phase supports irregular cycles.",
  openGraph: {
    title: "How to Track Your Cycle With PCOS — A Complete Guide",
    description:
      "PCOS makes cycle tracking harder — but not impossible. Here's what to track, how to spot patterns, and how Dawn Phase supports irregular cycles.",
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          How to Track Your Cycle With PCOS — A Complete Guide
        </h1>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            PCOS affects an estimated 1 in 10 women of reproductive age. The hallmark symptom — irregular or absent periods — makes standard cycle tracking apps nearly useless. Here&apos;s how to track effectively despite the unpredictability.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why PCOS makes cycle tracking harder</h2>

          <p>
            Most period trackers are built around a 28-day model. They predict your next period by adding your average cycle length to your last period date. With PCOS, where cycles can range from 35 to 90+ days — or be absent for months — this prediction is meaningless and often misleading.
          </p>
          <p>
            The core issue is anovulation: many PCOS cycles don&apos;t include ovulation at all. Without ovulation, there&apos;s no progesterone surge, no typical luteal phase, and the &ldquo;period&rdquo; that eventually arrives may actually be anovulatory bleeding, not a true menstrual period.
          </p>
          <p>
            Standard apps that can&apos;t handle this create a frustrating feedback loop: wrong predictions → low trust → abandoning tracking altogether. But tracking is exactly what can help you understand your body and communicate effectively with your doctor.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to track with PCOS (not just period dates)</h2>

          <p>With PCOS, period dates alone tell you very little. A more useful tracking approach includes:</p>

          <div className="space-y-4">
            {[
              {
                title: "Daily symptoms",
                desc: "Track acne, bloating, fatigue, mood, and energy every day. With PCOS, these often cluster around hormonal shifts that don't always align with period timing.",
              },
              {
                title: "Bleeding details",
                desc: "Log flow intensity, colour, and whether it feels like a true period or lighter spotting. This can help distinguish ovulatory from anovulatory cycles.",
              },
              {
                title: "Weight and bloating",
                desc: "Insulin resistance — common in PCOS — drives inflammation and bloating. Tracking these can reveal patterns tied to diet, stress, or hormonal fluctuations.",
              },
              {
                title: "Sleep quality",
                desc: "Poor sleep worsens insulin resistance and cortisol levels, both of which affect PCOS. Logging sleep hours and quality reveals this connection over time.",
              },
              {
                title: "Mood and anxiety",
                desc: "Women with PCOS have significantly higher rates of anxiety and depression, often linked to hormonal fluctuations. Daily mood tracking can reveal cyclical patterns even when periods are irregular.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D]">{item.title}</p>
                <p className="text-sm text-[#8C6B5A] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">BBT and OPK tracking with PCOS</h2>

          <p>
            Basal body temperature (BBT) charting and ovulation predictor kits (OPKs) are commonly recommended for PCOS, but both have limitations worth understanding.
          </p>
          <p>
            <strong>BBT:</strong> A sustained rise in basal body temperature of ~0.2°C typically indicates ovulation has occurred. With PCOS, cycles are longer and ovulation may be delayed until cycle day 30, 40, or later — meaning you need to chart for the full cycle, not just the first two weeks.
          </p>
          <p>
            <strong>OPKs:</strong> LH (the hormone OPKs detect) is elevated in PCOS even without imminent ovulation. Many women with PCOS get persistent positive OPK results that don&apos;t lead to ovulation. OPKs can still be useful — but treat repeated positives with scepticism rather than as confirmed ovulation.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How Dawn Phase supports irregular cycles</h2>

          <p>
            Dawn Phase doesn&apos;t assume a 28-day cycle. It calculates your current cycle day from your logged period start date, shows your phase based on the most likely progression given your cycle history, and updates predictions as your pattern becomes clearer.
          </p>
          <p>
            Critically, Dawn Phase doesn&apos;t break when you skip a month or have a 60-day cycle. It simply waits for your next period log and recalibrates. The symptom log works independently of cycle predictions — so even if the cycle tracking is uncertain, your daily symptom data is still accumulating and useful.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Tips for spotting patterns with unpredictable cycles</h2>

          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Log every day, not just around your period.</strong> Patterns in PCOS often appear in symptom clusters rather than in cycle timing.</li>
            <li><strong>Track for at least 3–6 months before drawing conclusions.</strong> One long cycle tells you nothing. Twelve months of data tells you a lot.</li>
            <li><strong>Note external factors.</strong> Travel, illness, significant stress, and dietary changes can all delay or trigger a cycle. Logging these alongside symptoms helps you understand the triggers specific to your body.</li>
            <li><strong>Export and share with your doctor.</strong> A 6-month symptom log is far more useful in a 10-minute GP appointment than trying to recall details from memory.</li>
          </ul>

        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your cycle with PCOS</h3>
          <p className="mb-6 opacity-90">Irregular cycle support included. 7-day free trial.</p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
