import type { Metadata } from "next";
import Image from "next/image";
import { ArticleSchema, FAQSchema } from "@/components/SchemaMarkup";

const TITLE       = "Finally, a Period Tracker Built for PCOS";
const DESCRIPTION =
  "Irregular cycles, unpredictable periods, and symptoms that standard apps ignore. Dawn Phase was built for PCOS — supporting 21-90 day cycles with no broken predictions. 7-day free trial.";
const URL         = "https://www.dawnphase.com/lp/pcos-period-tracker";
const OG_IMAGE    =
  "https://www.dawnphase.com/og?title=Finally%2C%20a%20Period%20Tracker%20Built%20for%20PCOS&subtitle=Dawn%20Phase%20%E2%80%94%20PCOS%20cycle%20tracking";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESCRIPTION,
  openGraph: {
    title:       TITLE,
    description: DESCRIPTION,
    url:         URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: DESCRIPTION,
    images:      [OG_IMAGE],
  },
  alternates: { canonical: URL },
};

const FEATURES = [
  "Supports cycles from 21–90+ days — no 28-day assumptions",
  "Tracks PCOS symptoms — acne, hair changes, mood, bloating, fatigue",
  "No broken predictions when you skip a cycle or go months without a period",
  "Doctor-ready PDF export for endocrinologist appointments",
  "Privacy-first — your health data is never sold",
];

const FAQS = [
  {
    q: "Does it work with very irregular cycles?",
    a: "Yes. Dawn Phase supports cycles from 21 to 90+ days. It doesn't break or produce misleading alerts when cycles are long or absent — it simply waits for your next logged period start and recalibrates. There are no 'late period' warnings based on a 28-day assumption.",
  },
  {
    q: "Can I track PCOS symptoms, not just periods?",
    a: "Yes. Log acne, bloating, fatigue, mood, energy, hair changes, and 40+ other symptoms every day. The insights view shows how your symptoms cluster across cycles, even when those cycles don't follow a regular pattern. You can export your full history as a CSV for endocrinologist visits.",
  },
  {
    q: "How does it handle months with no period?",
    a: "Dawn Phase doesn't pressure you to fit into a standard cycle model. If you go 60 or 90 days without a period, it records the current cycle day from your last logged period start and waits. When your next period starts, you log it and Dawn Phase recalibrates automatically. No errors, no broken predictions.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        url={URL}
        datePublished="2026-05-01"
        dateModified="2026-05-01"
      />
      <FAQSchema questions={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* ── Logo bar ─────────────────────────────────────────────────────── */}
      <header className="px-6 py-5 flex justify-center border-b border-[rgba(130,80,170,0.1)]">
        <a href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Dawn Phase" width={32} height={32} className="rounded-lg" />
          <span className="font-bold text-base text-[#140c18] tracking-tight">Dawn Phase</span>
        </a>
      </header>

      <main className="max-w-[640px] mx-auto px-6 py-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#c94f68] border border-[#c94f68]/30 bg-[#c94f68]/5 rounded-full px-4 py-1.5 mb-6">
            Built for PCOS
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight tracking-tight mb-5">
            Finally, a Period Tracker Built for PCOS
          </h1>

          <p className="text-lg text-[#3d2855] leading-relaxed">
            Irregular cycles, unpredictable periods, and symptoms that standard
            apps ignore. Dawn Phase was built for this.
          </p>
        </div>

        {/* ── PCOS features ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[rgba(130,80,170,0.15)] p-7 mb-8 shadow-sm">
          <p className="text-xs font-bold text-[#3d2855] uppercase tracking-widest mb-5">
            What Dawn Phase does differently for PCOS
          </p>
          <ul className="space-y-4">
            {FEATURES.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <span className="text-[#c94f68] font-bold text-lg shrink-0 leading-snug">✓</span>
                <span className="text-[#140c18] leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Social proof callout ─────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 mb-8 text-center"
          style={{ background: "linear-gradient(135deg, #FFF0F0, #f4e6f0)" }}
        >
          <p className="text-sm font-semibold text-[#5a3575] leading-relaxed">
            "Built specifically for women with irregular cycles and PCOS"
          </p>
          <p className="text-xs text-[#3d2855] mt-2">
            Supports cycles of any length · No assumptions · No broken predictions
          </p>
        </div>

        {/* ── Pricing + CTA ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[rgba(130,80,170,0.2)] bg-white p-8 mb-12 shadow-md text-center">
          <p className="text-sm font-semibold text-[#3d2855] uppercase tracking-widest mb-2">
            Simple pricing
          </p>
          <p className="text-3xl font-bold text-[#140c18] mb-1">
            $14.99<span className="text-base font-normal text-[#3d2855]">/month</span>
          </p>
          <p className="text-sm text-[#3d2855] mb-7">
            7-day free trial — <strong className="text-[#140c18]">no card required</strong> to start
          </p>

          <a
            href="/signup"
            className="block w-full rounded-full py-4 text-base font-bold text-white text-center transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#c94f68]/30"
            style={{ background: "linear-gradient(135deg, #c94f68, #5a3575)" }}
          >
            Start tracking my PCOS cycle free →
          </a>

          <p className="mt-4 text-xs text-[#3d2855]">
            No credit card until day 8 · Cancel anytime · Your data stays yours
          </p>
        </div>

        {/* ── How it handles PCOS ──────────────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#140c18] mb-5">
            How Dawn Phase handles PCOS differently
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "No 28-day assumption",
                body: "Standard apps predict your next period by adding your average cycle length to your last period date. With PCOS, cycles range from 21 to 90+ days — or disappear entirely. Dawn Phase calculates from your actual last period start and doesn't alert you when you 'miss' a period.",
              },
              {
                title: "Full-cycle symptom tracking",
                body: "PCOS symptoms — acne, mood changes, bloating, fatigue, hair — don't cluster neatly around your period. Track them every day, mapped to your actual cycle day. After several months, patterns emerge even in irregular cycles.",
              },
              {
                title: "Doctor-ready data export",
                body: "Generate a PDF report of your symptom and cycle history in one tap. Export to CSV anytime. When you see your endocrinologist, arrive with data rather than trying to recall months of symptoms from memory.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-[rgba(130,80,170,0.12)] p-5"
              >
                <p className="font-semibold text-[#5a3575] mb-1.5">{title}</p>
                <p className="text-sm text-[#3d2855] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#140c18] mb-5">Common questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-[rgba(130,80,170,0.15)] bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none">
                  <span className="font-semibold text-[#5a3575] text-sm leading-snug">{q}</span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full bg-[#c94f68]/10 text-[#c94f68] flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="text-[#3d2855] text-sm leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="text-center">
          <a
            href="/signup"
            className="inline-block rounded-full px-10 py-4 text-base font-bold text-white transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#c94f68]/30"
            style={{ background: "linear-gradient(135deg, #c94f68, #5a3575)" }}
          >
            Start tracking my PCOS cycle free →
          </a>
          <p className="mt-3 text-xs text-[#3d2855]">7 days free · No card required</p>
        </div>
      </main>

      <div className="py-6 text-center text-xs text-[#3d2855] border-t border-[rgba(130,80,170,0.1)]">
        © 2026 Dawn Phase ·{" "}
        <a href="/privacy" className="hover:text-[#5a3575] transition-colors">Privacy Policy</a>
        {" "}·{" "}
        <a href="/terms" className="hover:text-[#5a3575] transition-colors">Terms</a>
      </div>
    </div>
  );
}
