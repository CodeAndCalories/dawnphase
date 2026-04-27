import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "10 Signs of Hormonal Imbalance in Women",
  description:
    "Irregular periods, mood swings, fatigue, and unexplained weight changes can all signal hormonal imbalance. Here's what to look for and when to seek help.",
  openGraph: {
    title: "10 Signs of Hormonal Imbalance in Women",
    description:
      "Irregular periods, mood swings, fatigue, and unexplained weight changes can all signal hormonal imbalance. Here's what to look for and when to seek help.",
  },
};

const SIGNS = [
  {
    n: "1",
    title: "Irregular or absent periods",
    body: "Cycles that vary significantly in length from month to month, or periods that disappear for several months, are among the most direct signals that reproductive hormones (oestrogen, progesterone, LH, FSH) are not cycling normally. Common causes include PCOS, thyroid dysfunction, elevated prolactin, perimenopause, and significant stress or weight changes.",
  },
  {
    n: "2",
    title: "Persistent fatigue",
    body: "Fatigue that doesn't resolve with sleep and is not explained by lifestyle factors can indicate thyroid imbalance (both under- and overactive thyroid), adrenal dysfunction, or low oestrogen. It is worth distinguishing from the cyclical fatigue of the luteal phase, which typically resolves with menstruation.",
  },
  {
    n: "3",
    title: "Unexplained weight changes",
    body: "Weight gain — particularly around the abdomen — without a change in diet or exercise can suggest insulin resistance, thyroid underactivity, or elevated cortisol (stress hormone). Unexpected weight loss can signal thyroid overactivity. Oestrogen decline in perimenopause also shifts fat distribution towards the abdomen.",
  },
  {
    n: "4",
    title: "Mood changes, anxiety, or depression",
    body: "Hormones influence serotonin, GABA, and dopamine signalling. Low oestrogen or progesterone can contribute to anxiety, low mood, and irritability — particularly when these mood changes follow a cyclical pattern that correlates with the menstrual cycle. If mood symptoms consistently worsen in the luteal phase and resolve after your period starts, that is a hormonal pattern worth investigating.",
  },
  {
    n: "5",
    title: "Sleep problems",
    body: "Difficulty falling asleep, waking in the night (particularly between 2–4am), or non-restorative sleep can be driven by low progesterone (which has sleep-promoting properties), falling oestrogen, or elevated cortisol. Night sweats that disrupt sleep are a common sign of low oestrogen in perimenopause.",
  },
  {
    n: "6",
    title: "Skin and hair changes",
    body: "Persistent acne — particularly along the jaw, chin, and cheeks — can indicate elevated androgens (testosterone), especially if it appears in adulthood alongside other PCOS symptoms. Hair thinning on the scalp, or unwanted hair growth in new areas, are also androgen-related signals. Dry, thinning skin and brittle nails can suggest thyroid imbalance.",
  },
  {
    n: "7",
    title: "Digestive problems",
    body: "Hormones influence gut motility. Many people notice digestive changes across their cycle — bloating, constipation, or looser stools — that correlate with hormonal shifts. Persistent digestive symptoms that don't follow the cycle may warrant investigation, but cyclical digestive changes are common and often hormonally driven.",
  },
  {
    n: "8",
    title: "Brain fog and memory lapses",
    body: "Difficulty concentrating, word-finding problems, and short-term memory lapses are associated with falling oestrogen — particularly in perimenopause. Thyroid dysfunction (especially underactive thyroid) can also produce significant cognitive slowing. If brain fog is new, persistent, and accompanied by other symptoms, it warrants attention.",
  },
  {
    n: "9",
    title: "Low libido",
    body: "A sustained decrease in sexual desire not explained by relationship factors or psychological state can indicate low testosterone (present in women in smaller amounts), low oestrogen, or elevated prolactin. Vaginal dryness and discomfort during sex, which can accompany low libido in perimenopause, are also oestrogen-related.",
  },
  {
    n: "10",
    title: "Hot flashes or night sweats",
    body: "Sudden episodes of intense heat, flushing, or night sweating outside of obvious environmental causes are strongly associated with falling oestrogen — most commonly during perimenopause and menopause. Hot flashes in younger women warrant investigation for other causes of low oestrogen.",
  },
];

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <ArticleSchema
        title="10 Signs of Hormonal Imbalance in Women"
        description="Irregular periods, mood swings, fatigue, and unexplained weight changes can all signal hormonal imbalance. Here's what to look for and when to seek help."
        url="https://www.dawnphase.com/blog/hormonal-imbalance-signs"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          10 Signs of Hormonal Imbalance in Women
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. The signs described can have many causes — some hormonal, some not. Only a qualified healthcare provider can diagnose a hormonal imbalance. Do not attempt to self-treat based on this content.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            Hormones regulate almost every system in the body — from metabolism and sleep to mood and reproductive health. When they fall out of balance, the effects can be wide-ranging and, because they overlap with many other conditions, easily missed. Here are ten commonly reported signs, and what they might point to.
          </p>

          <p className="text-sm text-[#8C6B5A] bg-[#FDF6F0] rounded-lg p-3 border border-[rgba(232,99,122,0.15)]">
            These signs are indicators that warrant investigation — not diagnoses. Many have multiple possible causes. If you recognise several of these patterns, a conversation with your GP is a useful starting point.
          </p>

          <div className="space-y-5 mt-4">
            {SIGNS.map(({ n, title, body }) => (
              <div key={n} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-5">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[#E8637A] text-white text-sm font-bold flex items-center justify-center mt-0.5">
                    {n}
                  </span>
                  <div>
                    <p className="font-semibold text-[#C94B6D]">{title}</p>
                    <p className="text-sm text-[#8C6B5A] mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When to see a doctor</h2>
          <p>
            Any of these signs is worth mentioning at a routine appointment, particularly if it is new, persistent, or affecting your quality of life. If you notice several of these signs together, or if symptoms are significantly impacting your daily function, proactively requesting a hormonal panel is reasonable. Useful starting tests include TSH (thyroid), FSH, LH, oestradiol, testosterone, prolactin, and fasting glucose or insulin — though your doctor will determine which are most relevant to your specific presentation.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking helps</h2>
          <p>
            Many hormonal symptoms are cyclical — they follow the menstrual cycle or appear in consistent patterns over time. Tracking daily symptoms, energy, mood, and sleep alongside your cycle day helps distinguish a hormonal pattern from a non-cyclical condition. It also gives you concrete data to bring to a clinical appointment, turning vague descriptions into a pattern a doctor can investigate.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="hormonal-imbalance-signs"
          slugs={["perimenopause-symptoms-checklist", "pcos-cycle-tracking", "pmdd-vs-pms"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your symptoms to spot patterns</h3>
          <p className="mb-6 opacity-90">Daily logging reveals what&apos;s cyclical and what isn&apos;t. 7-day free trial.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
