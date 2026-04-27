import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Best Flo App Alternatives in 2026 — Private & Accurate",
  description:
    "Looking for a Flo alternative? We compare Dawn Phase, Clue, and Natural Cycles on privacy, price, and perimenopause support.",
  openGraph: {
    title: "Best Flo App Alternatives in 2026 — Private & Accurate",
    description:
      "Looking for a Flo alternative? We compare Dawn Phase, Clue, and Natural Cycles on privacy, price, and perimenopause support.",
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Best Flo App Alternatives in 2026 — Private &amp; Accurate
        </h1>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            Flo is the most downloaded period app in the world. It&apos;s also under an FTC consent order for sharing intimate user data without consent. If you&apos;re looking for a better alternative, here&apos;s an honest comparison.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why women are leaving Flo</h2>

          <p>Three reasons come up again and again in app store reviews and Reddit threads:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Data privacy concerns.</strong> The 2023 FTC settlement confirmed what many suspected — Flo was sharing period data with Facebook and advertising companies. Even after the settlement, data is stored on Flo&apos;s servers and subject to their terms.</li>
            <li><strong>Subscription price creep.</strong> Flo Premium has increased steadily and now sits at around $12.99/month for a month-to-month subscription, with aggressive upsell prompts even during emotionally sensitive moments (pregnancy loss screens, for instance).</li>
            <li><strong>Ads and notifications.</strong> The free tier is increasingly cluttered with fertility product ads, sponsored content, and push notifications designed to maximise engagement rather than help you understand your body.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to look for in a Flo alternative</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Genuine no-sell data policy (with FTC-style commitment, not marketing copy)</li>
            <li>Perimenopause mode or irregular cycle support</li>
            <li>Symptom logging beyond just period dates</li>
            <li>Data export so you own your health records</li>
            <li>Transparent pricing with no dark-pattern upsells</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Comparison: Dawn Phase vs Flo vs Clue vs Natural Cycles</h2>

          <div className="overflow-x-auto rounded-2xl border border-[rgba(232,99,122,0.12)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FDF6F0]">
                  <th className="text-left px-4 py-3 font-semibold text-[#C94B6D]">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#C94B6D]">Dawn Phase</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8C6B5A]">Flo</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8C6B5A]">Clue</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8C6B5A]">Natural Cycles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["No data selling", "✓", "Settled FTC", "✓", "✓"],
                  ["No advertising model", "✓", "✗", "Partial", "✓"],
                  ["Price / month", "$14.99", "$12.99", "$9.99", "$13.99"],
                  ["Perimenopause mode", "✓", "Limited", "✗", "✗"],
                  ["Data export (CSV)", "✓", "✗", "✓", "✓"],
                  ["Irregular cycle support", "✓", "✓", "✓", "Limited"],
                  ["No ads", "✓", "Paid only", "Paid only", "✓"],
                ].map(([feat, dp, flo, clue, nc]) => (
                  <tr key={feat} className="bg-white">
                    <td className="px-4 py-3 text-[#2D1B1E] font-medium">{feat}</td>
                    <td className="px-4 py-3 text-center font-semibold text-[#E8637A]">{dp}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A]">{flo}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A]">{clue}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A]">{nc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Dawn Phase: the Flo alternative built for privacy</h2>
          <p>
            Dawn Phase is a subscription-only period and perimenopause tracker. There is no free tier with ads, no data broker partnerships, and no advertising SDK anywhere in the codebase. The business model is straightforward: you pay $14.99/month (with a 7-day free trial), and in return you get a tracker that works entirely in your interest.
          </p>
          <p>
            Key features that differentiate Dawn Phase from Flo:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Perimenopause mode</strong> — dedicated tracking for hot flashes, night sweats, brain fog, and other perimenopausal symptoms that Flo treats as an afterthought.</li>
            <li><strong>Phase-based insights</strong> — understand how your follicular, ovulatory, and luteal phases affect your mood, energy, and sleep — not just when your next period is.</li>
            <li><strong>CSV export</strong> — download your full symptom history at any time. It&apos;s your data.</li>
            <li><strong>Account deletion</strong> — removing your account instantly and permanently deletes all stored data.</li>
          </ul>

          <p>
            If you&apos;re switching from Flo, the transition takes less than two minutes: create an account, log your last period, and Dawn Phase will calculate your cycle day and phase immediately.
          </p>

        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Try Dawn Phase free for 7 days</h3>
          <p className="mb-6 opacity-90">No data selling. No ads. Cancel anytime.</p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
