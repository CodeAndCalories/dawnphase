import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Perimenopause vs Menopause — Key Differences",
  description:
    "Perimenopause and menopause are often confused. Here's how to tell them apart, what each stage involves, and how to know where you are in the transition.",
  openGraph: {
    title: "Perimenopause vs Menopause — Key Differences",
    description:
      "Perimenopause and menopause are often confused. Here's how to tell them apart, what each stage involves, and how to know where you are in the transition.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Perimenopause%20vs%20Menopause%20%E2%80%94%20Key%20Differences&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Perimenopause vs Menopause — Key Differences"
        description="Perimenopause and menopause are often confused. Here's how to tell them apart, what each stage involves, and how to know where you are in the transition."
        url="https://www.dawnphase.com/blog/perimenopause-vs-menopause"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Perimenopause vs Menopause — Key Differences
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Only a healthcare provider can confirm whether you are in perimenopause or menopause through clinical assessment and, where appropriate, blood tests.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            The terms perimenopause and menopause are often used interchangeably in everyday conversation — but they describe distinct stages of the reproductive transition. Understanding the difference helps you make sense of what your body is doing and have more productive conversations with healthcare providers.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The definitions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-5">
              <p className="text-sm font-bold text-[#C94B6D] uppercase tracking-wide mb-2">Perimenopause</p>
              <p className="text-sm text-[#8C6B5A] leading-relaxed">
                The transitional period <strong className="text-[#2D1B1E]">before</strong> menopause, during which oestrogen levels fluctuate and decline. Periods become irregular. Symptoms can begin years before periods stop. Perimenopause ends when you have gone 12 consecutive months without a period.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-5">
              <p className="text-sm font-bold text-[#C94B6D] uppercase tracking-wide mb-2">Menopause</p>
              <p className="text-sm text-[#8C6B5A] leading-relaxed">
                A single point in time: the moment you have gone <strong className="text-[#2D1B1E]">12 consecutive months without a period</strong>. It is confirmed retrospectively — you only know you have reached menopause once a year has passed without menstruation.
              </p>
            </div>
          </div>

          <p>
            Postmenopause refers to all the years after the menopause point. Many people use &ldquo;menopause&rdquo; loosely to describe the whole transitional experience — but technically, the menopause itself is a single day.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How long does perimenopause last?</h2>
          <p>
            The perimenopausal transition typically lasts between four and eight years, though it can be as short as one year or extend beyond ten. Most people enter perimenopause in their mid-to-late 40s, although research suggests symptoms can begin in the early 40s or occasionally the late 30s for some individuals.
          </p>
          <p>
            The average age of menopause in many Western populations is around 51, though there is considerable variation and this figure reflects population averages rather than individual prediction.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Symptoms: perimenopause vs postmenopause</h2>
          <p>
            Many of the symptoms people associate with &ldquo;the menopause&rdquo; actually occur during perimenopause — the transitional years before periods stop. Hot flashes, night sweats, sleep disruption, mood changes, and brain fog are characteristic of the oestrogen fluctuations of perimenopause, and can begin years before the final period.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[rgba(232,99,122,0.12)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FDF6F0]">
                  <th className="text-left px-4 py-3 font-semibold text-[#C94B6D]">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8C6B5A]">Perimenopause</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#8C6B5A]">Postmenopause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Periods", "Irregular, changing", "Absent (12+ months)"],
                  ["Oestrogen", "Fluctuating, generally declining", "Consistently low"],
                  ["Hot flashes", "Common, often intense", "May continue or ease"],
                  ["Fertility", "Reduced but present", "Effectively zero"],
                  ["Duration", "Typically 4–8 years", "Rest of life"],
                  ["Confirmed by", "Symptoms + cycle changes", "12 months no period"],
                ].map(([f, peri, post]) => (
                  <tr key={f} className="bg-white">
                    <td className="px-4 py-3 font-medium text-[#2D1B1E]">{f}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A]">{peri}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A]">{post}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to tell which stage you&apos;re in</h2>
          <p>
            During perimenopause, you will still be having periods — even if they are irregular, heavier, lighter, or spaced differently than before. The key markers of perimenopause are:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cycles becoming shorter or more variable</li>
            <li>Occasional missed periods, or cycles longer than 60 days</li>
            <li>New or worsening symptoms: hot flashes, night sweats, sleep disruption, mood changes</li>
          </ul>
          <p>
            You cannot know for certain that you have reached menopause until 12 consecutive months have passed without a period. Before that point, pregnancy is still possible, and no amount of symptoms confirms menopause has been reached.
          </p>
          <p>
            Blood tests (FSH, LH, oestradiol) can support clinical assessment but are often variable during perimenopause and may be inconclusive — a single test is rarely definitive.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why the distinction matters</h2>
          <p>
            The perimenopause/menopause distinction has clinical significance. Contraception is still needed in perimenopause (fertility is reduced but not zero). HRT considerations differ depending on whether someone is perimenopausal or postmenopausal. Treatment options for symptoms may also vary by stage.
          </p>
          <p>
            Practically: if you have had at least one period in the last 12 months, you are in perimenopause. If you have had no period for 12 months or more (without another cause such as medication, surgery, or pregnancy), you have reached menopause. Everything after that is postmenopause.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Tracking during the transition</h2>
          <p>
            Daily tracking is especially valuable during perimenopause because the pattern — not a single data point — is what reveals the transition. A record showing progressively more irregular cycles, increasing hot-flash frequency, and worsening sleep quality over 12–18 months provides far more meaningful clinical information than a single blood test or appointment.
          </p>
          <p>
            Dawn Phase&apos;s perimenopause mode tracks cycle dates, hot flashes, night sweats, brain fog, mood, and sleep alongside each other — building the longitudinal picture that makes both self-understanding and clinical conversations more productive. See also our{" "}
            <Link href="/blog/perimenopause-age" className="text-[#E8637A] hover:underline font-medium">guide to perimenopause timing</Link>{" "}
            and the{" "}
            <Link href="/blog/perimenopause-symptoms-checklist" className="text-[#E8637A] hover:underline font-medium">35-symptom perimenopause checklist</Link>.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="perimenopause-vs-menopause"
          slugs={["perimenopause-age", "perimenopause-symptoms-checklist", "luteal-phase-symptoms"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your perimenopause transition</h3>
          <p className="mb-6 opacity-90">Perimenopause mode included. Build your longitudinal picture.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
