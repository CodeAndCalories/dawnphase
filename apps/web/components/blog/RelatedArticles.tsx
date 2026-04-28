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
  "natural-cycles-alternative": {
    title: "Natural Cycles Alternatives — Privacy-First Options in 2026",
    excerpt: "What to consider when choosing a cycle tracking app if Natural Cycles doesn't fit your needs.",
    readTime: "6 min read",
  },
  "cycle-syncing-explained": {
    title: "Cycle Syncing — Does It Actually Work?",
    excerpt: "The science behind adjusting workouts and diet to your cycle phases — what's evidence-based and what isn't.",
    readTime: "6 min read",
  },
  "hormonal-imbalance-signs": {
    title: "10 Signs of Hormonal Imbalance in Women",
    excerpt: "Irregular periods, fatigue, mood swings and more — common signs that hormones may be out of balance.",
    readTime: "7 min read",
  },
  "perimenopause-vs-menopause": {
    title: "Perimenopause vs Menopause — Key Differences",
    excerpt: "Perimenopause and menopause are often confused. Here's how to tell them apart and know where you are.",
    readTime: "6 min read",
  },
  "tracking-cycle-pcos": {
    title: "Why Tracking Your Cycle With PCOS Is Different",
    excerpt: "Standard apps assume 28-day cycles. PCOS doesn't work like that. Here's what to prioritise instead.",
    readTime: "6 min read",
  },
  "period-tracker-for-pcos": {
    title: "Best Period Tracker App for PCOS in 2026",
    excerpt: "Standard period trackers fail with PCOS. Here's what PCOS cycle tracking actually needs.",
    readTime: "6 min read",
  },
  "period-tracker-data-privacy": {
    title: "Does Your Period Tracker Share Data With Facebook?",
    excerpt: "Some period apps have faced scrutiny over data sharing. Here's what to look for and how to check.",
    readTime: "5 min read",
  },
  "follicular-phase-explained": {
    title: "The Follicular Phase — What It Is and What to Expect",
    excerpt: "What happens hormonally in the follicular phase, why energy often rises, and how to track it.",
    readTime: "6 min read",
  },
  "tired-before-period": {
    title: "Why Am I So Tired Before My Period? Causes and Tips",
    excerpt: "Progesterone, serotonin shifts, and sleep disruption explain pre-period fatigue — and what to do about it.",
    readTime: "6 min read",
  },
  "how-to-track-perimenopause": {
    title: "How to Track Perimenopause Symptoms — A Practical Guide",
    excerpt: "What to log, how often, and how to use your tracking data at doctor appointments.",
    readTime: "7 min read",
  },
  "endometriosis-symptom-tracking": {
    title: "Tracking Endometriosis Symptoms — What to Log and Why It Matters",
    excerpt: "Women with endometriosis wait 7–10 years on average for diagnosis. Detailed tracking builds the evidence that can speed that up.",
    readTime: "7 min read",
  },
  "cycle-tracking-for-beginners": {
    title: "How to Start Tracking Your Cycle — A Beginner's Guide",
    excerpt: "What to log, how to understand your four phases, and how to start today — no prior knowledge needed.",
    readTime: "6 min read",
  },
  "what-is-cycle-syncing": {
    title: "What Is Cycle Syncing? The Science Behind It",
    excerpt: "Adjusting exercise, diet, and schedule to your cycle phases — what the research actually supports.",
    readTime: "7 min read",
  },
  "perimenopause-brain-fog": {
    title: "Perimenopause Brain Fog — Why It Happens and How to Track It",
    excerpt: "Brain fog is one of the most commonly reported perimenopause symptoms. Here's the hormonal cause and how tracking helps.",
    readTime: "6 min read",
  },
  "irregular-periods-causes": {
    title: "Irregular Periods — 8 Common Causes and When to See a Doctor",
    excerpt: "Outside 21–35 days, or varying by more than a week? Here are 8 common causes and how to identify yours.",
    readTime: "7 min read",
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
