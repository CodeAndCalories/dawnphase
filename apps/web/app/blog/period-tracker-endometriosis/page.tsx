import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Best Period Tracker for Endometriosis (2026)",
  description:
    "Endometriosis makes cycle tracking more important — and most apps aren't built for it. Here's what to look for in a tracker when you have endo.",
  openGraph: {
    title: "Best Period Tracker for Endometriosis (2026)",
    description:
      "Endometriosis makes cycle tracking more important — and most apps aren't built for it. Here's what to look for in a tracker when you have endo.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Best%20Period%20Tracker%20for%20Endometriosis%20(2026)&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
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
        title="Best Period Tracker for Endometriosis (2026)"
        description="Endometriosis makes cycle tracking more important — and most apps aren't built for it. Here's what to look for in a tracker when you have endo."
        url="https://www.dawnphase.com/blog/period-tracker-endometriosis"
        datePublished="2026-05-06"
        dateModified="2026-05-06"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Best Period Tracker for Endometriosis (2026)
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Endometriosis affects roughly 1 in 10 people with a uterus — yet most period
            tracking apps are built as if everyone has a textbook 28-day cycle with mild
            cramps and predictable periods.
          </p>

          <p>
            If you have endometriosis, you know that&apos;s not your reality. This post covers
            what to actually look for in a tracker when you have endo, and which apps come
            closest to meeting that need.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Why Standard Period Trackers Fall Short for Endo
          </h2>

          <p>
            Most apps are built around one core function: predicting your next period and
            fertile window. That&apos;s useful for some people. For someone with endometriosis,
            it misses almost everything that matters.
          </p>

          <p>Endometriosis can cause:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Cycles that are irregular, heavy, or unpredictable</li>
            <li>
              Pain that doesn&apos;t follow cycle phase the way textbooks suggest
            </li>
            <li>
              Symptoms that extend well beyond your period — pelvic pain, fatigue, bloating,
              painful sex, digestive symptoms
            </li>
            <li>Significant variation cycle to cycle</li>
          </ul>

          <p>
            A tracker that just predicts your next period tells you almost nothing useful
            about living with endo.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What a Good Endo Tracker Actually Needs
          </h2>

          <div className="space-y-3">
            {[
              {
                label: "Detailed symptom logging",
                note: "You need to be able to log pain location, pain intensity, type of pain (cramping, stabbing, aching), bloating, fatigue, digestive symptoms, and more — not just "mood" and "flow."",
              },
              {
                label: "Daily logging — not just period dates",
                note: "Endo symptoms don't just happen during your period. A tracker that only asks you to log when your period starts misses the 20+ other days where symptoms matter.",
              },
              {
                label: "Pattern recognition over time",
                note: "The real value of tracking with endo is spotting patterns across multiple cycles — does pain always spike at ovulation? Does fatigue peak in the luteal phase? You need months of data to see this.",
              },
              {
                label: "No assumptions about cycle length",
                note: "Apps that assume 28-day cycles and flag anything outside that as "irregular" are useless for endo. A good tracker accepts your cycle as it is.",
              },
              {
                label: "A record you can share with your doctor",
                note: "One of the most practical uses of cycle tracking with endo is bringing data to medical appointments. A clear log of symptoms, timing, and intensity is far more useful than trying to remember from memory.",
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
              Dawn Phase is built for daily symptom logging across pain, energy, mood,
              sleep, and flow — with pattern tracking over time. Subscription-only, no ads,
              no data selling.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            How the Main Apps Compare
          </h2>

          <div className="space-y-3">
            {[
              {
                name: "Flo",
                description:
                  "Has pain logging and some symptom tracking. Primarily built around fertile window prediction. Pain logging is basic — intensity only, no location or type. Raised privacy concerns in a 2021 FTC settlement over data sharing practices.",
              },
              {
                name: "Clue",
                description:
                  "One of the better mainstream options for symptom depth. Allows logging of pain, energy, sleep, digestion, and skin. Free tier is solid. Not specifically built for endo but flexible enough to be useful.",
              },
              {
                name: "Phendo",
                description:
                  "Built specifically for endometriosis research in partnership with Columbia University. Very detailed symptom logging. Data contributes to endo research. Worth knowing about if research participation interests you.",
              },
              {
                name: "Dawn Phase",
                description:
                  "Built for people with complex, irregular, or changing cycles — particularly those dealing with hormonal conditions. Focuses on daily symptom logging across energy, mood, pain, sleep, and flow. Pattern tracking over time. No assumptions about cycle length. Privacy-first — no ads, no data selling. Not endo-specific, but designed for exactly the kind of nuanced, day-by-day tracking that endo requires. 7-day free trial, no card required.",
              },
            ].map(({ name, description }) => (
              <div key={name} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{name}</p>
                <p className="text-sm text-[#3d2855] mt-1">{description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F3ECFA]">
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]"> </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Flo</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Clue</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Phendo</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Dawn Phase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Detailed symptom logging",
                    flo: "Basic",
                    clue: "Good",
                    phendo: "Very detailed",
                    dawn: "Good",
                  },
                  {
                    feature: "Daily logging (not just period)",
                    flo: "Yes",
                    clue: "Yes",
                    phendo: "Yes",
                    dawn: "Yes",
                  },
                  {
                    feature: "Endo-specific",
                    flo: "No",
                    clue: "No",
                    phendo: "Yes",
                    dawn: "No",
                  },
                  {
                    feature: "Irregular cycle support",
                    flo: "Limited",
                    clue: "Good",
                    phendo: "Good",
                    dawn: "Yes",
                  },
                  {
                    feature: "Privacy-first",
                    flo: "No (FTC settlement)",
                    clue: "—",
                    phendo: "Research data",
                    dawn: "Yes",
                  },
                  {
                    feature: "Price",
                    flo: "Free / $19.99",
                    clue: "Free / $14.99",
                    phendo: "Free",
                    dawn: "$14.99",
                  },
                ].map(({ feature, flo, clue, phendo, dawn }) => (
                  <tr key={feature} className="border-b border-[#E6D7F3]">
                    <td className="px-4 py-3 font-medium text-[#3d2855] border border-[#E6D7F3] bg-white">{feature}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{flo}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{clue}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{phendo}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-[#F3ECFA]">{dawn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#7a5a8a]">
            Pricing based on publicly available rates as of 2026. Check each app&apos;s website
            for current pricing.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Bottom Line</h2>

          <p>
            If you have endometriosis and want to track seriously, the most important thing
            is daily logging depth — not just period prediction. Clue and Dawn Phase are
            both solid general options. Phendo is worth looking at if you want
            endo-specific features and are open to contributing to research.
          </p>

          <p>
            Whatever you choose, the goal is the same: build a record of your symptoms over
            time that helps you understand your patterns and advocate for yourself with your
            healthcare team.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post is for informational purposes only and does not constitute medical
            advice. Endometriosis is a medical condition — if you think you may have it,
            please consult a qualified healthcare provider. Diagnosis typically requires
            laparoscopy.
          </p>

        </div>

        <RelatedArticles
          currentSlug="period-tracker-endometriosis"
          slugs={["endometriosis-symptom-tracking", "tracking-endometriosis-diary", "period-tracker-data-privacy"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
