const steps = [
  {
    number: "01",
    title: "Log your period",
    description:
      "Mark the first day of your period. Dawn Phase calculates your cycle length and maps your four phases instantly.",
  },
  {
    number: "02",
    title: "Track daily symptoms",
    description:
      "Spend 30 seconds each day logging mood, energy, sleep, and any symptoms. The more you log, the smarter it gets.",
  },
  {
    number: "03",
    title: "Read your insights",
    description:
      "Discover patterns across cycles — when your energy peaks, when PMS hits, and what helps most.",
  },
  {
    number: "04",
    title: "Plan with your phases",
    description:
      "Use phase forecasts to schedule demanding work during your follicular peak and rest during luteal low points.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 dawn-gradient">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Up and running in 2 minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No complicated setup. Just start logging and insights appear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-[rgba(130,80,170,0.3)] rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-[#7a2daa]">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
