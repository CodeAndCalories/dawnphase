import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ExitIntent from "@/components/ExitIntent";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { symptoms, PHASE_COLORS } from "@/data/symptoms";
import { MedicalWebPageSchema } from "@/components/SchemaMarkup";

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return symptoms.map((s) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const symptom = symptoms.find((s) => s.slug === slug);
  if (!symptom) return {};
  const title = `${symptom.name} — Causes, Tracking & Relief | Dawn Phase`;
  return {
    title,
    description: symptom.description,
    openGraph: {
      title,
      description: symptom.description,
      images: [{
        url: `https://www.dawnphase.com/og?title=${encodeURIComponent(symptom.name)}&subtitle=${encodeURIComponent("Dawn Phase — Symptom guide")}`,
        width: 1200,
        height: 630,
      }],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function SymptomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const symptom = symptoms.find((s) => s.slug === slug);
  if (!symptom) notFound();

  const colors = PHASE_COLORS[symptom.phase];
  const relatedSymptoms = symptoms.filter((s) =>
    symptom.related.includes(s.slug)
  );

  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <MedicalWebPageSchema
        name={symptom.name}
        description={symptom.description}
        url={`https://www.dawnphase.com/symptoms/${symptom.slug}`}
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
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
          >
            {symptom.phase} phase
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-4">
          {symptom.name}
        </h1>

        <p className="text-lg text-[#3d2855] mb-10 leading-relaxed">
          {symptom.description}
        </p>

        {/* Medical disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-10">
          <p className="text-sm text-amber-800 font-medium mb-1">
            Medical disclaimer
          </p>
          <p className="text-sm text-amber-700">
            This content is for informational purposes only and is not a
            substitute for professional medical advice, diagnosis, or treatment.
            Dawn Phase is not a medical device. Always consult a qualified
            healthcare professional with questions about your health.
          </p>
        </div>

        <div className="space-y-8">
          {/* Causes */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              What causes it
            </h2>
            <p className="text-[#140c18] leading-relaxed">{symptom.causes}</p>
          </section>

          {/* Mid-page conversion CTA */}
          <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center">
            <h3 className="text-xl font-bold text-[#1E0F30] mb-2">
              Track this symptom across your cycle
            </h3>
            <p className="text-sm text-[#3d2855] leading-relaxed mb-5">
              Dawn Phase logs <strong className="text-[#1E0F30]">{symptom.name}</strong> patterns and shows you correlations — privately. No data selling.
            </p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              Start free — no card needed
            </a>
          </div>

          {/* Tracking */}
          <section className="bg-[#f4e6f0] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#140c18] mb-3">
              How to track it
            </h2>
            <p className="text-[#140c18] leading-relaxed">{symptom.tracking}</p>
          </section>

          {/* When to see a doctor */}
          <section>
            <h2 className="text-2xl font-bold text-[#140c18] mb-3">
              When to see a doctor
            </h2>
            <p className="text-[#140c18] leading-relaxed">
              {symptom.whenToSeeDoctor}
            </p>
          </section>

          {/* Related symptoms */}
          {relatedSymptoms.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-[#140c18] mb-4">
                Related symptoms
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedSymptoms.map((rel) => {
                  const rc = PHASE_COLORS[rel.phase];
                  return (
                    <Link
                      key={rel.slug}
                      href={`/symptoms/${rel.slug}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:opacity-80 ${rc.bg} ${rc.text} ${rc.border}`}
                    >
                      {rel.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
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

        <p className="text-xs text-[#3d2855] text-center mt-6">
          This content is for informational purposes only and is not a
          substitute for professional medical advice.
        </p>
      </main>
    </div>
  );
}
