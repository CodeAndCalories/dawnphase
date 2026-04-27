import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Perimenopause Symptoms Checklist — 35 Signs to Track",
  description:
    "A comprehensive checklist of 35 perimenopause symptoms across five categories — with guidance on what to track and when to see a doctor.",
  openGraph: {
    title: "Perimenopause Symptoms Checklist — 35 Signs to Track",
    description:
      "A comprehensive checklist of 35 perimenopause symptoms across five categories — with guidance on what to track and when to see a doctor.",
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
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Perimenopause Symptoms Checklist — 35 Signs to Track
        </h1>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            Perimenopause can start as early as your mid-30s and last a decade. Many women don&apos;t recognise the early signs — because no one talks about them. This checklist covers all 35 recognised symptoms, organised so you can track them systematically.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What is perimenopause and when does it start?</h2>

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

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The 35 perimenopause symptoms</h2>

          <div className="space-y-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] p-5">
                <h3 className="text-lg font-bold text-[#C94B6D] mb-3">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.symptoms.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-[#2D1B1E]">
                      <span className="text-[#E8637A] mt-0.5 shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking matters for doctor visits</h2>

          <p>
            Most GPs receive very little training in perimenopause — surveys consistently find that fewer than 30% of UK medical students feel adequately prepared to discuss it. When you arrive at an appointment able to show a 3-month symptom log, the dynamic changes completely.
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

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How Dawn Phase perimenopause mode helps</h2>

          <p>
            Dawn Phase includes a dedicated perimenopause tracking mode that surfaces the symptoms most relevant to this transition — hot flashes, night sweats, brain fog, and mood shifts — alongside your standard cycle and daily symptom log.
          </p>
          <p>
            The app calculates your cycle day and phase even when cycles become irregular, and the insights view highlights patterns across your logs so you can see which symptoms cluster around which phase. You can export your full history as a CSV at any time — ideal for taking to GP appointments or specialist consultations.
          </p>

        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Start tracking your symptoms today</h3>
          <p className="mb-6 opacity-90">Perimenopause mode included. 7-day free trial.</p>
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
