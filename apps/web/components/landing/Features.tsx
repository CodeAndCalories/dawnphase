import { Calendar, TrendingUp, Bell, Download, Moon, Heart } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Cycle & phase tracking",
    description:
      "Log periods and symptoms. Dawn Phase automatically maps your menstrual, follicular, ovulatory, and luteal phases.",
  },
  {
    icon: TrendingUp,
    title: "Personalized insights",
    description:
      "See patterns in your mood, energy, sleep, and symptoms across multiple cycles with beautiful charts.",
  },
  {
    icon: Bell,
    title: "Smart predictions",
    description:
      "Get notified before your period, ovulation, and PMS window so you can plan your week with confidence.",
  },
  {
    icon: Moon,
    title: "Symptom logging",
    description:
      "Track 40+ symptoms including cramps, bloating, headaches, libido, skin, and sleep quality — your way.",
  },
  {
    icon: Heart,
    title: "Fertility awareness",
    description:
      "Understand your fertile window and ovulation day using BBT and cervical mucus data alongside predictions.",
  },
  {
    icon: Download,
    title: "Export your data",
    description:
      "Download a full PDF or CSV report of your cycle data to share with your doctor — always yours to keep.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need to understand your body
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Built around the four phases of your cycle — not just period
            tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-md hover:shadow-purple-50 transition-all"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
