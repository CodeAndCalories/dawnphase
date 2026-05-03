import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Perimenopause Symptoms Checklist — 35 Signs to Track",
  description:
    "A comprehensive checklist of 35 perimenopause symptoms across five categories — with guidance on what to track and when to see a doctor.",
  openGraph: {
    title: "Perimenopause Symptoms Checklist — 35 Signs to Track",
    description:
      "A comprehensive checklist of 35 perimenopause symptoms across five categories — with guidance on what to track and when to see a doctor.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Perimenopause%20Symptoms%20Checklist%20%E2%80%94%2035%20Signs%20to%20Track&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
      width: 1200,
      height: 630,
    }],
  },
};

const CATEGORIES: { name: string; symptoms: string[] }[] = [
  {
    name: "Cycle changes",
    symptoms: [
      "Irregular periods (shorter, longer, or skipped)",
      "Heavier or lighter bleeding than usual",
      "Spotting between periods",
      "Shorter cycles (less than 25 days)",
      "Longer cycles (more than 35 days)",
      "Clotting or flooding",
      "Two periods in one month",
    ],
  },
  {
    name: "Sleep disruption",
    symptoms: [
      "Night sweats (waking drenched)",
      "Difficulty falling asleep",
      "Waking at 3–4 am and unable to return to sleep",
      "Vivid or disturbing dreams",
      "Fatigue despite adequate sleep",
      "Restless legs at night",
      "Sleep apnea (new or worsening)",
    ],
  },
  {
    name: "Mood and mental health",
    symptoms: [
      "Increased anxiety or sense of dread",
      "Low mood or depression",
      "Irritability or rage out of proportion",
      "Emotional lability (crying easily)",
      "Loss of confidence",
      "Reduced motivation",
      "Feeling overwhelmed by minor tasks",
    ],
  },
  {
    name: "Physical symptoms",
    symptoms: [
      "Hot flashes (sudden heat, flushing, sweating)",
      "Heart palpitations",
      "Joint or muscle aches",
      "Breast tenderness",
      "Weight gain — especially around the abdomen",
      "Changes in skin texture (dryness, acne)",
      "Hair thinning or loss",
      "Vaginal dryness or discomfort during sex",
      "Bladder leaks or urgency",
      "Headaches (new or changed pattern)",
    ],
  },
  {
    name: "Cognitive symptoms",
    symptoms: [
      "Brain fog — difficulty concentrating",
      "Word-finding difficulties",
      "Memory lapses (appointments, names)",
      "Difficulty multitasking",
      "Reduced mental sharpness",
      "Overwhelm with decision-making",
      "Short-term memory gaps",
    ],
  },
];

export default function Post() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />
      <ArticleSchema
        title="Perimenopause Symptoms Checklist — 35 Signs to Track"
        description="A comprehensive checklist of 35 perimenopause symptoms across five categories — with guidance on what to track and when to see a doctor."
        url="https://www.dawnphase.com/blog/perimenopause-symptoms-checklist"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Perimenopause Symptoms Checklist — 35 Signs to Track
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Perimenopause can start as early as your mid-30s and last a decade. Many women don&apos;t recognise the early signs — because no one talks about them. This checklist covers 35 commonly reported symptoms, organised so you can track them systematically.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
            <p className="text-sm text-amber-700">
              This article is for educational purposes only and is not medical advice. Dawn Phase is not a medical device and does not diagnose or treat any condition. If you experience heavy bleeding, bleeding after menopause, severe pain, chest pain, or sudden neurological symptoms, seek medical care promptly.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What is perimenopause and when does it start?</h2>

          <p>
            Perimenopause is the transitional phase before menopause — the point when you&apos;ve gone 12 consecutive months without a period. During perimenopause, oestrogen and progesterone levels fluctuate unpredictably, causing a wide range of symptoms that can affect every system in your body.
          </p>
          <p>
            Most women enter perimenopause between 40 and 51, but symptoms can begin as early as the late 30s. The average duration is 4–8 years, though some women experience it for over a decade.
          </p>
          <p>
            Key markers that perimenopause may have started:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cycles becoming shorter or more irregular</li>
            <li>New-onset anxiety or mood changes not explained by life circumstances</li>
            <li>Sleep disruption — especially early-morning waking</li>
            <li>Hot flashes or night sweats</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">35 commonly reported perimenopause symptoms</h2>

          <div className="space-y-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="bg-white rounded-2xl border border-[rgba(130,80,170,0.12)] p-5">
                <h3 className="text-lg font-bold text-[#140c18] mb-3">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.symptoms.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-[#140c18]">
                      <span className="text-[#c94f68] mt-0.5 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why tracking matters for doctor visits</h2>

          <p>
            Many patients report feeling dismissed or underprepared for perimenopause conversations, which is why bringing a symptom log to appointments can help make them more productive. When you arrive with a 3-month record, you give your doctor something concrete to work with.
          </p>
          <p>
            What to bring to your doctor:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A record of your last 10–15 cycle start dates and lengths</li>
            <li>A daily log of your top 3 symptoms — severity, time of day, duration</li>
            <li>Sleep quality records (hours, night sweats, wake times)</li>
            <li>Mood ratings — especially noting low-mood clusters around your cycle</li>
          </ul>
          <p>
            This transforms &ldquo;I&apos;ve been feeling off&rdquo; into objective data a doctor can act on.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How Dawn Phase perimenopause mode helps</h2>

          <p>
            Dawn Phase includes a dedicated perimenopause tracking mode that surfaces the symptoms most relevant to this transition alongside your standard cycle and daily symptom log. Explore individual symptom guides:{" "}
            <Link href="/symptoms/hot-flashes-causes" className="text-[#c94f68] hover:underline font-medium">hot flashes</Link>,{" "}
            <Link href="/symptoms/night-sweats-perimenopause" className="text-[#c94f68] hover:underline font-medium">night sweats</Link>, and{" "}
            <Link href="/symptoms/brain-fog-perimenopause" className="text-[#c94f68] hover:underline font-medium">brain fog during perimenopause</Link>.
          </p>
          <p>
            The app estimates your cycle day based on what you log, while noting that irregular cycles can make predictions less certain. The insights view highlights patterns across your logs so you can see which symptoms cluster around which phase. You can export your full history as a CSV at any time — ideal for taking to GP appointments or specialist consultations.
          </p>

        </div>

        <p className="text-xs text-[#3d2855] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="perimenopause-symptoms-checklist"
          slugs={["perimenopause-age", "pmdd-vs-pms", "luteal-phase-symptoms"]}
        />

        <BlogCTA variant="perimenopause" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
