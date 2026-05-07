import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ExitIntent from "@/components/ExitIntent";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { MedicalWebPageSchema } from "@/components/SchemaMarkup";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Irregular Periods: Causes, Tracking, and When to See a Doctor",
  description:
    "Irregular periods can be caused by PCOS, perimenopause, thyroid issues, stress, or stopping birth control. Here's what counts as irregular and what to track.",
  openGraph: {
    title: "Irregular Periods: Causes, Tracking, and When to See a Doctor",
    description:
      "Irregular periods can be caused by PCOS, perimenopause, thyroid issues, stress, or stopping birth control. Here's what counts as irregular and what to track.",
    images: [{
      url: `https://www.dawnphase.com/og?title=${encodeURIComponent("Irregular Periods")}&subtitle=${encodeURIComponent("Dawn Phase — Symptom guide")}`,
      width: 1200,
      height: 630,
    }],
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IrregularPeriodsPage() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <MedicalWebPageSchema
        name="Irregular Periods"
        description="Irregular periods can be caused by PCOS, perimenopause, thyroid issues, stress, or stopping birth control. Here's what counts as irregular and what to track."
        url="https://www.dawnphase.com/symptoms/irregular-periods"
      />
      <Header />
      <ExitIntent />
      <StickyMobileCTA />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/symptoms"
          className="text-sm text-[#c94f68] hover:underline mb-8 inline-block"
        >
          ← All symptoms
        </Link>

        {/* Phase badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-gray-50 text-gray-600 border-gray-200">
            All phases
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-4">
          Irregular Periods: Causes, Tracking, and When to See a Doctor
        </h1>

        <p className="text-lg text-[#3d2855] mb-4 leading-relaxed">
          An irregular period is one that doesn&apos;t follow a predictable pattern — whether
          that means cycles that vary significantly in length, periods that are unpredictable,
          or bleeding that is much heavier or lighter than usual.
        </p>

        <p className="text-lg text-[#3d2855] mb-10 leading-relaxed">
          Most people&apos;s cycles are not perfectly regular. A cycle anywhere from 21 to 35
          days is considered within the normal range. What matters more is whether your cycle
          is consistent for you — and whether it has changed.
        </p>

        {/* Medical disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10">
          <p className="text-sm text-amber-800 font-medium mb-1">Medical disclaimer</p>
          <p className="text-sm text-amber-700">
            This content is for informational purposes only and is not a substitute for
            professional medical advice, diagnosis, or treatment. Dawn Phase is not a medical
            device. Always consult a qualified healthcare professional with questions about
            your health.
          </p>
        </div>

        <div className="space-y-8">
          {/* What Counts as Irregular */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              What Counts as Irregular
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              A period is considered irregular if:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed mb-3">
              <li>Your cycle length varies by more than 7–9 days cycle to cycle</li>
              <li>You go more than 35 days between periods regularly</li>
              <li>Your period comes more frequently than every 21 days</li>
              <li>
                Your period has stopped for 3 or more months (and pregnancy is ruled out)
              </li>
              <li>
                Your flow has significantly changed — much heavier, much lighter, or very
                short
              </li>
            </ul>
            <p className="text-[#140c18] leading-relaxed">
              Occasional irregularity — one late or early period — is common and usually not
              concerning. Persistent irregularity across multiple cycles is worth
              investigating.
            </p>
          </section>

          {/* Common Causes */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              Common Causes of Irregular Periods
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[#140c18] leading-relaxed">
                  <strong>
                    <Link href="/conditions/pcos" className="text-[#c94f68] hover:underline">
                      PCOS (Polycystic Ovary Syndrome)
                    </Link>
                  </strong>
                </p>
                <p className="text-[#140c18] leading-relaxed">
                  One of the most common causes of irregular periods. PCOS disrupts
                  ovulation, causing cycles to be long, unpredictable, or absent. Often
                  accompanied by other symptoms like acne, hair changes, and weight changes.
                </p>
              </div>
              <div>
                <p className="text-[#140c18] leading-relaxed">
                  <strong>
                    <Link
                      href="/conditions/perimenopause"
                      className="text-[#c94f68] hover:underline"
                    >
                      Perimenopause
                    </Link>
                  </strong>
                </p>
                <p className="text-[#140c18] leading-relaxed">
                  As estrogen and progesterone begin to fluctuate in the years before
                  menopause, cycle irregularity is one of the first signs. Can begin in the
                  late 30s or early 40s. Cycles may become shorter, longer, heavier, or
                  skipped entirely.
                </p>
              </div>
              <div>
                <p className="text-[#140c18] leading-relaxed">
                  <strong>
                    <Link
                      href="/conditions/hypothyroidism"
                      className="text-[#c94f68] hover:underline"
                    >
                      Thyroid dysfunction
                    </Link>
                  </strong>
                </p>
                <p className="text-[#140c18] leading-relaxed">
                  Both hypothyroidism (underactive) and hyperthyroidism (overactive) can
                  disrupt the menstrual cycle. Thyroid testing is often the most important
                  thing to rule out when periods become irregular.
                </p>
              </div>
              <div>
                <p className="text-[#140c18] leading-relaxed">
                  <strong>
                    <Link
                      href="/blog/tracking-cycle-after-birth-control"
                      className="text-[#c94f68] hover:underline"
                    >
                      Stopping hormonal birth control
                    </Link>
                  </strong>
                </p>
                <p className="text-[#140c18] leading-relaxed">
                  The return of natural cycles after stopping the pill, patch, ring, or
                  injection can take weeks to months. Irregular cycles in this period are
                  expected and normal.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#140c18]">Significant stress</p>
                <p className="text-[#140c18] leading-relaxed">
                  Physical or emotional stress affects the hypothalamic-pituitary-ovarian
                  axis — the hormonal pathway that regulates ovulation. High stress can delay
                  or suppress ovulation, causing irregular cycles.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#140c18]">Rapid weight change</p>
                <p className="text-[#140c18] leading-relaxed">
                  Significant weight loss or gain, particularly rapid changes, can disrupt
                  hormone production and cause irregular or absent periods.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#140c18]">Over-exercising</p>
                <p className="text-[#140c18] leading-relaxed">
                  Very high levels of exercise combined with low energy availability (common
                  in athletes) can suppress ovulation and cause irregular or absent periods —
                  a condition called hypothalamic amenorrhoea.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#140c18]">Other causes</p>
                <p className="text-[#140c18] leading-relaxed">
                  Prolactin disorders, premature ovarian insufficiency, uterine polyps, and
                  certain medications can all affect cycle regularity.
                </p>
              </div>
            </div>
          </section>

          {/* Mid-page conversion CTA */}
          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center">
            <h3 className="text-xl font-bold text-[#1E0F30] mb-2">
              Track this symptom across your cycle
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase logs{" "}
              <strong className="text-[#1E0F30]">Irregular Periods</strong> patterns and
              shows you correlations — privately. No data selling.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start free — no card needed
            </a>
          </div>

          {/* Why Tracking Matters */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              Why Tracking Irregular Cycles Matters
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Tracking irregular cycles feels counterintuitive — if your cycle has no
              pattern, what is there to track? But this is exactly backwards.
            </p>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Tracking irregular cycles over 3–6 months reveals:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#140c18] leading-relaxed">
              <li>
                <strong>Your personal range</strong> — even irregular cycles have a range.
                Knowing yours helps you spot when something has shifted further.
              </li>
              <li>
                <strong>Associated symptoms</strong> — tracking energy, mood, sleep, and
                physical symptoms alongside cycle dates helps identify patterns that point to
                a cause.
              </li>
              <li>
                <strong>Changes over time</strong> — is your cycle getting more irregular, or
                stabilising? Only tracking tells you.
              </li>
              <li>
                <strong>Data for your doctor</strong> — months of cycle data is far more
                useful than trying to describe your pattern from memory at an appointment.
              </li>
            </ul>
          </section>

          {/* What to Track */}
          <section className="bg-[#f4e6f0] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#140c18] mb-3">What to Track</h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Log every cycle, even when timing is unpredictable:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed mb-3">
              <li>Period start and end dates</li>
              <li>Flow intensity each day (light, medium, heavy)</li>
              <li>Any spotting between periods</li>
              <li>Energy, mood, and sleep daily</li>
              <li>
                Physical symptoms — bloating, pain, breast tenderness, acne
              </li>
              <li>
                Stress levels — high stress is often the explanation for a disrupted cycle
              </li>
            </ul>
            <p className="text-[#140c18] leading-relaxed">
              After 3 months you will have a clearer picture of your pattern, even if that
              pattern is irregular.
            </p>
          </section>

          {/* When to See a Doctor */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              When to See a Doctor
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              See a healthcare provider if:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed mb-3">
              <li>
                Periods have stopped for 3+ months (amenorrhoea) and pregnancy is ruled out
              </li>
              <li>
                Cycles are consistently shorter than 21 days or longer than 35 days
              </li>
              <li>
                Bleeding is extremely heavy — soaking through protection every hour
              </li>
              <li>
                You have other symptoms alongside irregularity — significant hair loss,
                unexplained weight change, fatigue, acne, or discharge
              </li>
              <li>Irregularity is new and unexplained</li>
              <li>You are trying to conceive</li>
            </ul>
            <p className="text-[#140c18] leading-relaxed">
              A doctor will typically test thyroid function, androgens, prolactin, and
              reproductive hormones. An ultrasound may be recommended to check for PCOS or
              structural causes.
            </p>
          </section>

          {/* Irregular Periods and Dawn Phase */}
          <section className="bg-[#f4e6f0] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#140c18] mb-3">
              Irregular Periods and Dawn Phase
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Dawn Phase is built specifically for people with irregular or changing cycles.
              Unlike apps that assume a 28-day cycle and flag everything else as abnormal,
              Dawn Phase tracks your cycle as it actually is — logging symptoms daily and
              building a picture of your personal pattern over time.
            </p>
            <p className="text-[#140c18] leading-relaxed">
              7-day free trial, no card required.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center text-white"
          style={{ background: "linear-gradient(135deg, #c94f68, #e06e40)" }}
        >
          <h3 className="text-2xl font-bold mb-2">
            Track this symptom with Dawn Phase
          </h3>
          <p className="mb-6 opacity-90">
            Log symptoms daily and see how they connect to your cycle phases.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#c94f68] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Start your 7-day free trial →
          </a>
        </div>

        <p className="text-xs text-[#3d2855] text-center mt-6 italic">
          This page is for informational purposes only and does not constitute medical
          advice. If you have concerns about irregular periods please consult a qualified
          healthcare provider.
        </p>
      </main>
    </div>
  );
}
