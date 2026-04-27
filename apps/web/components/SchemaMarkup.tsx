"use client";

import Script from "next/script";

// ── Article schema ────────────────────────────────────────────────────────────

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Dawn Phase",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://www.dawnphase.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Dawn Phase",
      url: "https://www.dawnphase.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dawnphase.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── FAQ schema ────────────────────────────────────────────────────────────────

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Website schema ────────────────────────────────────────────────────────────

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dawn Phase",
    url: "https://www.dawnphase.com",
    description: "Privacy-first cycle and perimenopause tracker",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.dawnphase.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── MedicalWebPage schema ─────────────────────────────────────────────────────

interface MedicalWebPageSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function MedicalWebPageSchema({ name, description, url }: MedicalWebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url,
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
    about: {
      "@type": "MedicalCondition",
      name,
    },
  };

  return (
    <Script
      id="medical-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
