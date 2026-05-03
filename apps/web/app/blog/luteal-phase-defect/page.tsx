import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BlogCTA from "@/components/BlogCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Luteal Phase Defect — Signs, Causes and How to Track It",
  description:
    "A short luteal phase (under 10 days) can cause spotting before periods, short cycles, and difficulty conceiving. Here's what the research says and how to track it.",
  openGraph: {
    title: "Luteal Phase Defect — Signs, Causes and How to Track It",
    description:
      "A short luteal phase (under 10 days) can cause spotting before periods, short cycles, and difficulty conceiving. Here's what the research says and how to track it.",
    images: [{
      url: "https://www.dawnphase.com/og?title=Luteal%20Phase%20Defect%20%E2%80%94%20Signs%2C%20Causes%20and%20How%20to%20Track%20It&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker",
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
        title="Luteal Phase Defect — Signs, Causes and How to Track It"
        description="A short luteal phase (under 10 days) can cause spotting before periods, short cycles, and difficulty conceiving. Here's what the research says and how to track it."
        url="https://www.dawnphase.com/blog/luteal-phase-defect"
        datePublished="2026-05-01"
        dateModified="2026-05-01"
      />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#c94f68] hover:underline mb-8 inline-block">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs text-[#3d2855] mb-4">
          <span>May 2026</span><span>·</span><span>6 min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-6">
          Luteal Phase Defect — Signs, Causes and How to Track It
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">This article is for educational purposes only and does not constitute medical advice. Only a doctor can diagnose luteal phase defect. Research in this area is ongoing — where evidence is limited, this article uses &ldquo;research suggests&rdquo; framing to reflect that uncertainty. Dawn Phase is not a medical device. Always consult a qualified healthcare professional for fertility concerns.</p>
        </div>

        <div className="text-[#140c18] space-y-6 leading-relaxed">

          <p className="text-lg text-[#3d2855]">
            If your cycles are on the short side, you spot before your period, or you&apos;ve had difficulty conceiving despite regular ovulation, luteal phase defect may be worth understanding. It&apos;s a condition that cycle tracking can help identify — though diagnosis and treatment always require clinical assessment.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">What luteal phase defect is</h2>

          <p>
            The luteal phase is the second half of the menstrual cycle — the period between ovulation and the start of your next period. During this phase, the corpus luteum (the remnant of the follicle that released the egg) produces progesterone. Progesterone prepares the uterine lining for potential implantation and, if pregnancy doesn&apos;t occur, its withdrawal triggers menstruation.
          </p>
          <p>
            A typical luteal phase lasts 12–16 days. Luteal phase defect (LPD) — also called luteal phase insufficiency or short luteal phase — refers to a luteal phase that is either too short (generally defined as fewer than 10 days from confirmed ovulation to the first day of menstrual flow) or characterised by insufficient progesterone production despite adequate length.
          </p>
          <p>
            Research suggests that a persistently short luteal phase may impair the uterine environment enough to make implantation more difficult, though the relationship between LPD and infertility is more complex than early studies indicated. A short luteal phase across multiple cycles is worth investigating; a single short cycle is not necessarily meaningful.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Common signs and symptoms</h2>

          <p>
            Luteal phase defect often presents with a recognisable cluster of symptoms. These can overlap with other conditions, which is why clinical testing is necessary for diagnosis — but they are useful flags to watch for in your tracking data:
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Short cycles overall",
                desc: "If your total cycle length is consistently 24 days or fewer, and your follicular phase is normal, the shortfall is usually in the luteal phase. A cycle of 24 days with ovulation on day 14 leaves only a 10-day luteal phase — right at the lower edge of normal.",
              },
              {
                title: "Spotting before your period",
                desc: "Light spotting or brown discharge in the 1–3 days before full menstrual flow begins is a classic sign of declining progesterone before the lining is ready to shed. Research suggests this pre-menstrual spotting is more common in cycles with a shorter or lower-progesterone luteal phase.",
              },
              {
                title: "Difficulty conceiving",
                desc: "A luteal phase under 10 days may not provide enough time for a fertilised egg to implant before progesterone drops and menstruation begins. Research suggests LPD is present in a subset of people with unexplained infertility and recurrent early pregnancy loss.",
              },
              {
                title: "Premenstrual symptoms starting early",
                desc: "If PMS symptoms — bloating, mood changes, breast tenderness — begin more than two weeks before your period, this may reflect an extended transition from the mid-luteal progesterone peak to the pre-menstrual drop.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[rgba(130,80,170,0.12)] p-4">
                <p className="font-semibold text-[#5a3575]">{item.title}</p>
                <p className="text-sm text-[#3d2855] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            For more on what luteal phase symptoms look and feel like, see our guide on{" "}
            <Link href="/symptoms/fatigue-luteal-phase" className="text-[#c94f68] hover:underline font-medium">fatigue in the luteal phase</Link>.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Hormonal causes</h2>

          <p>
            Luteal phase defect is fundamentally a progesterone problem — but the cause of that progesterone insufficiency can originate at several points in the hormonal cascade:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Impaired follicle development.</strong> If the follicle doesn&apos;t mature adequately before ovulation, the corpus luteum it forms will be less capable of producing sufficient progesterone. This is why conditions affecting follicular development — including PCOS, thyroid disorders, and hyperprolactinaemia — are associated with LPD.</li>
            <li><strong>Insufficient LH support.</strong> The corpus luteum depends on LH signalling to maintain progesterone production. Disruptions to LH pulsatility — from stress, excessive exercise, or low body weight — can reduce luteal function.</li>
            <li><strong>Age-related decline.</strong> Research suggests luteal phase quality declines with age, particularly after 35. This is one contributor to the reduced fertility seen in the late reproductive years.</li>
            <li><strong>Thyroid dysfunction.</strong> Hypothyroidism is strongly associated with luteal phase irregularities. TSH testing is typically the first bloodwork ordered when LPD is suspected.</li>
            <li><strong>High prolactin.</strong> Elevated prolactin (hyperprolactinaemia) — from a pituitary adenoma, thyroid disorder, or certain medications — suppresses LH and can directly impair corpus luteum function.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">How tracking cycle length and symptoms helps</h2>

          <p>
            Identifying a short luteal phase requires knowing when ovulation occurred — which means cycle tracking is the essential first step. Without a confirmed ovulation date, you can&apos;t calculate luteal phase length, and without luteal phase length data across multiple cycles, neither you nor a clinician can assess whether LPD is likely.
          </p>
          <p>
            The most reliable way to confirm ovulation for LPD assessment is BBT (basal body temperature) charting. The day after a sustained temperature rise (three consecutive days above your pre-ovulatory baseline) is your estimated ovulation date. Counting from that day to the first day of menstrual flow gives you your luteal phase length.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Chart BBT every morning at the same time, before getting out of bed</li>
            <li>Log the first day of full flow (not spotting) as your period start date</li>
            <li>Note any pre-period spotting separately — this is clinically relevant information</li>
            <li>Track across at least three cycles before drawing conclusions — one short luteal phase is not a pattern</li>
          </ul>
          <p>
            Alongside BBT, log premenstrual symptoms daily. If you can consistently document that spotting begins 2 days before your period, or that your temperature drops and period starts within 10 days of your ovulation temperature rise, that log gives your doctor something concrete to work with.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">Dawn Phase for luteal phase tracking</h2>

          <p>
            Dawn Phase tracks your luteal phase length automatically once you log your period dates and BBT readings. It calculates the current cycle day in real time, and when your temperature rise is logged, can display your estimated post-ovulatory day count.
          </p>
          <p>
            Over multiple cycles, Dawn Phase builds a history showing your average luteal phase length — making it straightforward to identify if it is consistently short. The data is exportable as a PDF for clinical appointments, where a multi-cycle luteal phase length summary significantly accelerates the assessment process.
          </p>
          <p>
            Use our free{" "}
            <Link href="/luteal-phase-calculator" className="text-[#c94f68] hover:underline font-medium">luteal phase calculator</Link>{" "}
            to estimate your luteal phase length from your last cycle.
          </p>

          <h2 className="text-2xl font-bold text-[#140c18] mt-8">When to see a doctor</h2>

          <p>
            Only a doctor can diagnose luteal phase defect. If your tracking data suggests a consistently short luteal phase (under 10 days across three or more cycles), see your GP or gynaecologist. Clinical assessment typically includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mid-luteal serum progesterone (usually drawn 7 days after confirmed ovulation — a single reading is often insufficient; some clinicians use serial measurements)</li>
            <li>TSH and thyroid panel (to rule out hypothyroidism as a driver)</li>
            <li>Prolactin (to rule out hyperprolactinaemia)</li>
            <li>Day 3 FSH and AMH (to assess ovarian reserve and follicular health)</li>
          </ul>
          <p>
            If diagnosed, treatment options depend on the underlying cause. Research suggests progesterone supplementation (vaginal progesterone), addressing thyroid or prolactin abnormalities, and in some cases ovulation induction can improve luteal phase length and quality — but these decisions are individualised and require medical supervision.
          </p>

        </div>

        <p className="text-xs text-[#3d2855] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice. Only a doctor can diagnose luteal phase defect.
        </p>

        <RelatedArticles
          currentSlug="luteal-phase-defect"
          slugs={["luteal-phase-symptoms", "ovulation-symptoms", "pcos-cycle-tracking"]}
        />

        <BlogCTA variant="general" />
      </main>
      <StickyMobileCTA />
    </div>
  );
}
