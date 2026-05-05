import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "PMDD vs PMS — How to Tell the Difference (And Why It Matters)",
  description:
    "PMS and PMDD both happen in the luteal phase but they're not the same thing. Here's how to tell the difference, what the symptom patterns look like, and why getting it right changes everything.",
  openGraph: {
    title: "PMDD vs PMS — How to Tell the Difference (And Why It Matters)",
    description:
      "PMS and PMDD both happen in the luteal phase but they're not the same thing. Here's how to tell the difference, what the symptom patterns look like, and why getting it right changes everything.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PMDD%20vs%20PMS%20Symptoms&subtitle=Dawn%20Phase%20%E2%80%94%20Cycle%20symptom%20guide",
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
        title="PMDD vs PMS — How to Tell the Difference (And Why It Matters)"
        description="PMS and PMDD both happen in the luteal phase but they're not the same thing. Here's how to tell the difference, what the symptom patterns look like, and why getting it right changes everything."
        url="https://www.dawnphase.com/blog/pmdd-vs-pms-symptoms"
        datePublished="2026-05-04"
        dateModified="2026-05-04"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>5 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          PMDD vs PMS — How to Tell the Difference (And Why It Matters)
        </h1>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            Everyone says &ldquo;it&apos;s just PMS.&rdquo; But if your symptoms are derailing your life every month — affecting your relationships, your work, your ability to function — that deserves a closer look than &ldquo;just.&rdquo;
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What PMS actually is</h2>

          <p>
            Premenstrual syndrome affects up to 75% of people who menstruate. It&apos;s real, it&apos;s physical, and it&apos;s hormonal — not psychological weakness or exaggeration. PMS symptoms appear in the <Link href="/blog/luteal-phase-symptoms" className="text-[#c94f68] hover:underline font-medium">luteal phase</Link> (after ovulation, before your period) and typically include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#3d2855]">
            <li>Bloating and breast tenderness</li>
            <li>Mood shifts — irritability, low mood, tearfulness</li>
            <li>Fatigue and sleep changes</li>
            <li>Food cravings</li>
            <li>Headaches and muscle aches</li>
          </ul>
          <p>
            For most people with PMS, these symptoms are noticeable and uncomfortable but manageable. They don&apos;t prevent normal functioning, and they resolve within a day or two of the period starting. That resolution is a key part of the pattern.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What PMDD is — and why it&apos;s different</h2>

          <p>
            Premenstrual Dysphoric Disorder is a recognised medical condition. It affects approximately 3–8% of people who menstruate. PMDD involves some of the same symptoms as PMS, but the key difference isn&apos;t which symptoms are present — it&apos;s their severity and their impact on daily functioning.
          </p>
          <p>
            PMDD symptoms are not uncomfortable. They are debilitating. Women with PMDD describe feeling like a different person in the week or two before their period — experiencing severe depression, overwhelming anxiety, rage that feels uncontrollable, hopelessness, or a sense of complete disconnection. These aren&apos;t mood shifts. They&apos;re disruptions to the ability to live normally.
          </p>
          <p>
            If you have ever thought, in the days before your period, that you cannot go on — and then felt dramatically better when your period arrived — that pattern is clinically significant. That isn&apos;t weakness. That isn&apos;t drama. That is a condition that has a name, has been researched, and is treatable.
          </p>

          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center my-4">
            <p className="text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase tracks symptom onset and resolution across your cycle, so you can show a doctor exactly when symptoms appear and when they lift — the pattern that makes diagnosis possible.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start tracking — free, no card needed
            </a>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The symptom comparison</h2>

          <p>
            The overlap makes this genuinely confusing. Both PMS and PMDD occur in the luteal phase. Both resolve when the period starts. The distinguishing factor is severity and functional impact, not the symptom list itself.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F3ECFA]">
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">Symptom area</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">PMS</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#1E0F30] border border-[#E6D7F3]">PMDD</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { area: "Mood", pms: "Irritability, low mood, tearfulness", pmdd: "Severe depression, hopelessness, rage, feeling out of control" },
                  { area: "Anxiety", pms: "Mild tension or worry", pmdd: "Overwhelming anxiety or panic" },
                  { area: "Functioning", pms: "Uncomfortable but manageable", pmdd: "Significantly impairs work, relationships, daily life" },
                  { area: "Physical", pms: "Bloating, cramps, fatigue, headaches", pmdd: "Same, often more intense" },
                  { area: "Duration", pms: "Last days before period", pmdd: "Can span 1–2 weeks of the luteal phase" },
                  { area: "Resolution", pms: "Eases 1–2 days after period starts", pmdd: "Eases within days of period starting — often dramatically" },
                ].map(({ area, pms, pmdd }) => (
                  <tr key={area} className="border-b border-[#E6D7F3]">
                    <td className="px-4 py-3 font-medium text-[#3d2855] border border-[#E6D7F3] bg-white">{area}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-white">{pms}</td>
                    <td className="px-4 py-3 text-[#3d2855] border border-[#E6D7F3] bg-[#F3ECFA]">{pmdd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">The pattern that matters most for diagnosis</h2>

          <p>
            There is one diagnostic pattern that is central to both PMS and PMDD: timing. Both conditions are luteal phase conditions that resolve when the period starts. If symptoms are present throughout the entire month, this points to a different underlying cause — depression, anxiety disorder, thyroid issues — and a different treatment path.
          </p>
          <p>
            The specific pattern doctors look for in PMDD is: symptom onset in the luteal phase (typically the last 1–2 weeks before the period), significant functional impairment during that window, and clear resolution within a few days of the period starting — with a symptom-free period for at least one week following. If that&apos;s your pattern, it&apos;s important information.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why tracking changes the conversation with your doctor</h2>

          <p>
            &ldquo;I feel terrible before my period&rdquo; is a description. &ldquo;Symptoms consistently appear between cycle days 16 and 28, severity peaks in the last five days, and resolve within 48 hours of my period starting — every cycle for the past six months&rdquo; is evidence.
          </p>
          <p>
            Doctors diagnosing PMDD typically ask for two cycles of prospective daily tracking — meaning you log symptoms as they happen, not from memory. This is because retrospective accounts are unreliable; we tend to forget the bad days when we&apos;re feeling better. Daily logging over two or more cycles is the clinical standard because the pattern has to be demonstrated, not described.
          </p>
          <p>
            If you suspect PMDD, starting to track now — before your next appointment — gives you something concrete to bring. Cycle day, symptom type, severity on a 1–10 scale, and whether you were able to function normally. That data matters.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to seek support</h2>

          <p>
            PMDD is treatable. Options include SSRIs (often prescribed to be taken only in the luteal phase), hormonal interventions, dietary changes, and targeted therapy. No single approach works for everyone, but there is a range of evidence-based treatments. Getting there starts with recognition.
          </p>
          <p>
            If your pre-period symptoms are significantly affecting your relationships, your work, or your ability to feel safe in your own mind — please don&apos;t file that under &ldquo;just PMS.&rdquo; You deserve an accurate name for what you&apos;re experiencing, and you deserve support. Talk to your GP, a gynaecologist, or a specialist in <Link href="/blog/pmdd-vs-pms" className="text-[#c94f68] hover:underline font-medium">premenstrual disorders</Link>.
          </p>
          <p>
            The first step is often the simplest: start logging, so you can show someone the pattern you&apos;ve been living.
          </p>

          <p className="text-xs text-[#7a5a8a] border-t border-[#E6D7F3] pt-4">
            This article is for informational purposes only and is not medical advice. PMDD is a serious medical condition that significantly impacts quality of life. If you believe you may have PMDD, please speak with a qualified healthcare provider. If you are in crisis or having thoughts of self-harm, contact a crisis line in your country — in the UK: Samaritans 116 123, in the US: 988 Suicide &amp; Crisis Lifeline.
          </p>

        </div>

        <RelatedArticles
          currentSlug="pmdd-vs-pms-symptoms"
          slugs={["pmdd-vs-pms", "luteal-phase-symptoms", "tired-before-period"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
