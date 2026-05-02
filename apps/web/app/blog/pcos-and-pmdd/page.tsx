import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "PCOS and PMDD — Can You Have Both?",
  description:
    "PCOS and PMDD share overlapping symptoms but have different causes. Here's how they can coexist, how to tell them apart, and why cycle day data matters for both.",
  openGraph: {
    title: "PCOS and PMDD — Can You Have Both?",
    description:
      "PCOS and PMDD share overlapping symptoms but have different causes. Here's how they can coexist, how to tell them apart, and why cycle day data matters for both.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PCOS%20and%20PMDD%20%E2%80%94%20Can%20You%20Have%20Both%3F&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="PCOS and PMDD — Can You Have Both?"
        description="PCOS and PMDD share overlapping symptoms but have different causes. Here's how they can coexist, how to tell them apart, and why cycle day data matters for both."
        url="https://www.dawnphase.com/blog/pcos-and-pmdd"
        datePublished="2026-05-01"
        dateModified="2026-05-01"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>May 2026</span><span>·</span><span>7 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          PCOS and PMDD — Can You Have Both?
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Only a qualified healthcare professional can diagnose PCOS, PMDD, or any other medical condition. If you are experiencing severe mood symptoms, please seek support from a doctor or mental health professional. Dawn Phase is not a medical device.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            PCOS and PMDD are both conditions that affect hormonal health, and both can cause mood-related symptoms. When someone experiences severe premenstrual mood changes alongside an irregular cycle and other PCOS features, the question often arises: do I have one of these, or both? The honest answer is that it&apos;s possible to have both — and the overlap in symptoms makes clinical evaluation essential.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Understanding each condition separately</h2>

          <p>
            <strong>PCOS (polycystic ovary syndrome)</strong> is a hormonal and metabolic condition characterised by elevated androgens, irregular or absent ovulation, and often the presence of multiple small follicles on the ovaries. Its primary symptoms include irregular periods, acne, excess hair growth, scalp hair thinning, weight changes, and insulin resistance. Many people with PCOS also report mood symptoms — anxiety, low mood, and irritability — that can persist throughout the cycle rather than being confined to the premenstrual window.
          </p>
          <p>
            <strong>PMDD (premenstrual dysphoric disorder)</strong> is a severe form of premenstrual syndrome characterised by significant mood symptoms — depression, anxiety, irritability, or mood swings — that arise in the luteal phase (the two weeks before a period) and resolve within a few days of menstruation starting. The key diagnostic feature is the timing: symptoms are cyclical and phase-specific, not present throughout the month.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Can PCOS and PMDD coexist?</h2>

          <p>
            Yes. Having PCOS does not protect against PMDD, and having PMDD does not preclude a PCOS diagnosis. Research suggests that people with PCOS have higher rates of anxiety and depression than the general population, and some researchers have proposed that hormonal imbalances in PCOS — particularly elevated androgens and disrupted progesterone — may increase vulnerability to mood dysregulation.
          </p>
          <p>
            However, the nature of PMDD — its tight link to the luteal phase — creates a practical complication in PCOS. PMDD is defined by its cyclical timing: symptoms appear after ovulation, during the progesterone-dominant luteal phase, and clear with menstruation. In PCOS, ovulation is often absent or unpredictable, which means the luteal phase itself may be irregular, shortened, or not present at all. This makes identifying a consistent PMDD pattern more complex.
          </p>
          <p>
            That said, when ovulation does occur in a PCOS cycle, the subsequent luteal phase can trigger PMDD symptoms in people who are susceptible. The research here is limited, but the clinical reality is that some people carry both diagnoses.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Overlapping symptoms — and how to tell them apart</h2>

          <p>
            The symptom overlap between PCOS and PMDD is significant, which is one reason people often wonder whether they have one, the other, or both.
          </p>

          <div className="overflow-x-auto rounded-xl border border-[rgba(232,99,122,0.12)] my-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#FDF6F0]">
                  <th className="text-left px-4 py-3 font-semibold text-[#C94B6D]">Symptom</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#C94B6D]">PCOS</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#C94B6D]">PMDD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Anxiety",               "✓ often year-round",  "✓ luteal phase only"],
                  ["Low mood / depression",  "✓ often year-round",  "✓ luteal phase only"],
                  ["Irritability",           "✓ variable",          "✓ severe, luteal phase"],
                  ["Fatigue",                "✓ common",            "✓ common in luteal phase"],
                  ["Brain fog",              "✓ common",            "✓ common in luteal phase"],
                  ["Bloating",               "✓ common",            "✓ common in luteal phase"],
                  ["Irregular periods",      "✓ defining feature",  "Not directly caused"],
                  ["Acne",                   "✓ androgen-driven",   "Can worsen premenstrually"],
                ].map(([symptom, pcos, pmdd]) => (
                  <tr key={symptom} className="bg-white">
                    <td className="px-4 py-3 font-medium text-[#2D1B1E]">{symptom}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A] text-xs">{pcos}</td>
                    <td className="px-4 py-3 text-center text-[#8C6B5A] text-xs">{pmdd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            The most diagnostically significant difference is <strong>timing</strong>. PMDD symptoms follow a predictable pattern tied to the luteal phase. PCOS mood symptoms, by contrast, may be present throughout the month and don&apos;t necessarily worsen premenstrually in the same consistent way.
          </p>
          <p>
            If your mood symptoms are severe and you cannot identify a clear premenstrual worsening pattern — or if your cycles are so irregular that the premenstrual window is hard to identify — this is important information for your doctor. It is not something to self-diagnose. Only a qualified healthcare professional can properly assess whether symptoms meet clinical criteria for either condition.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking is essential when you have both</h2>

          <p>
            When two conditions share overlapping symptoms, distinguishing between them — or recognising that both are present — requires pattern data over time. A single appointment description is insufficient. What clinicians need is a record of what symptoms occurred, on which cycle days, and with what severity.
          </p>
          <p>
            For someone who may have both PCOS and PMDD, the most useful tracking approach includes:
          </p>

          <div className="space-y-3 my-4">
            {[
              {
                title: "Daily mood and anxiety ratings",
                desc: "Log mood, anxiety level, and irritability every day — not just around your period. This reveals whether symptoms are truly cyclical (PMDD pattern) or more constant (consistent with PCOS-related mood dysregulation or both).",
              },
              {
                title: "Cycle day data",
                desc: "Record each period start date. If and when you can confirm ovulation (via BBT or other methods), log that too. This allows symptoms to be mapped relative to cycle phase — the essential requirement for PMDD assessment.",
              },
              {
                title: "Physical symptom log",
                desc: "Bloating, energy, cramps, sleep, acne, and brain fog alongside mood. Physical PMDD symptoms often accompany the mood symptoms, and seeing them rise and fall together strengthens the pattern.",
              },
              {
                title: "Functional impact notes",
                desc: "PMDD is partly defined by functional impairment — symptoms severe enough to affect work, relationships, or daily activities. Noting days where functioning was affected is clinically relevant.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D]">{item.title}</p>
                <p className="text-sm text-[#8C6B5A] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The importance of cycle day data for diagnosis</h2>

          <p>
            Clinical assessment of PMDD typically requires prospective daily symptom tracking over at least two cycles. The International Association for Premenstrual Disorders (IAPMD) recommends charting tools that allow symptoms to be rated daily and then reviewed against cycle timing. Without cycle day data, it is very difficult for a clinician to confirm that symptoms meet the PMDD pattern.
          </p>
          <p>
            This is particularly important in PCOS, where cycles are unpredictable and the &ldquo;luteal phase&rdquo; may not be where it would be in a standard 28-day cycle. A two-month log that clearly shows mood worsening in the 10 days before a bleed — even an irregular one — provides meaningful clinical data that a verbal description simply can&apos;t.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How Dawn Phase tracks both</h2>

          <p>
            Dawn Phase logs mood, anxiety, energy, sleep, bloating, cramps, and custom symptoms daily, mapped to your actual cycle day rather than a predicted one. For people with irregular PCOS cycles, this means the symptom log remains accurate even when periods arrive unpredictably.
          </p>
          <p>
            The symptom history and insights view shows patterns across multiple cycles, making it easier to see whether mood symptoms cluster before bleeds (consistent with PMDD) or are distributed throughout (consistent with PCOS-related mood effects). You can export your full symptom history as a CSV to share with your doctor.
          </p>
          <p>
            Learn more about{" "}
            <Link href="/conditions/pcos" className="text-[#E8637A] hover:underline font-medium">PCOS tracking in Dawn Phase</Link>
            {" "}or read our guide on{" "}
            <Link href="/blog/pmdd-vs-pms" className="text-[#E8637A] hover:underline font-medium">understanding the difference between PMDD and PMS</Link>
            . You can also explore the{" "}
            <Link href="/conditions/pmdd" className="text-[#E8637A] hover:underline font-medium">PMDD condition page</Link>
            {" "}for information on tracking PMDD symptoms specifically.
          </p>

          <div className="bg-[#FDF6F0] rounded-xl p-5 mt-6 border border-[rgba(232,99,122,0.12)]">
            <p className="text-sm font-semibold text-[#C94B6D] mb-2">Important reminder</p>
            <p className="text-sm text-[#8C6B5A] leading-relaxed">
              Only a qualified doctor or healthcare professional can diagnose PCOS, PMDD, or any other condition. If you are experiencing severe mood symptoms that are affecting your quality of life, please seek medical help. Tracking data can support clinical assessment — but it does not replace it.
            </p>
          </div>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="pcos-and-pmdd"
          slugs={["pmdd-vs-pms", "pcos-cycle-tracking", "pcos-symptoms-tracker"]}
        />

        <BlogCTA variant="pcos" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
