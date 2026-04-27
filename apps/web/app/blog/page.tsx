import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dawn Phase Blog — Cycle & Hormone Health",
  description:
    "Expert guides on cycle tracking, perimenopause, hormonal health and privacy-first period tracking.",
  openGraph: {
    title: "Dawn Phase Blog — Cycle & Hormone Health",
    description:
      "Expert guides on cycle tracking, perimenopause, hormonal health and privacy-first period tracking.",
  },
};

const POSTS = [
  {
    slug: "period-tracker-no-data-selling",
    title: "The Best Period Tracker That Doesn't Sell Your Data (2026)",
    excerpt:
      "Period apps have a data problem. Here's what Flo, Clue and others actually do with your cycle data — and how to protect yourself.",
    readTime: "6 min read",
  },
  {
    slug: "flo-alternative",
    title: "Best Flo App Alternatives in 2026 — Private & Accurate",
    excerpt:
      "Thinking of leaving Flo? We compare Dawn Phase, Clue, and Natural Cycles on privacy, price, and perimenopause support.",
    readTime: "6 min read",
  },
  {
    slug: "perimenopause-symptoms-checklist",
    title: "Perimenopause Symptoms Checklist — 35 Signs to Track",
    excerpt:
      "A comprehensive checklist of perimenopause symptoms across five categories — plus why tracking them matters for your doctor.",
    readTime: "7 min read",
  },
  {
    slug: "pcos-cycle-tracking",
    title: "How to Track Your Cycle With PCOS — A Complete Guide",
    excerpt:
      "PCOS makes cycles unpredictable, but tracking the right things can reveal patterns even with irregular periods.",
    readTime: "6 min read",
  },
  {
    slug: "luteal-phase-symptoms",
    title: "Luteal Phase Symptoms — What's Normal and What's Not",
    excerpt:
      "From PMS to PMDD, this guide explains what happens during the luteal phase, what symptoms to expect, and when to see a doctor.",
    readTime: "6 min read",
  },
  {
    slug: "ovulation-symptoms",
    title: "8 Signs of Ovulation — What Your Body Is Telling You",
    excerpt:
      "Cervical mucus changes, BBT rise, OPK results, and more — eight signs ovulation may be occurring and how to track them reliably.",
    readTime: "6 min read",
  },
  {
    slug: "period-after-birth-control",
    title: "Your First Period After Stopping Birth Control",
    excerpt:
      "What to expect after stopping the pill or hormonal contraception — timeline, why cycles are irregular, and when to see a doctor.",
    readTime: "6 min read",
  },
  {
    slug: "pmdd-vs-pms",
    title: "PMDD vs PMS — How to Tell the Difference",
    excerpt:
      "PMS and PMDD share premenstrual timing but differ dramatically in severity and impact. Here's how to understand the difference.",
    readTime: "6 min read",
  },
  {
    slug: "how-long-should-period-last",
    title: "How Long Should Your Period Last? What's Normal",
    excerpt:
      "The typical range is 2–7 days, but a lot affects period length. Here's what's normal, what isn't, and when to see a doctor.",
    readTime: "5 min read",
  },
  {
    slug: "perimenopause-age",
    title: "What Age Does Perimenopause Start?",
    excerpt:
      "Most people begin perimenopause in their 40s, but it can start earlier. Here's what affects timing and the early signs to watch for.",
    readTime: "6 min read",
  },
  {
    slug: "natural-cycles-alternative",
    title: "Natural Cycles Alternatives — Privacy-First Options in 2026",
    excerpt:
      "Not everyone needs a certified contraceptive app. Here's what to consider when looking for a privacy-first cycle tracking alternative.",
    readTime: "6 min read",
  },
  {
    slug: "cycle-syncing-explained",
    title: "Cycle Syncing — Does It Actually Work?",
    excerpt:
      "Adjusting workouts and diet to your cycle phases is popular — but how much of it is evidence-based? Here's an honest look.",
    readTime: "6 min read",
  },
  {
    slug: "hormonal-imbalance-signs",
    title: "10 Signs of Hormonal Imbalance in Women",
    excerpt:
      "From irregular periods to persistent fatigue, these are the commonly reported signs that hormones may be out of balance.",
    readTime: "7 min read",
  },
  {
    slug: "perimenopause-vs-menopause",
    title: "Perimenopause vs Menopause — Key Differences",
    excerpt:
      "The two terms are often confused. Here's exactly how to tell them apart and know which stage you're currently in.",
    readTime: "6 min read",
  },
  {
    slug: "tracking-cycle-pcos",
    title: "Why Tracking Your Cycle With PCOS Is Different",
    excerpt:
      "Standard apps assume a 28-day cycle. PCOS doesn't work like that — here's what to prioritise in a period tracker instead.",
    readTime: "6 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#C94B6D]">Blog</h1>
          <p className="text-[#8C6B5A] mt-2 text-lg">
            Guides on cycle tracking, hormonal health, and privacy.
          </p>
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-3">
                <span>April 2026</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-[#2D1B1E] mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-[#8C6B5A] text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8637A] hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-6 mt-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#8C6B5A]">
          <span>© 2026 Dawn Phase · Your data stays yours.</span>
          <nav className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#C94B6D] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#C94B6D] transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
