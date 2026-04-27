import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Luteal Phase Symptoms — What's Normal and What's Not",
  description:
    "From PMS to PMDD, this guide explains what happens in the luteal phase, common symptoms, short luteal phase signs, and when to see a doctor.",
  openGraph: {
    title: "Luteal Phase Symptoms — What's Normal and What's Not",
    description:
      "From PMS to PMDD, this guide explains what happens in the luteal phase, common symptoms, short luteal phase signs, and when to see a doctor.",
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <ArticleSchema
        title="Luteal Phase Symptoms — What's Normal and What's Not"
        description="From PMS to PMDD, this guide explains what happens in the luteal phase, common symptoms, short luteal phase signs, and when to see a doctor."
        url="https://www.dawnphase.com/blog/luteal-phase-symptoms"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Luteal Phase Symptoms — What&apos;s Normal and What&apos;s Not
        </h1>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            The luteal phase runs from ovulation to the start of your next period — roughly days 15–28 in a 28-day cycle. For many women, it&apos;s the most symptomatic phase. Understanding what&apos;s normal (and what&apos;s not) can help you know when to seek support.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What happens during the luteal phase</h2>

          <p>
            After ovulation, the ruptured follicle transforms into the corpus luteum and begins producing progesterone. Progesterone&apos;s primary job is to prepare the uterine lining for a potential pregnancy. If fertilisation doesn&apos;t occur, the corpus luteum degenerates, progesterone drops, and menstruation begins.
          </p>
          <p>
            This progesterone surge — and the subsequent drop — is responsible for most luteal phase symptoms. Progesterone has a sedating, calming effect early in the phase, but as it falls in the days before your period, many women experience a sharp shift in mood, energy, and physical comfort.
          </p>
          <p>
            The typical luteal phase lasts 12–16 days. A phase shorter than 10 days is considered a short luteal phase (also called luteal phase defect or luteal phase insufficiency).
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Common luteal phase symptoms</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { cat: "Mood", items: ["Irritability or anger", "Low mood or tearfulness", "Anxiety or tension", "Difficulty concentrating"] },
              { cat: "Physical", items: ["Bloating and water retention", "Breast tenderness or swelling", "Headaches or migraines", "Fatigue and low energy"] },
              { cat: "Appetite & cravings", items: ["Carbohydrate cravings", "Increased appetite", "Chocolate or sugar cravings", "Nausea (less common)"] },
              { cat: "Sleep", items: ["Difficulty falling asleep", "Waking during the night", "Feeling unrested", "Vivid or anxious dreams"] },
            ].map((block) => (
              <div key={block.cat} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D] mb-2">{block.cat}</p>
                <ul className="space-y-1">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm text-[#8C6B5A] flex items-start gap-1.5">
                      <span className="text-[#E8637A] shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p>
            These symptoms in mild-to-moderate form are considered typical PMS (premenstrual syndrome), affecting roughly 75% of women to some degree.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Short luteal phase — signs to watch for</h2>

          <p>
            A short luteal phase (under 10 days from ovulation to period) can affect fertility and often presents with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Periods arriving shortly after a temperature rise (BBT chart)</li>
            <li>Spotting 1–3 days before full flow begins</li>
            <li>Difficulty conceiving despite regular ovulation</li>
            <li>Early miscarriage (the embryo may not have enough time for implantation before progesterone drops)</li>
          </ul>
          <p>
            A luteal phase under 10 days across multiple cycles warrants a conversation with your doctor. Blood tests on days 5, 7, and 9 after ovulation can confirm progesterone levels — a single midluteal test is often insufficient to diagnose deficiency.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">PMDD vs PMS — when to see a doctor</h2>

          <p>
            PMDD (premenstrual dysphoric disorder) is a severe form of PMS that affects approximately 3–8% of women. The distinguishing feature is not the type of symptoms but their severity and their impact on daily functioning.
          </p>

          <div className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] p-5 space-y-4">
            <div>
              <p className="font-semibold text-[#2D1B1E]">PMS</p>
              <p className="text-sm text-[#8C6B5A] mt-1">Uncomfortable but manageable symptoms in the week before your period. You can function normally, even if you&apos;d rather not. Symptoms resolve within a day or two of your period starting.</p>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-semibold text-[#2D1B1E]">PMDD</p>
              <p className="text-sm text-[#8C6B5A] mt-1">Severe mood disruption — including depression, hopelessness, or suicidal ideation — that significantly impairs work, relationships, or daily activities. Present in most luteal phases for at least a year. Requires medical diagnosis and often treatment (SSRIs, hormonal therapy, or both).</p>
            </div>
          </div>

          <p>
            If you suspect PMDD, tracking your symptoms daily for 2–3 cycles and bringing that data to a doctor or gynaecologist is the most effective first step. PMDD is often misdiagnosed as generalised depression or anxiety because the cyclical pattern isn&apos;t recognised.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How tracking luteal phase symptoms helps</h2>

          <p>
            The luteal phase is the most variable part of the cycle — and the most misunderstood. Many women spend years believing they have a mental health condition when they actually have a hormonal pattern that resolves predictably with their period.
          </p>
          <p>
            Daily symptom tracking across the full cycle reveals:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Exactly which cycle days your worst symptoms occur on</li>
            <li>Whether symptoms are truly luteal (resolving after day 1–2 of your period) or persisting throughout your cycle</li>
            <li>How your luteal symptoms change month to month</li>
            <li>Whether lifestyle factors — sleep, stress, alcohol — make symptoms better or worse</li>
          </ul>
          <p>
            Dawn Phase tracks your cycle day and phase in real time, making it easy to see at a glance whether you&apos;re in your luteal phase. For deeper dives into specific symptoms, see:{" "}
            <Link href="/symptoms/bloating-before-period" className="text-[#E8637A] hover:underline font-medium">bloating before period</Link>,{" "}
            <Link href="/symptoms/mood-swings-before-period" className="text-[#E8637A] hover:underline font-medium">mood swings before period</Link>.
            You can also calculate your luteal phase length with our free{" "}
            <Link href="/luteal-phase-calculator" className="text-[#E8637A] hover:underline font-medium">luteal phase calculator</Link>.
          </p>

        </div>

        <RelatedArticles
          currentSlug="luteal-phase-symptoms"
          slugs={["pmdd-vs-pms", "how-long-should-period-last", "pcos-cycle-tracking"]}
        />

        {/* CTA */}
        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your luteal phase with Dawn Phase</h3>
          <p className="mb-6 opacity-90">Daily symptom logging. Phase tracking. 7-day free trial.</p>
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
