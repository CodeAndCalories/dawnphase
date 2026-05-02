import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Why Keeping a Cycle Mood Journal Changes Everything",
  description:
    "Mood changes through your menstrual cycle are hormonally driven and predictable — once you start tracking them. Here's how to build a cycle mood journal that reveals your personal patterns.",
  openGraph: {
    title: "Why Keeping a Cycle Mood Journal Changes Everything",
    description:
      "Mood changes through your menstrual cycle are hormonally driven and predictable — once you start tracking them. Here's how to build a cycle mood journal that reveals your personal patterns.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Why%20Keeping%20a%20Cycle%20Mood%20Journal%20Changes%20Everything&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
      width: 1200,
      height: 630,
    }],
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <ArticleSchema
        title="Why Keeping a Cycle Mood Journal Changes Everything"
        description="Mood changes through your menstrual cycle are hormonally driven and predictable — once you start tracking them. Here's how to build a cycle mood journal that reveals your personal patterns."
        url="https://www.dawnphase.com/blog/cycle-mood-journal"
        datePublished="2026-04-28"
        dateModified="2026-04-28"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Why Keeping a Cycle Mood Journal Changes Everything
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only and is not medical advice. If you experience severe mood symptoms that interfere with daily functioning, please consult a qualified healthcare provider.</p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            If you&apos;ve ever felt inexplicably irritable on a specific day every month, or noticed that your confidence peaks at a predictable point in your cycle, you&apos;ve already experienced what cycle mood journalling helps you map. These aren&apos;t random emotional states — they&apos;re hormonally driven, and once you can see them as a pattern, they stop feeling like they&apos;re happening to you.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The hormonal basis for cycle mood changes</h2>

          <p>
            Mood across the menstrual cycle is shaped primarily by fluctuating levels of oestrogen and progesterone, both of which interact with neurotransmitter systems including serotonin, dopamine, and GABA. These aren&apos;t minor fluctuations — oestrogen levels vary by a factor of ten between the menstrual and ovulatory phases. The brain is exquisitely sensitive to these changes.
          </p>
          <p>
            Oestrogen has a broadly mood-elevating effect, partly through its influence on serotonin availability and receptor sensitivity. As oestrogen rises in the follicular phase, many people notice improved energy, sharper focus, and a more positive baseline mood. The drop in oestrogen after ovulation — and again before menstruation — is associated with the mood dip many people experience in the luteal phase and just before their period.
          </p>
          <p>
            Progesterone, which rises sharply after ovulation, has sedative properties through its conversion to allopregnanolone — a neurosteroid that acts on GABA receptors. For some people this produces a calm, grounded feeling. For others — particularly those sensitive to progesterone fluctuations — the rising and then falling progesterone of the luteal phase is experienced as anxiety, irritability, or low mood.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The mood signature of each phase</h2>

          <p>
            While individual variation is substantial, the general mood landscape across a cycle tends to follow a recognisable arc:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Menstrual phase (days 1–5):</strong> As hormone levels reach their lowest point, some people experience fatigue and low mood. Others find this phase brings a surprising sense of calm and clarity once the pre-menstrual tension lifts.</li>
            <li><strong>Follicular phase (days 6–13):</strong> Rising oestrogen is associated with increased energy, sociability, optimism, and mental sharpness. This is often the phase people describe as feeling most like themselves.</li>
            <li><strong>Ovulatory phase (around day 14):</strong> Peak oestrogen coincides with a peak in communication, confidence, and social motivation. Many people feel most comfortable speaking in public, having difficult conversations, or presenting ideas during this window.</li>
            <li><strong>Luteal phase (days 15–28):</strong> The early luteal phase often feels stable. As progesterone peaks and then both hormones fall in the late luteal phase, symptoms like irritability, emotional sensitivity, difficulty concentrating, and low patience become more common.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to write in your cycle mood journal</h2>

          <p>
            The most effective cycle mood journals are brief enough to sustain daily, but consistent enough to build a meaningful dataset. A single daily entry does not need to take more than two minutes. The key things to capture:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Overall mood (1–5 scale or an emoji rating):</strong> A single number or symbol is enough to track the trajectory over time. Precision matters less than consistency.</li>
            <li><strong>Energy level:</strong> Separate from mood — you can feel emotionally positive but physically exhausted, or energised but irritable.</li>
            <li><strong>Notable emotions:</strong> Brief labels — "anxious this morning," "unusually tearful," "felt calm all day," "snapped at things that wouldn&apos;t normally bother me." No need for analysis, just observation.</li>
            <li><strong>Sleep quality:</strong> Poor sleep amplifies every negative mood state, and sleep often changes across the cycle — tracking it helps disambiguate cycle-driven mood changes from sleep-driven ones.</li>
            <li><strong>A short free-text note:</strong> This is where pattern-revealing specifics tend to emerge — the thoughts that are recurring, the things that triggered a reaction, or an observation about how you&apos;re processing the day.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How patterns emerge over 2–3 cycles</h2>

          <p>
            A single cycle of mood data is a story. Two or three cycles of data is a pattern. The distinction matters because any individual month contains confounding variables — a stressful work week, an illness, a difficult relationship moment — that can shift mood independently of hormones.
          </p>
          <p>
            When you look across three cycles of daily mood logs, what tends to emerge is not a perfect pattern, but a consistent shape: the days where mood is reliably lower, the days where anxiety tends to spike, the days where energy is predictably high. These recurring features — appearing at roughly the same cycle day, month after month — are the signal within the noise.
          </p>
          <p>
            Many people report that this recognition alone is profoundly useful. Understanding that a recurring low mood is cyclically predictable rather than a permanent state changes the experience of it. You can prepare for it, be gentler with yourself during it, and stop treating it as evidence of something fundamentally wrong.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Using your mood data at doctor appointments</h2>

          <p>
            Mood changes across the cycle are relevant to several clinical conditions, including PMDD (premenstrual dysphoric disorder), depression with perimenstrual worsening, anxiety disorders, and conditions affected by hormonal fluctuations such as migraines and epilepsy. In all of these, cycle-phase timing of symptoms is clinically important — and it&apos;s information your doctor cannot access unless you provide it.
          </p>
          <p>
            A two-to-three month mood log, showing which cycle days correlate with symptom onset and offset, gives your clinician something concrete to work with. The diagnostic criteria for PMDD, for example, specifically require prospective daily mood ratings over at least two cycles. A paper diary, an app export, or a simple screenshot of your daily log is far more useful than a retrospective description of how you generally feel before your period.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Mood tracking in Dawn Phase</h2>

          <p>
            Dawn Phase&apos;s daily log includes a mood rating (using a five-point emoji scale), an energy level, sleep hours, and an optional free-text notes field — the cycle mood journal built into your daily check-in. Each log is anchored to your cycle day, so you can see mood alongside phase context rather than just as a date on a calendar.
          </p>
          <p>
            The notes field is particularly useful for the kind of brief, unstructured observations that tend to reveal patterns over time: a sentence or two about how you&apos;re feeling, what&apos;s on your mind, or what you noticed about the day. Over two to three cycles, these entries build a picture that is both personally meaningful and clinically useful.
          </p>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice. Dawn Phase is not a diagnostic tool.
        </p>

        <RelatedArticles
          currentSlug="cycle-mood-journal"
          slugs={["luteal-phase-symptoms", "tired-before-period", "pmdd-vs-pms"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
