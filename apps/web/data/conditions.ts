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
  {
    slug: "fibroids",
    name: "Fibroids",
    fullName: "Uterine Fibroids",
    tagline: "Non-cancerous growths that can make periods heavier, longer, and more painful.",
    description: "Uterine fibroids are non-cancerous growths that develop in or around the uterus. They are extremely common — affecting up to 70% of women by age 50 — yet many women don't know they have them until they start tracking their symptoms.",
    features: [
      {
        title: "Heavy or prolonged periods",
        body: "Fibroids are one of the most common causes of heavy menstrual bleeding. Periods may last longer than usual or require changing protection very frequently. Tracking flow intensity daily helps quantify this for your doctor.",
      },
      {
        title: "Pelvic pressure and pain",
        body: "Larger fibroids can cause a feeling of pressure or fullness in the pelvis, lower back pain, or pain during sex. Pain that is cycle-linked versus constant can help distinguish fibroid pain from other causes.",
      },
      {
        title: "Frequent urination",
        body: "Fibroids pressing on the bladder can cause increased urinary frequency. This is more common with larger fibroids or those positioned near the bladder.",
      },
      {
        title: "Bloating and abdominal swelling",
        body: "Larger fibroids can cause visible abdominal distension. Many women describe looking pregnant. Tracking bloating patterns helps distinguish hormonal bloating from fibroid-related swelling.",
      },
      {
        title: "Cycle irregularity",
        body: "Fibroids can cause irregular bleeding, spotting between periods, or cycles that are significantly longer or heavier than your previous normal. Consistent cycle tracking makes these changes visible.",
      },
    ],
    symptoms: ["heavy-period", "pelvic-pain", "bloating-before-period", "lower-back-pain-period", "clots-during-period", "spotting-between-periods"],
    relatedBlogs: [
      { slug: "period-tracker-endometriosis", title: "Best Period Tracker for Endometriosis" },
      { slug: "heavy-period-causes", title: "Heavy Periods: Causes and When to Get Checked" },
    ],
    faqs: [
      {
        q: "Are fibroids cancerous?",
        a: "No. Uterine fibroids are almost always benign (non-cancerous). They are not associated with increased risk of uterine cancer.",
      },
      {
        q: "Can fibroids affect fertility?",
        a: "Some fibroids — particularly those that distort the uterine cavity — can affect fertility or pregnancy. If you are trying to conceive, discuss fibroids with your doctor.",
      },
      {
        q: "Do fibroids always need treatment?",
        a: "Not always. Many fibroids cause no symptoms and require no treatment. If symptoms are affecting quality of life, several treatment options exist. Discuss with a gynaecologist.",
      },
      {
        q: "Will fibroids go away on their own?",
        a: "Fibroids often shrink after menopause when estrogen levels decline. Before menopause, they may grow, shrink, or stay the same size. Tracking symptoms helps monitor changes over time.",
      },
    ],
  },
  {
    slug: "adenomyosis",
    name: "Adenomyosis",
    fullName: "Adenomyosis",
    tagline: "When the uterine lining grows into the muscle wall — causing heavy, painful periods.",
    description: "Adenomyosis is a condition where the tissue that normally lines the uterus grows into the muscular wall of the uterus. It causes the uterus to become enlarged and can lead to heavy, prolonged, and painful periods. It is often underdiagnosed because its symptoms overlap with fibroids and endometriosis.",
    features: [
      {
        title: "Heavy and prolonged periods",
        body: "Heavy menstrual bleeding is the hallmark symptom of adenomyosis. Periods may be significantly heavier than before or last longer than 7 days. Tracking flow intensity and duration each cycle builds a clear picture.",
      },
      {
        title: "Severe period pain",
        body: "Pain from adenomyosis is often worse than typical period cramping — described as stabbing, knife-like, or deep pressure in the uterus. It typically worsens with each passing year. Tracking pain intensity cycle to cycle can reveal this progression.",
      },
      {
        title: "Chronic pelvic pain",
        body: "Unlike typical period pain that resolves after menstruation, adenomyosis can cause pelvic pain throughout the cycle — not just during your period. Daily symptom logging helps distinguish this from phase-linked pain.",
      },
      {
        title: "Bloating and uterine tenderness",
        body: "An enlarged uterus can cause abdominal bloating and tenderness. Some women describe their abdomen feeling swollen or tender to touch, particularly around their period.",
      },
      {
        title: "Painful sex",
        body: "Deep dyspareunia — pain during sex felt deep in the pelvis — is a common adenomyosis symptom. Tracking whether pain occurs at certain cycle phases can help identify a hormonal pattern.",
      },
    ],
    symptoms: ["heavy-period", "pelvic-pain", "painful-sex", "bloating-before-period", "lower-back-pain-period", "cramps-during-period"],
    relatedBlogs: [
      { slug: "period-tracker-endometriosis", title: "Best Period Tracker for Endometriosis" },
      { slug: "pmdd-vs-pms-symptoms", title: "PMDD vs PMS: How to Tell the Difference" },
    ],
    faqs: [
      {
        q: "How is adenomyosis diagnosed?",
        a: "Adenomyosis is typically diagnosed via transvaginal ultrasound or MRI. Unlike endometriosis, it does not require surgery to diagnose. Definitive diagnosis was historically only possible after hysterectomy, but imaging has improved significantly.",
      },
      {
        q: "Is adenomyosis the same as endometriosis?",
        a: "No, though they can coexist. Endometriosis is tissue growing outside the uterus. Adenomyosis is tissue growing into the uterine muscle wall. Symptoms overlap significantly, which is why both are often underdiagnosed.",
      },
      {
        q: "Does adenomyosis affect fertility?",
        a: "Adenomyosis may affect implantation and is associated with higher rates of pregnancy complications in some studies. If you are trying to conceive, discuss this with a specialist.",
      },
      {
        q: "What treatments are available?",
        a: "Treatment ranges from hormonal management (IUD, pill, GnRH agonists) to surgical options. Hysterectomy is the only permanent cure. Treatment choice depends on symptom severity and whether future pregnancy is desired.",
      },
    ],
  },
  {
    slug: "hypothyroidism",
    name: "Hypothyroidism",
    fullName: "Hypothyroidism (Underactive Thyroid)",
    tagline: "An underactive thyroid disrupts hormones, energy, and your menstrual cycle.",
    description: "Hypothyroidism is a condition where the thyroid gland does not produce enough thyroid hormone. It is significantly more common in women than men and frequently goes undiagnosed because its symptoms — fatigue, weight gain, brain fog, mood changes, and irregular periods — overlap with many other hormonal conditions including perimenopause and PCOS.",
    features: [
      {
        title: "Cycle disruption",
        body: "Thyroid hormone is closely linked to reproductive hormones. Hypothyroidism can cause irregular periods, heavier periods, or in some cases absent periods. Many women get a PCOS or perimenopause diagnosis before thyroid function is tested.",
      },
      {
        title: "Fatigue and low energy",
        body: "Persistent fatigue that does not improve with rest is one of the most common hypothyroidism symptoms. It is different from typical tiredness — it often feels like a physical heaviness. Tracking energy daily helps distinguish thyroid fatigue from cycle-phase fatigue.",
      },
      {
        title: "Weight gain and difficulty losing weight",
        body: "A slowed metabolism from low thyroid hormone makes weight gain easy and weight loss very difficult, regardless of diet or exercise. This is a metabolic issue, not a lifestyle one.",
      },
      {
        title: "Brain fog and memory issues",
        body: "Difficulty concentrating, slow thinking, and memory problems are common in hypothyroidism. These symptoms overlap significantly with perimenopause brain fog, which is why thyroid testing is important.",
      },
      {
        title: "Cold intolerance and hair loss",
        body: "Feeling cold when others are comfortable, cold hands and feet, and hair thinning or loss are classic hypothyroidism signs. Hair loss in hypothyroidism typically affects the whole scalp and sometimes the outer third of the eyebrows.",
      },
    ],
    symptoms: ["fatigue-luteal-phase", "fatigue-perimenopause", "brain-fog-perimenopause", "hair-loss-hormonal", "irregular-periods", "weight-gain-perimenopause"],
    relatedBlogs: [
      { slug: "perimenopause-symptoms-30s", title: "Perimenopause Symptoms in Your 30s" },
      { slug: "period-late-not-pregnant", title: "Period Late but Not Pregnant" },
    ],
    faqs: [
      {
        q: "How is hypothyroidism diagnosed?",
        a: "A simple blood test measuring TSH (thyroid stimulating hormone) is the standard first test. If TSH is elevated, T4 is also measured. Ask your doctor specifically for thyroid testing — it is not always included in a standard blood panel.",
      },
      {
        q: "Can hypothyroidism be mistaken for perimenopause?",
        a: "Yes, frequently. Fatigue, weight gain, brain fog, mood changes, and irregular periods occur in both. Women in their 40s are often told their symptoms are perimenopause before thyroid function is checked. Always request a thyroid test.",
      },
      {
        q: "Is hypothyroidism treatable?",
        a: "Yes. Hypothyroidism is typically treated with levothyroxine, a synthetic thyroid hormone taken daily. Most people feel significantly better once their levels are optimised.",
      },
      {
        q: "Does hypothyroidism affect fertility?",
        a: "Yes. Thyroid hormone is essential for ovulation and a healthy pregnancy. Undiagnosed or undertreated hypothyroidism is associated with difficulty conceiving and increased miscarriage risk. Thyroid testing is recommended before trying to conceive.",
      },
    ],
  },
];
