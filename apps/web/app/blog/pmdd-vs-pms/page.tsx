import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "PMDD vs PMS — How to Tell the Difference",
  description:
    "PMS and PMDD both cause premenstrual symptoms, but PMDD involves severe mood disruption. Here's how to understand the differences and what to do next.",
  openGraph: {
    title: "PMDD vs PMS — How to Tell the Difference",
    description:
      "PMS and PMDD both cause premenstrual symptoms, but PMDD involves severe mood disruption. Here's how to understand the differences and what to do next.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PMDD%20vs%20PMS%20%E2%80%94%20How%20to%20Tell%20the%20Difference&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="PMDD vs PMS — How to Tell the Difference"
        description="PMS and PMDD both cause premenstrual symptoms, but PMDD involves severe mood disruption. Here's how to understand the differences and what to do next."
        url="https://www.dawnphase.com/blog/pmdd-vs-pms"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          PMDD vs PMS — How to Tell the Difference
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Important medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational and informational purposes only. It is not a diagnostic tool and cannot tell you whether you have PMDD or PMS. Only a qualified healthcare provider can make a diagnosis. If you are experiencing severe premenstrual symptoms — especially thoughts of self-harm or suicidal ideation — please reach out to a doctor or mental health professional promptly. If you have thoughts of self-harm or feel unsafe, please contact local emergency services or a crisis support line immediately.
          </p>
        </div>

        <div className="text-[#140c18] space-y-6 leading-relaxed">
          <p className="text-lg text-[#3d2855]">
            Most people with a menstrual cycle experience some premenstrual symptoms. For some, those symptoms become severely disruptive. Understanding the difference between PMS and PMDD can be a first step toward getting appropriate support.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What is PMS?</h2>
          <p>
            Premenstrual syndrome (PMS) describes a cluster of physical and emotional symptoms that occur in the luteal phase of the menstrual cycle — typically in the one to two weeks before a period — and resolve within a few days of menstruation beginning. PMS is very common; research suggests that a significant proportion of people with cycles experience some degree of it.
          </p>
          <p>Common PMS symptoms include bloating, breast tenderness, headaches, fatigue, irritability, mood fluctuations, and food cravings. While uncomfortable, PMS symptoms are generally manageable and do not prevent normal functioning.</p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What is PMDD?</h2>
          <p>
            Premenstrual dysphoric disorder (PMDD) is a more severe condition in which the hormonal changes of the luteal phase trigger significant mood and psychological symptoms that substantially impair daily life. PMDD is recognised in the DSM-5 (the diagnostic reference used by mental health professionals) as a distinct disorder.
          </p>
          <p>
            The defining characteristic of PMDD is not just the type of symptoms but their severity and impact. Someone with PMDD may find it difficult to maintain relationships, go to work, or carry out everyday activities during the luteal phase. Importantly, symptoms resolve — often quite rapidly — once menstruation begins, which distinguishes PMDD from a general mood disorder.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How symptoms compare</h2>
          <div className="overflow-x-auto rounded-2xl border border-[rgba(130,80,170,0.12)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f4e6f0]">
                  <th className="text-left px-4 py-3 font-semibold text-[#5a3575]">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#3d2855]">PMS</th>
                  <th className="text-center px-4 py-3 font-semibold text-[#3d2855]">PMDD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Timing", "Luteal phase, resolves with period", "Luteal phase, resolves with period"],
                  ["Mood symptoms", "Mild irritability, mood dips", "Marked depression, anxiety, rage, or hopelessness"],
                  ["Daily functioning", "Uncomfortable but manageable", "Significantly impaired"],
                  ["Physical symptoms", "Common (bloating, fatigue)", "Present but mood symptoms dominate"],
                  ["Frequency", "Very common", "Less common — estimated 3–8% of those with cycles"],
                  ["Treatment needed", "Lifestyle measures often sufficient", "Medical support typically needed"],
                ].map(([feature, pms, pmdd]) => (
                  <tr key={feature} className="bg-white">
                    <td className="px-4 py-3 font-medium text-[#140c18]">{feature}</td>
                    <td className="px-4 py-3 text-center text-[#3d2855]">{pms}</td>
                    <td className="px-4 py-3 text-center text-[#3d2855]">{pmdd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#3d2855]">This table is for general orientation only, not for self-diagnosis.</p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why does PMDD happen?</h2>
          <p>
            Current research suggests that PMDD does not involve abnormal hormone levels per se. Rather, the brain appears to respond differently to the normal hormonal fluctuations of the luteal phase — particularly the interaction of progesterone metabolites with GABA receptors, which play a role in mood regulation. This heightened neurological sensitivity, rather than the hormones themselves, is thought to drive the severity of symptoms.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The diagnosis process</h2>
          <p>
            PMDD cannot be diagnosed from a single appointment. The standard approach requires prospective daily symptom tracking across at least two consecutive cycles — recording which symptoms occur, their severity, and the cycle day. This record is essential because it confirms the luteal-phase timing and post-menstruation resolution that define PMDD.
          </p>
          <p>
            Many people arrive at a PMDD evaluation having been previously assessed for depression or anxiety without the cyclical pattern being recognised. A detailed symptom log — showing when symptoms start, peak, and resolve — is the most important thing you can bring to a clinical conversation.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Treatment options</h2>
          <p>
            PMDD is a clinically recognized condition, and treatment options are available through a qualified healthcare professional. Options that a doctor may discuss include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>SSRIs</strong> — selective serotonin reuptake inhibitors, often taken either continuously or only in the luteal phase, are considered a first-line option for PMDD</li>
            <li><strong>Hormonal therapy</strong> — including combined oral contraceptives (particularly those with specific progestogen profiles) or GnRH agonists in more severe cases</li>
            <li><strong>Cognitive behavioural therapy (CBT)</strong> — evidence supports CBT as an effective support alongside other treatments</li>
            <li><strong>Lifestyle measures</strong> — aerobic exercise, sleep prioritisation, and dietary adjustments may reduce symptom severity</li>
          </ul>
          <p>
            The right approach depends on symptom severity, personal preferences, and medical history. A GP or gynaecologist is the appropriate starting point.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How tracking helps</h2>
          <p>
            Whether your symptoms are PMS or PMDD, daily tracking across multiple cycles provides the pattern data that makes clinical conversations more productive. Recording symptom severity, cycle day, sleep, and mood each day — even for just two or three months — transforms vague descriptions into objective evidence. See also our dedicated{" "}
            <Link href="/symptoms/pms-vs-pmdd" className="text-[#c94f68] hover:underline font-medium">PMS vs PMDD symptom guide</Link>{" "}
            with causes, tracking tips, and when to seek care.
          </p>
        </div>

        <div className="my-8 p-5 rounded-xl bg-[#f4e6f0] border border-[rgba(130,80,170,0.25)]">
          <p className="text-sm font-semibold text-[#5a3575] mb-1">Free tool</p>
          <p className="text-sm text-[#3d2855] mb-3">
            Rate 10 premenstrual symptoms on a 1–5 scale and get a PMS severity score.
          </p>
          <a
            href="/tools/pms-tracker"
            className="inline-block text-sm font-semibold text-white bg-[#c94f68] px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Try the PMS symptom checker →
          </a>
        </div>

        <p className="text-xs text-[#3d2855] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing thoughts of self-harm, please contact a healthcare provider or crisis service.
        </p>

        <RelatedArticles
          currentSlug="pmdd-vs-pms"
          slugs={["luteal-phase-symptoms", "perimenopause-symptoms-checklist", "how-long-should-period-last"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
