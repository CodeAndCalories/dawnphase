import type { Metadata } from "next";
import Image from "next/image";
import { ArticleSchema, FAQSchema } from "@/components/SchemaMarkup";

const TITLE       = "A Period Tracker That Actually Protects Your Privacy";
const DESCRIPTION =
  "No ads. No data selling. No sharing with Facebook. Dawn Phase is subscription-only — your cycle data stays yours. 7-day free trial, no card required.";
const URL         = "https://www.dawnphase.com/lp/privacy-period-tracker";
const OG_IMAGE    =
  "https://www.dawnphase.com/og?title=A%20Period%20Tracker%20That%20Actually%20Protects%20Your%20Privacy&subtitle=Dawn%20Phase%20%E2%80%94%20Privacy-first%20cycle%20tracker";

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

const TRUST_POINTS = [
  "Subscription-only — your data funds the product, not ads",
  "Export or delete your data anytime from Settings",
  "No advertising SDKs, no third-party data sharing",
];

const FAQS = [
  {
    q: "Is my data really private?",
    a: "Yes. Dawn Phase is subscription-only — we have no advertisers and no data broker partnerships. There is no incentive for us to share your data because your subscription pays for the product directly. You can export or delete everything from Settings at any time.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export all your cycle and symptom data as a CSV before you cancel — it belongs to you. If you delete your account, your data is removed from our active database. There are no cancellation fees and no questions asked.",
  },
  {
    q: "How is this different from free apps?",
    a: "Free period apps use advertising-based business models, which create incentives to collect and share your data with third parties. Some have faced regulatory scrutiny for doing exactly that. Dawn Phase charges a subscription ($14.99/month after your 7-day trial) because that's the only way to build a tracker that is genuinely aligned with your privacy.",
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
            Privacy-first cycle tracking
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight tracking-tight mb-5">
            A Period Tracker That Actually Protects Your Privacy
          </h1>

          <p className="text-lg text-[#3d2855] leading-relaxed">
            No ads. No data selling. No sharing with Facebook.
            Just your cycle, tracked privately.
          </p>
        </div>

        {/* ── Trust points ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[rgba(130,80,170,0.15)] p-7 mb-8 shadow-sm">
          <ul className="space-y-4">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="text-[#c94f68] font-bold text-lg shrink-0 leading-snug">✓</span>
                <span className="text-[#140c18] leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Pricing + CTA ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[rgba(130,80,170,0.2)] bg-white p-8 mb-12 shadow-md text-center">
          <p className="text-sm font-semibold text-[#3d2855] uppercase tracking-widest mb-2">
            Simple pricing
          </p>
          <p className="text-3xl font-bold text-[#140c18] mb-1">$14.99<span className="text-base font-normal text-[#3d2855]">/month</span></p>
          <p className="text-sm text-[#3d2855] mb-7">
            7-day free trial — <strong className="text-[#140c18]">no card required</strong> to start
          </p>

          <a
            href="/signup"
            className="block w-full rounded-full py-4 text-base font-bold text-white text-center transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#c94f68]/30"
            style={{ background: "linear-gradient(135deg, #c94f68, #5a3575)" }}
          >
            Start my private trial →
          </a>

          <p className="mt-4 text-xs text-[#3d2855]">
            No credit card until day 8 · Cancel anytime · Your data stays yours
          </p>
        </div>

        {/* ── What you get ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#140c18] mb-5">
            Everything included in your trial
          </h2>
          <ul className="space-y-3">
            {[
              "Full cycle & phase tracking (menstrual, follicular, ovulatory, luteal)",
              "Daily symptom log — mood, energy, cramps, sleep, and 40+ categories",
              "Predictions without a fixed 28-day assumption",
              "Doctor-ready PDF export in one tap",
              "Perimenopause mode for 40+ women",
              "CSV data export — your history, always yours",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#140c18]">
                <span className="text-[#c94f68] shrink-0 mt-0.5">·</span>
                {item}
              </li>
            ))}
          </ul>
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
            Start my private trial →
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
