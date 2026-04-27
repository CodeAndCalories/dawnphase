import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Does Your Period Tracker Share Data With Facebook?",
  description:
    "Some period apps have faced scrutiny over data sharing. Here's what menstrual health data is typically collected, how to check what your app shares, and what privacy-first alternatives look like.",
  openGraph: {
    title: "Does Your Period Tracker Share Data With Facebook?",
    description:
      "Some period apps have faced scrutiny over data sharing. Here's what menstrual health data is typically collected, how to check what your app shares, and what privacy-first alternatives look like.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Does%20Your%20Period%20Tracker%20Share%20Data%20With%20Facebook%3F&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Does Your Period Tracker Share Data With Facebook?"
        description="Some period apps have faced scrutiny over data sharing. Here's what menstrual health data is typically collected, how to check what your app shares, and what privacy-first alternatives look like."
        url="https://www.dawnphase.com/blog/period-tracker-data-privacy"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>5 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Does Your Period Tracker Share Data With Facebook?
        </h1>

        <p className="text-sm text-[#8C6B5A] bg-[#FFF0F0] border border-[rgba(232,99,122,0.2)] rounded-lg p-3 mb-8">
          The information in this article is based on publicly available reporting and regulatory disclosures. Data sharing practices change over time — always check an app&apos;s current privacy policy directly.
        </p>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            The short answer: some have. A number of period tracking apps have previously faced regulatory scrutiny and public criticism over sharing menstrual health data with advertising platforms and analytics services. Whether your current app shares data — and with whom — depends on its business model and privacy policy.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How period apps have historically shared data</h2>
          <p>
            Many free or freemium period apps are built on an advertising model. In this model, the app is free because the data you generate — including health data — has commercial value. Some apps have used third-party analytics SDKs, advertising frameworks, and data broker integrations that caused sensitive health information to be transmitted to external platforms.
          </p>
          <p>
            Several period app companies have faced regulatory scrutiny over these practices. US regulators have examined cases where health information — including period dates, pregnancy intentions, and fertility tracking — was shared with advertising and analytics companies in ways that were allegedly inconsistent with the apps&apos; own privacy policies. These cases have resulted in consent orders and increased scrutiny of how health apps handle sensitive data.
          </p>
          <p>
            It is worth noting that companies&apos; practices change over time and in response to regulatory action. The current state of any particular app&apos;s data practices may differ significantly from what was reported in past cases. This article focuses on the general landscape and what to look for, rather than making current claims about specific products.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What data period apps typically collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Period start and end dates, cycle length, and flow details</li>
            <li>Mood, energy, and symptom logs</li>
            <li>Sexual activity and birth control method</li>
            <li>Pregnancy tests, fertility attempts, and conception goals</li>
            <li>Body weight, temperature, and other physical measurements</li>
            <li>Device identifiers, IP address, and usage patterns (often via third-party SDKs)</li>
          </ul>
          <p>
            This data is particularly sensitive because it can reveal reproductive health status, sexual behaviour, and family planning decisions — information that users may not wish to share with advertisers, insurers, or data brokers.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to check what your current app shares</h2>
          <div className="space-y-3">
            {[
              { step: "Read the privacy policy", desc: "Look specifically for sections on 'third-party sharing', 'advertising partners', 'analytics services', and 'data brokers'. If these sections are vague or absent, that is itself informative." },
              { step: "Check for analytics SDKs", desc: "Privacy analysis tools and mobile security researchers sometimes publish lists of apps that embed known tracking SDKs. These lists can reveal third-party integrations that are not disclosed in plain language." },
              { step: "Review app store privacy labels", desc: "Both Apple App Store and Google Play now require apps to disclose what data they collect and with whom it is shared. These labels are not always complete, but they are a starting point." },
              { step: "Look at the business model", desc: "If an app is free and supported by advertising, ask yourself what the ad revenue model requires. An app with no advertising model has less structural incentive to share your data." },
            ].map(({ step, desc }) => (
              <div key={step} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D]">{step}</p>
                <p className="text-sm text-[#8C6B5A] mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to look for in a privacy-first tracker</h2>
          <p>A genuinely privacy-first period app should:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Have an explicit, verifiable commitment to not selling data — stated clearly in its privacy policy, not just in marketing copy</li>
            <li>Have no third-party advertising integrations or data broker partnerships</li>
            <li>Operate on a subscription model (not advertising-funded)</li>
            <li>Allow you to export and delete your data at any time</li>
            <li>Store data in named infrastructure with clear data residency information</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How Dawn Phase is different</h2>
          <p>
            Dawn Phase is subscription-only — there is no free tier, no advertising, and no revenue from data. The business model is: you pay a subscription, and in exchange you get a tracker that works exclusively in your interest. There are no third-party advertising SDKs, no data broker relationships, and no ad platform integrations.
          </p>
          <p>
            Your data is stored in Cloudflare D1, encrypted at rest. You can export everything as a CSV from the Settings page at any time, and permanently delete your account and all associated data with a single action. These are not just policy commitments — they are built into how the product works.
          </p>
          <p>
            For a deeper look at the broader privacy landscape for period apps, see our guide:{" "}
            <Link href="/blog/period-tracker-no-data-selling" className="text-[#E8637A] hover:underline font-medium">The best period tracker that doesn&apos;t sell your data</Link>.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only. Data practices change — always verify directly with any app you use.
        </p>

        <RelatedArticles
          currentSlug="period-tracker-data-privacy"
          slugs={["period-tracker-no-data-selling", "flo-alternative", "natural-cycles-alternative"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track privately. No data selling.</h3>
          <p className="mb-6 opacity-90">Subscription-only. No ads. No third-party sharing. 7-day free trial.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
