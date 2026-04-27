import Link from "next/link";

const POSTS: Record<string, { title: string; excerpt: string; readTime: string }> = {
  "period-tracker-no-data-selling": {
    title: "The Best Period Tracker That Doesn't Sell Your Data (2026)",
    excerpt: "What Flo, Clue and others actually do with your cycle data — and how to choose a truly private tracker.",
    readTime: "6 min read",
  },
  "flo-alternative": {
    title: "Best Flo App Alternatives in 2026 — Private & Accurate",
    excerpt: "Comparing Dawn Phase, Clue, and Natural Cycles on privacy, price, and perimenopause support.",
    readTime: "6 min read",
  },
  "perimenopause-symptoms-checklist": {
    title: "Perimenopause Symptoms Checklist — 35 Signs to Track",
    excerpt: "All 35 commonly reported perimenopause symptoms across five categories, and why tracking them matters.",
    readTime: "7 min read",
  },
  "pcos-cycle-tracking": {
    title: "How to Track Your Cycle With PCOS — A Complete Guide",
    excerpt: "PCOS makes cycles unpredictable, but tracking the right things can reveal patterns even without regular periods.",
    readTime: "6 min read",
  },
  "luteal-phase-symptoms": {
    title: "Luteal Phase Symptoms — What's Normal and What's Not",
    excerpt: "From PMS to PMDD, what happens in the luteal phase, what symptoms to expect, and when to see a doctor.",
    readTime: "6 min read",
  },
  "ovulation-symptoms": {
    title: "8 Signs of Ovulation — What Your Body Is Telling You",
    excerpt: "Cervical mucus changes, BBT rise, OPK results and more — eight signs ovulation may be occurring.",
    readTime: "6 min read",
  },
  "period-after-birth-control": {
    title: "Your First Period After Stopping Birth Control",
    excerpt: "What to expect after stopping the pill — timeline, irregular cycles, and when to see a doctor.",
    readTime: "6 min read",
  },
  "pmdd-vs-pms": {
    title: "PMDD vs PMS — How to Tell the Difference",
    excerpt: "PMS and PMDD share timing but differ dramatically in severity. Here's how to understand the difference.",
    readTime: "6 min read",
  },
  "how-long-should-period-last": {
    title: "How Long Should Your Period Last? What's Normal",
    excerpt: "The typical range is 2–7 days, but a lot affects period length. What's normal and when to seek help.",
    readTime: "5 min read",
  },
  "perimenopause-age": {
    title: "What Age Does Perimenopause Start?",
    excerpt: "Most people begin perimenopause in their 40s, but it can start earlier. What affects timing and early signs.",
    readTime: "6 min read",
  },
};

interface Props {
  slugs: string[];
  currentSlug?: string;
}

export default function RelatedArticles({ slugs, currentSlug }: Props) {
  const items = slugs
    .filter((s) => s !== currentSlug)
    .slice(0, 3)
    .map((s) => ({ slug: s, ...POSTS[s] }))
    .filter((p) => p.title);

  if (!items.length) return null;

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-lg font-bold text-[#2D1B1E] mb-4">Related articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-[#FDF6F0] rounded-2xl p-4 hover:shadow-sm transition-shadow border border-[rgba(232,99,122,0.1)] group"
          >
            <p className="text-sm font-semibold text-[#2D1B1E] group-hover:text-[#C94B6D] transition-colors leading-snug mb-1">
              {post.title}
            </p>
            <p className="text-xs text-[#8C6B5A] leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            <p className="text-xs font-medium text-[#E8637A] mt-2">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
