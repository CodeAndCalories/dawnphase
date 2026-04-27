import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { ArticleSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "How Long Should Your Period Last? What's Normal",
  description:
    "The normal range for period length is 2–7 days. Here's what affects duration, what short or long periods can mean, and when to see a doctor.",
  openGraph: {
    title: "How Long Should Your Period Last? What's Normal",
    description:
      "The normal range for period length is 2–7 days. Here's what affects duration, what short or long periods can mean, and when to see a doctor.",
  },
};

export default function Post() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <ArticleSchema
        title="How Long Should Your Period Last? What's Normal"
        description="The normal range for period length is 2–7 days. Here's what affects duration, what short or long periods can mean, and when to see a doctor."
        url="https://www.dawnphase.com/blog/how-long-should-period-last"
        datePublished="2026-04-26"
        dateModified="2026-04-26"
      />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-sm text-[#E8637A] hover:underline mb-8 inline-block">← Back to blog</Link>
        <div className="flex items-center gap-2 text-xs text-[#8C6B5A] mb-4">
          <span>April 2026</span><span>·</span><span>5 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-6">
          How Long Should Your Period Last? What&apos;s Normal
        </h1>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This article is for educational purposes only and is not medical advice. What is &ldquo;normal&rdquo; varies between individuals. If you have concerns about your period length or flow, consult a healthcare provider.
          </p>
        </div>

        <div className="text-[#2D1B1E] space-y-6 leading-relaxed">
          <p className="text-lg text-[#8C6B5A]">
            Period length varies considerably from person to person — and even cycle to cycle. Understanding the general range, and what can shift it, helps you recognise what&apos;s typical for you and when a change is worth investigating.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">The normal range</h2>
          <p>
            Most clinical guidelines describe a typical period as lasting between two and seven days, with flow heaviest in the first one to three days and tapering thereafter. A period outside this range — particularly if it represents a change from your usual pattern — is worth monitoring.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {[
              { label: "Short", value: "Under 2 days", note: "May be worth tracking; common after hormonal contraception or with certain conditions" },
              { label: "Typical", value: "2–7 days", note: "The widely accepted normal range; varies by individual" },
              { label: "Long", value: "Over 7 days", note: "Prolonged bleeding warrants medical review" },
            ].map(({ label, value, note }) => (
              <div key={label} className="bg-white rounded-xl border border-[rgba(232,99,122,0.12)] p-4 text-center">
                <p className="text-xs font-semibold text-[#C94B6D] uppercase tracking-wide mb-1">{label}</p>
                <p className="text-lg font-bold text-[#2D1B1E]">{value}</p>
                <p className="text-xs text-[#8C6B5A] mt-1 leading-snug">{note}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">What affects period length</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Hormonal balance:</strong> Oestrogen builds the uterine lining; progesterone stabilises it. If either hormone is out of balance, the amount of lining shed — and how long it takes — can change. Conditions such as thyroid dysfunction, PCOS, and perimenopause all affect this balance.</li>
            <li><strong>Uterine factors:</strong> Fibroids, polyps, and adenomyosis can prolong or intensify bleeding by affecting how the uterine lining sheds.</li>
            <li><strong>Hormonal contraception:</strong> Hormonal methods often shorten or lighten periods significantly. After stopping them, periods may initially be shorter or longer than your pre-contraception norm as your cycle resets.</li>
            <li><strong>Stress:</strong> Significant physical or psychological stress can affect the hypothalamic-pituitary axis, altering cycle length, flow, and duration.</li>
            <li><strong>Weight changes:</strong> Both significant weight loss and gain can affect oestrogen levels and alter period characteristics.</li>
            <li><strong>Age and life stage:</strong> Periods often become more variable in perimenopause, sometimes shorter, sometimes heavier and longer, as oestrogen levels fluctuate.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Short periods: what they can mean</h2>
          <p>
            A period lasting only one or two days may be completely normal for some individuals, particularly if it has always been that way. Short periods are also common after stopping hormonal contraception, during perimenopause, and in the years just after your first period. However, a sudden shortening of your period — especially if accompanied by lighter flow — can occasionally indicate low oestrogen, thyroid issues, or (if sexually active) an early pregnancy. It&apos;s worth tracking the change over two or three cycles to see whether it persists.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Long periods: what they can mean</h2>
          <p>
            Periods lasting more than seven days — particularly with heavy flow — are categorised as prolonged menstrual bleeding and are worth investigating. Possible causes include fibroids, polyps, adenomyosis, bleeding disorders, thyroid dysfunction, and hormonal imbalances such as those seen in PCOS or perimenopause. Prolonged bleeding can also lead to iron-deficiency anaemia, which compounds fatigue and impacts daily function.
          </p>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">When to see a doctor</h2>
          <p>Consult a healthcare provider if:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your period consistently lasts more than seven days</li>
            <li>There has been a noticeable change in your usual period length that persists across multiple cycles</li>
            <li>You experience bleeding between periods or after sex</li>
            <li>Flow is so heavy it soaks through protection every hour or disrupts sleep</li>
            <li>You have symptoms of anaemia — persistent fatigue, pallor, shortness of breath, dizziness</li>
            <li>Periods are accompanied by significant pain not controlled by standard pain relief</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#C94B6D] mt-8">Why tracking matters</h2>
          <p>
            Knowing your typical period length — across many cycles, not just one — is the foundation for recognising change. Logging start and end dates, flow intensity, and symptoms each day gives you a personal baseline. This data is also directly useful for clinical appointments: a six-month log showing consistent eight-day periods is far more informative than trying to estimate from memory.
          </p>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-8">
          This content is for informational purposes only and is not a substitute for professional medical advice.
        </p>

        <RelatedArticles
          currentSlug="how-long-should-period-last"
          slugs={["period-after-birth-control", "pcos-cycle-tracking", "ovulation-symptoms"]}
        />

        <div className="mt-6 rounded-2xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}>
          <h3 className="text-2xl font-bold mb-2">Track your period length over time</h3>
          <p className="mb-6 opacity-90">Know your baseline. Spot changes early. 7-day free trial.</p>
          <a href="/signup" className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            Start your 7-day free trial →
          </a>
        </div>
      </main>
    </div>
  );
}
