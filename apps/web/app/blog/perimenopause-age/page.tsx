import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "What Age Does Perimenopause Start?",
  description:
    "Perimenopause typically begins in the 40s but can start earlier. Here's what affects the timing, what early signs to watch for, and why tracking matters.",
  openGraph: {
    title: "What Age Does Perimenopause Start?",
    description:
      "Perimenopause typically begins in the 40s but can start earlier. Here's what affects the timing, what early signs to watch for, and why tracking matters.",
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          What Age Does Perimenopause Start?
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. Age ranges and symptoms mentioned are general patterns — individual experiences vary widely. If you have concerns about your hormonal health, consult a healthcare provider.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            Perimenopause — the transition before menopause — does not begin at a fixed age. Understanding the typical range, and the factors that influence timing, can help you recognise what your body may be telling you years before you reach menopause.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The typical age range</h2>
          <p>
            Most people begin perimenopause between their early 40s and mid-50s. Menopause itself — defined as twelve consecutive months without a period — occurs at an average age of around 51 in many populations, though this varies by geography, genetics, and other factors. Perimenopause typically precedes menopause by four to eight years, meaning the transition often begins in the mid-to-late 40s for most people.
          </p>
          <p>
            However, research suggests that symptoms can begin noticeably earlier — often in the early-to-mid 40s, and sometimes in the late 30s for those who experience early perimenopause.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What is early perimenopause?</h2>
          <p>
            Early perimenopause (beginning before age 40) is sometimes called premature ovarian insufficiency (POI) or premature ovarian failure when menopause occurs before 40. This affects a small proportion of people and has different causes and implications from typical perimenopause. If you suspect your periods have become significantly irregular or that you&apos;re experiencing perimenopause symptoms before your late 30s, a doctor can assess your hormone levels (FSH and oestradiol in particular) to investigate.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What affects when perimenopause starts</h2>

          <div className="space-y-4">
            {[
              { factor: "Genetics", desc: "The age your mother or maternal grandmother reached menopause is often a useful indicator of your likely timing, as age at menopause has a significant heritable component." },
              { factor: "Smoking", desc: "Research consistently finds that smoking is associated with earlier menopause — by one to two years on average. The effect appears dose-dependent." },
              { factor: "Ovarian surgery or chemotherapy", desc: "Surgical removal of one or both ovaries, or chemotherapy and radiotherapy targeting the pelvic region, can trigger immediate or accelerated menopause." },
              { factor: "Autoimmune conditions", desc: "Certain autoimmune conditions (including thyroid disease and diabetes) are associated with a higher risk of early ovarian insufficiency." },
              { factor: "Body composition", desc: "Both very low body fat and significant obesity can affect oestrogen levels and may influence the timing of menopause, though the relationship is complex." },
              { factor: "Never having been pregnant", desc: "Some studies suggest a modest association between nulliparity (never having been pregnant) and slightly earlier menopause, though this varies." },
            ].map(({ factor, desc }) => (
              <div key={factor} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D]">{factor}</p>
                <p className="text-sm text-[#8C6B5A] mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Early signs to watch for in your 40s</h2>
          <p>
            Because perimenopause can begin gradually and its early symptoms overlap with general life stress and other conditions, it is frequently unrecognised for years. Signs that your body may be entering perimenopause include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cycles becoming shorter (e.g., previously 28 days, now 23–25 days) — one of the earliest and most consistent early signs</li>
            <li>Heavier or more irregular periods</li>
            <li>New-onset sleep disruption, particularly early-morning waking</li>
            <li>Mood changes — notably increased anxiety, irritability, or low mood, especially premenstrually</li>
            <li>Hot flashes or night sweats — even if infrequent or mild</li>
            <li>Brain fog or word-finding difficulties that feel new</li>
            <li>Changes in vaginal moisture or comfort</li>
          </ul>
          <p>
            Having one or two of these symptoms does not confirm perimenopause — many have other explanations. But a cluster of new, persistent changes in your 40s is worth discussing with a doctor and, crucially, tracking.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking matters in your 40s</h2>
          <p>
            Perimenopause is inherently a pattern — it plays out over months and years, not in a single appointment. Daily tracking of cycle length, symptoms, sleep, and mood across six to twelve months provides the longitudinal picture that clinical assessment alone often misses.
          </p>
          <p>
            A cycle log showing progressively shorter cycles, increasing frequency of hot flashes, and worsening sleep over twelve months tells a much clearer story than a one-off hormone test (which can be highly variable during perimenopause). This record is also invaluable for conversations with a doctor about whether hormone replacement therapy or other interventions might be appropriate.
          </p>
          <p>
            Dawn Phase includes a dedicated perimenopause tracking mode that surfaces the symptoms most relevant to this transition — hot flashes, night sweats, brain fog, and mood shifts — alongside your cycle log, so you can build that longitudinal picture from the first day you suspect things might be changing.
          </p>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Start tracking your perimenopause symptoms</h3>
          <p className="mb-6 opacity-90">Perimenopause mode included. Build your picture over time.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
