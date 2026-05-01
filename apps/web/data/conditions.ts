export interface ConditionFaq {
  q: string;
  a: string;
}

export interface ConditionFeature {
  title: string;
  body: string;
}

export interface Condition {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  features: ConditionFeature[];
  symptoms: string[];
  relatedBlogs: { slug: string; title: string }[];
  faqs: ConditionFaq[];
}

export const conditions: Condition[] = [
  {
    slug: "pcos",
    name: "PCOS",
    fullName: "Polycystic Ovary Syndrome",
    tagline: "Cycle tracking built for PCOS",
    description:
      "PCOS makes standard cycle tracking almost useless. Dawn Phase is designed for irregular cycles, longer phases, and the specific symptoms that come with PCOS.",
    features: [
      {
        title: "21–90 day cycle support",
        body: "No 28-day assumption. Dawn Phase adapts to whatever your cycle actually does — whether that's 35 days or 80.",
      },
      {
        title: "PCOS symptom logging",
        body: "Track acne, energy, cramps, hair changes, and mood alongside your cycle data to spot what changes phase to phase.",
      },
      {
        title: "Multi-cycle pattern view",
        body: "Irregular cycles start to make sense when you see months of data side by side. Patterns emerge even when cycles don't.",
      },
    ],
    symptoms: ["irregular-periods-pcos", "acne-hormonal", "fatigue-luteal-phase"],
    relatedBlogs: [
      { slug: "how-to-track-ovulation-pcos", title: "How to Track Ovulation With PCOS — A Practical Guide" },
      { slug: "pcos-symptoms-tracker",       title: "PCOS Symptoms Tracker — What to Log Every Day" },
      { slug: "pcos-cycle-tracking",         title: "How to Track Your Cycle With PCOS — A Complete Guide" },
      { slug: "period-tracker-for-pcos",     title: "Best Period Tracker App for PCOS in 2026" },
      { slug: "tracking-cycle-pcos",         title: "Why Tracking Your Cycle With PCOS Is Different" },
      { slug: "luteal-phase-defect",         title: "Luteal Phase Defect — Signs, Causes and How to Track It" },
    ],
    faqs: [
      {
        q: "Can you track cycles with PCOS?",
        a: "Yes — Dawn Phase supports cycles from 21–90 days and doesn't assume a 28-day cycle. The goal is logging every day and looking for patterns across multiple cycles rather than predicting the next one.",
      },
      {
        q: "Will it predict my period with PCOS?",
        a: "It estimates based on your logged history. With irregular cycles, predictions improve the more you log — but treat them as a rough guide rather than a reliable window.",
      },
      {
        q: "How do I track ovulation with PCOS?",
        a: "Combine BBT (basal body temperature) charting with OPK tests. BBT charting confirms ovulation happened — a sustained rise of ~0.2°C lasting three or more days is strong evidence. OPKs alone are unreliable with PCOS because LH is often chronically elevated, producing false positives.",
      },
      {
        q: "What daily symptoms should I log with PCOS?",
        a: "Beyond period dates, track acne, energy levels, bloating, mood, anxiety, sleep quality, hair shedding, and sugar or carb cravings. Daily logging — not just around your period — reveals hormonal patterns tied to cycle phase shifts that aren't obvious day-to-day.",
      },
      {
        q: "My cycles are 60+ days. How does tracking work?",
        a: "Dawn Phase tracks your current cycle day from your logged period start date. Whether you're on day 20 or day 65, the data stays coherent. When your next period starts, you log it and the app recalibrates.",
      },
      {
        q: "How long before cycle tracking is useful with PCOS?",
        a: "Most people see meaningful patterns after 3–6 months of daily logging. One cycle tells you very little with PCOS. But even the first few weeks of data are more useful at a doctor's appointment than trying to recall symptoms from memory.",
      },
      {
        q: "Is PCOS tracking useful even if I'm not trying to conceive?",
        a: "Yes. Understanding your hormonal patterns, tracking androgen symptoms like acne and hair changes, and building a symptom record for your endocrinologist are all valuable independent of fertility goals.",
      },
    ],
  },
  {
    slug: "perimenopause",
    name: "Perimenopause",
    fullName: "Perimenopause & Menopause Transition",
    tagline: "The only tracker built for perimenopause",
    description:
      "Most cycle apps ignore women over 40. Dawn Phase has a dedicated perimenopause mode tracking hot flashes, night sweats, brain fog, sleep, and irregular cycles.",
    features: [
      {
        title: "Dedicated perimenopause mode",
        body: "Switch to perimenopause mode and unlock symptom categories built for the transition — not just regular cycles.",
      },
      {
        title: "Hot flash & night sweat logging",
        body: "Track hot flash frequency, night sweats, brain fog, and sleep quality in under a minute a day.",
      },
      {
        title: "Doctor-ready PDF export",
        body: "Export a full symptom history as a clean PDF to bring to your gynaecologist or GP. Arrive with evidence, not just feelings.",
      },
    ],
    symptoms: ["hot-flashes-causes", "night-sweats-perimenopause", "brain-fog-perimenopause"],
    relatedBlogs: [
      { slug: "perimenopause-symptoms-checklist", title: "Perimenopause Symptoms Checklist — 35 Signs to Track" },
      { slug: "how-to-track-perimenopause",       title: "How to Track Perimenopause Symptoms — A Practical Guide" },
      { slug: "perimenopause-vs-menopause",        title: "Perimenopause vs Menopause — Key Differences" },
    ],
    faqs: [
      {
        q: "When does perimenopause start?",
        a: "Usually 40–55 but can start earlier. Tracking symptoms early helps identify patterns before your doctor.",
      },
      {
        q: "Can I use Dawn Phase during menopause?",
        a: "Yes — even after periods stop, tracking hot flashes, sleep, and mood remains valuable.",
      },
    ],
  },
  {
    slug: "pmdd",
    name: "PMDD",
    fullName: "Premenstrual Dysphoric Disorder",
    tagline: "Track PMDD symptoms across cycles",
    description:
      "PMDD diagnosis requires tracking symptoms across at least 2 cycles. Dawn Phase helps you build the evidence your doctor needs.",
    features: [
      {
        title: "Luteal phase pinpointing",
        body: "See exactly when symptoms start relative to your cycle — the defining feature that separates PMDD from general PMS.",
      },
      {
        title: "2-cycle evidence builder",
        body: "PMDD diagnosis requires prospective tracking across 2+ cycles. Dawn Phase builds that record automatically.",
      },
      {
        title: "Daily symptom intensity",
        body: "Rate mood, energy, anxiety, and cramps on a 1–5 scale each day. The pattern across your cycle tells the story.",
      },
    ],
    symptoms: ["pms-vs-pmdd", "mood-swings-before-period", "sleep-problems-before-period"],
    relatedBlogs: [
      { slug: "pmdd-vs-pms",           title: "PMDD vs PMS — How to Tell the Difference" },
      { slug: "luteal-phase-symptoms", title: "Luteal Phase Symptoms — What's Normal and What's Not" },
    ],
    faqs: [
      {
        q: "How does tracking help with PMDD?",
        a: "PMDD diagnosis requires prospective tracking across 2+ cycles. A symptom log showing the luteal pattern is exactly what doctors need.",
      },
      {
        q: "Is Dawn Phase a PMDD diagnostic tool?",
        a: "No — it's a tracking tool. Only a qualified healthcare professional can diagnose PMDD.",
      },
    ],
  },
  {
    slug: "endometriosis",
    name: "Endometriosis",
    fullName: "Endometriosis Symptom Tracking",
    tagline: "Track endometriosis symptoms over time",
    description:
      "Women with endometriosis wait an average of 7–10 years for diagnosis. Detailed symptom tracking across cycles builds the evidence that speeds up that process.",
    features: [
      {
        title: "Daily pain logging",
        body: "Track pain intensity, cramps, and bloating every day — not just during your period. Endometriosis pain follows its own pattern.",
      },
      {
        title: "Multi-cycle evidence",
        body: "7–10 years is too long to wait. A detailed, timestamped symptom log across cycles is the kind of evidence that moves diagnosis forward.",
      },
      {
        title: "Doctor PDF export",
        body: "Export a full symptom timeline as a clean PDF. Bring it to your specialist and skip the \"just track it at home\" conversation.",
      },
    ],
    symptoms: ["cramps-during-period", "bloating-before-period", "fatigue-luteal-phase"],
    relatedBlogs: [
      { slug: "luteal-phase-symptoms",       title: "Luteal Phase Symptoms — What's Normal and What's Not" },
      { slug: "how-long-should-period-last", title: "How Long Should Your Period Last? What's Normal" },
    ],
    faqs: [
      {
        q: "Can Dawn Phase help with endometriosis?",
        a: "Dawn Phase is a tracking tool, not a medical device. But detailed symptom logs across cycles can support conversations with your specialist.",
      },
      {
        q: "What should I track with endometriosis?",
        a: "Pain intensity, location, flow, fatigue, and bloating — all of which Dawn Phase logs.",
      },
    ],
  },
];
