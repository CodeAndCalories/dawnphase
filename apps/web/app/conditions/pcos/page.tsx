import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { ArticleSchema, FAQSchema, MedicalWebPageSchema } from "@/components/SchemaMarkup";
import { PCOSPrintButton, PCOSEmailCapture } from "./PCOSClientSections";

// ── Metadata ───────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "PCOS Cycle Tracking — How to Track Your Cycle With Polycystic Ovary Syndrome",
  description:
    "The most comprehensive PCOS cycle tracking guide: daily checklists, BBT & OPK guidance for PCOS, symptom tracking, ovulation detection, and when to see a specialist.",
  openGraph: {
    title: "PCOS Cycle Tracking — How to Track Your Cycle With Polycystic Ovary Syndrome",
    description:
      "The most comprehensive PCOS cycle tracking guide: daily checklists, BBT & OPK guidance for PCOS, symptom tracking, ovulation detection, and when to see a specialist.",
    images: [{
      url: "https://www.dawnphase.com/og?title=PCOS%20Cycle%20Tracking%20%E2%80%94%20Complete%20Guide&subtitle=Dawn%20Phase%20%E2%80%94%20Built%20for%20irregular%20cycles",
      width: 1200,
      height: 630,
    }],
  },
};

// ── Data ───────────────────────────────────────────────────────────────────────

const PAGE_URL = "https://www.dawnphase.com/conditions/pcos";

const FEATURES = [
  {
    title: "21–90 day cycle support",
    body: "No 28-day assumption. Dawn Phase adapts to whatever your cycle does — whether that's 35 days or 80.",
  },
  {
    title: "PCOS symptom logging",
    body: "Track acne, energy, cramps, hair changes, and mood alongside cycle data to spot what changes phase to phase.",
  },
  {
    title: "Multi-cycle pattern view",
    body: "Irregular cycles start to make sense when you see months of data side by side. Patterns emerge even when cycles don't.",
  },
];

const BLOG_POSTS = [
  {
    slug: "how-to-track-ovulation-pcos",
    title: "How to Track Ovulation With PCOS — A Practical Guide",
    excerpt: "Standard OPK tests can give false positives with PCOS. Here's how BBT charting, OPKs, and cervical mucus observations work with irregular cycles — and how to read the signs correctly.",
    readTime: "7 min",
  },
  {
    slug: "pcos-symptoms-tracker",
    title: "PCOS Symptoms Tracker — What to Log Every Day",
    excerpt: "A daily symptom log is one of the most practical tools for understanding your PCOS pattern and getting more from endocrinologist appointments. Here's exactly what to track.",
    readTime: "6 min",
  },
  {
    slug: "pcos-cycle-tracking",
    title: "How to Track Your Cycle With PCOS — A Complete Guide",
    excerpt: "PCOS makes standard cycle tracking apps nearly useless. Here's what to track instead — and how to spot patterns even with unpredictable cycles.",
    readTime: "6 min",
  },
  {
    slug: "period-tracker-for-pcos",
    title: "Best Period Tracker App for PCOS in 2026",
    excerpt: "Standard period trackers fail with PCOS. Here's what irregular cycle tracking needs and what to look for in an app.",
    readTime: "5 min",
  },
  {
    slug: "tracking-cycle-pcos",
    title: "Why Tracking Your Cycle With PCOS Is Different",
    excerpt: "Standard apps assume a 28-day cycle. PCOS doesn't work like that — here's what to prioritise in a period tracker instead.",
    readTime: "5 min",
  },
  {
    slug: "luteal-phase-defect",
    title: "Luteal Phase Defect — Signs, Causes and How to Track It",
    excerpt: "A short luteal phase (under 10 days) is associated with PCOS and can make conception harder. Here's how cycle tracking helps identify it.",
    readTime: "6 min",
  },
];

const RELATED_SYMPTOMS = [
  { slug: "irregular-periods-pcos", name: "Irregular periods with PCOS" },
  { slug: "acne-hormonal",          name: "Hormonal acne" },
  { slug: "fatigue-luteal-phase",   name: "Fatigue and low energy" },
];

const CHECKLIST_SECTIONS = [
  {
    heading: "Bleeding & cycle",
    items: [
      "Period started today? Log flow: spotting · light · medium · heavy",
      "Any spotting between periods?",
      "Today's cycle day: ___",
    ],
  },
  {
    heading: "Ovulation signs",
    items: [
      "BBT this morning (before getting up): ___ °C/°F",
      "Cervical mucus: none · sticky · creamy · egg white · watery",
      "OPK result (if testing): negative · low · high · peak",
    ],
  },
  {
    heading: "Hormonal symptoms",
    items: [
      "Acne: none · mild · moderate · severe — location: ___",
      "Hair shedding: none · noticeable · significant",
      "Skin oiliness: none · mild · oily",
      "Pelvic or ovarian pain: none · mild · moderate · severe",
    ],
  },
  {
    heading: "Energy & mood",
    items: [
      "Morning energy: 1 · 2 · 3 · 4 · 5",
      "Afternoon energy crash? Yes · No",
      "Mood: 1 · 2 · 3 · 4 · 5",
      "Anxiety: none · mild · moderate · high",
      "Sugar or carb cravings: none · mild · strong",
    ],
  },
  {
    heading: "Sleep & digestion",
    items: [
      "Sleep hours: ___ h",
      "Sleep quality: 1 · 2 · 3 · 4 · 5",
      "Bloating: none · mild · moderate · severe",
      "Bowel changes: normal · loose · constipated",
    ],
  },
  {
    heading: "External factors",
    items: [
      "High-stress day? Yes · No",
      "Significant dietary change? Yes · No",
      "Travel or disrupted routine? Yes · No",
      "Illness or medication change? Yes · No",
    ],
  },
];

const MONTHLY_CHECKLIST = [
  "Cycle length this month: ___ days",
  "Did BBT chart show an ovulation rise? Yes (day ___) · No · Unsure",
  "Days with a positive OPK this cycle: ___",
  "Most prominent symptom pattern noticed: ___",
  "Anything new to bring to next doctor appointment? Yes · No",
];

const FAQS = [
  {
    q: "Can you track cycles with PCOS?",
    a: "Yes — but the approach is different from standard tracking. With PCOS, cycles can range from 21 to 90+ days, and some cycles don't include ovulation at all. Dawn Phase supports cycles across that full range without assuming a 28-day pattern. The goal is logging every day (not just around your period) and looking for patterns across multiple cycles rather than predicting the next one.",
  },
  {
    q: "Will it predict my period with PCOS?",
    a: "It estimates based on your logged cycle history. With irregular cycles, predictions improve the more you log — but they'll always be less precise than with a regular cycle. Treat predictions as a rough guide rather than a reliable window.",
  },
  {
    q: "How do I track ovulation with PCOS?",
    a: "The most reliable approach is combining BBT (basal body temperature) charting with OPK tests. BBT charting confirms ovulation happened — a sustained rise of ~0.2°C lasting three or more consecutive days after a positive OPK is strong evidence. OPKs alone are unreliable with PCOS because LH is often chronically elevated, producing false positives. See our detailed guide: How to Track Ovulation With PCOS.",
  },
  {
    q: "What daily symptoms should I log with PCOS?",
    a: "Beyond period dates, track acne (location and severity), energy levels (morning and afternoon), bloating, mood, anxiety, sleep quality, hair shedding, and sugar or carb cravings. Daily logging — not just around your period — reveals hormonal patterns tied to cycle phase shifts that aren't obvious day-to-day. Our PCOS symptoms tracker guide covers each category in detail.",
  },
  {
    q: "My cycles are 60+ days. How does tracking work?",
    a: "Dawn Phase tracks your current cycle day from your logged period start date — it doesn't assume a 28-day cycle or break when you reach day 35. You log your period start, and the app counts up from there. Whether you're on cycle day 20 or 65, the data stays coherent. When your next period starts, you log it and the app recalibrates.",
  },
  {
    q: "How long before cycle tracking is useful with PCOS?",
    a: "Most people see meaningful patterns after 3–6 months of consistent daily logging. One cycle tells you very little with PCOS. But even the first few weeks of data are more useful at a doctor's appointment than trying to recall symptoms from memory. The value builds exponentially — 6 months of daily logs is a genuinely powerful clinical document.",
  },
  {
    q: "Is PCOS tracking useful even if I'm not trying to conceive?",
    a: "Yes. Understanding your hormonal patterns, tracking androgen symptoms (acne, hair changes), identifying what triggers longer or shorter cycles, and building a symptom record for your endocrinologist are all valuable independent of fertility goals. Many people with PCOS track for years before trying to conceive specifically to understand their baseline.",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function PCOSConditionPage() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      {/* Structured data */}
      <MedicalWebPageSchema
        name="Polycystic Ovary Syndrome"
        description="The most comprehensive PCOS cycle tracking guide — daily checklists, BBT & OPK guidance, symptom tracking, and when to see a specialist."
        url={PAGE_URL}
      />
      <ArticleSchema
        title="PCOS Cycle Tracking — How to Track Your Cycle With Polycystic Ovary Syndrome"
        description="The most comprehensive PCOS cycle tracking guide: daily checklists, BBT & OPK guidance for PCOS, symptom tracking, ovulation detection, and when to see a specialist."
        url={PAGE_URL}
        datePublished={today}
        dateModified={today}
      />
      <FAQSchema questions={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />

      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#8C6B5A]">
          <Link href="/" className="hover:text-[#C94B6D] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/conditions" className="hover:text-[#C94B6D] transition-colors">Conditions</Link>
          <span>›</span>
          <span className="text-[#C94B6D] font-medium">PCOS</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#C94B6D] border border-[#C94B6D]/30 bg-[#C94B6D]/5 rounded-full px-4 py-1.5 mb-5">
            PCOS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-5">
            Cycle tracking built for PCOS
          </h1>
          <p className="text-lg text-[#8C6B5A] leading-relaxed">
            PCOS makes standard cycle tracking almost useless. Dawn Phase is designed for irregular cycles, longer phases, and the specific symptoms that come with polycystic ovary syndrome — from anovulatory cycles to androgen-driven skin and hair changes.
          </p>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D1B1E] mb-6">How Dawn Phase helps with PCOS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-[rgba(232,99,122,0.15)] shadow-sm">
                <h3 className="font-semibold text-[#C94B6D] mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-[#8C6B5A] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Medical disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This content is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Dawn Phase is not a medical device and is not intended for use as a contraceptive. Always consult a qualified healthcare professional with questions about PCOS, fertility, or cycle health.
          </p>
        </div>

        {/* ── PCOS Blog Posts ─────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D1B1E] mb-2">PCOS tracking guides</h2>
          <p className="text-sm text-[#8C6B5A] mb-6">
            Everything you need to understand and track your cycle with PCOS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl p-5 border border-[rgba(232,99,122,0.15)] shadow-sm hover:border-[#E8637A]/40 hover:-translate-y-0.5 transition-all duration-150"
              >
                <span className="text-[10px] font-semibold text-[#E8637A] uppercase tracking-widest mb-2 inline-block">{post.readTime} read</span>
                <h3 className="text-sm font-semibold text-[#2D1B1E] group-hover:text-[#C94B6D] leading-snug mb-2 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#8C6B5A] leading-relaxed line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {BLOG_POSTS.slice(2).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-[rgba(232,99,122,0.15)] shadow-sm hover:border-[#E8637A]/40 hover:-translate-y-0.5 transition-all duration-150 group"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-[#2D1B1E] group-hover:text-[#C94B6D] transition-colors leading-snug">
                    {post.title}
                  </span>
                </div>
                <span className="text-[#E8637A] text-sm shrink-0 ml-3">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Related symptoms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D1B1E] mb-5">Common PCOS symptoms to track</h2>
          <div className="space-y-3">
            {RELATED_SYMPTOMS.map((sym) => (
              <Link
                key={sym.slug}
                href={`/symptoms/${sym.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-[rgba(232,99,122,0.15)] shadow-sm hover:border-[#E8637A]/40 hover:-translate-y-0.5 transition-all duration-150 group"
              >
                <span className="text-sm font-medium text-[#2D1B1E] group-hover:text-[#C94B6D] transition-colors">
                  {sym.name}
                </span>
                <span className="text-[#E8637A] text-sm">→</span>
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#8C6B5A] mt-3">
            Also useful:{" "}
            <Link href="/tools/ovulation-calculator" className="text-[#E8637A] hover:underline font-medium">Ovulation calculator</Link>
            {" · "}
            <Link href="/luteal-phase-calculator" className="text-[#E8637A] hover:underline font-medium">Luteal phase calculator</Link>
            {" · "}
            <Link href="/tools/pms-tracker" className="text-[#E8637A] hover:underline font-medium">PMS symptom checker</Link>
          </p>
        </section>

        {/* ── PCOS Cycle Tracking Checklist ─────────────────────────────── */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#2D1B1E]">PCOS cycle tracking checklist</h2>
              <p className="text-sm text-[#8C6B5A] mt-1">
                A reference card for daily logging. Takes ~2 minutes a day.
              </p>
            </div>
            <PCOSPrintButton />
          </div>

          <div className="bg-white rounded-2xl border border-[rgba(232,99,122,0.2)] shadow-sm overflow-hidden">
            {/* Checklist header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#E8637A] to-[#F4956A]">
              <p className="text-white font-bold text-sm tracking-wide uppercase">Daily log — PCOS edition</p>
              <p className="text-white/70 text-xs mt-0.5">Complete this every day, even between periods</p>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {CHECKLIST_SECTIONS.map((section) => (
                <div key={section.heading}>
                  <p className="text-xs font-bold text-[#C94B6D] uppercase tracking-widest mb-3">
                    {section.heading}
                  </p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#2D1B1E]">
                        <span className="shrink-0 mt-0.5 w-4 h-4 rounded border-2 border-[rgba(232,99,122,0.4)] inline-block" aria-hidden />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Monthly review */}
            <div className="px-6 pb-6">
              <div className="border-t border-[rgba(232,99,122,0.12)] pt-5">
                <p className="text-xs font-bold text-[#C94B6D] uppercase tracking-widest mb-3">
                  Monthly review — at end of each cycle
                </p>
                <ul className="space-y-2">
                  {MONTHLY_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#2D1B1E]">
                      <span className="shrink-0 mt-0.5 w-4 h-4 rounded border-2 border-[rgba(232,99,122,0.4)] inline-block" aria-hidden />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-6 py-3 bg-[#FDF6F0] border-t border-[rgba(232,99,122,0.12)]">
              <p className="text-xs text-[#8C6B5A]">
                Track 3–6 months to see meaningful PCOS patterns. Log daily even when nothing seems to be happening.
              </p>
            </div>
          </div>
        </section>

        {/* ── Email capture ─────────────────────────────────────────────── */}
        <section className="mb-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #C94B6D, #E8637A)" }}>
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8 gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Free resource</p>
                <h2 className="text-xl font-bold text-white leading-tight mb-2">
                  Get our free PCOS tracking guide
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-5">
                  The complete guide to PCOS cycle tracking: daily checklists, BBT charting tips, how to read OPK tests with PCOS, and a referral checklist for your specialist. Sent directly to your inbox.
                </p>
                <PCOSEmailCapture />
              </div>
              <div className="hidden sm:flex flex-col gap-2 shrink-0 text-sm text-white/80">
                {[
                  "✓  Daily tracking checklist",
                  "✓  BBT charting guide",
                  "✓  OPK interpretation tips",
                  "✓  Pattern analysis framework",
                  "✓  Specialist referral checklist",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2D1B1E] mb-2">Frequently asked questions</h2>
          <p className="text-sm text-[#8C6B5A] mb-6">Common questions from the PCOS community about cycle tracking.</p>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-[rgba(232,99,122,0.15)] bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none">
                  <span className="font-semibold text-[#C94B6D] text-sm leading-snug">{faq.q}</span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full bg-[#E8637A]/10 text-[#E8637A] flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="text-sm text-[#8C6B5A] leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center text-white mb-8"
          style={{ background: "linear-gradient(135deg, #E8637A, #A855C8)" }}
        >
          <h3 className="text-2xl font-bold mb-2">Start tracking PCOS symptoms free</h3>
          <p className="mb-6 opacity-90 text-sm leading-relaxed">
            Irregular cycle support built in. 7-day free trial. No credit card required.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm shadow-md"
          >
            Start your free trial →
          </a>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center">
          This content is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </main>
    </div>
  );
}
