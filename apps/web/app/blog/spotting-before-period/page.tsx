import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Spotting Before Your Period — What Your Cycle Is Trying to Tell You",
  description:
    "That light spotting or brown discharge before your period isn't always random. Here's what causes it, when it's normal, and what the pattern reveals about your cycle health.",
  openGraph: {
    title: "Spotting Before Your Period — What Your Cycle Is Trying to Tell You",
    description:
      "That light spotting or brown discharge before your period isn't always random. Here's what causes it, when it's normal, and what the pattern reveals about your cycle health.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Spotting%20Before%20Your%20Period&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="Spotting Before Your Period — What Your Cycle Is Trying to Tell You"
        description="That light spotting or brown discharge before your period isn't always random. Here's what causes it, when it's normal, and what the pattern reveals about your cycle health."
        url="https://www.dawnphase.com/blog/spotting-before-period"
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
          Spotting Before Your Period — What Your Cycle Is Trying to Tell You
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            A few spots of brown or pink discharge before your period starts — is it your period? Something else entirely? Here&apos;s how to tell, and what it means when it keeps happening.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What spotting actually is</h2>

          <p>
            Spotting is light bleeding — much lighter than your period, usually brown or pink rather than red. Brown discharge is simply older blood that took longer to leave the body; it oxidises on the way out and darkens. Pink spotting is fresher blood mixed with cervical fluid.
          </p>
          <p>
            The difference between spotting and your period starting is volume and duration. Spotting doesn&apos;t fill a pad or tampon — it&apos;s a few spots on your underwear that appear and stop within a day or two. Your period, even a light one, is a sustained flow. If you&apos;re not sure which you&apos;re dealing with, that ambiguity itself is worth noting.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The most common causes</h2>

          <p>
            Pre-period spotting has several distinct causes. The timing within your cycle is one of the clearest ways to tell them apart.
          </p>

          <p>
            <strong>Luteal phase hormonal shift.</strong> In the days before your period, progesterone drops sharply as the corpus luteum breaks down. This can cause a small amount of spotting — your uterine lining beginning to respond before your period officially begins. This is the most common cause of spotting 1–3 days before your period and is generally considered normal.
          </p>

          <p>
            <strong>Low progesterone.</strong> If your <Link href="/blog/luteal-phase-symptoms" className="text-[#c94f68] hover:underline font-medium">luteal phase</Link> is short or progesterone doesn&apos;t peak adequately, spotting can start earlier — up to a week before your period. This is common in women with PCOS, where anovulatory cycles or weak ovulation mean progesterone production is lower than it should be.
          </p>

          <p>
            <strong>Ovulation spotting.</strong> Some women notice light spotting mid-cycle, around ovulation. This appears roughly 12–16 days before your period — not just before it — caused by the brief oestrogen drop that triggers egg release. If your spotting is mid-cycle rather than pre-period, this is likely the explanation.
          </p>

          <p>
            <strong>Implantation bleeding.</strong> This occurs 6–12 days after ovulation, is usually very light and brief — often a single day — and tends to appear pinkish or light brown. If you&apos;ve had unprotected sex this cycle, spotting at this timing is worth paying attention to.
          </p>

          <p>
            <strong>Hormonal birth control.</strong> If you&apos;re on hormonal contraception or have recently changed methods, breakthrough spotting is common while your body adjusts, especially in the first few months.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks when spotting appears in your cycle and shows you whether it&apos;s recurring at the same point each month — the pattern is what matters.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start tracking — free, no card needed
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">One instance vs a recurring pattern</h2>

          <p>
            A single instance of pre-period spotting means very little on its own. It could be stress, a disrupted cycle, or normal variation. But if spotting appears in the same window every cycle — always around day 24, always lasting two days — that&apos;s not coincidence. That&apos;s your body signalling something consistent about its hormonal rhythm.
          </p>
          <p>
            Recurring spotting that starts more than three days before your period, or that&apos;s getting more frequent or heavier over time, is worth bringing to a doctor. It can indicate a shortened luteal phase or low progesterone — both of which are investigatable and often manageable. You can&apos;t see that pattern from memory. You can only see it from data.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The PCOS connection</h2>

          <p>
            Spotting is more common and often less predictable in women with <Link href="/blog/pcos-cycle-tracking" className="text-[#c94f68] hover:underline font-medium">PCOS</Link>. When cycles are anovulatory — no egg is released — progesterone doesn&apos;t rise the way it should in the second half of the cycle. The result can be breakthrough bleeding or spotting at irregular times, rather than a clean period pattern.
          </p>
          <p>
            If you have PCOS and notice spotting that doesn&apos;t follow a clear pattern, careful tracking is genuinely useful. &ldquo;I spotted on day 18 and again on day 24 this cycle&rdquo; is far more useful to a doctor than &ldquo;I sometimes spot before my period.&rdquo; Specificity is what turns <Link href="/blog/hormonal-imbalance-signs" className="text-[#c94f68] hover:underline font-medium">hormonal signals</Link> into actionable information.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to see a doctor</h2>

          <p>
            Pre-period spotting that starts 1–2 days before your period and is brown or light pink is usually normal. These patterns are worth a conversation with your GP or gynaecologist:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#3d2855]">
            <li>Spotting or bleeding between periods that isn&apos;t tied to the luteal phase</li>
            <li>Spotting after sex</li>
            <li>Pre-period spotting starting significantly earlier than usual, or increasing in volume over time</li>
            <li>Any new or changing spotting pattern with no obvious cause</li>
          </ul>
          <p>
            These don&apos;t automatically signal a problem — but they&apos;re patterns worth investigating rather than normalising without looking into.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. Spotting has a range of causes, some normal and some worth investigating. If you have concerns about your cycle or any new or changing symptoms, speak with your healthcare provider.
          </p>

        </div>

        <RelatedArticles
          currentSlug="spotting-before-period"
          slugs={["luteal-phase-symptoms", "hormonal-imbalance-signs", "pcos-cycle-tracking"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
