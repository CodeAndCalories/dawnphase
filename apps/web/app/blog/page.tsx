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
    slug: "pcos-irregular-periods",
    title: "PCOS and Irregular Periods — What's Normal and What to Track",
    excerpt:
      "Fewer than 8 periods a year, cycles over 35 days, or months without a period — here's what's clinically irregular with PCOS, what anovulatory cycles mean, and how to track when there's no fixed pattern.",
    readTime: "7 min read",
  },
  {
    slug: "pcos-and-pmdd",
    title: "PCOS and PMDD — Can You Have Both?",
    excerpt:
      "PCOS and PMDD share overlapping mood symptoms but have different causes and timing. Here's how they can coexist, the key diagnostic difference, and why cycle day data matters for both.",
    readTime: "7 min read",
  },
  {
    slug: "best-app-pcos-2026",
    title: "Best Apps for PCOS Management in 2026",
    excerpt:
      "No single app covers all of PCOS. Here's how to think through cycle tracking, symptom logging, nutrition, and mindfulness apps — and what to look for in each category.",
    readTime: "6 min read",
  },
  {
    slug: "how-to-track-ovulation-pcos",
    title: "How to Track Ovulation With PCOS — A Practical Guide",
    excerpt:
      "Standard ovulation trackers fail with PCOS. Here's how BBT, OPKs, and cervical mucus work with irregular cycles — and how to read the signs correctly.",
    readTime: "7 min read",
  },
  {
    slug: "pcos-symptoms-tracker",
    title: "PCOS Symptoms Tracker — What to Log Every Day",
    excerpt:
      "A daily symptom log is one of the most practical tools for understanding your PCOS pattern and getting more from medical appointments. Here's what to track.",
    readTime: "6 min read",
  },
  {
    slug: "luteal-phase-defect",
    title: "Luteal Phase Defect — Signs, Causes and How to Track It",
    excerpt:
      "A short luteal phase (under 10 days) can cause spotting before periods, short cycles, and difficulty conceiving. Here's what the research says and how cycle tracking helps.",
    readTime: "6 min read",
  },
  {
    slug: "irregular-periods-causes",
    title: "Irregular Periods — 8 Common Causes and When to See a Doctor",
    excerpt:
      "Outside the 21–35 day range, or varying by more than a week? Here are 8 common causes and how to figure out which applies to you.",
    readTime: "7 min read",
  },
  {
    slug: "perimenopause-brain-fog",
    title: "Perimenopause Brain Fog — Why It Happens and How to Track It",
    excerpt:
      "Brain fog is one of the most commonly reported — and most dismissed — perimenopause symptoms. Here's the hormonal cause and how tracking helps.",
    readTime: "6 min read",
  },
  {
    slug: "what-is-cycle-syncing",
    title: "What Is Cycle Syncing? The Science Behind It",
    excerpt:
      "Adjusting exercise, diet, and work to your cycle phases is popular. Here's what the research actually supports and what's still contested.",
    readTime: "7 min read",
  },
  {
    slug: "cycle-tracking-for-beginners",
    title: "How to Start Tracking Your Cycle — A Beginner's Guide",
    excerpt:
      "Never tracked your cycle before? This guide covers what to log, how to understand your four phases, and how to start today.",
    readTime: "6 min read",
  },
  {
    slug: "endometriosis-symptom-tracking",
    title: "Tracking Endometriosis Symptoms — What to Log and Why It Matters",
    excerpt:
      "Women with endometriosis wait an average of 7–10 years for diagnosis. Detailed symptom tracking builds the evidence that can speed that up.",
    readTime: "7 min read",
  },
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
  {
    slug: "period-tracker-for-pcos",
    title: "Best Period Tracker App for PCOS in 2026",
    excerpt:
      "Standard period trackers fail with PCOS. Here's what irregular cycle tracking needs and what to look for in an app.",
    readTime: "6 min read",
  },
  {
    slug: "period-tracker-data-privacy",
    title: "Does Your Period Tracker Share Data With Facebook?",
    excerpt:
      "Some period apps have faced regulatory scrutiny over data sharing. Here's what to look for in a privacy-first tracker.",
    readTime: "5 min read",
  },
  {
    slug: "follicular-phase-explained",
    title: "The Follicular Phase — What It Is and What to Expect",
    excerpt:
      "The follicular phase starts on day 1 and ends at ovulation. Here's the hormonal picture, energy patterns, and how to track it.",
    readTime: "6 min read",
  },
  {
    slug: "tired-before-period",
    title: "Why Am I So Tired Before My Period? Causes and Tips",
    excerpt:
      "Progesterone, falling serotonin, and sleep disruption all drive pre-period fatigue. Here's why it happens and what helps.",
    readTime: "6 min read",
  },
  {
    slug: "how-to-track-perimenopause",
    title: "How to Track Perimenopause Symptoms — A Practical Guide",
    excerpt:
      "What to log daily, what patterns to look for, and how to turn your tracking data into useful evidence for doctor appointments.",
    readTime: "7 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#140c18]">Blog</h1>
          <p className="text-[#3d2855] mt-2 text-lg">
            Guides on cycle tracking, hormonal health, and privacy.
          </p>
        </div>

        <div className="space-y-6">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-[rgba(130,80,170,0.12)] shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-3">
                <span>April 2026</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-[#140c18] mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-[#3d2855] text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c94f68] hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 px-6 mt-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#3d2855]">
          <span>© 2026 Dawn Phase · Your data stays yours.</span>
          <nav className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#5a3575] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#5a3575] transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
