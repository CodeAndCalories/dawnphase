export type ZodiacSign =
  | "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo"
  | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

export function getZodiacSign(birthDate: string): ZodiacSign {
  const parts = birthDate.split("-");
  const md = parseInt(parts[1], 10) * 100 + parseInt(parts[2], 10);
  if (md >= 321 && md <= 419)   return "Aries";
  if (md >= 420 && md <= 520)   return "Taurus";
  if (md >= 521 && md <= 620)   return "Gemini";
  if (md >= 621 && md <= 722)   return "Cancer";
  if (md >= 723 && md <= 822)   return "Leo";
  if (md >= 823 && md <= 922)   return "Virgo";
  if (md >= 923 && md <= 1022)  return "Libra";
  if (md >= 1023 && md <= 1121) return "Scorpio";
  if (md >= 1122 && md <= 1221) return "Sagittarius";
  if (md >= 120 && md <= 218)   return "Aquarius";
  if (md >= 219 && md <= 320)   return "Pisces";
  return "Capricorn"; // Dec 22 – Jan 19
}

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const MESSAGES: Record<ZodiacSign, Record<CyclePhase, string>> = {
  Aries: {
    Menstrual:  "Aries fire meets the rest of menstruation — use this pause to recharge the warrior within.",
    Follicular: "Aries energy ignites in the rising follicular phase — bold ideas and new starts come naturally now.",
    Ovulatory:  "Aries confidence peaks at ovulation — your magnetic energy is undeniable today.",
    Luteal:     "Your Aries fire meets the introspective luteal phase — channel that energy into rest and reflection today.",
  },
  Taurus: {
    Menstrual:  "Taurus grounds the menstrual phase — lean into comfort, warmth, and self-care rituals now.",
    Follicular: "Taurus patience blossoms in the follicular phase — steady progress beats rushing every time.",
    Ovulatory:  "Taurus sensuality amplifies ovulatory confidence — connections feel rich and meaningful today.",
    Luteal:     "Taurus resilience steadies the luteal phase — your earthy calm is a gift to yourself and others.",
  },
  Gemini: {
    Menstrual:  "Gemini curiosity softens into stillness during menstruation — journal your inner dialogue today.",
    Follicular: "Gemini brilliance sparkles in the follicular phase — explore, learn, and let ideas multiply.",
    Ovulatory:  "Gemini wit amplifies ovulatory communication — conversations flow effortlessly today.",
    Luteal:     "Gemini's dual nature meets the luteal tide — choose one thing to focus on and honour it.",
  },
  Cancer: {
    Menstrual:  "Cancer intuition deepens during menstruation — trust what your body and heart are telling you.",
    Follicular: "Cancer warmth nurtures the growing follicular energy — tend to your dreams like seedlings.",
    Ovulatory:  "Cancer empathy radiates at ovulation — your ability to connect and care is at its peak.",
    Luteal:     "Cancer sensitivity and the luteal phase align — cocoon yourself in comfort without guilt.",
  },
  Leo: {
    Menstrual:  "Even the lion rests — Leo's menstrual phase invites graceful retreat and quiet regeneration.",
    Follicular: "Leo's creative spark ignites in the follicular phase — let your passion lead the way forward.",
    Ovulatory:  "Leo brilliance shines brightest at ovulation — step into the spotlight with your whole heart.",
    Luteal:     "Leo's warmth softens in the luteal phase — channel your heart into rest and gentle expression.",
  },
  Virgo: {
    Menstrual:  "Virgo's inner analyst quiets during menstruation — let go of the list and just be.",
    Follicular: "Virgo precision sharpens in the follicular phase — plan, organise, and set your intentions.",
    Ovulatory:  "Virgo's keen mind meets ovulatory clarity — your insight and communication are razor-sharp today.",
    Luteal:     "Virgo self-care meets the luteal phase — tend to your body with the same care you give everything else.",
  },
  Libra: {
    Menstrual:  "Libra seeks balance in the menstrual phase — honour your need for rest without overthinking.",
    Follicular: "Libra's harmony-seeking nature blooms in follicular energy — beauty and connection feel effortless.",
    Ovulatory:  "Libra charm amplified by ovulatory glow — relationships and negotiations flow in your favour.",
    Luteal:     "Libra's scales tip inward during the luteal phase — prioritise your own equilibrium above all.",
  },
  Scorpio: {
    Menstrual:  "Scorpio depth meets menstrual stillness — this is a sacred time for transformation and release.",
    Follicular: "Scorpio's intensity fuels the follicular rise — your focus and determination are unstoppable now.",
    Ovulatory:  "Scorpio intensity amplified by ovulatory confidence — this is your moment to connect and communicate.",
    Luteal:     "Scorpio intuition heightens in the luteal phase — trust the whispers and honour your shadows.",
  },
  Sagittarius: {
    Menstrual:  "Sagittarius adventurousness turns inward during menstruation — explore the landscape of your inner world.",
    Follicular: "Sagittarius optimism soars in the follicular phase — big visions feel possible and within reach.",
    Ovulatory:  "Sagittarius enthusiasm peaks at ovulation — your joy and candour are magnetic today.",
    Luteal:     "Sagittarius freedom meets the luteal pull — give yourself permission to slow the journey.",
  },
  Capricorn: {
    Menstrual:  "Capricorn ambition rests during menstruation — even the most driven need stillness to rebuild.",
    Follicular: "Capricorn determination meets follicular momentum — strategic action taken now builds lasting foundations.",
    Ovulatory:  "Capricorn focus amplified by ovulatory energy — lead with confidence and watch doors open.",
    Luteal:     "Capricorn discipline softens in the luteal phase — progress includes knowing when to pause.",
  },
  Aquarius: {
    Menstrual:  "Aquarius visionary mind turns inward during menstruation — tomorrow's breakthrough is born in today's rest.",
    Follicular: "Aquarius originality sparks in the follicular phase — unconventional ideas deserve room to breathe.",
    Ovulatory:  "Aquarius innovation amplified at ovulation — your ideas inspire and your voice carries far today.",
    Luteal:     "Aquarius humanitarian heart meets the luteal retreat — compassion begins with yourself right now.",
  },
  Pisces: {
    Menstrual:  "Pisces sensitivity deepens during menstruation — let yourself feel without needing to explain it.",
    Follicular: "Pisces creativity flows in the follicular phase — art, music, and imagination flourish now.",
    Ovulatory:  "Pisces empathy blooms at ovulation — your ability to connect soul-to-soul is extraordinary today.",
    Luteal:     "Pisces intuition and the luteal phase intertwine — your dreams are worth listening to tonight.",
  },
};

export function getCosmicMessage(sign: ZodiacSign, phase: CyclePhase): string {
  return MESSAGES[sign][phase];
}
