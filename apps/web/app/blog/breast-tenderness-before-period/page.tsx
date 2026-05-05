import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Breast Tenderness Before Your Period — Why It Happens and What the Pattern Means",
  description:
    "Sore, heavy breasts in the days before your period is one of the most common cycle symptoms — and one of the most telling. Here's the hormonal reason and what tracking it reveals.",
  openGraph: {
    title: "Breast Tenderness Before Your Period — Why It Happens and What the Pattern Means",
    description:
      "Sore, heavy breasts in the days before your period is one of the most common cycle symptoms — and one of the most telling. Here's the hormonal reason and what tracking it reveals.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Breast%20Tenderness%20Before%20Period&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="Breast Tenderness Before Your Period — Why It Happens and What the Pattern Means"
        description="Sore, heavy breasts in the days before your period is one of the most common cycle symptoms — and one of the most telling. Here's the hormonal reason and what tracking it reveals."
        url="https://www.dawnphase.com/blog/breast-tenderness-before-period"
        datePublished="2026-05-04"
        dateModified="2026-05-04"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>5 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Breast Tenderness Before Your Period — Why It Happens and What the Pattern Means
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            That familiar heaviness and tenderness in the days before your period — it&apos;s not random, and it&apos;s not just something you have to accept. It&apos;s a hormonal signal, and the pattern it makes across your cycle is telling you something specific.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why it happens</h2>

          <p>
            Breast tissue is highly sensitive to oestrogen and progesterone — both of which peak during the <Link href="/blog/luteal-phase-symptoms" className="text-[#c94f68] hover:underline font-medium">luteal phase</Link> (the second half of your cycle, after ovulation). As these hormones rise, they stimulate breast tissue and cause fluid retention, which creates the heaviness and sensitivity many women feel.
          </p>
          <p>
            When progesterone drops sharply in the days before your period, the sudden hormonal shift can actually intensify the tenderness rather than relieve it. For most women, it resolves within a day or two of their period starting — which is the hormonal pattern you can watch for.
          </p>
          <p>
            This is sometimes called cyclic mastalgia — breast pain that follows the cycle consistently. It&apos;s extremely common. Up to 70% of women experience it at some point. Common doesn&apos;t mean you have to live with it at its worst, though.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why it varies cycle to cycle</h2>

          <p>
            If you&apos;ve noticed that some months your breasts are barely tender and others you can&apos;t bear to hug someone, that variation is real. Several things affect how intense it gets.
          </p>
          <p>
            <strong>Stress</strong> raises cortisol, which disrupts the balance between oestrogen and progesterone. High-stress cycles often come with worse breast tenderness. <strong>Caffeine</strong> is a well-documented amplifier — not for everyone, but for women who are sensitive to it, cutting back in the luteal phase makes a noticeable difference.
          </p>
          <p>
            <strong>PCOS and hormonal imbalance</strong> can make breast tenderness more pronounced. When progesterone is lower relative to oestrogen — a pattern common in PCOS — oestrogen&apos;s effect on breast tissue goes relatively unchecked. Women with <Link href="/blog/hormonal-imbalance-signs" className="text-[#c94f68] hover:underline font-medium">hormonal imbalances</Link> often report that breast tenderness is one of their most consistent and significant pre-period symptoms.
          </p>
          <p>
            <strong>Diet and fluid intake</strong> matter too. High sodium intake in the luteal phase increases water retention overall, including in breast tissue. Some women find their tenderness correlates directly with how much they&apos;ve eaten in a particular way that week.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks breast tenderness alongside other luteal symptoms and shows you which cycle days it consistently appears — so you can anticipate it instead of being ambushed by it.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start tracking — free, no card needed
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The pattern angle</h2>

          <p>
            The useful question isn&apos;t just &ldquo;does this happen?&rdquo; — it&apos;s &ldquo;when exactly, and is it changing?&rdquo; If tenderness consistently appears on cycle day 21 and resolves by day 2 of your period, that&apos;s a predictable hormonal pattern. If it&apos;s starting earlier this year than last year, or getting more intense, that shift is a signal worth paying attention to.
          </p>
          <p>
            Tenderness that correlates with heavier periods often suggests higher oestrogen activity overall. Tenderness that&apos;s getting worse over multiple cycles — particularly if it&apos;s becoming non-cyclic, meaning it doesn&apos;t fully resolve when your period starts — is worth discussing with a doctor.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The perimenopause note</h2>

          <p>
            If you&apos;re in your 40s and noticing that breast tenderness has intensified or become less predictable, perimenopause is a likely contributor. As <Link href="/blog/perimenopause-symptoms-checklist" className="text-[#c94f68] hover:underline font-medium">oestrogen fluctuates more dramatically</Link> in the years before menopause, breast tissue responds to those swings. Some women who barely noticed tenderness in their 30s find it much more significant in perimenopause.
          </p>
          <p>
            This isn&apos;t something you just have to tolerate. It&apos;s a pattern that&apos;s useful to document — both for your own understanding and for conversations with your healthcare provider.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to track</h2>

          <p>
            If breast tenderness is a consistent part of your cycle, these are the most useful things to log:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#3d2855]">
            <li>Which cycle days tenderness starts and stops</li>
            <li>Intensity on a 1–5 scale</li>
            <li>Whether it&apos;s both sides or one-sided</li>
            <li>Whether it correlates with heavier flow or other symptoms that week</li>
            <li>Any changes in caffeine, sodium, or stress level that cycle</li>
          </ul>
          <p>
            Three months of that data gives you a genuinely useful picture — both for your own understanding and for any medical conversation.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to see a doctor</h2>

          <p>
            Cyclic breast tenderness that resolves when your period starts is almost always benign. But some symptoms warrant prompt attention regardless of your cycle phase:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#3d2855]">
            <li>A new lump or thickening in the breast tissue</li>
            <li>Nipple discharge, especially if it&apos;s spontaneous or one-sided</li>
            <li>Pain that is one-sided only and doesn&apos;t follow your cycle pattern</li>
            <li>Skin changes — redness, dimpling, or texture changes</li>
            <li>Pain that is getting significantly worse or no longer resolves with your period</li>
          </ul>
          <p>
            Any of these should be checked, not waited out. <Link href="/blog/tired-before-period" className="text-[#c94f68] hover:underline font-medium">Pre-period symptoms</Link> that feel familiar are one thing; new symptoms are another.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. Breast tenderness has many causes. If you notice new lumps, discharge, or any changes to your breast tissue that concern you, seek medical attention promptly rather than waiting.
          </p>

        </div>

        <RelatedArticles
          currentSlug="breast-tenderness-before-period"
          slugs={["luteal-phase-symptoms", "perimenopause-symptoms-checklist", "tired-before-period"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
