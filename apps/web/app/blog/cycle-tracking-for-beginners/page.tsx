import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "How to Start Tracking Your Cycle — A Beginner's Guide",
  description:
    "Never tracked your cycle before? This guide explains what to log, how to understand your four phases, and how to start today — no prior knowledge needed.",
  openGraph: {
    title: "How to Start Tracking Your Cycle — A Beginner's Guide",
    description:
      "Never tracked your cycle before? This guide explains what to log, how to understand your four phases, and how to start today — no prior knowledge needed.",
    images: [{
      url: "https://www.dawnphase.com/og?title=How%20to%20Start%20Tracking%20Your%20Cycle%20%E2%80%94%20A%20Beginner's%20Guide&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="How to Start Tracking Your Cycle — A Beginner's Guide"
        description="Never tracked your cycle before? This guide explains what to log, how to understand your four phases, and how to start today — no prior knowledge needed."
        url="https://www.dawnphase.com/blog/cycle-tracking-for-beginners"
        datePublished="2026-04-27"
        dateModified="2026-04-27"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          How to Start Tracking Your Cycle — A Beginner&apos;s Guide
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only. Cycle tracking is not a reliable method of contraception. If you have concerns about your cycle, consult a healthcare provider.</p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            Cycle tracking sounds more complicated than it is. You don&apos;t need a science background, a specific app, or a &quot;perfect&quot; 28-day cycle to start. You just need to know what to log — and the habit of logging it. This guide covers everything you need from day one.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What is a menstrual cycle?</h2>

          <p>
            Your menstrual cycle is measured from day 1 of one period to day 1 of the next. Day 1 is always the first day of full flow — not spotting. The average cycle length is somewhere between 21 and 35 days, but individual variation is wide and completely normal. A &quot;28-day cycle&quot; is a statistical average, not a rule. Many people have cycles of 32 days, or 26 days, or cycles that vary by a few days from month to month — all of which can be perfectly healthy.
          </p>
          <p>
            Understanding your own cycle length — rather than comparing it to an average — is the whole point of tracking. After three to four cycles of logging, you&apos;ll have a real baseline that&apos;s specific to your body, not a textbook.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The four phases — a quick overview</h2>

          <p>
            Your cycle has four distinct hormonal phases. Each one has a different hormonal profile, which means your energy, mood, and physical experience shift predictably across the month — even if you&apos;ve never noticed it before.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                cat: "Menstrual (Days 1–5ish)",
                items: ["Oestrogen and progesterone are at their lowest", "The uterine lining sheds", "Energy is typically low", "Rest and gentler activity suit most people"],
              },
              {
                cat: "Follicular (Days 1–13ish)",
                items: ["Overlaps with menstrual phase, then extends beyond it", "Oestrogen rises as follicles develop", "Energy and mood gradually build", "Many people feel most motivated during this phase"],
              },
              {
                cat: "Ovulatory (Around Day 14)",
                items: ["LH surge triggers ovulation", "Oestrogen peaks, then drops briefly", "Peak energy and social confidence for many", "Lasts only 3–5 days"],
              },
              {
                cat: "Luteal (Days 15–28ish)",
                items: ["Progesterone rises after ovulation", "Mood and energy may dip in the second half", "PMS symptoms typically appear here", "Ends when the period begins"],
              },
            ].map((block) => (
              <div key={block.cat} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D] mb-2">{block.cat}</p>
                <ul className="space-y-1">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm text-[#8C6B5A] flex items-start gap-1.5">
                      <span className="text-[#E8637A] shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p>
            You don&apos;t need to memorise these phases on day one. After a couple of cycles of logging, you&apos;ll start to see your own version of this pattern emerge from your data.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to track from day one</h2>

          <p>
            Start simple. The single most important data point is your period start date — everything else is calculated from that. From there, build up gradually:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Period start date</strong> — the first day of full flow. This is your cycle day 1.</li>
            <li><strong>Period end date</strong> — when bleeding fully stops (not just lightens).</li>
            <li><strong>Flow intensity</strong> — spotting, light, medium, or heavy. This tells you if your period is changing over time.</li>
            <li><strong>Symptoms</strong> — cramps, mood, energy, sleep quality, bloating. Log even on days when everything feels normal, so you have contrast data.</li>
            <li><strong>Optional from cycle 2+</strong>: cervical mucus changes (creamy → stretchy/clear indicates approaching ovulation), basal body temperature if you want to confirm ovulation timing.</li>
          </ul>
          <p>
            You do not need to log all of these perfectly from day one. Period dates plus one or two symptoms is enough to start building a useful picture.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to actually start</h2>

          <p>
            The most common beginner mistake is waiting for the &quot;right moment&quot; — the start of a new cycle, the first of the month, or until a new app is set up perfectly. Don&apos;t wait.
          </p>
          <p>
            Open an app (or a notes document) today and log where you think you are in your cycle. If you&apos;re not sure, make your best guess and note the uncertainty. If your last period started approximately two weeks ago, write that down. Imperfect data from today is worth far more than perfect data from a future cycle that hasn&apos;t happened yet.
          </p>
          <p>
            Consistency beats perfection. A daily log with occasional gaps is more useful than no log at all. Even logging three data points a day — period status, mood, energy — builds a meaningful pattern over time.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What patterns emerge after 3 cycles</h2>

          <p>
            Three cycles of consistent logging typically reveals the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your actual cycle length — and whether it&apos;s consistent or variable</li>
            <li>When PMS symptoms typically appear (most commonly 5–10 days before your period)</li>
            <li>How long your period actually lasts and whether flow is changing</li>
            <li>Which cycle days correlate with higher energy and motivation</li>
            <li>Which cycle days correlate with lower mood, fatigue, or poor sleep</li>
            <li>Whether there are any mid-cycle symptoms (ovulation pain, cervical mucus changes)</li>
          </ul>
          <p>
            This data is also genuinely useful at GP or gynaecology appointments. Rather than saying &quot;my periods are sometimes irregular,&quot; you&apos;ll be able to say &quot;my cycles range from 27 to 34 days, my period lasts 5 days with heavy flow on days 2–3, and I experience significant fatigue in the week before my period.&quot; That level of specificity makes a clinical difference.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Common beginner mistakes</h2>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Only tracking during your period.</strong> The most revealing data often comes from between periods — the ovulatory and luteal phases. Log every day, even if the entry is &quot;nothing notable.&quot;</li>
            <li><strong>Not logging between periods.</strong> Related to the above: gaps in the non-period days make it impossible to identify patterns in mood, energy, or symptoms that occur outside of menstruation.</li>
            <li><strong>Giving up after one cycle.</strong> A single cycle is a data point. Two cycles start to suggest a pattern. Three cycles confirm it. The insight compounds with time.</li>
            <li><strong>Expecting a 28-day cycle.</strong> Most people do not have a 28-day cycle. If your cycle is 32 days and your app is predicting ovulation at day 14, those predictions will be wrong. Track your own data rather than relying on averages.</li>
            <li><strong>Logging only &quot;bad&quot; days.</strong> Tracking only when something hurts or feels wrong removes the context that makes the bad days meaningful. You need the good days too.</li>
          </ul>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="cycle-tracking-for-beginners"
          slugs={["follicular-phase-explained", "luteal-phase-symptoms", "ovulation-symptoms"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Start tracking your cycle today</h3>
          <p className="mb-6 opacity-90">7-day free trial. No prior experience needed.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
