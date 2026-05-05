import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Cramps But No Period — 8 Reasons Your Body Is Sending Mixed Signals",
  description:
    "Cramps without a period can mean several things — some completely normal, some worth paying attention to. Here's what's most likely happening and when to take note.",
  openGraph: {
    title: "Cramps But No Period — 8 Reasons Your Body Is Sending Mixed Signals",
    description:
      "Cramps without a period can mean several things — some completely normal, some worth paying attention to. Here's what's most likely happening and when to take note.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Cramps%20But%20No%20Period&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="Cramps But No Period — 8 Reasons Your Body Is Sending Mixed Signals"
        description="Cramps without a period can mean several things — some completely normal, some worth paying attention to. Here's what's most likely happening and when to take note."
        url="https://www.dawnphase.com/blog/period-cramps-but-no-period"
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
          Cramps But No Period — 8 Reasons Your Body Is Sending Mixed Signals
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            The cramps are there. The period isn&apos;t. If you&apos;re sitting with that confusing combination, you&apos;re not imagining it — and you&apos;re not alone.
          </p>

          <p>
            Cramping without a period arriving is more common than most people realise, and it happens for a range of reasons. Some are completely normal cycle variations. Some point to conditions worth knowing about. And some are simply your body doing something that looks like period prep but isn&apos;t quite that yet.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">1. Ovulation cramping (mittelschmerz)</h2>

          <p>
            Mid-cycle cramping is one of the most frequently misidentified symptoms. If your cramps appear roughly 10–16 days before your expected period, they may be <Link href="/blog/mittelschmerz-ovulation-pain" className="text-[#c94f68] hover:underline font-medium">ovulation pain</Link> — sometimes called mittelschmerz, from the German for &ldquo;middle pain.&rdquo; It typically appears on one side and lasts anywhere from a few minutes to a couple of days.
          </p>
          <p>
            This isn&apos;t dangerous and doesn&apos;t need treatment. But it&apos;s useful data — ovulation cramping tells you when you likely ovulated, which helps you understand the rest of your cycle.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">2. Implantation cramping</h2>

          <p>
            If you&apos;ve had unprotected sex this cycle, cramping 6–12 days after ovulation could be implantation — a fertilised egg attaching to the uterine lining. The cramping is usually mild and brief, often accompanied by light spotting. This is the timing difference that distinguishes it from period cramps.
          </p>
          <p>
            If you suspect this might be what&apos;s happening, a pregnancy test after your missed period will give you a clear answer.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">3. PCOS and anovulatory cycles</h2>

          <p>
            Women with <Link href="/blog/pcos-no-period" className="text-[#c94f68] hover:underline font-medium">PCOS</Link> sometimes experience cramping without a true period following. In anovulatory cycles — when ovulation doesn&apos;t occur — the hormonal sequence that normally leads to a period is disrupted. The uterine lining may still shed, but the timing is unpredictable and the cramps may arrive without a clear period following in the expected window.
          </p>
          <p>
            If you have PCOS and cramps without a period are a recurring pattern for you, that&apos;s worth tracking specifically and discussing with your doctor.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">4. Endometriosis</h2>

          <p>
            Endometriosis causes tissue similar to the uterine lining to grow outside the uterus. Unlike period cramps, endometriosis pain isn&apos;t always tied to your period — it can appear at other points in the cycle, or persist throughout the month. If cramping is severe, consistent, and not clearly linked to your period timing, endometriosis is a condition worth ruling out with a specialist.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">5. Stress delaying your period</h2>

          <p>
            Physical or emotional stress can delay ovulation, which pushes your period back — sometimes by days, sometimes by weeks. Your body may begin the pre-period hormonal wind-down and cause cramping, but the period itself arrives later than expected. If you&apos;ve had an unusually stressful few weeks and your period is late but cramps are present, a delayed cycle is a likely explanation.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">6. Coming off hormonal birth control</h2>

          <p>
            When you stop hormonal contraception, your cycle takes time to re-establish itself. The first several months can involve cramping that doesn&apos;t map neatly to a period — your body is recalibrating its natural rhythm. This is normal but disorienting, especially if you were on hormonal contraception for several years and don&apos;t have a clear sense of what your natural cycle looked like before.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">7. Perimenopause</h2>

          <p>
            In the years leading up to menopause, cycles become less predictable. Ovulation may not occur every month, periods may be skipped or delayed, and cramping can appear without a period following in the usual window. If you&apos;re in your 40s and this pattern is new for you, <Link href="/blog/perimenopause-symptoms-checklist" className="text-[#c94f68] hover:underline font-medium">perimenopause</Link> is a likely contributor. Tracking when cramps appear relative to your actual periods (when they do arrive) helps you map what&apos;s changing.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">8. Digestive cramping</h2>

          <p>
            IBS and other digestive conditions produce cramping that can feel remarkably similar to period pain — lower abdominal, sometimes severe, often cyclical in its own rhythm. IBS symptoms frequently worsen during the luteal phase due to the effect of progesterone on the digestive system, which makes the overlap even more confusing. If your &ldquo;period cramps&rdquo; are accompanied by bloating, changes in bowel habits, or gas, digestive causes are worth considering.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks cramps alongside cycle timing so you can see whether they appear pre-period, mid-cycle, or independently — across multiple cycles.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start tracking — free, no card needed
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why the pattern matters more than one instance</h2>

          <p>
            If you had cramps without a period once, it could be almost anything from this list. One data point tells you very little. What&apos;s actually useful is knowing: does this happen repeatedly? At the same point in the cycle? With or without other symptoms? Does a period eventually follow, and if so, how many days later?
          </p>
          <p>
            That kind of pattern data — &ldquo;I get cramps on day 18–20, period arrives day 30&rdquo; across three or four cycles — tells a story. It distinguishes a <Link href="/blog/period-late-not-pregnant" className="text-[#c94f68] hover:underline font-medium">delayed period</Link> from an irregular cycle from something that needs investigating. It&apos;s also exactly what makes doctor conversations productive rather than vague.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to see a doctor</h2>

          <p>
            See a healthcare provider if:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#3d2855]">
            <li>Cramping is severe and disrupting daily life</li>
            <li>You have a new pattern that&apos;s significantly different from your norm</li>
            <li>Cramps are accompanied by fever, unusual discharge, or other symptoms</li>
            <li>You&apos;ve missed more than one period and pregnancy has been ruled out</li>
            <li>Pain is consistent throughout the month rather than cycle-linked</li>
          </ul>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. Cramping without a period has many causes, ranging from normal cycle variations to conditions requiring treatment. If you experience severe pain or a significant change in your cycle pattern, speak with your healthcare provider.
          </p>

        </div>

        <RelatedArticles
          currentSlug="period-cramps-but-no-period"
          slugs={["pcos-no-period", "period-late-not-pregnant", "mittelschmerz-ovulation-pain"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
