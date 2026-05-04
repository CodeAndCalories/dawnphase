import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Mittelschmerz — Why Ovulation Pain Happens and What It Means Each Month",
  description:
    "That sharp pain on one side mid-cycle has a name: mittelschmerz. Here's what causes it, why it switches sides, and what the pattern tells you about your cycle.",
  openGraph: {
    title: "Mittelschmerz — Why Ovulation Pain Happens and What It Means Each Month",
    description:
      "That sharp pain on one side mid-cycle has a name: mittelschmerz. Here's what causes it, why it switches sides, and what the pattern tells you about your cycle.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Mittelschmerz%20%E2%80%94%20Ovulation%20Pain%20Explained&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="Mittelschmerz — Why Ovulation Pain Happens and What It Means Each Month"
        description="That sharp pain on one side mid-cycle has a name: mittelschmerz. Here's what causes it, why it switches sides, and what the pattern tells you about your cycle."
        url="https://www.dawnphase.com/blog/mittelschmerz-ovulation-pain"
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
          Mittelschmerz — Why Ovulation Pain Happens and What It Means Each Month
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            That sharp twinge on one side of your lower abdomen, roughly in the middle of your cycle — it has a name: mittelschmerz. It&apos;s German for &ldquo;middle pain,&rdquo; and it&apos;s more common than most people realize.
          </p>

          <p>
            If you&apos;ve ever wondered whether that feeling means something, it does.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What&apos;s actually happening</h2>

          <p>
            Mittelschmerz is <Link href="/blog/ovulation-symptoms" className="text-[#c94f68] hover:underline font-medium">ovulation</Link> pain. It occurs when a follicle on one of your ovaries ruptures to release an egg. The sensation can range from a brief twinge to a dull ache that lasts a few hours — occasionally up to a day or two.
          </p>
          <p>
            It typically happens 13–15 days before your next period, though this varies based on your cycle length.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why it switches sides</h2>

          <p>
            Your ovaries alternate ovulation — not on a strict schedule, but over time you&apos;ll often notice the pain alternates left and right. Some cycles it&apos;s one side, some it&apos;s the other, occasionally both.
          </p>
          <p>
            If you&apos;re tracking which side and when, you start to build a picture of your ovulation pattern over time. This is particularly useful if you have one ovary, <Link href="/conditions/pcos" className="text-[#c94f68] hover:underline font-medium">PCOS</Link>, or <Link href="/blog/pcos-irregular-periods" className="text-[#c94f68] hover:underline font-medium">irregular cycles</Link>.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When the pattern matters more than the pain</h2>

          <p>
            A single instance of mittelschmerz is just a data point. Across cycles, it becomes a map.
          </p>
          <p>
            Women who track it start to notice: does it land consistently on cycle day 14, or does it vary? Does it correlate with other symptoms — like discharge changes, energy shifts, or mood? Does it seem stronger in certain months?
          </p>
          <p>
            That information is genuinely useful — both for understanding your fertility window and for conversations with your doctor if you&apos;re experiencing pain that seems unusually intense or one-sided.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to speak with a doctor</h2>

          <p>
            Mild mittelschmerz is normal. If the pain is severe, lasts more than 2–3 days, or comes with fever, nausea, or unusual discharge, speak with your healthcare provider — these can occasionally indicate other conditions worth ruling out.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks ovulation-phase symptoms across your cycle and shows you when and how they pattern.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              See how this shows up in your cycle — start free, no card needed
            </a>
          </div>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. Always consult your healthcare provider about pain that concerns you.
          </p>

        </div>

        <RelatedArticles
          currentSlug="mittelschmerz-ovulation-pain"
          slugs={["ovulation-symptoms", "how-to-track-ovulation-pcos", "pcos-cycle-tracking"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
