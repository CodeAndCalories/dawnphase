import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "PCOS and No Period — What's Actually Happening and What You Can Do",
  description:
    "Missing periods with PCOS isn't just inconvenient — it's your body telling you something specific about your hormones. Here's what causes it and how to track what's actually going on.",
  openGraph: {
    title: "PCOS and No Period — What's Actually Happening and What You Can Do",
    description:
      "Missing periods with PCOS isn't just inconvenient — it's your body telling you something specific about your hormones. Here's what causes it and how to track what's actually going on.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PCOS%20and%20No%20Period&subtitle=Dawn%20Phase%20%E2%80%94%20PCOS%20cycle%20guide",
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
        title="PCOS and No Period — What's Actually Happening and What You Can Do"
        description="Missing periods with PCOS isn't just inconvenient — it's your body telling you something specific about your hormones. Here's what causes it and how to track what's actually going on."
        url="https://www.dawnphase.com/blog/pcos-no-period"
        datePublished="2026-05-04"
        dateModified="2026-05-04"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          PCOS and No Period — What&apos;s Actually Happening and What You Can Do
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            When you have PCOS, a missing period isn&apos;t a surprise. But it&apos;s never not stressful — especially when you don&apos;t know whether it&apos;s been 45 days or 90 days, whether something changed, or whether your body is doing something new.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why PCOS causes missed or irregular periods</h2>

          <p>
            The core mechanism is straightforward. PCOS involves elevated androgens (testosterone and related hormones) that interfere with the normal hormonal sequence required for ovulation. Follicles start developing in the ovary — sometimes many at once — but frequently don&apos;t reach the point of releasing an egg.
          </p>
          <p>
            Without ovulation, there&apos;s no corpus luteum, no progesterone surge, and no hormonal drop at the end of the luteal phase that triggers menstruation. The lining may eventually shed — but not on a predictable schedule, and sometimes not at all for extended periods.
          </p>
          <p>
            Insulin resistance, which affects many women with PCOS, compounds this by elevating insulin levels that further stimulate androgen production. It&apos;s a loop that reinforces the disruption rather than resolving it. Managing insulin through diet and, where appropriate, medication can improve cycle regularity in some women — but this varies significantly between individuals.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What &ldquo;no period&rdquo; actually means in PCOS</h2>

          <p>
            There&apos;s an important distinction between a long cycle and amenorrhea (absent periods). A 60-day cycle is long, but it&apos;s still a cycle — ovulation likely occurred at some point, the body completed its process, and a period arrived eventually. Many women with PCOS have long cycles that are nonetheless functional.
          </p>
          <p>
            Amenorrhea — no period for 90 days or more — is a different situation. It suggests ovulation isn&apos;t occurring consistently, and the uterine lining isn&apos;t being shed and rebuilt in the normal cycle. This warrants a conversation with your doctor, both for reproductive health reasons and because chronic anovulation without progesterone exposure can affect uterine lining health over time.
          </p>
          <p>
            The app telling you your period is &ldquo;late&rdquo; on day 32 when your cycle is typically 55 days is a design failure, not a body failure. What you actually need is a tracker that can hold your real cycle length without projecting a 28-day baseline onto your experience.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase supports cycles from 21 to 90+ days and never shows a &apos;late period&apos; warning based on a 28-day assumption. It logs your real pattern and recalibrates as your cycle history builds.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Track your actual cycle — free for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to track when you have no period</h2>

          <p>
            This is where most PCOS tracking advice stops — and shouldn&apos;t. The absence of a period doesn&apos;t mean there&apos;s nothing to track. Your body is still cycling hormonally, even if it&apos;s not producing a predictable bleed. And those hormonal shifts leave signals you can log.
          </p>

          <div className="space-y-3">
            {[
              {
                label: "Ovulation signs",
                note: "Cervical mucus changes, mittelschmerz (one-sided pelvic pain mid-cycle), and energy shifts can all indicate ovulation is occurring — even when cycles are long or irregular.",
              },
              {
                label: "Basal body temperature",
                note: "A sustained temperature rise of ~0.2°C after ovulation confirms it occurred. With PCOS, ovulation may happen late in a long cycle — BBT charting confirms when.",
              },
              {
                label: "Symptom patterns across the month",
                note: "Energy, mood, skin, bloating, and sleep often follow hormonal patterns even without a regular period. Logging daily reveals those patterns over time.",
              },
              {
                label: "Any bleeding, however light",
                note: "Log spotting and light bleeding as separate events from full periods. This helps distinguish anovulatory bleeding from true menstruation — and the distinction matters.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why tracking helps even without regular periods</h2>

          <p>
            The value of tracking with PCOS isn&apos;t primarily predictive — it&apos;s documentary. A six-month log of symptoms, bleeding events, and ovulation signs creates a picture of your cycle that&apos;s vastly more useful to an endocrinologist or gynaecologist than the description you can recall from memory in a short appointment.
          </p>
          <p>
            It also helps you notice things that would otherwise be invisible. A cluster of symptoms that appears every 45–55 days might indicate your body is attempting ovulation even without producing a full period. Changes in that pattern — symptoms appearing more or less frequently, a period arriving after a long absence — become visible when you&apos;re logging consistently.
          </p>
          <p>
            Over time, tracking reveals whether your PCOS pattern is shifting. Many women find that lifestyle changes, treatment, or simply aging affects their cycle length and ovulation frequency — but only those who are logging can see that change happening.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to see a doctor</h2>

          <p>
            If you haven&apos;t had a period in 90 days and pregnancy is ruled out, speak with your doctor. This is particularly important if you&apos;re not already under care for PCOS, as chronic anovulation warrants evaluation.
          </p>
          <p>
            Also see your doctor if you&apos;re experiencing new or worsening symptoms — increased facial hair, significant weight changes, unusual pain, or other PCOS-adjacent symptoms that are new or intensifying. And if you&apos;re trying to conceive, a gynaecologist or reproductive endocrinologist should be involved early in your planning.
          </p>
          <p>
            The log you bring to that appointment — whatever it contains — will be more useful than anything you can reconstruct from memory. Even an incomplete record of the last three months changes what your doctor can see.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and does not constitute medical advice. PCOS affects individuals differently, and management should be personalised to your situation. If you are experiencing missed periods or other symptoms, please speak with a qualified healthcare provider for evaluation and guidance.
          </p>

        </div>

        <RelatedArticles
          currentSlug="pcos-no-period"
          slugs={["pcos-cycle-tracking", "pcos-irregular-periods", "how-to-track-ovulation-pcos"]}
        />

        <BlogCTA variant="pcos" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
