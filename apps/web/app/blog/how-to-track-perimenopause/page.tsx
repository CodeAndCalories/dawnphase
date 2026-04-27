import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "How to Track Perimenopause Symptoms — A Practical Guide",
  description:
    "A practical guide to tracking perimenopause: what to log, how often, what patterns matter, and how to use your data at doctor appointments.",
  openGraph: {
    title: "How to Track Perimenopause Symptoms — A Practical Guide",
    description:
      "A practical guide to tracking perimenopause: what to log, how often, what patterns matter, and how to use your data at doctor appointments.",
    images: [{
      url: "https://www.dawnphase.com/og?title=How%20to%20Track%20Perimenopause%20Symptoms&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="How to Track Perimenopause Symptoms — A Practical Guide"
        description="A practical guide to tracking perimenopause: what to log, how often, what patterns matter, and how to use your data at doctor appointments."
        url="https://www.dawnphase.com/blog/how-to-track-perimenopause"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          How to Track Perimenopause Symptoms — A Practical Guide
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Tracking symptoms is a useful tool for supporting clinical conversations, but is not a substitute for assessment by a qualified healthcare provider. If you have concerns about perimenopause symptoms, consult your doctor.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            Perimenopause is a transition that unfolds over months or years. No single blood test or appointment captures it fully — which is why systematic tracking is one of the most powerful tools available to people navigating this stage. Here&apos;s how to do it effectively.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking perimenopause matters</h2>
          <p>
            Perimenopause symptoms are highly individual, gradual in onset, and easy to attribute to other causes — stress, poor sleep, life circumstances. Without a structured record, it is difficult to see the pattern. Tracking makes the pattern visible.
          </p>
          <p>
            There are three main reasons tracking perimenopause symptoms is valuable:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Clinical evidence.</strong> Many healthcare providers receive limited training in perimenopause. Arriving at an appointment with a 3–6 month symptom log makes the conversation more productive and the case for assessment or treatment more concrete.</li>
            <li><strong>Monitoring change.</strong> Tracking lets you see whether symptoms are increasing in frequency or severity, or whether an intervention (lifestyle, HRT, supplements) is making a difference.</li>
            <li><strong>Personal understanding.</strong> Seeing which symptoms cluster together, which correlate with sleep, stress, or alcohol, and how they change over your cycle (even an irregular one) helps you make sense of what your body is doing.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What to track</h2>

          <div className="space-y-4">
            {[
              {
                category: "Cycles",
                items: ["Period start dates", "Period end dates", "Flow intensity (light / medium / heavy)", "Spotting between periods", "Cycle length (calculated from start dates)"],
                note: "Cycle irregularity is often the first sign of perimenopause. Even if your periods are unpredictable, logging each one builds a picture of how your cycle is changing.",
              },
              {
                category: "Hot flashes and night sweats",
                items: ["Number of episodes per day/night", "Severity (mild discomfort to drenching)", "Time of day they tend to occur", "Any identifiable triggers (caffeine, alcohol, heat, stress)"],
                note: "See our guide to tracking hot flashes: tracking frequency and triggers makes them more manageable.",
              },
              {
                category: "Sleep",
                items: ["Hours slept", "Time to fall asleep", "Night awakenings (number and duration)", "Morning energy rating", "Night sweats affecting sleep"],
                note: "Sleep disruption is a significant driver of many other perimenopausal symptoms including brain fog, mood, and energy. Tracking it separately helps distinguish sleep-driven symptoms from directly hormonal ones.",
              },
              {
                category: "Mood and mental health",
                items: ["Daily mood rating (1–5 scale or descriptive)", "Anxiety episodes", "Irritability", "Low mood or depression", "Changes in confidence"],
                note: "Cyclical mood patterns — even in irregular cycles — are often hormonally driven. Tracking over months helps you and your doctor distinguish perimenopause-related mood changes from general mental health conditions.",
              },
              {
                category: "Cognitive symptoms",
                items: ["Brain fog episodes (difficulty concentrating)", "Word-finding difficulties", "Memory lapses", "Overall mental sharpness rating"],
                note: "These are among the most distressing perimenopause symptoms and among the most commonly dismissed. A log showing frequency and severity over time provides clinical weight to the complaint.",
              },
              {
                category: "Physical symptoms",
                items: ["Joint or muscle aches", "Headache frequency", "Breast tenderness", "Changes in libido", "Vaginal dryness or discomfort", "Skin or hair changes"],
                note: "Not everyone experiences all physical symptoms. Track what is relevant to you — even two or three of these consistently recorded adds value.",
              },
            ].map(({ category, items, note }) => (
              <div key={category} className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] p-5">
                <h3 className="font-bold text-[#C94B6D] mb-3">{category}</h3>
                <ul className="space-y-1 mb-3">
                  {items.map(item => (
                    <li key={item} className="text-sm text-[#2D1B1E] flex items-start gap-2">
                      <span className="text-[#E8637A] shrink-0 mt-0.5">·</span>{item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#8C6B5A] italic">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How often to log</h2>
          <p>
            Daily logging is the gold standard. Perimenopause symptoms are variable and often worse at specific times of day or points in the cycle — daily recording captures this nuance in a way that weekly or event-driven logging misses.
          </p>
          <p>
            That said, even logging four or five days per week consistently over several months is far more useful than perfect daily logging for two weeks followed by gaps. The goal is building a longitudinal pattern, which requires consistency over time more than completeness on any given day.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What patterns to look for</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Symptom clustering.</strong> Are hot flashes more common on specific days? Do brain fog episodes correlate with poor sleep nights? Patterns across symptoms reveal relationships.</li>
            <li><strong>Cycle phase correlation.</strong> Even in irregular cycles, some symptoms may still cluster around the late luteal phase. Tracking cycle dates alongside symptoms makes this visible.</li>
            <li><strong>Trigger correlation.</strong> Do hot flash frequency or sleep quality change measurably after alcohol, caffeine, or high-stress periods? This data is directly actionable.</li>
            <li><strong>Trend over time.</strong> Is hot flash frequency increasing month on month? Is sleep quality declining? A trend line is far more informative than individual data points.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">How to use tracking data at doctor appointments</h2>
          <p>
            The most useful thing you can bring to a GP or gynaecologist appointment about perimenopause is a structured symptom log — ideally covering at least three months. Specifically:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your last 10–15 cycle start dates and any notes on flow</li>
            <li>Hot flash frequency over the past month (e.g., &ldquo;averaging 4 per day, 2–3 per night&rdquo;)</li>
            <li>Sleep quality trend (e.g., &ldquo;averaging 5–6 hours, waking 2–3 times, worse in the two weeks before each period&rdquo;)</li>
            <li>Any mood or cognitive symptoms with their frequency and impact on daily function</li>
          </ul>
          <p>
            This transforms a vague &ldquo;I think I might be in perimenopause&rdquo; into an evidence-based clinical conversation. It also makes it significantly harder for symptoms to be dismissed.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Dawn Phase perimenopause mode</h2>
          <p>
            Dawn Phase includes a dedicated perimenopause tracking mode that surfaces the symptoms most relevant to this transition — including{" "}
            <Link href="/symptoms/hot-flashes-causes" className="text-[#E8637A] hover:underline font-medium">hot flashes</Link>,{" "}
            <Link href="/symptoms/brain-fog-perimenopause" className="text-[#E8637A] hover:underline font-medium">brain fog</Link>, night sweats, sleep, and mood — alongside cycle dates and daily energy logging.
          </p>
          <p>
            The insights view shows symptom frequency trends over time, and the doctor PDF export generates a structured report that summarises your cycle history, top symptoms, and phase averages — designed to be useful in clinical appointments without requiring you to manually compile your data.
          </p>
          <p>
            For a comprehensive list of perimenopause symptoms to track, see our{" "}
            <Link href="/blog/perimenopause-symptoms-checklist" className="text-[#E8637A] hover:underline font-medium">perimenopause symptoms checklist</Link>.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="how-to-track-perimenopause"
          slugs={["perimenopause-symptoms-checklist", "perimenopause-age", "perimenopause-vs-menopause"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Perimenopause mode — built for this transition</h3>
          <p className="mb-6 opacity-90">Track hot flashes, sleep, mood and brain fog. Doctor PDF export included.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
