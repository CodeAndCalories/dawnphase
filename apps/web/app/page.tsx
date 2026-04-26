import { Check, Calendar, Moon, FileText, BarChart3, Leaf, ShieldCheck } from "lucide-react";

// ─── shared primitives ────────────────────────────────────────────────────────

function PillLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-dawn-rose border border-dawn-rose/30 bg-dawn-rose/5 rounded-full px-4 py-1.5">
      {children}
    </span>
  );
}

function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-block rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-br from-dawn-rose to-dawn-purple text-white shadow-lg shadow-dawn-rose/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-dawn-rose/40"
      : "text-dp-taupe underline underline-offset-4 decoration-dawn-rose/50 hover:decoration-dawn-rose";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="/" className="font-display text-lg font-bold text-dawn-charcoal tracking-tight shrink-0">
          Dawn Phase
        </a>

        {/* Centre links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            ["Features", "#features"],
            ["How it works", "#how-it-works"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-500 hover:text-dawn-charcoal transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/login"
            className="hidden md:inline text-sm text-gray-500 hover:text-dawn-charcoal transition-colors"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="bg-gradient-to-br from-dawn-rose to-dawn-purple text-white rounded-full px-5 py-2 text-sm font-semibold hover:scale-[1.02] transition-all duration-200 shadow-md shadow-dawn-rose/20"
          >
            Start free trial
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-32 px-6"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 10% -10%, #E8637A70 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 90% 5%,  #F4956A50 0%, transparent 55%),
          radial-gradient(ellipse 70% 60% at 50% 110%,#E8637A30 0%, transparent 60%),
          #FDF6F0
        `,
      }}
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <PillLabel>Privacy-first hormone tracking</PillLabel>

        <h1 className="font-display mt-6 text-5xl md:text-[4.5rem] font-bold text-dp-deeprose leading-[1.08] tracking-tight max-w-3xl mx-auto">
          Know your cycle.{" "}
          <span className="text-dawn-rose">Own your health.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-dp-taupe leading-relaxed max-w-2xl mx-auto">
          Dawn Phase tracks your period, predicts every phase, and logs symptoms
          — so you finally understand what your body is telling you.{" "}
          <span className="text-dp-deeprose font-medium">
            No data selling. Ever.
          </span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CtaButton href="/signup">Start 7-day free trial</CtaButton>
          <CtaButton href="#how-it-works" variant="ghost">
            See how it works ↓
          </CtaButton>
        </div>

        {/* Trust row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            "Privacy-first",
            "No data selling",
            "Cancel anytime",
            "Doctor-ready export",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-sm text-dp-taupe/70">
              <span className="w-1 h-1 rounded-full bg-dawn-rose inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Log your period",
    body: "Mark day 1. Dawn Phase maps your 4 phases instantly — menstrual, follicular, ovulatory, luteal.",
  },
  {
    num: "02",
    title: "Track daily symptoms",
    body: "30 seconds a day. Mood, energy, cramps, sleep, hot flashes — whatever matters to you.",
  },
  {
    num: "03",
    title: "Understand your patterns",
    body: "See what changes each phase across multiple cycles. Export a full PDF for your doctor.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-dp-cream-lt">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <PillLabel>Simple by design</PillLabel>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-bold text-dp-deeprose tracking-tight">
            Up and running in 2 minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              {/* Connector line — desktop only */}
              <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem-1px)] h-px bg-dawn-rose/20" />

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-dawn-warm border border-dawn-rose/20 flex items-center justify-center mb-5 shadow-sm">
                  <span className="font-display text-xl font-bold text-dawn-rose">{s.num}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-dp-deeprose mb-3">
                  {s.title}
                </h3>
                <p className="text-dp-taupe leading-relaxed text-sm">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Calendar,
    title: "Cycle phase calendar",
    body: "A visual map of your 4 phases across the month — always know where you are in your cycle.",
  },
  {
    icon: Moon,
    title: "Perimenopause mode",
    body: "Built for women 40+ with irregular cycles, hot flashes, night sweats, and brain fog.",
  },
  {
    icon: Leaf,
    title: "Symptom journal",
    body: "Log 40+ symptoms in 30 seconds. Track what matters — and watch patterns emerge over time.",
  },
  {
    icon: BarChart3,
    title: "Hormone phase education",
    body: "Learn what estrogen and progesterone are doing each phase — and how to work with them.",
  },
  {
    icon: FileText,
    title: "Doctor PDF export",
    body: "One tap to export a clean, clinic-ready PDF of your cycle history. Arrive prepared.",
  },
  {
    icon: ShieldCheck,
    title: "Zero data selling pledge",
    body: "Your health data is yours. We don't sell it, share it, or train AI models on it. Period.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-dawn-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <PillLabel>Everything you need</PillLabel>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-bold text-dp-deeprose tracking-tight">
            Built around your cycle,
            <br />
            not just your period.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-dp-cream-lt rounded-2xl p-6 border border-[rgba(232,99,122,0.15)] shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-dawn-warm flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-dawn-purple" strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-semibold text-dp-deeprose mb-2">{f.title}</h3>
              <p className="text-sm text-dp-taupe leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── For who ──────────────────────────────────────────────────────────────────

function ForWho() {
  return (
    <section className="py-24 px-6 bg-dawn-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <PillLabel>Made for you</PillLabel>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-bold text-dp-deeprose tracking-tight">
            Wherever you are in life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[rgba(232,99,122,0.15)] shadow-md overflow-hidden">
            <div className="h-2 bg-dawn-rose" />
            <div className="p-8">
              <div className="inline-block text-xs font-semibold tracking-widest uppercase text-dawn-rose bg-dawn-rose/10 rounded-full px-3 py-1 mb-4">
                Ages 20–39
              </div>
              <h3 className="font-display text-2xl font-bold text-dp-deeprose mb-3">
                Tracking your cycle
              </h3>
              <p className="text-dp-taupe leading-relaxed mb-6">
                You want to understand your hormones, predict your period, manage
                PMS, and stop being surprised every month. Dawn Phase maps your
                four phases so you can plan your life around your energy — not
                against it.
              </p>
              <ul className="space-y-2">
                {["Period & ovulation predictions", "Phase-by-phase energy insights", "PMS pattern tracking", "Fertility awareness support"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-dp-taupe">
                    <Check className="w-4 h-4 text-dawn-rose shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[rgba(232,99,122,0.15)] shadow-md overflow-hidden">
            <div className="h-2 bg-dawn-purple" />
            <div className="p-8">
              <div className="inline-block text-xs font-semibold tracking-widest uppercase text-dawn-purple bg-dawn-purple/10 rounded-full px-3 py-1 mb-4">
                Ages 40+
              </div>
              <h3 className="font-display text-2xl font-bold text-dp-deeprose mb-3">
                Navigating perimenopause
              </h3>
              <p className="text-dp-taupe leading-relaxed mb-6">
                Your cycle is changing and no one is explaining why. Hot flashes,
                brain fog, night sweats, irregular periods — Dawn Phase&apos;s
                perimenopause mode tracks all of it so you can go to your doctor
                with data, not just feelings.
              </p>
              <ul className="space-y-2">
                {["Irregular cycle tracking", "Hot flash & night sweat logging", "Brain fog & sleep tracking", "Doctor-ready PDF export"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-dp-taupe">
                    <Check className="w-4 h-4 text-dawn-purple shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

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

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-dawn-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <PillLabel>Simple pricing</PillLabel>
          <h2 className="font-display mt-4 text-4xl md:text-5xl font-bold text-dp-deeprose tracking-tight">
            One plan. Everything included.
          </h2>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="bg-dp-cream-lt rounded-2xl border border-[rgba(232,99,122,0.15)] shadow-xl p-8">
            {/* Badge */}
            <div className="inline-block bg-dawn-rose/10 text-dawn-rose text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-6">
              7-day free trial
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-display text-5xl font-bold text-dp-deeprose">$14.99</span>
              <span className="text-dp-taupe/70 text-sm">/ month</span>
            </div>
            <p className="text-sm text-dp-taupe/70 mb-8">
              Try free for 7 days — no credit card required upfront.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {pricingFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-dp-taupe">
                  <Check className="w-4 h-4 text-dawn-rose shrink-0" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="/signup"
              className="block w-full text-center bg-gradient-to-br from-dawn-rose to-dawn-purple text-white rounded-full py-3.5 font-semibold text-sm hover:scale-[1.02] transition-all duration-200 shadow-md shadow-dawn-rose/30"
            >
              Start free trial
            </a>

            <p className="mt-4 text-center text-xs text-dp-taupe/70">
              Cancel anytime · Your data stays yours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: "#2D1B1E" }}>
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl mx-auto">
          Your body has been talking.
          <br />
          <span className="text-dawn-rose">It&apos;s time to listen.</span>
        </h2>
        <p className="mt-5 text-dp-taupe/70 text-lg max-w-lg mx-auto">
          Join thousands of women who finally understand their cycle — and use
          that knowledge every single day.
        </p>
        <div className="mt-10">
          <a
            href="/signup"
            className="inline-block bg-gradient-to-br from-dawn-rose to-dawn-purple text-white rounded-full px-10 py-4 text-base font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-dawn-rose/30"
          >
            Start your free trial today
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-600">
          7 days free · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6" style={{ backgroundColor: "#2D1B1E" }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-lg font-bold text-white tracking-tight">
          Dawn Phase
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            ["Features", "#features"],
            ["How it works", "#how-it-works"],
            ["Pricing", "#pricing"],
            ["Privacy Policy", "/privacy"],
            ["Terms of Service", "/terms"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-gray-600 shrink-0">
          © 2026 Dawn Phase · Your data stays yours.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <ForWho />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  );
}
