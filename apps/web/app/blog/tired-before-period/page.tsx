import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Why Am I So Tired Before My Period? Causes and Tips",
  description:
    "Luteal phase fatigue is driven by progesterone, serotonin shifts, and sleep disruption. Here's why it happens and practical tips for managing pre-period tiredness.",
  openGraph: {
    title: "Why Am I So Tired Before My Period? Causes and Tips",
    description:
      "Luteal phase fatigue is driven by progesterone, serotonin shifts, and sleep disruption. Here's why it happens and practical tips for managing pre-period tiredness.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Why%20Am%20I%20So%20Tired%20Before%20My%20Period%3F&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
      width: 1200,
      height: 630,
    }],
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <ArticleSchema
        title="Why Am I So Tired Before My Period? Causes and Tips"
        description="Luteal phase fatigue is driven by progesterone, serotonin shifts, and sleep disruption. Here's why it happens and practical tips for managing pre-period tiredness."
        url="https://www.dawnphase.com/blog/tired-before-period"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Why Am I So Tired Before My Period? Causes and Tips
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Persistent or severe fatigue should be discussed with a healthcare provider, as it can have many causes beyond the menstrual cycle.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            If you regularly feel exhausted in the week or two before your period, you are not imagining it — and you are not alone. Pre-period fatigue is one of the most commonly reported premenstrual symptoms, and the hormonal drivers are well understood. Here&apos;s what&apos;s happening and what you can do about it.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why fatigue happens in the luteal phase</h2>
          <p>
            After ovulation, the corpus luteum (the ruptured follicle) produces progesterone. Progesterone has sedating, calming properties — it binds to GABA receptors in the brain, similar to how some anti-anxiety medications work. This is why many people feel naturally more subdued, less motivated, and sleepier in the luteal phase.
          </p>
          <p>
            As the luteal phase progresses and both oestrogen and progesterone fall in the days before menstruation, the withdrawal of these hormones creates additional disruption. Oestrogen supports serotonin production; falling oestrogen means less serotonin availability, which contributes to low mood, fatigue, and difficulty concentrating. This hormonal withdrawal is also what drives the sharpest PMS symptoms for many people.
          </p>
          <p>
            Research also suggests that prostaglandins — inflammatory compounds released in the lead-up to menstruation — can contribute to systemic fatigue and flu-like symptoms in some people, particularly those who experience more intense periods.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to tell period fatigue from other tiredness</h2>
          <p>
            The key distinguishing feature of luteal phase fatigue is its timing and its resolution: it tends to appear reliably in the 5–14 days before menstruation and improves noticeably within 1–2 days of the period starting, as hormone levels drop. If your tiredness:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consistently follows this cyclical pattern across multiple months</li>
            <li>Resolves predictably after your period begins</li>
            <li>Is accompanied by other premenstrual symptoms (mood changes, bloating, cravings)</li>
          </ul>
          <p>
            ...it is most likely hormonally driven. Fatigue that is present throughout the whole cycle, does not improve after your period, or is accompanied by other symptoms such as cold intolerance, hair loss, or significant weight changes warrants investigation for thyroid dysfunction or other causes.
          </p>
          <p>
            See our guide to{" "}
            <Link href="/symptoms/fatigue-luteal-phase" className="text-[#E8637A] hover:underline font-medium">fatigue during the luteal phase</Link>{" "}
            for a detailed look at the symptom pattern.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Sleep changes before your period</h2>
          <p>
            Sleep quality typically worsens in the late luteal phase. Progesterone has a sleep-promoting effect, but as it drops sharply in the days before menstruation, the loss of this sedating influence disrupts sleep. Research suggests that REM sleep may be reduced and sleep fragmentation increased in the late luteal phase for some people.
          </p>
          <p>
            Body temperature also rises slightly in the luteal phase (driven by progesterone&apos;s thermogenic effect), which can make it harder to fall into deep sleep. Many people report waking earlier than usual in the days before their period, or feeling unrested despite adequate hours in bed.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Practical tips for managing pre-period fatigue</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Protect sleep timing", desc: "Consistent sleep and wake times matter more in the luteal phase, when sleep architecture is more vulnerable to disruption." },
              { title: "Reduce caffeine gradually", desc: "Caffeine in the luteal phase can compound sleep disruption. Consider reducing intake in the week before your period, particularly in the afternoon." },
              { title: "Support iron levels", desc: "If you experience heavy periods, iron deficiency can amplify luteal fatigue. Research suggests maintaining adequate iron intake, particularly from food sources, around menstruation." },
              { title: "Adjust exercise intensity", desc: "Some people find lower-intensity movement (walking, yoga) more sustainable in the late luteal phase, with higher-intensity exercise for earlier in the cycle." },
              { title: "Reduce alcohol", desc: "Alcohol disrupts sleep architecture and can worsen the progesterone withdrawal effect. Research suggests even small amounts in the late luteal phase can amplify fatigue the following day." },
              { title: "Recognise the pattern", desc: "Simply knowing that your tiredness is likely hormonal and temporary — that it will ease when your period starts — can reduce the distress it causes." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#FDF6F0] rounded-xl p-4 border border-[rgba(232,99,122,0.08)]">
                <p className="font-semibold text-[#C94B6D] text-sm">{title}</p>
                <p className="text-xs text-[#8C6B5A] mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When fatigue is worth discussing with a doctor</h2>
          <p>
            Pre-period fatigue in the luteal phase is common and usually not a sign of a medical problem. However, it is worth raising with a healthcare provider if:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fatigue is severe enough to significantly impair your ability to work or function daily</li>
            <li>It is present throughout your whole cycle, not just the luteal phase</li>
            <li>It has recently worsened or changed in character</li>
            <li>It is accompanied by other new symptoms such as pallor, shortness of breath, or cold intolerance</li>
          </ul>
          <p>
            Conditions including thyroid dysfunction, iron-deficiency anaemia, PMDD, and sleep disorders can all contribute to or amplify premenstrual fatigue. Many are straightforward to investigate and treat.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How tracking helps you spot the pattern</h2>
          <p>
            Daily energy logging alongside cycle day is the most reliable way to confirm whether your fatigue is hormonally driven. Logging a simple 1–5 energy score each morning for two or three cycles — then comparing your follicular-phase averages with your luteal-phase averages — makes the pattern visible and quantifiable.
          </p>
          <p>
            Dawn Phase shows your average energy by phase in the insights view, and lets you see which specific cycle days your lowest scores cluster on. This data is also useful in clinical conversations: &ldquo;My energy averages 3.8 in the follicular phase and 2.1 in the late luteal phase&rdquo; is more useful than &ldquo;I feel tired before my period.&rdquo;
          </p>
          <p>
            You can also use our free{" "}
            <Link href="/luteal-phase-calculator" className="text-[#E8637A] hover:underline font-medium">luteal phase length calculator</Link>{" "}
            to estimate your luteal phase timing.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="tired-before-period"
          slugs={["luteal-phase-symptoms", "pmdd-vs-pms", "follicular-phase-explained"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
