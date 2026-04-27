import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
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
    openGraph: { title, description: symptom.description },
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
    <div className="min-h-screen bg-[#FFF9F6]">
      <MedicalWebPageSchema
        name={symptom.name}
        description={symptom.description}
        url={`https://www.dawnphase.com/symptoms/${symptom.slug}`}
      />
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/symptoms"
          className="text-sm text-[#E8637A] hover:underline mb-8 inline-block"
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

        <h1 className="text-3xl sm:text-4xl font-bold text-[#C94B6D] leading-tight mb-4">
          {symptom.name}
        </h1>

        <p className="text-lg text-[#8C6B5A] mb-10 leading-relaxed">
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
            <h2 className="text-2xl font-bold text-[#C94B6D] mb-3">
              What causes it
            </h2>
            <p className="text-[#2D1B1E] leading-relaxed">{symptom.causes}</p>
          </section>

          {/* Tracking */}
          <section className="bg-[#FDF6F0] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#C94B6D] mb-3">
              How to track it
            </h2>
            <p className="text-[#2D1B1E] leading-relaxed">{symptom.tracking}</p>
          </section>

          {/* When to see a doctor */}
          <section>
            <h2 className="text-2xl font-bold text-[#C94B6D] mb-3">
              When to see a doctor
            </h2>
            <p className="text-[#2D1B1E] leading-relaxed">
              {symptom.whenToSeeDoctor}
            </p>
          </section>

          {/* Related symptoms */}
          {relatedSymptoms.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-[#C94B6D] mb-4">
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
          style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}
        >
          <h3 className="text-2xl font-bold mb-2">
            Track this symptom with Dawn Phase
          </h3>
          <p className="mb-6 opacity-90">
            Log symptoms daily and see how they connect to your cycle phases.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#E8637A] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Start your 7-day free trial →
          </a>
        </div>

        <p className="text-xs text-[#8C6B5A] text-center mt-6">
          This content is for informational purposes only and is not a
          substitute for professional medical advice.
        </p>
      </main>
    </div>
  );
}
