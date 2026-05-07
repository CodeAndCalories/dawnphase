import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Cycle Syncing for Beginners: How to Work With Your Hormones",
  description:
    "Cycle syncing means aligning your work, exercise, and lifestyle with your hormonal cycle. Here's what it actually means and how to start simply.",
  openGraph: {
    title: "Cycle Syncing for Beginners: How to Work With Your Hormones",
    description:
      "Cycle syncing means aligning your work, exercise, and lifestyle with your hormonal cycle. Here's what it actually means and how to start simply.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Cycle%20Syncing%20for%20Beginners&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20%26%20symptom%20tracker",
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
        title="Cycle Syncing for Beginners: How to Work With Your Hormones"
        description="Cycle syncing means aligning your work, exercise, and lifestyle with your hormonal cycle. Here's what it actually means and how to start simply."
        url="https://www.dawnphase.com/blog/cycle-syncing-beginners"
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
          Cycle Syncing for Beginners: How to Work With Your Hormones
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Cycle syncing is the practice of aligning your daily life — work, exercise,
            social plans, nutrition — with the natural hormonal shifts of your menstrual
            cycle. The idea is simple: your hormones change significantly across the month,
            and so does your energy, focus, and emotional capacity. Working with those
            shifts rather than against them makes life easier.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            The Four Phases You Need to Know
          </h2>

          <p>
            Your cycle has four phases, each with a distinct hormonal profile:
          </p>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/cycle-phase/menstrual" className="hover:underline">
                  Menstrual
                </Link>{" "}
                <span className="font-normal text-xs text-[#7a5a8a]">(days 1–5 average)</span>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Estrogen and progesterone at their lowest. Energy is often lower. Rest and
                reflection are natural here.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/cycle-phase/follicular" className="hover:underline">
                  Follicular
                </Link>{" "}
                <span className="font-normal text-xs text-[#7a5a8a]">(days 6–13 average)</span>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Estrogen rises. Energy, creativity, and motivation build. Often the most
                productive phase.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/cycle-phase/ovulatory" className="hover:underline">
                  Ovulatory
                </Link>{" "}
                <span className="font-normal text-xs text-[#7a5a8a]">(days 14–16 average)</span>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Estrogen peaks, testosterone spikes briefly. Typically the highest energy,
                most social, most confident phase.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                <Link href="/cycle-phase/luteal" className="hover:underline">
                  Luteal
                </Link>{" "}
                <span className="font-normal text-xs text-[#7a5a8a]">(days 17–28 average)</span>
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Progesterone rises then falls. Energy decreases toward the end. More
                introverted, detail-oriented, and sensitive phase.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            What You Can Actually Sync
          </h2>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Work and focus</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#3d2855] mt-2">
                <li>Follicular and ovulatory: schedule challenging work, presentations, brainstorming, meetings</li>
                <li>Late luteal: admin tasks, detail work, wrapping things up</li>
                <li>Menstrual: reflection, planning, lighter workload</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Exercise</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#3d2855] mt-2">
                <li>Follicular and ovulatory: higher intensity — strength training, HIIT, challenging runs</li>
                <li>Luteal: moderate intensity — yoga, pilates, walks, light strength</li>
                <li>Menstrual: rest or gentle movement</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Social plans</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#3d2855] mt-2">
                <li>Ovulatory: best phase for socialising, networking, dates, public speaking</li>
                <li>Late luteal and menstrual: less social energy is normal — schedule quieter time</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Nutrition (general patterns)</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#3d2855] mt-2">
                <li>Follicular: lighter meals, salads, fresh foods feel good as energy rises</li>
                <li>Luteal: more hunger is normal and hormonal — complex carbs, protein, and magnesium-rich foods help with cravings and mood</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks your cycle phase alongside daily energy, mood, and symptoms
              — so the pattern becomes visible without any manual calculation.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Try it free — no card needed for 7 days
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">
            The Honest Reality About Cycle Syncing
          </h2>

          <p>A few things worth knowing before you start:</p>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Your phases are not perfectly timed</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Average cycle lengths and phase durations vary person to person — and cycle
                to cycle. A 35-day cycle has a longer follicular phase than a 26-day cycle.
                Tracking your own cycle is essential to know your actual phases.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">It is a framework, not a rule</p>
              <p className="text-sm text-[#3d2855] mt-1">
                Cycle syncing is a tool for self-awareness, not a strict protocol. Some days
                your energy will not match the textbook phase description. That is normal.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">
                It works better with{" "}
                <Link href="/symptoms/irregular-periods" className="text-[#c94f68] hover:underline">
                  irregular cycles
                </Link>{" "}
                too
              </p>
              <p className="text-sm text-[#3d2855] mt-1">
                Even if your cycle is irregular, tracking daily symptoms and energy reveals
                your personal pattern over time — even if it does not match the 28-day
                template.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E6D7F3] p-4">
              <p className="font-semibold text-[#5a3575]">Start simple</p>
              <p className="text-sm text-[#3d2855] mt-1">
                You do not need to overhaul your life. Start by just noticing — track energy
                and mood daily for one cycle. The pattern reveals itself.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How to Start</h2>

          <ol className="list-decimal pl-5 space-y-2 text-[#140c18] leading-relaxed">
            <li>
              Download a cycle tracking app and start logging period dates and daily energy
            </li>
            <li>
              After one cycle, look back at where your energy was highest and lowest
            </li>
            <li>
              In the next cycle, try scheduling one demanding task in your follicular phase
              and giving yourself permission to rest in your late luteal phase
            </li>
            <li>Build from there — small adjustments compound over time</li>
          </ol>

          <p>
            <Link href="/" className="text-[#c94f68] hover:underline font-medium">
              Dawn Phase
            </Link>{" "}
            tracks your cycle phase alongside daily energy, mood, and symptoms — so the
            pattern becomes visible without any manual calculation. 7-day free trial, no
            card required.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4 italic">
            This post is for informational purposes only and does not constitute medical
            advice.
          </p>

        </div>

        <RelatedArticles
          currentSlug="cycle-syncing-beginners"
          slugs={["cycle-syncing-explained", "what-is-cycle-syncing", "cycle-tracking-for-beginners"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
