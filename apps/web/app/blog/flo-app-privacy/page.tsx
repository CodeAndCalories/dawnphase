import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Flo App Privacy: What Actually Happens to Your Health Data",
  description:
    "Flo settled with the FTC in 2021 for sharing user health data with third parties. Here's what that means, what changed, and what to look for in a private period tracker.",
  openGraph: {
    title: "Flo App Privacy: What Actually Happens to Your Health Data",
    description:
      "Flo settled with the FTC in 2021 for sharing user health data with third parties. Here's what that means, what changed, and what to look for in a private period tracker.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Flo%20App%20Privacy%3A%20What%20Actually%20Happens%20to%20Your%20Health%20Data&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Flo App Privacy: What Actually Happens to Your Health Data"
        description="Flo settled with the FTC in 2021 for sharing user health data with third parties. Here's what that means, what changed, and what to look for in a private period tracker."
        url="https://www.dawnphase.com/blog/flo-app-privacy"
        datePublished="2026-05-06"
        dateModified="2026-05-06"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Flo App Privacy: What Actually Happens to Your Health Data
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            If you&apos;ve searched for information about Flo&apos;s privacy practices, you&apos;re not
            alone. It&apos;s one of the most searched topics around period tracking apps — and for
            good reason.
          </p>

          <p>
            This post covers what&apos;s on the public record, what questions to ask about any
            health app, and what privacy-first tracking actually looks like.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What Happened With Flo and the FTC
          </h2>

          <p>
            In January 2021, the FTC announced a settlement with Flo Health over allegations
            that the company shared users&apos; health data — including period and pregnancy
            information — with third-party analytics firms including Facebook and Google,
            despite promising users their data would be kept private.
          </p>

          <p>
            This is public record. The FTC settlement is documented on ftc.gov.
          </p>

          <p>As part of the settlement, Flo was required to:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Notify users about the data sharing</li>
            <li>Obtain user consent before sharing health data with third parties</li>
            <li>Have third parties delete data that had been shared</li>
          </ul>

          <p>
            Flo has since updated its privacy practices and launched an &ldquo;Anonymous
            Mode&rdquo; feature. Users should read Flo&apos;s current privacy policy directly to
            understand what applies today.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Why Period App Privacy Matters More Than Most
          </h2>

          <p>
            Health data is different from other personal data. Your cycle information can
            reveal:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Whether you&apos;re trying to conceive</li>
            <li>Pregnancy status</li>
            <li>Hormonal health conditions</li>
            <li>Medication use</li>
          </ul>

          <p>
            In the current legal environment in many US states, this data has real-world
            implications. It&apos;s worth understanding exactly what any app does with it.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Questions to Ask About Any Period Tracker
          </h2>

          <p>
            Before trusting a health app with your cycle data, ask these questions:
          </p>

          <div className="space-y-3">
            {[
              {
                label: "Does it run ads?",
                note: "Ad-supported apps have a financial incentive to share or use your data for targeting. Free apps often pay for themselves with your data.",
              },
              {
                label: "Does it share data with third parties?",
                note: "Read the privacy policy specifically for language about “analytics partners,” “advertising partners,” or “service providers.” These are the categories where sharing typically happens.",
              },
              {
                label: "Where is data stored?",
                note: "Is it on-device, on their servers, or both? Who has access?",
              },
              {
                label: "What happens if the company is acquired?",
                note: "Privacy policies can change after acquisition. Ovia’s history with employer data sharing followed its acquisition by Labcorp.",
              },
              {
                label: "Is there a way to delete your data?",
                note: "GDPR and CCPA give users rights to deletion. Check that the app has a clear process.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Looking for a{" "}
              <Link href="/blog/flo-alternative" className="text-[#c94f68] hover:underline font-medium">
                Flo alternative
              </Link>
              ? Dawn Phase is subscription-only — no ads, no data selling, no third-party
              analytics on your health data.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What Privacy-First Actually Looks Like
          </h2>

          <p>
            <Link href="/" className="text-[#c94f68] hover:underline font-medium">
              Dawn Phase
            </Link>{" "}
            was built with privacy as a core principle:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>No ads, ever</li>
            <li>No data selling</li>
            <li>No third-party analytics on health data</li>
            <li>You can delete your account and all data at any time</li>
          </ul>

          <p>
            It&apos;s not the only privacy-focused option — but it&apos;s worth knowing what to look
            for when the alternative is handing your most personal health data to a company
            with an ad business.
          </p>

          <p>7-day free trial, no card required. $14.99/month or $119/year.</p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Bottom Line</h2>

          <p>
            The FTC settlement with Flo is public record. What matters now is what any app
            does going forward — and whether their current privacy policy matches what they
            say publicly.
          </p>

          <p>
            Read the policy. Ask the questions above. Choose an app whose business model
            doesn&apos;t depend on monetizing your health data.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post references the FTC&apos;s 2021 settlement with Flo Health, which is
            publicly available at ftc.gov. All claims in this post are based on public
            records and official sources. This post is for informational purposes only and
            does not constitute legal or medical advice.
          </p>

        </div>

        <RelatedArticles
          currentSlug="flo-app-privacy"
          slugs={["period-tracker-data-privacy", "flo-alternative", "period-tracker-no-data-selling"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
