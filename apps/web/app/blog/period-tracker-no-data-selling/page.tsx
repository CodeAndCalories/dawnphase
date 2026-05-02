import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "The Best Period Tracker That Doesn't Sell Your Data (2026)",
  description:
    "Period apps have a data problem. Here's what Flo, Clue and others actually do with your cycle data — and how to choose a private period tracker.",
  openGraph: {
    title: "The Best Period Tracker That Doesn't Sell Your Data (2026)",
    description:
      "Period apps have a data problem. Here's what Flo, Clue and others actually do with your cycle data — and how to choose a private period tracker.",
    images: [{
      url: "https://www.dawnphase.com/og?title=The%20Best%20Period%20Tracker%20That%20Doesn't%20Sell%20Your%20Data%20(2026)&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="The Best Period Tracker That Doesn't Sell Your Data (2026)"
        description="Period apps have a data problem. Here's what Flo, Clue and others actually do with your cycle data — and how to choose a private period tracker."
        url="https://www.dawnphase.com/blog/period-tracker-no-data-selling"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          The Best Period Tracker That Doesn&apos;t Sell Your Data (2026)
        </h1>

        <div className="prose prose-slate max-w-none text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            Your cycle data is among the most sensitive information you generate. Yet millions of women hand it over to apps that treat it as a commodity. Here&apos;s what&apos;s really happening — and how to stop it.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why period app data privacy matters</h2>

          <p>
            In 2021, the Norwegian Consumer Council found that Flo Health was sharing intimate user data — including period dates, pregnancy intentions, and mood logs — with Facebook, AppsFlyer, and Fabric. In 2023, Flo settled with the FTC over allegations of sharing that data without meaningful consent.
          </p>
          <p>
            Period tracking data is uniquely sensitive because it can reveal pregnancy status, sexual activity, reproductive health decisions, and — in a post-Roe landscape — whether someone has missed a period around the time of an unwanted pregnancy. In several US states this data could theoretically be subpoenaed.
          </p>
          <p>
            What gets collected by most mainstream period apps:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Period start and end dates</li>
            <li>Flow intensity and spotting notes</li>
            <li>Mood and energy logs</li>
            <li>Sexual activity and birth control use</li>
            <li>Pregnancy tests and fertility attempts</li>
            <li>Location data (often via third-party SDKs)</li>
            <li>Device identifiers linked to ad networks</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What apps actually do with your data</h2>

          <p>
            Most period apps operate on a freemium model: the core tracking is free, but the real product is you. Your anonymised (and sometimes not-so-anonymised) health data is sold to data brokers, insurance companies, pharmaceutical advertisers, and fertility clinics.
          </p>
          <p>
            Even apps that claim to &ldquo;anonymise&rdquo; data have been shown to de-anonymise it. Researchers at Berkeley demonstrated in 2019 that combining cycle length, age, and location narrows identification to a handful of individuals in most datasets.
          </p>
          <p>
            Subscription apps are not automatically safer. Paying for an app does not prevent the company from monetising your data — it just means they&apos;re double-dipping. Read the privacy policy, not the marketing copy.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to look for in a private period tracker</h2>

          <p>When evaluating a period tracker for privacy, look for these specifics:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No third-party analytics or advertising SDKs</strong> — Google Analytics, Facebook Pixel, and AppsFlyer inside a period app are red flags.</li>
            <li><strong>A clear, plain-English privacy policy</strong> — &ldquo;We never sell your data&rdquo; should be a named commitment, not buried in legalese.</li>
            <li><strong>Data export</strong> — you should be able to download everything you&apos;ve logged in a portable format like CSV.</li>
            <li><strong>Account deletion</strong> — deleting your account should actually delete your data, not just deactivate it.</li>
            <li><strong>No advertising model</strong> — if the app is free and shows ads, your data is the product.</li>
            <li><strong>Transparent infrastructure</strong> — knowing where data is stored and who has access matters.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Dawn Phase: built privacy-first from day one</h2>

          <p>
            Dawn Phase was built with a single founding principle: your body data is yours. That means:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No third-party analytics. No advertising SDKs. No data brokers.</li>
            <li>Data stored in Cloudflare D1 — encrypted at rest, never shared.</li>
            <li>Export your data as CSV at any time from Settings.</li>
            <li>Delete your account — and all your data — instantly from Settings.</li>
            <li>The business model is simple: you pay a subscription. That&apos;s it.</li>
          </ul>
          <p>
            We don&apos;t use your cycle data to train AI models, sell to insurers, or target you with fertility ads. We just use it to show you your own patterns.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">FAQ: period app privacy</h2>

          <div className="space-y-5 bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] p-6">
            <div>
              <p className="font-semibold text-[#2D1B1E]">Can period tracking apps be subpoenaed?</p>
              <p className="text-[#8C6B5A] mt-1 text-sm">Yes. In the US, if a company holds your data, law enforcement can subpoena it. The safest protection is choosing an app that stores minimal data and offers end-to-end encryption or on-device storage.</p>
            </div>
            <div>
              <p className="font-semibold text-[#2D1B1E]">Is Flo period tracker safe to use?</p>
              <p className="text-[#8C6B5A] mt-1 text-sm">Flo settled with the FTC in 2023 over sharing data with third parties. They have since introduced &ldquo;Anonymous Mode&rdquo; — but this requires manually opting in and still stores data on their servers.</p>
            </div>
            <div>
              <p className="font-semibold text-[#2D1B1E]">What is the most private period tracker?</p>
              <p className="text-[#8C6B5A] mt-1 text-sm">Apps built without an advertising model and with explicit no-sell commitments in their privacy policy are safest. Dawn Phase, Drip (on-device), and Euki are frequently cited by privacy advocates.</p>
            </div>
          </div>

        </div>

        <RelatedArticles
          currentSlug="period-tracker-no-data-selling"
          slugs={["flo-alternative", "perimenopause-symptoms-checklist", "pmdd-vs-pms"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
