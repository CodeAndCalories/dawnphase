import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic cycle tracking.",
    features: [
      "Period & cycle tracking",
      "Phase predictions",
      "Basic symptom log (10 symptoms)",
      "3 months of history",
    ],
    cta: "Start free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$7",
    period: "/ month",
    description: "Everything you need for deep cycle awareness.",
    features: [
      "Everything in Free",
      "40+ symptom categories",
      "Full cycle history",
      "Advanced insights & charts",
      "Fertility window tracking",
      "PDF & CSV export",
      "Email reminders",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    href: "/signup?plan=pro",
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start free. Upgrade when you want more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 border-2 ${
                tier.highlight
                  ? "border-purple-500 shadow-xl shadow-purple-100 relative"
                  : "border-gray-100"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-gray-500">{tier.period}</span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-opacity ${
                  tier.highlight
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 shadow-md shadow-purple-200"
                    : "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          All plans include end-to-end encryption. Your health data is private
          and never sold.
        </p>
      </div>
    </section>
  );
}
