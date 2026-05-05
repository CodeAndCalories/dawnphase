import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Looking for a Stardust App Alternative? Here's What to Know (2026)",
  description:
    "Thinking about switching from Stardust? Here's what the app does well, where it falls short, and what to look for in a cycle tracker that actually fits your life.",
  openGraph: {
    title: "Looking for a Stardust App Alternative? Here's What to Know (2026)",
    description:
      "Thinking about switching from Stardust? Here's what the app does well, where it falls short, and what to look for in a cycle tracker that actually fits your life.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Stardust%20App%20Alternative%202026&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
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
        title="Looking for a Stardust App Alternative? Here's What to Know (2026)"
        description="Thinking about switching from Stardust? Here's what the app does well, where it falls short, and what to look for in a cycle tracker that actually fits your life."
        url="https://www.dawnphase.com/blog/stardust-app-alternative"
        datePublished="2026-05-05"
        dateModified="2026-05-05"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>5 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Looking for a Stardust App Alternative? Here&apos;s What to Know (2026)
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Stardust built a loyal following by combining astrology with period tracking — and for a lot of people, that combination clicked. But search interest for alternatives has been growing, and the reasons are worth understanding before you switch.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What Stardust Actually Does</h2>

          <p>
            Stardust is a period and cycle tracker that layers moon phases and astrological context on top of standard cycle predictions. It tells you where you are in your cycle, ties that to lunar cycles, and frames your moods and energy through an astrology lens.
          </p>
          <p>
            It&apos;s genuinely fun, well-designed, and resonated with a specific audience — people who find meaning in astrology and wanted their health app to reflect that.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why People Look for Alternatives</h2>

          <p>
            Based on app store reviews and community discussions, the most common reasons people start looking elsewhere:
          </p>

          <div className="space-y-3">
            {[
              {
                label: "Privacy concerns",
                note: "In 2023, Stardust faced significant backlash after updating its privacy policy following the Dobbs decision. The app initially marketed itself as privacy-first for abortion safety, then updated terms that raised questions about data sharing. This is public record and was covered widely. Users should read Stardust's current privacy policy directly and make their own judgment.",
              },
              {
                label: "Astrology without depth",
                note: "Some users find the astrology framing fun but feel the actual health tracking is surface level. No real symptom logging, no pattern analysis, no insights over time.",
              },
              {
                label: "Built for regular cycles",
                note: "Stardust's predictions work best with consistent cycles. If yours are irregular, changing, or you're in perimenopause, the algorithm isn't reliable for you.",
              },
              {
                label: "No perimenopause support",
                note: "The app skews young. There's no content or features built around hormonal changes, cycle irregularity, or the transition into perimenopause.",
              },
              {
                label: "Wants more than a moon calendar",
                note: "Some users start wanting actual health data — not just \"mercury is in retrograde, expect brain fog.\" They want to see their own patterns, not just astrological ones.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to Look for Instead</h2>

          <h3 className="text-lg font-bold text-[#140c18] mt-6">If you love the astrology angle but want real tracking too</h3>

          <p>
            This is actually a gap in the market. Most apps are either astrology-flavored (fun, shallow) or clinical trackers (useful, cold). Not many do both.
          </p>
          <p>
            Dawn Phase tracks your cycle and symptoms the way a health app should — logging energy, mood, sleep, pain, flow — and includes a Cosmic View feature that maps your cycle to moon phases and your birth chart. You get the astrology context you actually want, plus real data about your own body over time.
          </p>
          <p>
            It&apos;s built specifically for women in their 30s and 40s — particularly those navigating <Link href="/conditions/perimenopause" className="text-[#c94f68] hover:underline font-medium">perimenopause</Link> or hormonal shifts — who want to understand their patterns, not just get a daily horoscope.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase is a cycle and symptom tracker built for <Link href="/conditions/perimenopause" className="text-[#c94f68] hover:underline font-medium">perimenopause</Link> and <Link href="/symptoms/irregular-periods" className="text-[#c94f68] hover:underline font-medium">irregular cycles</Link>. Astrology built in. Subscription-only — no ads, no data selling.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h3 className="text-lg font-bold text-[#140c18] mt-6">If you just want straightforward cycle tracking</h3>

          <p>
            Clue and Flo are both solid free options with optional paid tiers. Neither has an astrology angle but both have large user bases and reliable tracking.
          </p>

          <h3 className="text-lg font-bold text-[#140c18] mt-6">If privacy is your main concern</h3>

          <p>
            Read the privacy policy of any app you use — not just Stardust. Look for apps that explicitly state they don&apos;t sell data and don&apos;t run ads. Dawn Phase is ad-free and does not sell user data.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F3ECFA]">
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]"> </th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Stardust</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Clue</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Flo</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Dawn Phase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Astrology / moon phases",
                    sd: "Yes",
                    clue: "No",
                    flo: "No",
                    dawn: "Yes (Cosmic View)",
                  },
                  {
                    feature: "Symptom tracking",
                    sd: "Basic",
                    clue: "Good",
                    flo: "Good",
                    dawn: "Deep",
                  },
                  {
                    feature: "Perimenopause support",
                    sd: "No",
                    clue: "Limited",
                    flo: "Limited",
                    dawn: "Yes",
                  },
                  {
                    feature: "Privacy-first",
                    sd: "Disputed",
                    clue: "—",
                    flo: "—",
                    dawn: "Yes",
                  },
                  {
                    feature: "Price (monthly)",
                    sd: "Free / $2.99 premium",
                    clue: "Free / $14.99",
                    flo: "Free / $19.99",
                    dawn: "$14.99",
                  },
                ].map(({ feature, sd, clue, flo, dawn }) => (
                  <tr key={feature} className="border-b border-[#E6D7F3]">
                    <td className="px-4 py-3 font-medium text-[#3d2855] border border-[#E6D7F3] bg-white">{feature}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{sd}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{clue}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{flo}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-[#F3ECFA]">{dawn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#7a5a8a]">
            Pricing based on publicly available rates as of 2026. Verify on each app&apos;s website.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Bottom Line</h2>

          <p>
            If you loved Stardust for the astrology angle but felt like the actual tracking was too shallow — or if the privacy situation gave you pause — there are better options depending on what you need.
          </p>
          <p>
            The sweet spot most people are looking for is an app that takes both sides seriously: the meaning-making that astrology provides <em>and</em> the real health data that helps you understand your body. That combination is rarer than it should be.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This post is for informational purposes only and does not constitute medical advice. Any claims about other apps are based on publicly available information including app store listings, press coverage, and published privacy policies. Dawn Phase is not a contraceptive. For medical decisions please consult a qualified healthcare provider.
          </p>

        </div>

        <RelatedArticles
          currentSlug="stardust-app-alternative"
          slugs={["flo-app-alternative", "clue-app-alternative", "period-tracker-data-privacy"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
