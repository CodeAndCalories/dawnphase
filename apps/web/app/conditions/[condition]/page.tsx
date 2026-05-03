import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import ExitIntent from "@/components/ExitIntent";
import { conditions } from "@/data/conditions";
import { symptoms } from "@/data/symptoms";
import { ArticleSchema, FAQSchema, MedicalWebPageSchema } from "@/components/SchemaMarkup";

// ── Static params ──────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return conditions.map((c) => ({ condition: c.slug }));
}

// ── Metadata ───────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ condition: string }>;
}): Promise<Metadata> {
  const { condition: slug } = await params;
  const condition = conditions.find((c) => c.slug === slug);
  if (!condition) return {};

  const title = `${condition.fullName} Cycle Tracker — Dawn Phase`;
  const description = condition.description;
  const ogUrl = `https://www.dawnphase.com/og?title=${encodeURIComponent(condition.tagline)}&subtitle=${encodeURIComponent("Dawn Phase — " + condition.name + " tracking")}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ condition: string }>;
}) {
  const { condition: slug } = await params;
  const condition = conditions.find((c) => c.slug === slug);
  if (!condition) notFound();

  const pageUrl = `https://www.dawnphase.com/conditions/${condition.slug}`;
  const today = new Date().toISOString().split("T")[0];

  const relatedSymptoms = condition.symptoms
    .map((s) => symptoms.find((sym) => sym.slug === s))
    .filter(Boolean) as (typeof symptoms)[number][];

  return (
    <div className="min-h-screen bg-[#ede8f7]">
      {/* Structured data */}
      <MedicalWebPageSchema
        name={condition.fullName}
        description={condition.description}
        url={pageUrl}
      />
      <ArticleSchema
        title={`${condition.fullName} Cycle Tracker — Dawn Phase`}
        description={condition.description}
        url={pageUrl}
        datePublished={today}
        dateModified={today}
      />
      <FAQSchema
        questions={condition.faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <Header />
      <ExitIntent />

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#3d2855]">
          <Link href="/" className="hover:text-[#5a3575] transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link href="/conditions" className="hover:text-[#5a3575] transition-colors">
            Conditions
          </Link>
          <span>›</span>
          <span className="text-[#5a3575] font-medium">{condition.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#5a3575] border border-[#5a3575]/30 bg-[#5a3575]/5 rounded-full px-4 py-1.5 mb-5">
            {condition.name}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#140c18] leading-tight mb-5">
            {condition.tagline}
          </h1>
          <p className="text-lg text-[#3d2855] leading-relaxed">
            {condition.description}
          </p>
        </div>

        {/* Key features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#140c18] mb-6">
            How Dawn Phase helps with {condition.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {condition.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-5 border border-[rgba(130,80,170,0.15)] shadow-sm"
              >
                <h3 className="font-semibold text-[#5a3575] mb-2 text-sm">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#3d2855] leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>

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

        {/* Related symptoms */}
        {relatedSymptoms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#140c18] mb-5">
              Common {condition.name} symptoms to track
            </h2>
            <div className="space-y-3">
              {relatedSymptoms.map((sym) => (
                <Link
                  key={sym.slug}
                  href={`/symptoms/${sym.slug}`}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-[rgba(130,80,170,0.15)] shadow-sm hover:border-[#c94f68]/40 hover:-translate-y-0.5 transition-all duration-150 group"
                >
                  <span className="text-sm font-medium text-[#140c18] group-hover:text-[#5a3575] transition-colors">
                    {sym.name}
                  </span>
                  <span className="text-[#c94f68] text-sm">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#140c18] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {condition.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-[rgba(130,80,170,0.15)] bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none">
                  <span className="font-semibold text-[#5a3575] text-sm leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full bg-[#c94f68]/10 text-[#c94f68] flex items-center justify-center text-sm font-bold transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="text-sm text-[#3d2855] leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related blog posts */}
        {condition.relatedBlogs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#140c18] mb-5">
              Further reading
            </h2>
            <div className="space-y-3">
              {condition.relatedBlogs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-[rgba(130,80,170,0.15)] shadow-sm hover:border-[#c94f68]/40 hover:-translate-y-0.5 transition-all duration-150 group"
                >
                  <span className="text-sm font-medium text-[#140c18] group-hover:text-[#5a3575] transition-colors">
                    {post.title}
                  </span>
                  <span className="text-[#c94f68] text-sm shrink-0 ml-3">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center text-white mb-8"
          style={{ background: "linear-gradient(135deg, #c94f68, #7a2daa)" }}
        >
          <h3 className="text-2xl font-bold mb-2">
            Start tracking {condition.name} symptoms free
          </h3>
          <p className="mb-6 opacity-90 text-sm leading-relaxed">
            7-day free trial. No credit card required. Cancel anytime.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-[#c94f68] font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-sm shadow-md"
          >
            Start your free trial →
          </a>
        </div>

        <p className="text-xs text-[#3d2855] text-center">
          This content is for informational purposes only and is not a substitute
          for professional medical advice, diagnosis, or treatment.
        </p>
      </main>
    </div>
  );
}
