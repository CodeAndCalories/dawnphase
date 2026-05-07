import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ExitIntent from "@/components/ExitIntent";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { MedicalWebPageSchema } from "@/components/SchemaMarkup";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Mittelschmerz: Everything You Need to Know About Ovulation Pain",
  description:
    "Mittelschmerz is one-sided pelvic pain that happens mid-cycle during ovulation. Here's what causes it, how long it lasts, and when it's worth tracking.",
  openGraph: {
    title: "Mittelschmerz: Everything You Need to Know About Ovulation Pain",
    description:
      "Mittelschmerz is one-sided pelvic pain that happens mid-cycle during ovulation. Here's what causes it, how long it lasts, and when it's worth tracking.",
    images: [{
      url: `https://www.dawnphase.com/og?title=${encodeURIComponent("Mittelschmerz")}&subtitle=${encodeURIComponent("Dawn Phase — Symptom guide")}`,
      width: 1200,
      height: 630,
    }],
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MittelschmerzPage() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <MedicalWebPageSchema
        name="Mittelschmerz"
        description="Mittelschmerz is one-sided pelvic pain that happens mid-cycle during ovulation. Here's what causes it, how long it lasts, and when it's worth tracking."
        url="https://www.dawnphase.com/symptoms/mittelschmerz"
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-amber-50 text-amber-700 border-amber-200">
            Ovulatory phase
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-4">
          Mittelschmerz: Everything You Need to Know About Ovulation Pain
        </h1>

        <p className="text-lg text-[#3d2855] mb-4 leading-relaxed">
          Mittelschmerz is the medical term for{" "}
          <Link href="/symptoms/ovulation-pain" className="text-[#c94f68] hover:underline">
            ovulation pain
          </Link>{" "}
          — a sharp, crampy, or dull ache on one side of your lower abdomen that happens
          roughly mid-cycle.
        </p>

        <p className="text-lg text-[#3d2855] mb-10 leading-relaxed">
          It affects around 20% of people who menstruate and is completely normal in most
          cases. The name comes from German — &ldquo;mittel&rdquo; meaning middle,
          &ldquo;schmerz&rdquo; meaning pain.
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
          {/* What It Feels Like */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">What It Feels Like</h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Mittelschmerz can feel different for different people:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed mb-3">
              <li>A sharp, sudden twinge on one side</li>
              <li>A dull ache that builds over a few hours</li>
              <li>Cramping that feels similar to period cramps but happens mid-cycle</li>
              <li>Sometimes accompanied by light spotting or discharge</li>
            </ul>
            <p className="text-[#140c18] leading-relaxed">
              The pain is usually one-sided because ovulation alternates between ovaries. It
              can switch sides cycle to cycle.
            </p>
          </section>

          {/* How Long Does It Last */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              How Long Does It Last?
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Most cases last anywhere from a few minutes to 48 hours. Occasionally it can
              persist for up to 3–4 days.
            </p>
            <p className="text-[#140c18] leading-relaxed">
              If pain lasts longer than 3 days, is severe, or comes with fever or nausea,
              speak with a healthcare provider — those symptoms can indicate something else.
            </p>
          </section>

          {/* What Causes It */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">What Causes It</h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              During ovulation, a follicle on the ovary ruptures to release an egg. This can
              cause:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed mb-3">
              <li>A small amount of fluid or blood to irritate the abdominal lining</li>
              <li>Brief cramping as the follicle bursts</li>
              <li>Swelling in the ovary before release</li>
            </ul>
            <p className="text-[#140c18] leading-relaxed">
              None of this is harmful in most cases — it&apos;s just your body doing what
              it&apos;s supposed to do.
            </p>
          </section>

          {/* Mid-page conversion CTA */}
          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center">
            <h3 className="text-xl font-bold text-[#1E0F30] mb-2">
              Track this symptom across your cycle
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase logs{" "}
              <strong className="text-[#1E0F30]">Mittelschmerz</strong> patterns and shows
              you correlations — privately. No data selling.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start free — no card needed
            </a>
          </div>

          {/* Mittelschmerz vs Other Pain */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              Mittelschmerz vs Other Pain
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Not all mid-cycle pain is mittelschmerz. Pain that is severe, persistent, or
              accompanied by other symptoms could indicate:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed">
              <li>Ovarian cysts</li>
              <li>
                <Link href="/conditions/endometriosis" className="text-[#c94f68] hover:underline">
                  Endometriosis
                </Link>
              </li>
              <li>Appendicitis (if right-sided and severe)</li>
              <li>Pelvic inflammatory disease</li>
            </ul>
            <p className="text-[#140c18] leading-relaxed mt-3">
              If you&apos;re unsure, always speak with a healthcare provider.
            </p>
          </section>

          {/* Why Tracking It Matters */}
          <section className="bg-[#f4e6f0] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#140c18] mb-3">
              Why Tracking It Matters
            </h2>
            <p className="text-[#140c18] leading-relaxed mb-3">
              Logging mittelschmerz consistently helps you:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed mb-3">
              <li>Confirm when ovulation is happening in your cycle</li>
              <li>Spot patterns — does it always happen on the same side?</li>
              <li>Notice if it&apos;s getting worse over time</li>
              <li>Build a clearer picture of your hormonal health</li>
            </ul>
            <p className="text-[#140c18] leading-relaxed">
              Dawn Phase lets you log pain, location, and intensity as part of your daily
              check-in so you can spot these patterns over time.
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
            <ul className="list-disc pl-5 space-y-1 text-[#140c18] leading-relaxed">
              <li>Pain is severe or debilitating</li>
              <li>It lasts more than 3–4 days</li>
              <li>You have fever, vomiting, or unusual discharge</li>
              <li>Pain is getting progressively worse cycle to cycle</li>
            </ul>
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
          advice. If you have concerns about pelvic pain, please consult a qualified
          healthcare provider.
        </p>
      </main>
    </div>
  );
}
