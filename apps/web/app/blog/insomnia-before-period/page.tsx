import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Insomnia Before Your Period — What Your Cycle Is Trying to Tell You",
  description:
    "Waking up at 3am before your period isn't random. Here's what's happening hormonally — and why tracking the pattern matters more than the symptom itself.",
  openGraph: {
    title: "Insomnia Before Your Period — What Your Cycle Is Trying to Tell You",
    description:
      "Waking up at 3am before your period isn't random. Here's what's happening hormonally — and why tracking the pattern matters more than the symptom itself.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Insomnia%20Before%20Your%20Period&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="Insomnia Before Your Period — What Your Cycle Is Trying to Tell You"
        description="Waking up at 3am before your period isn't random. Here's what's happening hormonally — and why tracking the pattern matters more than the symptom itself."
        url="https://www.dawnphase.com/blog/insomnia-before-period"
        datePublished="2026-05-02"
        dateModified="2026-05-02"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>4 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Insomnia Before Your Period — What Your Cycle Is Trying to Tell You
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Waking up at 3am the week before your period isn&apos;t a sleep problem. It&apos;s a hormone signal.
          </p>

          <p>
            If it happens once, it&apos;s a bad night. If it happens every cycle at roughly the same time — that&apos;s your body communicating something specific.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why it happens in the luteal phase</h2>

          <p>
            In the days before your period, progesterone drops sharply. This drop affects your body temperature regulation and your production of melatonin — both of which directly impact sleep quality.
          </p>
          <p>
            The result: lighter sleep, more wake-ups, and that frustrating 3–4am window where your brain won&apos;t shut off.
          </p>
          <p>
            This is common. It&apos;s also something most women don&apos;t connect to their cycle because nobody told them to look for it.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The real signal isn&apos;t the insomnia — it&apos;s when it happens</h2>

          <p>
            If your sleep disruption shows up consistently in the last 5–7 days before your period, that&apos;s late luteal phase insomnia. That pattern tells you something about how your body handles the progesterone drop.
          </p>
          <p>
            Some women notice it gets worse under stress. Others find it correlates with heavier periods. Others see it tied to mood shifts the same week.
          </p>
          <p>
            You can&apos;t see any of that from one bad night. You can only see it across cycles.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What actually helps (and what doesn&apos;t)</h2>

          <p>
            General sleep advice — no screens, magnesium, cool room — can take the edge off. But if you&apos;re treating each bad night as a random event, you&apos;re missing the pattern.
          </p>
          <p>
            What helps more: knowing it&apos;s coming. When you can predict &ldquo;this is my luteal week, sleep may be rough,&rdquo; you stop fighting it and start working with it.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Tracking it changes how you respond to it</h2>

          <p>
            Women who track their symptoms across cycles start to notice: the insomnia lands on the same days, lasts roughly the same duration, and often comes with other signals — lower energy, more sensitivity, cravings.
          </p>
          <p>
            That context is what lets you actually manage it — not just endure it.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks when symptoms like sleep disruption appear in your cycle and shows you the pattern across months.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              See how this shows up in your cycle — start free, no card needed
            </a>
          </div>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. If sleep disruption is significantly affecting your quality of life, speak with your healthcare provider.
          </p>

        </div>

        <RelatedArticles
          currentSlug="insomnia-before-period"
          slugs={["luteal-phase-symptoms", "tired-before-period", "pmdd-vs-pms"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
