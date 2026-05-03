import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "How to Keep an Endometriosis Symptom Diary",
  description:
    "People with endometriosis wait an average of 7–10 years for a diagnosis. A detailed daily symptom diary can shorten that gap and give your specialist the evidence they need. Here's exactly what to track.",
  openGraph: {
    title: "How to Keep an Endometriosis Symptom Diary",
    description:
      "People with endometriosis wait an average of 7–10 years for a diagnosis. A detailed daily symptom diary can shorten that gap and give your specialist the evidence they need. Here's exactly what to track.",
    images: [{
      url: "https://www.dawnphase.com/og?title=How%20to%20Keep%20an%20Endometriosis%20Symptom%20Diary&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="How to Keep an Endometriosis Symptom Diary"
        description="People with endometriosis wait an average of 7–10 years for a diagnosis. A detailed daily symptom diary can shorten that gap and give your specialist the evidence they need. Here's exactly what to track."
        url="https://www.dawnphase.com/blog/tracking-endometriosis-diary"
        datePublished="2026-04-28"
        dateModified="2026-04-28"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>April 2026</span><span>·</span><span>8 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          How to Keep an Endometriosis Symptom Diary
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only and is not medical advice. Dawn Phase is not a diagnostic tool. If you suspect endometriosis, please consult a gynaecologist or specialist. Endometriosis requires clinical assessment — symptom tracking supports that process but cannot replace it.</p>
        </div>

        <div className="text-[#140c18] space-y-6 leading-relaxed">
          <p className="text-lg text-[#3d2855]">
            The average time between the onset of endometriosis symptoms and a confirmed diagnosis is 7–10 years. That delay is one of the most significant problems in reproductive health. It isn&apos;t caused by a lack of available diagnosis — laparoscopy has been the diagnostic standard for decades — but by the normalisation of symptoms, the difficulty of recognising non-obvious presentations, and the frequency with which severe menstrual pain is dismissed as expected. A thorough symptom diary doesn&apos;t fix the system, but it changes your position within it.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Why symptom diaries matter for endometriosis</h2>

          <p>
            Endometriosis is a condition in which tissue similar to the uterine lining grows outside the uterus — on the ovaries, fallopian tubes, peritoneum, bowel, bladder, and occasionally elsewhere. These lesions respond to hormonal fluctuations in the same way the uterine lining does: they bleed cyclically, cause inflammation, and over time can form scar tissue and adhesions.
          </p>
          <p>
            The symptom profile is broad and varies considerably between people. Some have debilitating pain; others have minimal pain but significant bowel symptoms, fatigue, or infertility. The cyclical nature of many symptoms — worse around menstruation, sometimes worse at ovulation — is clinically meaningful, but only if it&apos;s documented. A clinician asking &ldquo;how is your pain?&rdquo; in an appointment will get a different picture from a clinician shown three months of daily pain ratings anchored to cycle day.
          </p>
          <p>
            You can read more about the condition itself on the <Link href="/conditions/endometriosis" className="text-[#c94f68] hover:underline">Dawn Phase endometriosis page</Link>.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What to track every day</h2>

          <p>
            An effective endo diary captures the right dimensions without being so burdensome that you stop filling it in after a week. The following items, logged daily, give a clinician what they need:
          </p>

          <h3 className="text-xl font-semibold text-[#140c18] mt-6">Pain score (0–10)</h3>
          <p>
            A single numerical pain rating logged every day is more informative than a detailed description logged occasionally. Use the same scale consistently: 0 is no pain, 10 is the worst you&apos;ve experienced. Note whether the rating refers to your worst pain of the day or your average — and stick to one method. Even a daily 0 is useful data — it establishes your pain-free baseline.
          </p>

          <h3 className="text-xl font-semibold text-[#140c18] mt-6">Pain location</h3>
          <p>
            Pelvic pain, lower back pain, pain radiating down the legs, pain with bowel movements, pain with urination, and pain during or after sex are all distinct symptoms that point to different locations of endometriosis involvement. Note which locations are affected on any given day. Over time, a consistent pain location pattern — particularly one that correlates with cycle phase — is a clinically meaningful finding.
          </p>

          <h3 className="text-xl font-semibold text-[#140c18] mt-6">Flow and bleeding</h3>
          <p>
            Log flow intensity daily using a consistent scale (none, spotting, light, medium, heavy), and note any mid-cycle spotting or bleeding between periods. Heavy menstrual bleeding (soaking through a pad or tampon hourly for several hours) and passage of large clots are specific findings worth documenting. Endometriosis frequently coexists with adenomyosis, which is commonly associated with heavy flow — the two conditions together are not rare.
          </p>

          <h3 className="text-xl font-semibold text-[#140c18] mt-6">Bowel and bladder symptoms</h3>
          <p>
            Bowel symptoms — diarrhoea, constipation, bloating, painful bowel movements, rectal bleeding around menstruation — are among the most commonly underreported endo symptoms, partly because they&apos;re attributed to IBS. Tracking whether these symptoms worsen cyclically (particularly around menstruation and ovulation) is important diagnostic information. The same applies to bladder symptoms: urgency, frequency, pain with urination, or blood in urine around your period.
          </p>

          <h3 className="text-xl font-semibold text-[#140c18] mt-6">Fatigue</h3>
          <p>
            Endometriosis-associated fatigue is distinct from normal tiredness — many people describe it as a deep, heavy exhaustion disproportionate to activity. Log your energy level daily on a simple scale. If fatigue is severe around menstruation or ovulation in a pattern that repeats, that&apos;s worth highlighting in your symptom diary.
          </p>

          <h3 className="text-xl font-semibold text-[#140c18] mt-6">Medications taken</h3>
          <p>
            Note any pain medication taken each day, including over-the-counter NSAIDs (ibuprofen, naproxen), prescription pain relief, and hormonal treatments. This serves two purposes: it gives your clinician a picture of your actual treatment burden, and it helps you identify whether your current approach is controlling symptoms or simply masking them.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How to present your data to a specialist</h2>

          <p>
            Three months of daily tracking is the minimum for a clinically useful pattern. Two to three cycles is ideal. When you arrive at a specialist appointment, what you&apos;re presenting is not a list of symptoms but a longitudinal dataset — and that changes the conversation.
          </p>
          <p>
            The most important things to highlight:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The cyclical pattern — which symptoms worsen at which phase of your cycle, and by how much</li>
            <li>Your worst days and what makes them worse</li>
            <li>Any symptom that occurs outside menstruation, particularly around ovulation</li>
            <li>The impact on daily functioning — days missed from work or study, activities avoided, social events cancelled</li>
            <li>Your medication use — frequency, dose, and whether it&apos;s effective</li>
          </ul>
          <p>
            If your app or diary allows you to export data, bring it. A printed chart or screenshot showing pain ratings across cycle day is more effective than a verbal summary. Clinicians are trained to interpret visual data quickly, and a pattern that is obvious on a graph can be easy to minimise when described in words.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Patterns to look for across multiple cycles</h2>

          <p>
            With three or more cycles of data, you can start to identify the patterns most associated with endometriosis. These include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pain consistently rated 7 or above on day 1–3 of menstruation</li>
            <li>A secondary pain peak around ovulation (cycle day 12–16)</li>
            <li>Bowel symptoms that worsen specifically during menstruation rather than randomly</li>
            <li>Fatigue disproportionate to flow on heavy bleeding days</li>
            <li>Pain that persists beyond menstruation into the first days of the follicular phase</li>
            <li>A progressive worsening of symptoms across cycles — months where what was a 5 becomes a 7</li>
          </ul>
          <p>
            None of these patterns diagnoses endometriosis — only surgical confirmation can do that. But a consistent pattern that repeats across multiple cycles is the kind of clinical evidence that supports referral for investigation and moves the conversation forward.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Using Dawn Phase for endo tracking</h2>

          <p>
            Dawn Phase&apos;s daily log was built with complex symptom profiles in mind. You can log pain severity as part of your symptoms, track flow intensity, note fatigue and mood, and add free-text notes for anything that doesn&apos;t fit a checkbox — including pain location, bowel symptoms, or how much medication you took. Every entry is anchored to your cycle day, so patterns that are cycle-phase-dependent become visible as your data builds.
          </p>
          <p>
            The notes field is particularly valuable for endo tracking: a brief daily note — &ldquo;cramps 8/10, couldn&apos;t go to work, took ibuprofen 3×&rdquo; or &ldquo;pelvic pain at ovulation again, mid-back too&rdquo; — becomes a longitudinal record that is far more useful than memory alone.
          </p>
          <p>
            Dawn Phase is not a diagnostic tool and does not replace specialist assessment. But for those navigating a long diagnostic journey, having a thorough, exportable symptom record is one of the most useful things you can bring to every appointment.
          </p>
        </div>

        <p className="text-xs text-[#3d2855] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice. Dawn Phase is not a diagnostic tool. Please consult a healthcare provider if you suspect endometriosis.
        </p>

        <RelatedArticles
          currentSlug="tracking-endometriosis-diary"
          slugs={["endometriosis-symptom-tracking", "cycle-tracking-for-beginners", "luteal-phase-symptoms"]}
        />

        <BlogCTA variant="endometriosis" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
