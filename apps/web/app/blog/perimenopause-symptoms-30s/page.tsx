import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Perimenopause Symptoms in Your 30s: What's Normal and What to Track",
  description:
    "Perimenopause can start in your mid-30s — years before most women expect it. Here's what early symptoms look like and why tracking them matters.",
  openGraph: {
    title: "Perimenopause Symptoms in Your 30s: What's Normal and What to Track",
    description:
      "Perimenopause can start in your mid-30s — years before most women expect it. Here's what early symptoms look like and why tracking them matters.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Perimenopause%20Symptoms%20in%20Your%2030s&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
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
        title="Perimenopause Symptoms in Your 30s: What's Normal and What to Track"
        description="Perimenopause can start in your mid-30s — years before most women expect it. Here's what early symptoms look like and why tracking them matters."
        url="https://www.dawnphase.com/blog/perimenopause-symptoms-30s"
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
          Perimenopause Symptoms in Your 30s: What&apos;s Normal and What to Track
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Most women expect{" "}
            <Link href="/conditions/perimenopause" className="text-[#c94f68] hover:underline font-medium">
              perimenopause
            </Link>{" "}
            to start in their late 40s. But for a significant number of women, hormonal
            shifts begin much earlier — sometimes as early as the mid-30s.
          </p>

          <p>
            If you&apos;re in your 30s and something feels off with your cycle, your sleep,
            your mood, or your energy — and you can&apos;t explain it — perimenopause may be
            worth understanding.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What Is Perimenopause
          </h2>

          <p>
            Perimenopause is the transition period before menopause — when estrogen and
            progesterone levels begin to fluctuate and gradually decline. It ends when
            you&apos;ve gone 12 consecutive months without a period (menopause).
          </p>

          <p>
            The average age perimenopause begins is the mid-40s. But &ldquo;average&rdquo; masks a
            wide range. Early perimenopause — starting before 45 — is more common than
            most people realise. Starting in the late 30s is less common but not rare.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Early Perimenopause Symptoms in Your 30s
          </h2>

          <p>
            The challenge with early perimenopause is that its symptoms overlap with a lot
            of other things — stress, thyroid issues, iron deficiency, depression. That&apos;s
            why tracking matters.
          </p>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Cycle changes</p>
              <p className="text-sm text-[#3d2855] mt-1">
                One of the earliest signs is a shift in your cycle pattern. Periods may
                become shorter, longer, heavier, lighter, or less predictable. Cycles that
                were previously regular may start varying by several days.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Sleep disruption</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Waking in the night for no clear reason, difficulty falling asleep, or
                feeling unrested despite enough hours is a common early symptom.
                Progesterone has a sleep-promoting effect — as it declines, sleep is often
                the first thing affected.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Mood changes</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Increased anxiety, low mood, irritability, or emotional reactivity that
                feels disproportionate to circumstances. Often worse in the week before
                your period.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Brain fog</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Difficulty concentrating, word-finding problems, or a general sense of
                mental cloudiness — particularly in the luteal phase.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Changes in PMS</p>
              <p className="text-sm text-[#3d2855] mt-1">
                PMS that is getting worse, or appearing for the first time, can be a sign
                of hormonal shift.{" "}
                <Link href="/blog/pmdd-vs-pms-symptoms" className="text-[#c94f68] hover:underline">
                  PMDD
                </Link>{" "}
                — severe premenstrual dysphoric disorder — can emerge or worsen in
                perimenopause.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/blog/breast-tenderness-before-period" className="text-[#c94f68] hover:underline">
                  Breast tenderness
                </Link>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Increased breast tenderness, particularly before your period, can reflect
                estrogen fluctuation.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Fatigue</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Persistent fatigue that doesn&apos;t resolve with rest, particularly in the
                second half of your cycle.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What&apos;s Not Perimenopause (Rule These Out First)
          </h2>

          <p>Before attributing symptoms to perimenopause, a doctor should rule out:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Thyroid dysfunction (hypothyroidism causes many overlapping symptoms)</li>
            <li>Iron deficiency anaemia</li>
            <li>Vitamin D deficiency</li>
            <li>Depression or anxiety disorder</li>
            <li>
              <Link href="/conditions/pcos" className="text-[#c94f68] hover:underline font-medium">
                PCOS
              </Link>
            </li>
          </ul>

          <p>
            Perimenopause is a diagnosis of context — your age, your symptoms over time,
            and hormone tests. Don&apos;t self-diagnose. Do self-track.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase is built for tracking perimenopause symptoms — daily logging across
              cycle, sleep, mood, energy, and physical symptoms, with pattern tracking over
              time.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Why Tracking Early Matters
          </h2>

          <p>
            If you suspect early perimenopause, months of tracked data is invaluable for
            two reasons:
          </p>

          <div className="space-y-3">
            {[
              {
                label: "1. It helps your doctor",
                note: "A pattern of cycle changes, sleep disruption, and mood symptoms logged over 3–6 months is far more clinically useful than a one-off description at an appointment.",
              },
              {
                label: "2. It helps you",
                note: "Seeing that your anxiety spikes every luteal phase, or that your sleep deteriorates 2 weeks before your period, turns confusing symptoms into a pattern you can understand and prepare for.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to Track</h2>

          <p>
            If you&apos;re tracking for potential perimenopause symptoms, log daily:
          </p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Cycle dates and flow</li>
            <li>Sleep quality and night waking</li>
            <li>Mood and anxiety level</li>
            <li>Energy and fatigue</li>
            <li>Brain fog or concentration</li>
            <li>
              Any physical symptoms — breast tenderness, bloating, headaches, hot flushes
            </li>
            <li>Stress levels</li>
          </ul>

          <p>
            After 3 months, patterns become visible. After 6 months, you have something
            genuinely useful to bring to a healthcare provider.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Getting Support</h2>

          <p>
            If you&apos;re concerned about symptoms, speak with your GP or a gynaecologist.
            Ask specifically about hormone testing (FSH, estradiol) and thyroid function.
            Bring your tracking data.
          </p>

          <p>
            <Link href="/" className="text-[#c94f68] hover:underline font-medium">
              Dawn Phase
            </Link>{" "}
            is built specifically for tracking perimenopause symptoms — daily logging
            across all the symptoms above, with pattern tracking over time. 7-day free
            trial, no card required.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post is for informational purposes only and does not constitute medical
            advice. Perimenopause should be assessed by a qualified healthcare provider.
            If you are experiencing concerning symptoms please speak with your doctor.
          </p>

        </div>

        <RelatedArticles
          currentSlug="perimenopause-symptoms-30s"
          slugs={["perimenopause-symptoms-checklist", "perimenopause-brain-fog", "how-to-track-perimenopause"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
