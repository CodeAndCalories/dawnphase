import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Tracking Endometriosis Symptoms — What to Log and Why It Matters",
  description:
    "Women with endometriosis wait an average of 7–10 years for diagnosis. Detailed symptom tracking across cycles builds the evidence that can speed that up.",
  openGraph: {
    title: "Tracking Endometriosis Symptoms — What to Log and Why It Matters",
    description:
      "Women with endometriosis wait an average of 7–10 years for diagnosis. Detailed symptom tracking across cycles builds the evidence that can speed that up.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Tracking%20Endometriosis%20Symptoms%20%E2%80%94%20What%20to%20Log%20and%20Why%20It%20Matters&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Tracking Endometriosis Symptoms — What to Log and Why It Matters"
        description="Women with endometriosis wait an average of 7–10 years for diagnosis. Detailed symptom tracking across cycles builds the evidence that can speed that up."
        url="https://www.dawnphase.com/blog/endometriosis-symptom-tracking"
        datePublished="2026-04-27"
        dateModified="2026-04-27"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          Tracking Endometriosis Symptoms — What to Log and Why It Matters
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only and is not medical advice. Endometriosis diagnosis requires clinical assessment including imaging and/or laparoscopy. Dawn Phase is not a medical device. Always consult a qualified healthcare professional.</p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            Women with endometriosis wait an average of 7–10 years from first symptoms to confirmed diagnosis. That delay isn&apos;t inevitable — but closing the gap requires building a record that clinicians can act on. Detailed, consistent symptom tracking across multiple cycles is one of the most powerful tools available to you before you ever set foot in a specialist&apos;s office.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What makes endometriosis hard to diagnose</h2>

          <p>
            Endometriosis occurs when tissue similar to the uterine lining grows outside the uterus — on the ovaries, fallopian tubes, bowel, bladder, or peritoneum. Despite affecting approximately 1 in 10 people with a uterus, it remains chronically underdiagnosed for several reasons.
          </p>
          <p>
            First, the symptoms overlap significantly with other conditions. Painful periods, pelvic pain, and bloating are common presentations of irritable bowel syndrome, pelvic inflammatory disease, adenomyosis, and ovarian cysts. Without a pattern across time, individual symptom reports are easy to attribute elsewhere.
          </p>
          <p>
            Second, the cyclical nature of symptoms — often dismissed as &quot;normal period pain&quot; — means many women are not taken seriously at initial consultations. Pain that predictably worsens in the days before and during menstruation, returns mid-cycle around ovulation, and eases after the period ends is clinically significant. But describing this pattern from memory is far less compelling than presenting documented data.
          </p>
          <p>
            Third, standard imaging (ultrasound, MRI) frequently appears normal in endometriosis, particularly in early-stage or superficial disease. Laparoscopy remains the gold standard for diagnosis — but it is invasive, and most clinicians will not refer for it without substantial clinical evidence. Your symptom record is that evidence.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why symptom tracking changes the conversation</h2>

          <p>
            Prospective symptom tracking — logging every day as it happens, rather than recalling it later — creates objective evidence. Memory systematically underestimates pain and symptom severity over time, especially for cyclical conditions where a good week can make the previous bad week feel less significant in retrospect.
          </p>
          <p>
            Clinical diagnostic criteria for endometriosis depend on symptoms that are cyclical, progressive, and affecting quality of life. A two-to-three cycle log that shows pain peaking predictably around the same cycle days, correlating with menstruation and ovulation, and affecting your ability to work or function, builds a clinical picture that is harder to dismiss than a single appointment description.
          </p>
          <p>
            What your doctor needs is not a list of complaints — it is a pattern. When did the pain start in this cycle? What was the severity? What helped and what didn&apos;t? Where was it located? Did it affect your ability to work, exercise, or have sex? A log answers all of these questions with dates attached.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to log every day</h2>

          <p>
            You don&apos;t need to track everything — but the following data points build the most clinically useful picture:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                cat: "Pain",
                items: ["Severity: 0–10 scale, every day", "Location: pelvic, lower back, leg, rectal, shoulder", "Timing: where you are in your cycle", "Character: cramping, stabbing, aching, pressure"],
              },
              {
                cat: "Menstrual flow",
                items: ["Intensity: spotting / light / medium / heavy / flooding", "Clots: none / small / large", "Colour: bright red, dark, brown", "Duration: number of days of each intensity"],
              },
              {
                cat: "Bowel & bladder",
                items: ["Painful bowel movements (especially during period)", "Diarrhoea or constipation cyclically", "Painful urination", "Blood in urine or stool (note and report promptly)"],
              },
              {
                cat: "Medication & fatigue",
                items: ["Medication taken (name, dose, time)", "Efficacy: did it work, partially, or not at all?", "Fatigue severity: 0–3 scale", "Activities affected or missed"],
              },
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

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When to track: the full cycle, not just your period</h2>

          <p>
            One of the most clinically significant — and frequently missed — features of endometriosis is that pain is not confined to menstruation. Tracking only during your period will miss important diagnostic data.
          </p>
          <p>
            Endometriosis-associated pain can occur throughout the cycle. Mid-cycle pain around ovulation (mittelschmerz) is more intense and prolonged in many people with endometriosis than in those without. Deep dyspareunia — pain during or after penetrative sex — is a hallmark symptom and typically occurs in the second half of the cycle when the uterosacral ligaments are most affected. Bowel symptoms often worsen cyclically, tracked from period to period.
          </p>
          <p>
            Logging daily, even on pain-free days (noting zero), gives clinicians the full picture: which days hurt, which don&apos;t, and whether the pattern maps predictably onto cycle phases. That full-cycle picture is what distinguishes endometriosis from dysmenorrhoea (painful periods only) in a clinical review.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to use your log at appointments</h2>

          <p>
            Come prepared with data, not just a description. Before your appointment, review your last two to three cycles and note the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your average pain score during menstruation vs. the rest of the cycle</li>
            <li>Your highest single-day pain score and which cycle day it occurred on</li>
            <li>Any symptoms that occurred outside of your period — mid-cycle pain, dyspareunia, bowel symptoms</li>
            <li>Days you were unable to work, exercise, or function normally</li>
            <li>Medications you tried and their effectiveness</li>
          </ul>
          <p>
            Presenting this as a summary — &quot;Over the last three cycles, my average pain on days 1–3 was 7/10, I had mid-cycle pain on day 13–14, and I missed work twice&quot; — is far more actionable than &quot;I get really bad cramps.&quot; It also signals to the clinician that you are a reliable historian, which increases the clinical weight given to your report.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When to see a specialist</h2>

          <p>
            You should seek a referral to a gynaecologist or endometriosis specialist if any of the following apply:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Period pain consistently rated 6/10 or above that is not well controlled by over-the-counter pain relief</li>
            <li>Pain that interferes with work, school, exercise, or social activities in most cycles</li>
            <li>Deep pain during or after penetrative sex (deep dyspareunia)</li>
            <li>Cyclically worsening bowel or bladder symptoms around your period</li>
            <li>Heavy periods with large clots and flooding</li>
            <li>Difficulty conceiving after 6–12 months of trying (endometriosis is present in 25–50% of people with unexplained infertility)</li>
          </ul>
          <p>
            If your GP is not taking your symptoms seriously, a symptom log spanning 2–3 cycles is your most effective tool for escalating the conversation. In many healthcare systems, a documented pattern of disabling cyclical pain is a clear referral criterion. Don&apos;t go to that appointment without it.
          </p>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="endometriosis-symptom-tracking"
          slugs={["luteal-phase-symptoms", "how-long-should-period-last", "pmdd-vs-pms"]}
        />

        <BlogCTA variant="endometriosis" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
