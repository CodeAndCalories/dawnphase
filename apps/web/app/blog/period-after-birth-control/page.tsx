import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Your First Period After Stopping Birth Control",
  description:
    "What to expect after stopping the pill or hormonal birth control — timeline, irregular cycles, what to track, and when to see a doctor.",
  openGraph: {
    title: "Your First Period After Stopping Birth Control",
    description:
      "What to expect after stopping the pill or hormonal birth control — timeline, irregular cycles, what to track, and when to see a doctor.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Your%20First%20Period%20After%20Stopping%20Birth%20Control&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Your First Period After Stopping Birth Control"
        description="What to expect after stopping the pill or hormonal birth control — timeline, irregular cycles, what to track, and when to see a doctor."
        url="https://www.dawnphase.com/blog/period-after-birth-control"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Your First Period After Stopping Birth Control
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Recovery timelines vary widely. If you have concerns about your cycle after stopping hormonal contraception, consult a healthcare provider.
          </p>
        </div>

        <div className="text-[#140c18] space-y-6 leading-relaxed">
          <p className="text-lg text-[#3d2855]">
            Stopping hormonal birth control after months or years of use is a significant hormonal transition. Your first few cycles can look and feel very different from what you&apos;re used to — and that&apos;s often entirely normal.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What is a &ldquo;withdrawal bleed&rdquo; vs a real period?</h2>
          <p>
            While on combined hormonal contraceptives (pill, patch, ring), the monthly bleed is a withdrawal bleed triggered by stopping the hormones — not a true menstrual period. True periods are preceded by ovulation; withdrawal bleeds are not. This distinction matters because it means your cycle hasn&apos;t been functioning in its usual hormonal rhythm while you&apos;ve been on hormonal contraception.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When will your first real period arrive?</h2>
          <p>
            Most people have their first true period within four to eight weeks of stopping combined hormonal contraceptives, once the body resumes its natural cycle. Progestogen-only methods (mini-pill, hormonal IUD, injection) have different timelines:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Combined pill:</strong> cycles often resume within four to eight weeks</li>
            <li><strong>Progestogen-only pill:</strong> can resume relatively quickly, sometimes within weeks</li>
            <li><strong>Hormonal IUD (Mirena):</strong> cycles often resume soon after removal</li>
            <li><strong>Injection (Depo-Provera):</strong> may take several months to over a year for regular cycles to return</li>
          </ul>
          <p>These are general patterns — individual timelines vary considerably.</p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why are cycles irregular at first?</h2>
          <p>
            Hormonal contraceptives work by suppressing the hormonal axis that drives ovulation (the hypothalamic-pituitary-ovarian axis). After stopping, the body needs to re-establish this rhythm. The hypothalamus and pituitary gland gradually resume sending the hormonal signals that prompt follicle development and ovulation. This recalibration takes time, and until the cycle stabilises, periods may be irregular in timing, flow, and duration.
          </p>
          <p>
            Research suggests that for most people, cycles normalise within three to six months. For some, particularly those on longer-acting methods or those who had irregular cycles before starting contraception, it may take longer.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What your first cycles may be like</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Heavier or more painful periods:</strong> Prostaglandin production — which drives uterine contractions and pain — was suppressed by hormonal contraception. Your first natural periods may involve more cramping and heavier flow than the withdrawal bleeds you were used to.</li>
            <li><strong>Longer or shorter cycles:</strong> It&apos;s common to see cycle lengths varying from 21 to 40+ days in the months after stopping, until the hormonal axis stabilises.</li>
            <li><strong>New symptoms:</strong> PMS, bloating, mood shifts, and breast tenderness — all suppressed by hormonal contraception — may appear or feel intensified as your natural hormone cycle reasserts itself.</li>
            <li><strong>Skin changes:</strong> Acne that was being managed by the pill may return, sometimes more noticeably than before.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to track during the transition</h2>
          <p>
            Tracking your cycle from the day you stop is genuinely useful. Record:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Period start and end dates</li>
            <li>Flow intensity and characteristics</li>
            <li>Daily symptoms — mood, energy, cramps, skin changes</li>
            <li>Cervical mucus, if you&apos;re monitoring for ovulation signs</li>
          </ul>
          <p>
            After three to four months you&apos;ll have a baseline that shows whether your cycle is settling into a regular pattern, and you&apos;ll have data to share with your doctor if needed.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to see a doctor</h2>
          <p>See a healthcare provider if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You have had no period for around three months or longer after stopping a combined pill or progestogen-only pill (this is called post-pill amenorrhoea and warrants investigation)</li>
            <li>Cycles remain highly irregular (under 21 days or over 45 days) after six months</li>
            <li>Periods become extremely heavy or painful</li>
            <li>You have symptoms that suggest you may not be ovulating (no discernible cycle pattern, no changes in cervical mucus)</li>
            <li>You are trying to conceive and cycles have not returned</li>
          </ul>
        </div>

        <p className="text-xs text-[#3d2855] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="period-after-birth-control"
          slugs={["ovulation-symptoms", "pcos-cycle-tracking", "how-long-should-period-last"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
