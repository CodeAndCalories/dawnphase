import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dawn Phase — Know Your Cycle",
    template: "%s | Dawn Phase",
  },
  description:
    "Track your cycle, understand your body, and live in harmony with your hormones. Dawn Phase gives you science-backed insights tailored to every phase.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dawnphase.com"
  ),
  openGraph: {
    title: "Dawn Phase — Know Your Cycle",
    description:
      "Track your cycle, understand your body, and live in harmony with your hormones.",
    url: "https://dawnphase.com",
    siteName: "Dawn Phase",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawn Phase — Know Your Cycle",
    description:
      "Track your cycle, understand your body, and live in harmony with your hormones.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
