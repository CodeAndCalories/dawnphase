import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/log", "/insights", "/settings", "/cycles"],
    },
    sitemap: "https://www.dawnphase.com/sitemap.xml",
  };
}
