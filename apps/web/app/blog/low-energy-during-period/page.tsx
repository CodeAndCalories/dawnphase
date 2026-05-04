import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Low Energy During Your Period — What Your Cycle Is Actually Telling You",
  description:
    "Period fatigue isn't weakness. It's a hormone signal. Here's why energy crashes during your period and what the pattern reveals about your cycle health.",
  openGraph: {
    title: "Low Energy During Your Period — What Your Cycle Is Actually Telling You",
    description:
      "Period fatigue isn't weakness. It's a hormone signal. Here's why energy crashes during your period and what the pattern reveals about your cycle health.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Low%20Energy%20During%20Your%20Period&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="Low Energy During Your Period — What Your Cycle Is Actually Telling You"
        description="Period fatigue isn't weakness. It's a hormone signal. Here's why energy crashes during your period and what the pattern reveals about your cycle health."
        url="https://www.dawnphase.com/blog/low-energy-during-period"
        datePublished="2026-05-02"
        dateModified="2026-05-02"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>5 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Low Energy During Your Period — What Your Cycle Is Actually Telling You
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            The exhaustion that hits on day 1 or 2 of your period isn&apos;t in your head. It&apos;s not weakness, and it&apos;s not something to push through by default. It&apos;s your body doing several demanding things at once.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why your energy drops when your period starts</h2>

          <p>
            Three things happen simultaneously at the start of your period that directly affect energy:
          </p>
          <p>
            <strong>Oestrogen and <Link href="/blog/hormonal-imbalance-signs" className="text-[#c94f68] hover:underline font-medium">progesterone</Link> both drop.</strong> These hormones have been declining through your late <Link href="/blog/luteal-phase-symptoms" className="text-[#c94f68] hover:underline font-medium">luteal phase</Link> — now they bottom out. Oestrogen in particular influences serotonin and dopamine levels, so its crash affects mood and motivation, not just physical energy.
          </p>
          <p>
            <strong>Prostaglandins spike.</strong> These are the compounds that trigger uterine contractions to shed the lining. They also cause inflammation and can produce systemic symptoms — fatigue, nausea, headaches, loose stools — in women who produce higher levels of them.
          </p>
          <p>
            <strong>Iron loss begins.</strong> If your flow is heavy, iron stores start dropping. Iron is essential for oxygen transport — low iron means cells are getting less oxygen, and fatigue follows. This effect is cumulative and becomes more significant if your periods are heavy cycle after cycle.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The pattern tells you more than the symptom</h2>

          <p>
            &ldquo;Tired during my period&rdquo; is vague. What&apos;s actually useful to know:
          </p>
          <p>
            Does the fatigue hit on day 1 or day 2? Does it correlate with flow heaviness — worse on your heaviest days? Does it last 24 hours or four days? Does it come with cramps or headaches, or is it fatigue alone?
          </p>
          <p>
            These specifics matter because they point to different causes. Day 1 exhaustion driven by prostaglandins feels different from day 3 fatigue driven by iron loss. One responds to anti-inflammatories; the other responds to iron-rich food and rest.
          </p>
          <p>
            You can&apos;t distinguish these from a single cycle. You can only see the pattern across months.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase logs your energy levels alongside flow and other symptoms, and shows you exactly when fatigue tends to land in your cycle — and what it correlates with.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Track your pattern — start free, no card needed
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">If you have PCOS or are in perimenopause</h2>

          <p>
            Period fatigue can be more pronounced in both cases, and for different reasons.
          </p>
          <p>
            With <Link href="/conditions/pcos" className="text-[#c94f68] hover:underline font-medium">PCOS</Link>, longer cycles mean a more dramatic hormonal shift when the period finally arrives. Heavier or more prolonged bleeding — common with PCOS — accelerates iron loss. And if cycles are anovulatory (no ovulation occurred), the progesterone drop at the start of bleeding can be more abrupt.
          </p>
          <p>
            In <Link href="/conditions/perimenopause" className="text-[#c94f68] hover:underline font-medium">perimenopause</Link>, declining oestrogen baseline means the drop at period onset lands lower than it used to. Cycles may also become heavier before they become lighter and more irregular — which compounds the iron loss effect. Women often notice their period fatigue gets worse in their 40s even when their cycle hasn&apos;t changed much on the surface.
          </p>
          <p>
            In both cases, it&apos;s worth tracking menstrual energy separately from general fatigue — because the pattern is specific to your cycle, and seeing it clearly is the first step to managing it.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What actually helps</h2>

          <p>
            None of this is useful without knowing your own pattern first. But once you do:
          </p>

          <div className="space-y-3">
            {[
              { label: "Iron-rich food in the days before and during your period", note: "Red meat, leafy greens, lentils. If your flow is consistently heavy, talk to your doctor about checking ferritin levels." },
              { label: "Reducing inflammatory load", note: "Anti-inflammatory foods, reducing alcohol in the week before your period. If prostaglandins are the driver, this can reduce their intensity." },
              { label: "Scheduling around your cycle", note: "Knowing day 1–2 will be low energy lets you avoid scheduling high-demand tasks on those days. Not always possible, but when it is, it changes the experience." },
              { label: "Rest without guilt", note: "Your body is doing significant work. Rest on menstrual day 1 isn't indulgence — it's appropriate biology." },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. If fatigue during your period is significantly affecting your quality of life, speak with your healthcare provider.
          </p>

        </div>

        <RelatedArticles
          currentSlug="low-energy-during-period"
          slugs={["tired-before-period", "luteal-phase-symptoms", "pcos-cycle-tracking"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
