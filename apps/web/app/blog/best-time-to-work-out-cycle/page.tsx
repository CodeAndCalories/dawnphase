import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "The Best Time of Month to Work Out (According to Your Cycle)",
  description:
    "Your energy, strength, and recovery change across your cycle. Here's how to time your workouts to your hormones for better results and less burnout.",
  openGraph: {
    title: "The Best Time of Month to Work Out (According to Your Cycle)",
    description:
      "Your energy, strength, and recovery change across your cycle. Here's how to time your workouts to your hormones for better results and less burnout.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Best%20Time%20to%20Work%20Out%20(Your%20Cycle)&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
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
        title="The Best Time of Month to Work Out (According to Your Cycle)"
        description="Your energy, strength, and recovery change across your cycle. Here's how to time your workouts to your hormones for better results and less burnout."
        url="https://www.dawnphase.com/blog/best-time-to-work-out-cycle"
        datePublished="2026-05-06"
        dateModified="2026-05-06"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          The Best Time of Month to Work Out (According to Your Cycle)
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            If you have ever felt like a completely different athlete at different points in
            the month — strong and motivated one week, exhausted and unmotivated the next —
            that is not inconsistency. That is your hormones.
          </p>

          <p>
            Estrogen, progesterone, and testosterone fluctuate significantly across your
            cycle and all affect energy, strength, recovery, and motivation. Working with
            these shifts rather than against them can make your training more effective and
            a lot more sustainable.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            How Hormones Affect Exercise Capacity
          </h2>

          <div className="space-y-3">
            {[
              {
                label: "Estrogen",
                note: "Supports muscle building, improves endurance, and has a positive effect on mood and motivation. It rises in the first half of your cycle.",
              },
              {
                label: "Progesterone",
                note: "Raises core body temperature, increases perceived effort during exercise, and promotes rest and recovery. It dominates the second half of your cycle.",
              },
              {
                label: "Testosterone",
                note: "Peaks briefly around ovulation and supports power, strength, and competitive drive.",
              },
            ].map(({ label, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[#E6D7F3] p-4">
                <p className="font-semibold text-[#5a3575]">{label}</p>
                <p className="text-sm text-[#3d2855] mt-1">{note}</p>
              </div>
            ))}
          </div>

          <p>
            Understanding where you are in your cycle helps you understand why exercise
            feels harder or easier on any given day.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            Phase by Phase Guide
          </h2>

          {/* Menstrual */}
          <div className="bg-white rounded-xl border border-[#E6D7F3] p-5">
            <h3 className="text-lg font-bold text-[#140c18] mb-2">
              <Link href="/cycle-phase/menstrual" className="text-[#c94f68] hover:underline">
                Menstrual Phase
              </Link>{" "}
              <span className="font-normal text-sm text-[#7a5a8a]">(Days 1–5)</span>
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-3">
              Hormones are at their lowest. Energy is often lower. Rest is appropriate and
              beneficial.
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Best for:</strong> walking, gentle yoga,
              stretching, light swimming
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Avoid:</strong> forcing high-intensity
              sessions when your body is asking for rest
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed">
              <strong className="text-[#140c18]">Tracking tip:</strong> note energy and pain
              levels each day — your menstrual phase capacity varies significantly person to
              person
            </p>
          </div>

          {/* Follicular */}
          <div className="bg-white rounded-xl border border-[#E6D7F3] p-5">
            <h3 className="text-lg font-bold text-[#140c18] mb-2">
              <Link href="/cycle-phase/follicular" className="text-[#c94f68] hover:underline">
                Follicular Phase
              </Link>{" "}
              <span className="font-normal text-sm text-[#7a5a8a]">(Days 6–13)</span>
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-3">
              Estrogen rises steadily. Energy, mood, and motivation improve. This is often
              your best training window.
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Best for:</strong> strength training, HIIT,
              trying new workouts, increasing weights or intensity
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Why:</strong> estrogen supports muscle
              protein synthesis and recovery. You may find personal bests come easier in
              this phase.
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed">
              <strong className="text-[#140c18]">Tracking tip:</strong> log workout
              performance — many people notice genuine strength increases in the follicular
              phase
            </p>
          </div>

          {/* Ovulatory */}
          <div className="bg-white rounded-xl border border-[#E6D7F3] p-5">
            <h3 className="text-lg font-bold text-[#140c18] mb-2">
              <Link href="/cycle-phase/ovulatory" className="text-[#c94f68] hover:underline">
                Ovulatory Phase
              </Link>{" "}
              <span className="font-normal text-sm text-[#7a5a8a]">(Days 14–16)</span>
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-3">
              Estrogen peaks, testosterone spikes briefly. Often your highest energy and
              most competitive days.
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Best for:</strong> high-intensity training,
              races, competitions, heavy lifting
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Note:</strong> some research suggests
              ligament laxity increases around ovulation due to estrogen peak — warm up
              thoroughly and be mindful of injury risk in high-impact activities
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed">
              <strong className="text-[#140c18]">Tracking tip:</strong> log ovulation signs
              alongside workout performance
            </p>
          </div>

          {/* Luteal */}
          <div className="bg-white rounded-xl border border-[#E6D7F3] p-5">
            <h3 className="text-lg font-bold text-[#140c18] mb-2">
              <Link href="/cycle-phase/luteal" className="text-[#c94f68] hover:underline">
                Luteal Phase
              </Link>{" "}
              <span className="font-normal text-sm text-[#7a5a8a]">(Days 17–28)</span>
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-3">
              Progesterone rises then falls. Core temperature is higher. Perceived effort is
              greater for the same workload. Recovery takes longer.
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Early luteal (days 17–21):</strong> Still
              reasonable energy — moderate intensity training works well
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Late luteal (days 22–28):</strong> Energy
              often drops. Lower intensity is better. Pushing hard in this window tends to
              lead to fatigue and poor recovery.
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-1">
              <strong className="text-[#140c18]">Best for:</strong> moderate cardio, yoga,
              pilates, walking, strength maintenance
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed">
              <strong className="text-[#140c18]">Tracking tip:</strong> log energy, mood,
              and how workouts felt — late luteal patterns become very clear after a few
              cycles
            </p>
          </div>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase logs energy, mood, and cycle phase daily — so you can see exactly
              how your training capacity shifts across each phase.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The Practical Approach</h2>

          <p>
            You do not need to overhaul your training plan. The practical application is
            simpler:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Give yourself permission to go lighter</strong> in the late luteal and
              menstrual phases
            </li>
            <li>
              <strong>Take advantage of follicular and ovulatory energy</strong> for harder
              sessions
            </li>
            <li>
              <strong>Stop judging yourself</strong> for lower performance at certain points
              — it is hormonal, not weakness
            </li>
          </ul>

          <p>
            Many women find that once they understand this pattern, training becomes more
            enjoyable and sustainable because they stop fighting their body&apos;s natural rhythm.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            How to Start Tracking This
          </h2>

          <p>
            Log daily: energy level (1–5), workout type and duration, how the session felt,
            and where you are in your cycle. After 2–3 cycles the pattern becomes clear and
            you can start planning your training around it.
          </p>

          <p>
            <Link href="/" className="text-[#c94f68] hover:underline font-medium">
              Dawn Phase
            </Link>{" "}
            tracks energy, mood, and cycle phase daily so you can see these patterns over
            time. 7-day free trial, no card required.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post is for general informational purposes and does not constitute medical
            advice. Individual responses to exercise vary. Consult a healthcare provider
            before making significant changes to your exercise routine.
          </p>

        </div>

        <RelatedArticles
          currentSlug="best-time-to-work-out-cycle"
          slugs={["cycle-syncing-explained", "follicular-phase-explained", "luteal-phase-symptoms"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
