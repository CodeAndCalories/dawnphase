import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "PCOS and Irregular Periods — What's Normal and What to Track",
  description:
    "PCOS causes irregular, absent, or unpredictable periods. Here's what counts as irregular, what anovulatory cycles mean, and exactly what to track when your cycle has no pattern.",
  openGraph: {
    title: "PCOS and Irregular Periods — What's Normal and What to Track",
    description:
      "PCOS causes irregular, absent, or unpredictable periods. Here's what counts as irregular, what anovulatory cycles mean, and exactly what to track when your cycle has no pattern.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PCOS%20and%20Irregular%20Periods%20%E2%80%94%20What%27s%20Normal%20and%20What%20to%20Track&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="PCOS and Irregular Periods — What's Normal and What to Track"
        description="PCOS causes irregular, absent, or unpredictable periods. Here's what counts as irregular, what anovulatory cycles mean, and exactly what to track when your cycle has no pattern."
        url="https://www.dawnphase.com/blog/pcos-irregular-periods"
        datePublished="2026-05-01"
        dateModified="2026-05-01"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>May 2026</span><span>·</span><span>7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          PCOS and Irregular Periods — What&apos;s Normal and What to Track
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Dawn Phase is not a medical device and does not diagnose or treat any condition. If you have concerns about your menstrual cycle or reproductive health, consult a qualified healthcare professional.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            For most people with PCOS, the question isn&apos;t &ldquo;when will my next period arrive?&rdquo; — it&apos;s &ldquo;will it arrive at all?&rdquo; Irregular periods are one of the defining features of polycystic ovary syndrome, yet most cycle tracking advice is written for people with predictable 28-day cycles. This guide explains what irregular really means with PCOS, when to be concerned, and how to track usefully when your cycle refuses to follow a schedule.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What causes irregular periods with PCOS?</h2>

          <p>
            PCOS disrupts the hormonal signalling that drives ovulation. In a typical cycle, the brain releases follicle-stimulating hormone (FSH) to develop follicles, one of which reaches maturity and releases an egg at ovulation. A surge in luteinising hormone (LH) triggers that release.
          </p>
          <p>
            In PCOS, elevated LH and often elevated insulin interfere with this sequence. Follicles begin to develop but frequently stall before ovulation occurs. Instead of maturing and releasing an egg, they remain as small cysts on the ovary. Without ovulation, progesterone isn&apos;t produced, and the uterine lining may not shed in a timely or predictable way — resulting in cycles that are long, irregular, or absent entirely.
          </p>
          <p>
            Insulin resistance, which affects around 70% of people with PCOS, compounds the problem by stimulating the ovaries to produce excess androgens (male hormones such as testosterone). Elevated androgens further suppress ovulation and contribute to other hallmark symptoms including acne, excess facial or body hair, and scalp hair thinning.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What counts as irregular with PCOS?</h2>

          <p>
            Clinically, oligomenorrhoea — infrequent periods — is defined as fewer than eight menstrual cycles per year, or cycles consistently longer than 35 days. Amenorrhoea — absent periods — means no period for 90 days or more.
          </p>
          <p>
            For context, some people with PCOS have cycles that arrive every 40–50 days with some regularity; others may go months without a period and then have several in quick succession. Both patterns are common presentations of PCOS, even though they look quite different on a calendar.
          </p>
          <p>
            What&apos;s worth noting: having irregular periods is not the same as having no hormonal activity. Follicles are still developing, oestrogen is still being produced, and the uterine lining is still building. The difference is that the final step — ovulation — is not reliably happening.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Anovulatory cycles explained</h2>

          <p>
            An anovulatory cycle is a menstrual cycle in which ovulation does not occur. In people without PCOS, anovulation is occasional — stress, illness, or significant weight changes can cause it. In PCOS, anovulatory cycles are the norm rather than the exception.
          </p>
          <p>
            Anovulatory cycles can still produce bleeding — sometimes called anovulatory bleeding or breakthrough bleeding — but this is not a true menstrual period. A true period follows ovulation: progesterone rises during the luteal phase, then drops when pregnancy doesn&apos;t occur, triggering the shedding of the uterine lining. Without ovulation, there&apos;s no progesterone phase, and any bleeding is caused by oestrogen levels that build up and then drop unpredictably.
          </p>
          <p>
            This distinction matters clinically. Prolonged anovulation means the uterine lining is exposed to oestrogen without the opposing effect of progesterone — a situation associated with increased risk of endometrial hyperplasia over time. It is one of the reasons regular gynaecological review is important for people with PCOS who are not regularly ovulating.
          </p>

          <div className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-5 my-4">
            <p className="font-semibold text-[#C94B6D] mb-3">Signs a bleed may be anovulatory:</p>
            <ul className="space-y-2">
              {[
                "No basal body temperature rise before or during the bleed",
                "Negative ovulation predictor kit results in the days before bleeding",
                "Cycle much shorter or longer than your average",
                "Lighter or heavier than a typical period with no clear build-up",
                "No typical pre-period symptoms (breast tenderness, mood shifts) beforehand",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-[#2D1B1E]">
                  <span className="text-[#E8637A] mt-0.5 shrink-0">·</span>{s}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to track when periods are unpredictable</h2>

          <p>
            Standard cycle tracking advice — log your period start and end, track ovulation around day 14 — is built for predictable cycles. With PCOS, this approach produces inaccurate predictions and can feel discouraging when those predictions are consistently wrong.
          </p>
          <p>
            A more useful approach for PCOS focuses on tracking what actually happens rather than predicting what should:
          </p>

          <div className="space-y-4 my-4">
            {[
              {
                title: "Log every bleed, not just periods",
                desc: "Record spotting, breakthrough bleeding, and heavy bleeds separately. Over time, this helps distinguish between anovulatory bleeds and true menstrual periods — information that&apos;s valuable for clinical conversations.",
              },
              {
                title: "Track symptoms daily, not just around bleeding",
                desc: "Acne, energy levels, bloating, mood, appetite, and sleep quality can shift in response to hormonal fluctuations even when there&apos;s no clear cycle. Daily logging reveals these patterns even when periods are absent. See our guide on what to log in our detailed PCOS symptoms tracker.",
              },
              {
                title: "Record BBT if you can",
                desc: "A sustained temperature rise of ~0.2°C indicates ovulation has occurred. With PCOS, this may happen on cycle day 30, 45, or later — charting the full cycle rather than stopping at day 21 is essential.",
              },
              {
                title: "Note external factors",
                desc: "Stress, illness, significant changes in diet or exercise, and sleep disruption all affect PCOS symptoms and cycle regularity. Logging these gives context to why a particular cycle was different.",
              },
              {
                title: "Track OPKs with appropriate scepticism",
                desc: "Elevated LH in PCOS means OPK results can be persistently positive without ovulation following. Use them as one data point alongside temperature and symptoms, not as confirmation of ovulation.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D]">{item.title}</p>
                <p className="text-sm text-[#8C6B5A] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When to see a doctor</h2>

          <p>
            You should seek medical review if any of the following apply:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You have had fewer than six periods in the past 12 months</li>
            <li>You have gone 90 or more days without a period and pregnancy has been ruled out</li>
            <li>Your periods are very heavy (soaking through protection in under an hour, passing large clots)</li>
            <li>You are experiencing pelvic pain, unexplained weight gain, or significant hair changes alongside irregular periods</li>
            <li>You are trying to conceive and have not had a confirmed ovulation in the past six months</li>
          </ul>
          <p>
            If you already have a PCOS diagnosis, it is worth having an annual review with your GP or gynaecologist — particularly if you are not regularly ovulating, as endometrial health monitoring may be appropriate.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How Dawn Phase handles cycles with no fixed pattern</h2>

          <p>
            Most period tracking apps assume a consistent cycle length. They take your last period date, add your average cycle length, and predict the next period. When that average doesn&apos;t hold — because many PCOS cycles don&apos;t — the predictions become meaningless and the app becomes frustrating to use.
          </p>
          <p>
            Dawn Phase is designed differently for irregular cycles. Rather than enforcing a prediction model, it tracks from the date you log as your period start and calculates cycle day from that point. It doesn&apos;t break or produce incorrect predictions when a cycle runs to day 60 or when you skip a month entirely — it simply waits for the next logged period start and recalibrates.
          </p>
          <p>
            For PCOS specifically, the focus is on symptom logging across the full cycle rather than tracking relative to a predicted ovulation window. You can read more about how{" "}
            <Link href="/blog/how-to-track-ovulation-pcos" className="text-[#E8637A] hover:underline font-medium">
              ovulation tracking with PCOS
            </Link>{" "}
            works in practice, or explore the{" "}
            <Link href="/conditions/pcos" className="text-[#E8637A] hover:underline font-medium">
              PCOS condition page
            </Link>{" "}
            for a full overview of what Dawn Phase tracks. You can also see our guide on{" "}
            <Link href="/symptoms/irregular-periods-pcos" className="text-[#E8637A] hover:underline font-medium">
              tracking irregular periods with PCOS
            </Link>
            .
          </p>
          <p>
            The most valuable output when cycles are irregular is not a prediction — it&apos;s a multi-month symptom log that shows what your body actually did, when, and what correlated with it. That record is far more useful in a doctor&apos;s appointment than a calendar of missed period predictions.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="pcos-irregular-periods"
          slugs={["pcos-cycle-tracking", "how-to-track-ovulation-pcos", "tracking-cycle-pcos"]}
        />

        <BlogCTA variant="pcos" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
