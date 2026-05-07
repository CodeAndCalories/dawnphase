export interface CyclePhase {
  slug: string;
  name: string;
  duration: string;
  tagline: string;
  description: string;
  hormones: string;
  energy: string;
  symptoms: string[]; // symptom slugs from symptoms.ts
  tips: string[];
  metaTitle: string;
  metaDescription: string;
}

export const cyclePhases: CyclePhase[] = [
  {
    slug: "menstrual",
    name: "Menstrual Phase",
    duration: "Days 1–5 (average)",
    tagline: "Your period. Estrogen and progesterone are at their lowest.",
    description: "The menstrual phase begins on day 1 of your period and lasts until bleeding stops. Estrogen and progesterone are at their lowest point, which is why energy and mood are often lower during this phase.",
    hormones: "Estrogen and progesterone are at their lowest. Prostaglandins are elevated, causing uterine contractions.",
    energy: "Typically lower — rest is appropriate and beneficial during this phase.",
    symptoms: [
      "cramps-during-period",
      "heavy-period",
      "lower-back-pain-period",
      "clots-during-period",
      "dizziness-during-period",
      "fatigue-luteal-phase",
      "bloating-before-period",
      "nausea-before-period",
    ],
    tips: [
      "Rest more than usual — your body is doing significant work",
      "Iron-rich foods help replenish what is lost through bleeding",
      "Light movement like walking or yoga tends to feel better than intense exercise",
      "Heat on the lower abdomen or back can help with cramping",
      "Track flow intensity, clot size, and pain each day",
    ],
    metaTitle: "Menstrual Phase Symptoms: What to Expect and Track",
    metaDescription: "The menstrual phase brings your period and the lowest hormone levels of your cycle. Here's what symptoms are common and what's worth tracking.",
  },
  {
    slug: "follicular",
    name: "Follicular Phase",
    duration: "Days 1–13 (average, overlaps with menstrual)",
    tagline: "Estrogen rises. Energy builds. Your most productive phase.",
    description: "The follicular phase begins on day 1 of your period and ends at ovulation. As estrogen rises, energy, mood, focus, and motivation typically improve. Many people find this their most productive and social phase.",
    hormones: "Estrogen rises steadily. FSH stimulates follicle development. Progesterone remains low.",
    energy: "Rising — energy, motivation, and mental clarity tend to be higher in the second half of this phase.",
    symptoms: [
      "spotting-between-periods",
      "discharge-before-period",
      "ovulation-discharge",
      "breast-tenderness-before-period",
      "mood-swings-before-period",
    ],
    tips: [
      "Good phase for tackling challenging work and creative projects",
      "Higher energy makes this well-suited to more intense exercise",
      "Social energy tends to be higher — good time for meetings and connections",
      "Track energy and mood daily to see your personal follicular pattern",
      "Note any mid-cycle spotting or discharge changes",
    ],
    metaTitle: "Follicular Phase Symptoms: Energy, Hormones and What to Track",
    metaDescription: "The follicular phase is when estrogen rises and energy builds. Here's what symptoms are common, what hormones are doing, and what to log.",
  },
  {
    slug: "ovulatory",
    name: "Ovulatory Phase",
    duration: "Days 14–16 (average)",
    tagline: "Peak estrogen. The fertile window. Often your highest energy days.",
    description: "The ovulatory phase is the shortest phase — typically 3–5 days around the middle of your cycle. An LH surge triggers the release of an egg. Estrogen peaks and testosterone rises, often producing a noticeable boost in energy, confidence, and libido.",
    hormones: "LH surges triggering ovulation. Estrogen peaks. Testosterone rises briefly. Progesterone begins to rise after ovulation.",
    energy: "Often at its highest — many people feel their most energetic, confident, and social during ovulation.",
    symptoms: [
      "ovulation-pain",
      "ovulation-discharge",
      "mittelschmerz",
      "spotting-between-periods",
      "bloating-before-period",
    ],
    tips: [
      "Track ovulation signs — discharge changes to egg-white texture, energy peaks",
      "Note any one-sided pelvic pain — this is often mittelschmerz (ovulation pain)",
      "Good phase for high-intensity exercise if energy supports it",
      "Libido often peaks around ovulation — this is hormonal and normal",
      "If trying to conceive, this is your fertile window",
    ],
    metaTitle: "Ovulatory Phase Symptoms: Signs of Ovulation and What to Track",
    metaDescription: "The ovulatory phase is short but significant — peak estrogen, fertile window, and often your highest energy days. Here's what to look for.",
  },
  {
    slug: "luteal",
    name: "Luteal Phase",
    duration: "Days 15–28 (average)",
    tagline: "Progesterone rises. PMS territory. Your most symptom-rich phase.",
    description: "The luteal phase follows ovulation and lasts until your next period begins. Progesterone rises significantly and then falls if pregnancy does not occur. This hormonal drop is what triggers PMS symptoms — and for some people, PMDD.",
    hormones: "Progesterone rises significantly then falls sharply before menstruation. Estrogen has a secondary smaller peak then also declines.",
    energy: "Often lower in the second half — fatigue, reduced motivation, and need for more sleep are common.",
    symptoms: [
      "bloating-before-period",
      "breast-tenderness-before-period",
      "mood-swings-before-period",
      "food-cravings-luteal-phase",
      "fatigue-luteal-phase",
      "sleep-problems-before-period",
      "headache-before-period",
      "nausea-before-period",
      "discharge-before-period",
      "anxiety-perimenopause",
      "brain-fog-perimenopause",
      "acne-hormonal",
    ],
    tips: [
      "Reduce caffeine and alcohol — both worsen PMS symptoms",
      "Magnesium-rich foods may help with cramps and mood",
      "Prioritise sleep — progesterone decline disrupts it",
      "Lower intensity exercise often feels better than high intensity",
      "Track all symptoms daily — the luteal phase reveals your personal PMS pattern",
    ],
    metaTitle: "Luteal Phase Symptoms: PMS, Hormones and What to Track",
    metaDescription: "The luteal phase is when PMS symptoms appear — driven by progesterone rise and fall. Here's what's common, what's hormonal, and what to log.",
  },
];
