import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "PCOS Symptoms Tracker — What to Log Every Day",
  description:
    "A daily PCOS symptom log helps you find patterns, spot hormonal shifts, and build the evidence your endocrinologist needs. Here's what's worth tracking and why.",
  openGraph: {
    title: "PCOS Symptoms Tracker — What to Log Every Day",
    description:
      "A daily PCOS symptom log helps you find patterns, spot hormonal shifts, and build the evidence your endocrinologist needs. Here's what's worth tracking and why.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PCOS%20Symptoms%20Tracker%20%E2%80%94%20What%20to%20Log%20Every%20Day&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="PCOS Symptoms Tracker — What to Log Every Day"
        description="A daily PCOS symptom log helps you find patterns, spot hormonal shifts, and build the evidence your endocrinologist needs. Here's what's worth tracking and why."
        url="https://www.dawnphase.com/blog/pcos-symptoms-tracker"
        datePublished="2026-05-01"
        dateModified="2026-05-01"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>May 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          PCOS Symptoms Tracker — What to Log Every Day
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only and does not constitute medical advice. Symptom tracking does not diagnose PCOS or any other condition. Dawn Phase is not a medical device. Consult a qualified healthcare professional for diagnosis and treatment.</p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">

          <p className="text-lg text-[#8C6B5A]">
            PCOS is one of the most common hormonal conditions affecting people with ovaries — and one of the least understood, even by those who have it. Because symptoms vary widely between individuals and fluctuate over time, a daily symptom log is one of the most practical tools for understanding your own pattern and getting more from medical appointments.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The 4 types of PCOS and why symptoms differ</h2>

          <p>
            PCOS is not a single uniform condition. Research suggests there are at least four common phenotypes, each with a different hormonal profile and symptom cluster. Understanding which type you have — or suspect — helps you know what to prioritise in your log.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Insulin-resistant PCOS",
                desc: "The most common type. Driven by insulin resistance, which elevates androgens. Key symptoms: weight gain or difficulty losing weight, sugar cravings, fatigue after eating, skin tags, acne, and dark patches of skin (acanthosis nigricans).",
              },
              {
                title: "Inflammatory PCOS",
                desc: "Chronic low-grade inflammation drives androgen production. Key symptoms: fatigue, headaches, joint pain, skin issues, and gut problems. Often triggered or worsened by diet and environmental factors.",
              },
              {
                title: "Adrenal PCOS",
                desc: "Driven by excess DHEA-S from the adrenal glands rather than the ovaries. Key symptoms: anxiety, fatigue, and androgen symptoms (acne, excess hair) without insulin resistance or significant cyst burden on ultrasound.",
              },
              {
                title: "Post-pill PCOS",
                desc: "Temporary PCOS-like symptoms after stopping hormonal contraception, as LH and androgens temporarily surge. May resolve within 3–6 months but can persist in those with underlying susceptibility.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4">
                <p className="font-semibold text-[#C94B6D]">{item.title}</p>
                <p className="text-sm text-[#8C6B5A] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            Most people with PCOS present with overlapping features from multiple types. Your log will help identify which symptom clusters are most prominent for you — and how they shift over time. Learn more on our{" "}
            <Link href="/conditions/pcos" className="text-[#E8637A] hover:underline font-medium">PCOS condition guide</Link>.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Daily symptoms worth tracking</h2>

          <p>
            The goal of a daily PCOS symptom log is to capture both consistent symptoms and fluctuations — especially those that correlate with cycle phase or external factors. These are the categories worth logging every day:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                cat: "Skin and hair",
                items: ["Acne: location, number of spots, severity (1–3 scale)", "Oiliness of skin and scalp", "Excess facial or body hair (note location)", "Hair thinning or shedding"],
              },
              {
                cat: "Mood and mental health",
                items: ["Overall mood (1–5 scale)", "Anxiety level (1–5 scale)", "Concentration or brain fog", "Motivation and drive"],
              },
              {
                cat: "Energy and sleep",
                items: ["Energy on waking (1–5 scale)", "Energy by afternoon", "Hours of sleep last night", "Sleep quality (1–5 scale)"],
              },
              {
                cat: "Digestive and metabolic",
                items: ["Bloating (1–3 scale)", "Appetite and cravings (carbs, sugar)", "Bowel regularity", "Any pelvic discomfort or pressure"],
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

          <p>
            Also log cycle-specific data daily: period start and end dates, flow intensity, and any spotting between periods. For irregular cycles, logging every day — even when you&apos;re &ldquo;between&rdquo; periods — is especially important. See our guide on{" "}
            <Link href="/symptoms/irregular-periods-pcos" className="text-[#E8637A] hover:underline font-medium">irregular periods with PCOS</Link>{" "}
            for what the bleeding patterns typically look like.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Monthly patterns to look for</h2>

          <p>
            After 2–3 months of consistent daily logging, review your data for these patterns:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Symptom clustering around cycle events.</strong> Do your worst acne flares correlate with a particular cycle phase? Does bloating peak before your period or at a different time? Linking symptoms to cycle day reveals hormonal drivers that aren&apos;t obvious day-to-day.</li>
            <li><strong>Stress and symptom correlation.</strong> High-stress weeks often delay PCOS cycles and worsen androgen symptoms. If you log stressors alongside symptoms, the link usually becomes visible within a few months.</li>
            <li><strong>Diet and energy patterns.</strong> Insulin resistance in PCOS means blood sugar fluctuations drive energy and mood. Logging meals (even roughly: &ldquo;high carb day&rdquo; / &ldquo;balanced&rdquo;) alongside afternoon energy scores often reveals a relationship worth addressing.</li>
            <li><strong>Sleep and skin correlation.</strong> Poor sleep raises cortisol, which raises androgens, which worsens acne. This pattern often shows a 24–48 hour lag: bad sleep on Tuesday → worse skin on Thursday.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Using your log at endocrinologist appointments</h2>

          <p>
            A daily PCOS symptom log transforms what you can communicate at a specialist appointment. Instead of describing how you generally feel, you can answer specific clinical questions with data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>&ldquo;How regular are your periods?&rdquo; → exact cycle lengths for the last 4 months</li>
            <li>&ldquo;How severe is your acne?&rdquo; → average daily acne score and your worst days by cycle phase</li>
            <li>&ldquo;How&apos;s your energy?&rdquo; → documented pattern including post-meal crashes and morning scores</li>
            <li>&ldquo;Are you sleeping well?&rdquo; → weekly average sleep hours and quality ratings</li>
          </ul>
          <p>
            This data is also directly useful for assessing treatment response. If you start metformin, spironolactone, or a dietary intervention, your log becomes an objective measure of whether it&apos;s working — something your doctor can review alongside bloodwork at follow-up appointments.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Dawn Phase for PCOS symptom tracking</h2>

          <p>
            Dawn Phase is designed for the irregular cycle reality of PCOS. It tracks current cycle day from your logged period dates without assuming a regular interval, lets you log custom symptoms daily alongside standard cycle data, and builds a multi-cycle history that&apos;s exportable as a PDF.
          </p>
          <p>
            For PCOS specifically, this means your symptom log stays coherent even during a 60-day cycle or a month where your period doesn&apos;t arrive at all. The data stays attached to cycle day rather than calendar date, making cross-cycle pattern comparisons meaningful.
          </p>

        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice. Dawn Phase does not diagnose PCOS or any other condition.
        </p>

        <RelatedArticles
          currentSlug="pcos-symptoms-tracker"
          slugs={["pcos-cycle-tracking", "tracking-cycle-pcos", "luteal-phase-symptoms"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your PCOS symptoms daily</h3>
          <p className="mb-6 opacity-90">Irregular cycle support built in. Multi-cycle pattern history. 7-day free trial.</p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
