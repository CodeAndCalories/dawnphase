import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Signs Your Hormones Are Imbalanced (And What to Do About It)",
  description:
    "Hormonal imbalance shows up in your cycle, skin, mood, sleep, and energy. Here are the signs to look for and what conditions are commonly behind them.",
  openGraph: {
    title: "Signs Your Hormones Are Imbalanced (And What to Do About It)",
    description:
      "Hormonal imbalance shows up in your cycle, skin, mood, sleep, and energy. Here are the signs to look for and what conditions are commonly behind them.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Signs%20Your%20Hormones%20Are%20Imbalanced&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
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
        title="Signs Your Hormones Are Imbalanced (And What to Do About It)"
        description="Hormonal imbalance shows up in your cycle, skin, mood, sleep, and energy. Here are the signs to look for and what conditions are commonly behind them."
        url="https://www.dawnphase.com/blog/signs-hormonal-imbalance"
        datePublished="2026-05-06"
        dateModified="2026-05-06"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Signs Your Hormones Are Imbalanced (And What to Do About It)
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Hormonal imbalance is one of those phrases that gets used broadly — but it
            describes something real. Your hormones regulate your cycle, sleep, mood,
            metabolism, skin, hair, and energy. When they are out of balance, the effects
            show up across your whole body.
          </p>

          <p>
            The challenge is that hormonal imbalance symptoms overlap significantly with
            other conditions — and with each other. This post covers the most common signs
            and what they might point to.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Common Signs of Hormonal Imbalance
          </h2>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Irregular or missing periods</p>
              <p className="text-sm text-[#3d2855] mt-1">
                One of the clearest hormonal signals. If your cycle has changed significantly
                —{" "}
                <Link href="/symptoms/irregular-periods" className="text-[#c94f68] hover:underline">
                  longer gaps, shorter cycles, heavier or lighter periods, or periods that
                  have stopped
                </Link>{" "}
                — something in your hormonal system has shifted.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Severe PMS or PMDD</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Mood changes, anxiety, depression, or rage in the week before your period
                that significantly affects your life points to hormonal sensitivity —
                particularly to progesterone withdrawal. If symptoms are severe,{" "}
                <Link href="/blog/pmdd-vs-pms-symptoms" className="text-[#c94f68] hover:underline">
                  PMDD
                </Link>{" "}
                may be worth investigating.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Persistent fatigue</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Fatigue that does not resolve with rest, particularly if it varies with your
                cycle, can indicate low thyroid, adrenal dysfunction, or low progesterone.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Unexplained weight gain</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Weight gain that does not respond to diet and exercise — particularly around
                the abdomen — can point to insulin resistance, thyroid dysfunction, or
                elevated cortisol.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Skin and hair changes</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Hormonal acne (typically on the jaw and chin), hair thinning, or hair loss
                can indicate elevated androgens (as in{" "}
                <Link href="/conditions/pcos" className="text-[#c94f68] hover:underline">
                  PCOS
                </Link>
                ) or thyroid dysfunction.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Sleep disruption</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Waking between 2–4am, difficulty falling asleep, or unrefreshing sleep can
                indicate low progesterone, elevated cortisol, or{" "}
                <Link href="/conditions/perimenopause" className="text-[#c94f68] hover:underline">
                  perimenopause
                </Link>
                .
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Brain fog and memory issues</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Difficulty concentrating or recalling words — particularly if it tracks with
                your cycle — can indicate estrogen fluctuation or thyroid issues.{" "}
                <Link href="/symptoms/brain-fog-perimenopause" className="text-[#c94f68] hover:underline">
                  Brain fog
                </Link>{" "}
                is one of the most commonly reported perimenopause symptoms.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Low libido</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Persistent low sex drive can be related to low testosterone, low estrogen,
                high prolactin, thyroid dysfunction, or hormonal birth control.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Mood changes</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Anxiety, depression, or irritability that follows a clear cycle pattern
                points to hormonal causes — particularly the{" "}
                <Link href="/cycle-phase/luteal" className="text-[#c94f68] hover:underline">
                  luteal phase
                </Link>{" "}
                drop in estrogen and progesterone.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What Conditions Commonly Cause Hormonal Imbalance
          </h2>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/conditions/pcos" className="text-[#c94f68] hover:underline">
                  PCOS
                </Link>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Elevated androgens, insulin resistance, and disrupted ovulation. Signs
                include irregular periods, acne, hair changes, and weight gain.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/conditions/perimenopause" className="text-[#c94f68] hover:underline">
                  Perimenopause
                </Link>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Fluctuating and declining estrogen and progesterone as the body transitions
                toward menopause. Can begin in the late 30s.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/conditions/hypothyroidism" className="text-[#c94f68] hover:underline">
                  Hypothyroidism
                </Link>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Underactive thyroid causes fatigue, weight gain, brain fog, hair loss, and
                irregular periods. Very commonly missed or confused with perimenopause.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/blog/pmdd-vs-pms-symptoms" className="text-[#c94f68] hover:underline">
                  PMDD
                </Link>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Severe hormonal sensitivity in the luteal phase causing significant
                psychological symptoms before each period.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Estrogen dominance</p>
              <p className="text-sm text-[#3d2855] mt-1">
                A relative excess of estrogen compared to progesterone — associated with
                heavy periods, bloating, breast tenderness, and mood changes.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase is built for tracking hormonal patterns daily — energy, mood,
              sleep, skin, and cycle phase — so you can see what shifts with your hormones
              and what stays constant.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to Do</h2>

          <div className="space-y-3">
            {[
              {
                label: "Start tracking",
                note: "Daily symptom logging across your cycle is the single most useful thing you can do. It reveals whether symptoms follow a cycle pattern (hormonal) or are constant (more likely thyroid or other cause).",
              },
              {
                label: "Get blood tests",
                note: "Ask your doctor specifically for: thyroid function (TSH, T4), ferritin, androgens (testosterone, DHEAS), estradiol, progesterone, and prolactin. Not all of these are in a standard blood panel — you may need to ask.",
              },
              {
                label: "Bring your tracking data",
                note: "A month of logged symptoms is far more useful to a doctor than a verbal description. It shows patterns, severity, and timing that memory alone cannot capture.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <p>
            <Link href="/" className="text-[#c94f68] hover:underline font-medium">
              Dawn Phase
            </Link>{" "}
            is built for tracking exactly these kinds of hormonal patterns — daily logging
            across energy, mood, sleep, skin, and cycle phase. 7-day free trial, no card
            required.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post is for informational purposes only and does not constitute medical
            advice. If you suspect a hormonal condition please consult a qualified
            healthcare provider for testing and diagnosis.
          </p>

        </div>

        <RelatedArticles
          currentSlug="signs-hormonal-imbalance"
          slugs={["hormonal-imbalance-signs", "perimenopause-symptoms-checklist", "irregular-periods-causes"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
