import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ExitIntent from "@/components/ExitIntent";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { cyclePhases } from "@/data/cyclePhases";
import { symptoms } from "@/data/symptoms";

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugToName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return cyclePhases.map((p) => ({ phase: p.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase: slug } = await params;
  const phase = cyclePhases.find((p) => p.slug === slug);
  if (!phase) return {};
  return {
    title: phase.metaTitle,
    description: phase.metaDescription,
    openGraph: {
      title: phase.metaTitle,
      description: phase.metaDescription,
      images: [{
        url: `https://www.dawnphase.com/og?title=${encodeURIComponent(phase.name)}&subtitle=${encodeURIComponent("Dawn Phase — Cycle phase guide")}`,
        width: 1200,
        height: 630,
      }],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CyclePhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase: slug } = await params;
  const phase = cyclePhases.find((p) => p.slug === slug);
  if (!phase) notFound();

  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />
      <ExitIntent />
      <StickyMobileCTA />

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Back nav */}
        <Link
          href="/symptoms"
          className="text-sm text-[#c94f68] hover:underline mb-8 inline-block"
        >
          ← All symptoms
        </Link>

        {/* Hero */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-[#F3ECFA] text-[#5a3575] border-[#E6D7F3]">
            {phase.duration}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E0F30] leading-tight mb-3">
          {phase.name}
        </h1>

        <p className="text-lg font-medium text-[#5a3575] mb-4">{phase.tagline}</p>

        <p className="text-[#3d2855] leading-relaxed mb-10">{phase.description}</p>

        {/* Info cards — Hormones + Energy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-[#E6D7F3] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#c94f68] mb-2">
              Hormones
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed">{phase.hormones}</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E6D7F3] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#c94f68] mb-2">
              Energy
            </p>
            <p className="text-sm text-[#3d2855] leading-relaxed">{phase.energy}</p>
          </div>
        </div>

        {/* Symptoms grid */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#1E0F30] mb-5">
            Common symptoms this phase
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {phase.symptoms.map((symptomSlug) => {
              const match = symptoms.find((s) => s.slug === symptomSlug);
              const name = match?.name ?? slugToName(symptomSlug);
              return (
                <Link
                  key={symptomSlug}
                  href={`/symptoms/${symptomSlug}`}
                  className="bg-white rounded-xl border border-[#E6D7F3] p-4 hover:shadow-sm transition-shadow group"
                >
                  <p className="text-sm font-semibold text-[#140c18] group-hover:text-[#5a3575] transition-colors leading-snug">
                    {name}
                  </p>
                  <p className="text-xs text-[#c94f68] mt-2 font-medium group-hover:underline">
                    Learn more →
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tips section */}
        <section className="bg-[#F3ECFA] rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-[#1E0F30] mb-4">
            Tracking tips for this phase
          </h2>
          <ul className="space-y-3">
            {phase.tips.map((tip) => (
              <li key={tip} className="flex gap-3 text-sm text-[#3d2855] leading-relaxed">
                <span className="text-[#c94f68] font-bold mt-0.5 shrink-0">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mid-page CTA */}
        <div className="rounded-2xl bg-[#F3ECFA] border border-[#E6D7F3] p-7 text-center mb-10">
          <h3 className="text-xl font-bold text-[#1E0F30] mb-2">
            Track your {phase.name.toLowerCase()} symptoms with Dawn Phase
          </h3>
          <p className="text-sm text-[#3d2855] leading-relaxed mb-5">
            Daily logging across all phases — privately. No ads, no data selling.
          </p>
          <a
            href="/signup"
            className="inline-block bg-gradient-to-br from-[#c94f68] to-[#e06e40] text-white font-semibold px-7 py-3 rounded-full text-sm shadow-lg shadow-[rgba(201,79,104,0.35)] hover:scale-[1.02] transition-all duration-200"
          >
            Start free — no card needed
          </a>
        </div>

        {/* Phase nav */}
        <div className="mb-10">
          <p className="text-sm text-[#3d2855] font-medium mb-3 text-center">
            Explore other phases
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {cyclePhases.map((p) => (
              <Link
                key={p.slug}
                href={`/cycle-phase/${p.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  p.slug === phase.slug
                    ? "bg-[#c94f68] text-white border-[#c94f68]"
                    : "bg-white text-[#3d2855] border-[#E6D7F3] hover:border-[#c94f68] hover:text-[#c94f68]"
                }`}
              >
                {p.name.replace(" Phase", "")}
              </Link>
            ))}
          </div>
        </div>

        {/* Medical disclaimer */}
        <p className="text-xs text-[#3d2855] text-center">
          This content is for informational purposes only and is not a substitute for
          professional medical advice. Always consult a qualified healthcare professional
          with questions about your health.
        </p>

      </main>
    </div>
  );
}
