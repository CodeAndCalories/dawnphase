import { MetadataRoute } from "next";
import { symptoms } from "@/data/symptoms";

export default function sitemap(): MetadataRoute.Sitemap {
  const symptomUrls: MetadataRoute.Sitemap = symptoms.map((s) => ({
    url: `https://www.dawnphase.com/symptoms/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: "https://www.dawnphase.com",                                       lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: "https://www.dawnphase.com/cycle-calculator",                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/luteal-phase-calculator",               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Symptoms
    { url: "https://www.dawnphase.com/symptoms",                              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    ...symptomUrls,
    // Blog
    { url: "https://www.dawnphase.com/blog",                                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: "https://www.dawnphase.com/blog/period-tracker-no-data-selling",   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/flo-alternative",                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/perimenopause-symptoms-checklist", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/pcos-cycle-tracking",              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/luteal-phase-symptoms",            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Contact + Legal
    { url: "https://www.dawnphase.com/contact",                               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
    { url: "https://www.dawnphase.com/privacy",                               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: "https://www.dawnphase.com/terms",                                 lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
