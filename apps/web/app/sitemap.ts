import { MetadataRoute } from "next";
import { symptoms } from "@/data/symptoms";
import { conditions } from "@/data/conditions";

export default function sitemap(): MetadataRoute.Sitemap {
  const symptomUrls: MetadataRoute.Sitemap = symptoms.map((s) => ({
    url: `https://www.dawnphase.com/symptoms/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const conditionUrls: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `https://www.dawnphase.com/conditions/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: "https://www.dawnphase.com",                                       lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    // Tools
    { url: "https://www.dawnphase.com/tools",                                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.dawnphase.com/cycle-calculator",                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/luteal-phase-calculator",               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/tools/ovulation-calculator",            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/tools/period-due-date",                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/tools/pms-tracker",                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Conditions
    ...conditionUrls,
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
    { url: "https://www.dawnphase.com/blog/natural-cycles-alternative",       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/cycle-syncing-explained",           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/hormonal-imbalance-signs",         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/perimenopause-vs-menopause",       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/tracking-cycle-pcos",              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/period-tracker-for-pcos",         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/period-tracker-data-privacy",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/follicular-phase-explained",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/tired-before-period",             lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/how-to-track-perimenopause",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/ovulation-symptoms",               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/period-after-birth-control",       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/pmdd-vs-pms",                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/how-long-should-period-last",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dawnphase.com/blog/perimenopause-age",                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Contact + Legal
    { url: "https://www.dawnphase.com/contact",                               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.5 },
    { url: "https://www.dawnphase.com/privacy",                               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: "https://www.dawnphase.com/terms",                                 lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
