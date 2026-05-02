"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const pricingFeatures = [
  "All cycle & perimenopause tracking",
  "Symptom journal — 40+ categories",
  "Phase calendar & predictions",
  "Hormone phase education",
  "Doctor PDF export",
  "Email reminders",
  "Cancel anytime",
  "Your data stays yours",
];

export default function PricingSection() {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  function handleCta() {
    if (typeof window !== "undefined") {
      localStorage.setItem("dp_plan", plan);
    }
    window.location.href = "/signup";
  }

  return (
    <section id="pricing" className="py-24 px-6 bg-dawn-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          {/* PillLabel inline */}
          <span className="inline-block bg-white/60 backdrop-blur-sm text-dp-deeprose text-xs font-bold tracking-widest uppercase rounded-full border border-dp-deeprose/20 px-4 py-1.5">
            Simple pricing
          </span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-bold text-dp-deeprose tracking-tight">
            One plan. Everything included.
          </h2>
        </div>

        {/* Monthly / Annual toggle */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlan("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                plan === "monthly"
                  ? "bg-[#E8637A] text-white shadow-sm"
                  : "text-[#8C6B5A] hover:text-[#C94B6D]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPlan("annual")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                plan === "annual"
                  ? "bg-[#E8637A] text-white shadow-sm"
                  : "text-[#8C6B5A] hover:text-[#C94B6D]"
              }`}
            >
              Annual
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full leading-none">
                Save 34%
              </span>
            </button>
          </div>
          <p className="text-xs text-[#8C6B5A]">
            Monthly: $14.99/mo &nbsp;·&nbsp;{" "}
            <strong className="text-[#C94B6D]">Annual: $9.92/mo — save $60 a year</strong>
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className={`bg-dp-cream-lt rounded-2xl border shadow-xl p-8 transition-all duration-200 ${
            plan === "annual"
              ? "border-[#E8637A] ring-2 ring-[#E8637A]/20"
              : "border-[rgba(232,99,122,0.15)]"
          }`}>
            {/* Badges row */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <div className="inline-block bg-dawn-rose/10 text-dawn-rose text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1">
                7-day free trial
              </div>
              {plan === "annual" && (
                <div className="inline-block bg-[#E8637A] text-white text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1">
                  ⭐ Most popular
                </div>
              )}
            </div>

            {/* Price */}
            {plan === "monthly" ? (
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-5xl font-bold text-dp-deeprose">$14.99</span>
                  <span className="text-dp-taupe/70 text-sm">/ month</span>
                </div>
                <p className="text-sm text-dp-taupe/70 mb-8">
                  Try free for 7 days — no credit card required upfront.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-5xl font-bold text-dp-deeprose">$9.92</span>
                  <span className="text-dp-taupe/70 text-sm">/ month</span>
                </div>
                <p className="text-sm text-dp-taupe/70 mb-1">
                  Billed as <strong className="text-dp-deeprose">$119/year</strong> — saves ~$60.
                </p>
                <p className="text-sm text-dp-taupe/70 mb-8">
                  Try free for 7 days — no credit card required upfront.
                </p>
              </div>
            )}

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {pricingFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-dp-taupe">
                  <Check className="w-4 h-4 text-dawn-rose shrink-0" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={handleCta}
              className="block w-full text-center bg-gradient-to-br from-dawn-rose to-dawn-purple text-white rounded-full py-3.5 font-semibold text-sm hover:scale-[1.02] transition-all duration-200 shadow-md shadow-dawn-rose/30"
            >
              Start free trial
            </button>

            <p className="mt-4 text-center text-xs text-dp-taupe/70">
              Cancel anytime · Your data stays yours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
