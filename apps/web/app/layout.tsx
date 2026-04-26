import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dawn Phase — Know Your Cycle. Own Your Health.",
    template: "%s | Dawn Phase",
  },
  description:
    "Dawn Phase tracks your period, predicts every phase, and logs symptoms — so you finally understand what your body is telling you. Privacy-first. No data selling. Ever.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://www.dawnphase.com"
  ),
  openGraph: {
    title: "Dawn Phase — Know Your Cycle. Own Your Health.",
    description:
      "Cycle & perimenopause tracking built for women who want to understand their hormones — not just count days.",
    url: "https://www.dawnphase.com",
    siteName: "Dawn Phase",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawn Phase — Know Your Cycle. Own Your Health.",
    description:
      "Cycle & perimenopause tracking built for women who want to understand their hormones.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
