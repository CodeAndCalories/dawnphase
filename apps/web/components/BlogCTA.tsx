const variants = {
  pcos: {
    heading: "Built for PCOS cycles",
    subtext:
      "Irregular, unpredictable, and finally understood. Dawn Phase handles cycles from 21–90 days with no assumptions.",
    button: "Start tracking your PCOS cycle free →",
  },
  perimenopause: {
    heading: "Finally, a tracker that takes perimenopause seriously",
    subtext:
      "Hot flashes, brain fog, irregular cycles — tracked in one place and exportable for your doctor.",
    button: "Start your perimenopause tracking free →",
  },
  endometriosis: {
    heading: "Build the evidence your doctor needs",
    subtext:
      "Detailed symptom logs across cycles can help speed up diagnosis. Start tracking today.",
    button: "Start tracking endometriosis symptoms →",
  },
  general: {
    heading: "Know your cycle. Own your health.",
    subtext: "Privacy-first tracking with no data selling. Ever.",
    button: "Start your 7-day free trial →",
  },
} as const;

type Variant = keyof typeof variants;

export default function BlogCTA({ variant = "general" }: { variant?: Variant }) {
  const v = variants[variant];
  return (
    <div
      className="mt-6 rounded-2xl p-8 text-center text-white"
      style={{ background: "linear-gradient(135deg, #c94f68, #e06e40)" }}
    >
      <h3 className="text-2xl font-bold mb-2">{v.heading}</h3>
      <p className="mb-6 opacity-90 text-sm leading-relaxed">{v.subtext}</p>
      <a
        href="/signup"
        className="inline-block bg-white text-[#c94f68] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
      >
        {v.button}
      </a>
    </div>
  );
}
