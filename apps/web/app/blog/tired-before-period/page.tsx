import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Why Am I So Tired Before My Period? The Hormonal Explanation",
  description:
    "Exhaustion before your period is hormonal — driven by progesterone, iron loss, and sleep disruption. Here's why it happens and what actually helps.",
  openGraph: {
    title: "Why Am I So Tired Before My Period? The Hormonal Explanation",
    description:
      "Exhaustion before your period is hormonal — driven by progesterone, iron loss, and sleep disruption. Here's why it happens and what actually helps.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Why%20Am%20I%20So%20Tired%20Before%20My%20Period%3F&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
      width: 1200,
      height: 630,
    }],
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />
      <ArticleSchema
        title="Why Am I So Tired Before My Period? The Hormonal Explanation"
        description="Exhaustion before your period is hormonal — driven by progesterone, iron loss, and sleep disruption. Here's why it happens and what actually helps."
        url="https://www.dawnphase.com/blog/tired-before-period"
        datePublished="2026-05-06"
        dateModified="2026-05-06"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Why Am I So Tired Before My Period? The Hormonal Explanation
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            If you feel exhausted in the days before your period — not just a little tired,
            but genuinely wiped out — you are not imagining it and you are not alone.
            Pre-period fatigue is one of the most commonly reported PMS symptoms, and it
            has a clear hormonal explanation.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What&apos;s Actually Happening Hormonally
          </h2>

          <p>
            In the{" "}
            <Link href="/cycle-phase/luteal" className="text-[#c94f68] hover:underline font-medium">
              luteal phase
            </Link>{" "}
            — the second half of your cycle, after ovulation — progesterone rises
            significantly. Progesterone has a sedating effect on the central nervous system.
            It increases body temperature slightly and can make you feel heavier, slower,
            and more in need of sleep.
          </p>

          <p>
            Then, in the days just before your period, both progesterone and estrogen drop
            sharply. This sudden hormonal withdrawal is what triggers most PMS symptoms —
            including fatigue, mood changes, and brain fog.
          </p>

          <p>
            On top of the hormonal shift, many people also experience disrupted sleep in the
            luteal phase — waking more, sleeping lighter, feeling unrested even after a full
            night. Poor sleep compounds fatigue quickly.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Why Some Cycles Are Worse Than Others
          </h2>

          <p>Pre-period fatigue tends to be worse when:</p>

          <div className="space-y-3">
            {[
              {
                label: "Sleep is already disrupted",
                note: "The luteal phase raises core body temperature slightly, which can interfere with sleep quality. If you are already sleep-deprived, the luteal phase makes it worse.",
              },
              {
                label: "Iron levels are low",
                note: "Heavy periods deplete iron. If your iron or ferritin is low, fatigue in the days before and during your period will be significantly worse. This is worth testing with a blood test if fatigue is severe.",
              },
              {
                label: "Stress is high",
                note: "High cortisol interferes with progesterone and disrupts sleep. A stressful month often means a more symptomatic luteal phase.",
              },
              {
                label: "Blood sugar is unstable",
                note: "Progesterone affects insulin sensitivity. Blood sugar dips in the luteal phase are more pronounced — and low blood sugar causes fatigue and cravings.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            How to Tell If It&apos;s Your Cycle
          </h2>

          <p>
            The clearest sign that fatigue is cycle-related is timing. If you feel
            significantly more tired in the 5–10 days before your period and it resolves
            once your period starts — that is a luteal phase pattern.
          </p>

          <p>
            Tracking energy daily across your cycle makes this pattern visible quickly.
            After 2–3 cycles of daily logging you will be able to predict exactly when your
            energy dip is coming.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase logs energy, sleep, and mood daily — so you can see exactly when
              your luteal fatigue pattern kicks in and plan around it.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What Actually Helps</h2>

          <div className="space-y-3">
            {[
              {
                label: "Prioritise sleep in the luteal phase",
                note: "Go to bed earlier. Reduce alcohol — it fragments sleep significantly and is worse in the luteal phase. Keep your bedroom cool to counteract the temperature rise.",
              },
              {
                label: "Stabilise blood sugar",
                note: "Eat regularly. Reduce refined sugar and processed carbs in the luteal phase — blood sugar crashes worsen fatigue and cravings. Protein and fat at each meal helps.",
              },
              {
                label: "Check your iron",
                note: "If fatigue is severe, ask your doctor for a ferritin test specifically — not just haemoglobin. Many women are iron deficient without being anaemic, and ferritin is a more sensitive marker.",
              },
              {
                label: "Reduce exercise intensity",
                note: "High intensity exercise in the late luteal phase can worsen fatigue for some people. Lighter movement — walking, yoga — often feels better and supports recovery.",
              },
              {
                label: "Magnesium",
                note: "Magnesium deficiency is common and worsens PMS symptoms including fatigue and sleep disruption. Discuss supplementation with your doctor if relevant.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to See a Doctor</h2>

          <p>
            Pre-period fatigue that is occasional and manageable is normal. See a doctor
            if:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Fatigue is severe and debilitating across multiple cycles</li>
            <li>It is not improving with sleep and lifestyle changes</li>
            <li>
              You have other symptoms like hair loss, cold intolerance, or weight change —
              these can indicate thyroid dysfunction
            </li>
            <li>You suspect iron deficiency</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How Tracking Helps</h2>

          <p>
            Logging energy, sleep, and mood daily across your cycle turns vague exhaustion
            into a clear pattern. You stop being surprised by it and start preparing for it
            — adjusting your schedule, sleep, and eating in the luteal phase to reduce the
            impact.
          </p>

          <p>
            <Link href="/" className="text-[#c94f68] hover:underline font-medium">
              Dawn Phase
            </Link>{" "}
            is built for exactly this kind of daily symptom tracking. 7-day free trial, no
            card required.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post is for informational purposes only and does not constitute medical
            advice. If fatigue is severe or persistent please consult a qualified healthcare
            provider.
          </p>

        </div>

        <RelatedArticles
          currentSlug="tired-before-period"
          slugs={["luteal-phase-symptoms", "pmdd-vs-pms", "hormonal-imbalance-signs"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
