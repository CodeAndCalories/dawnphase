export const WELLNESS_GUIDE = {
  Menstrual: {
    nutrition: [
      "Iron-rich foods — spinach, lentils, red meat support energy during blood loss",
      "Magnesium-rich foods — dark chocolate, nuts, seeds may help ease cramps",
      "Warm, easy-to-digest meals — soups and stews are commonly recommended",
      "Reduce caffeine and alcohol — may worsen cramps and disrupt sleep",
    ],
    movement: [
      "Gentle walking or stretching",
      "Yin yoga or restorative yoga",
      "Rest is productive — this is a natural low-energy phase",
    ],
    supplements: [
      "Magnesium glycinate — commonly discussed for cramp relief, discuss dose with your doctor",
      "Iron — especially if flow is heavy, blood tests can confirm need",
      "Vitamin D — supports mood, worth checking your levels",
    ],
    selfCare: [
      "Heat therapy for cramps",
      "Prioritise sleep — progesterone has dropped, sleep quality may change",
      "Reduce social commitments if energy is low",
    ],
  },

  Follicular: {
    nutrition: [
      "Oestrogen rises — support liver detox with cruciferous vegetables (broccoli, cauliflower)",
      "Lean proteins support rising energy",
      "Fermented foods — yogurt, kefir for gut health",
      "Hydration becomes more important as activity levels naturally rise",
    ],
    movement: [
      "Energy typically rises — good time for higher intensity workouts",
      "Strength training — muscle building is often easier in this phase",
      "Try new activities or classes",
    ],
    supplements: [
      "B vitamins — support energy metabolism as oestrogen rises",
      "Zinc — supports follicle development, found in pumpkin seeds and meat",
      "Omega-3s — anti-inflammatory support",
    ],
    selfCare: [
      "Good time for planning and creative projects",
      "Social energy tends to rise",
      "Focus and concentration often improve",
    ],
  },

  Ovulatory: {
    nutrition: [
      "Antioxidant-rich foods — berries, leafy greens",
      "Light, fresh meals — salads, raw vegetables",
      "Zinc-rich foods — oysters, seeds for hormonal support",
    ],
    movement: [
      "Peak physical performance for many women",
      "High intensity interval training (HIIT)",
      "Competitive sports or challenging workouts",
    ],
    supplements: [
      "Vitamin C — supports ovulation and progesterone production",
      "Selenium — found in Brazil nuts, supports thyroid and hormones",
    ],
    selfCare: [
      "Communication and social confidence often peaks",
      "Good time for important conversations or presentations",
      "Notice any ovulation symptoms — useful data for tracking",
    ],
  },

  Luteal: {
    nutrition: [
      "Complex carbohydrates — oats, sweet potato support serotonin production",
      "Magnesium-rich foods help with PMS symptoms",
      "Reduce refined sugar and caffeine — may worsen mood swings and bloating",
      "Calcium-rich foods — dairy, leafy greens, research suggests calcium may reduce PMS",
    ],
    movement: [
      "Energy may dip in late luteal — honour that",
      "Moderate intensity exercise — walking, swimming, light cycling",
      "Yoga and pilates — helps with bloating and mood",
    ],
    supplements: [
      "Magnesium glycinate — most discussed supplement for PMS, discuss with doctor",
      "Vitamin B6 — some research suggests it supports mood in the luteal phase",
      "Evening primrose oil — sometimes discussed for breast tenderness, consult your doctor",
    ],
    selfCare: [
      "Simplify your schedule in the final days",
      "Prioritise sleep — progesterone peaks then drops",
      "Track mood and energy — patterns often emerge here",
      "Reduce alcohol — liver processes hormones, alcohol adds load",
    ],
  },

  Perimenopause: {
    nutrition: [
      "Calcium and Vitamin D — bone density becomes important, discuss supplements with doctor",
      "Phytoestrogens — flaxseed, soy — some research suggests they may ease hot flashes",
      "Reduce spicy food and alcohol — common hot flash triggers for many women",
      "Protein at every meal — supports muscle mass which declines with oestrogen",
    ],
    movement: [
      "Weight-bearing exercise — walking, strength training — important for bone density",
      "Yoga and mindfulness — research suggests stress reduction helps with symptoms",
      "Swimming — gentle on joints, often recommended",
    ],
    supplements: [
      "Magnesium — commonly discussed for sleep and hot flash support",
      "Vitamin D + K2 — bone health, worth checking your levels with a blood test",
      "Omega-3s — some research supports mood and joint health benefit",
      "Always discuss supplements with your doctor before starting",
    ],
    selfCare: [
      "Track hot flashes, sleep, and mood daily — patterns help doctor conversations",
      "Cooling strategies — fans, breathable fabrics, cold water",
      "Stress management — cortisol affects oestrogen balance",
    ],
  },
} as const;

export type WellnessPhase = keyof typeof WELLNESS_GUIDE;
export type WellnessTab = keyof (typeof WELLNESS_GUIDE)[WellnessPhase];
