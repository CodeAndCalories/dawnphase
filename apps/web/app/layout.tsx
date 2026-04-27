import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { WebsiteSchema } from "@/components/SchemaMarkup";

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

export const viewport: Viewport = {
  themeColor: "#E8637A",
};

export const metadata: Metadata = {
  title: {
    default: "Dawn Phase — Know your cycle. Own your health.",
    template: "%s | Dawn Phase",
  },
  description:
    "Dawn Phase tracks your period, predicts every phase, and logs symptoms — so you finally understand what your body is telling you. Privacy-first. No data selling. Ever.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://www.dawnphase.com"
  ),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dawn Phase",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon-180.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Dawn Phase — Know your cycle. Own your health.",
    description: "Privacy-first cycle and perimenopause tracker.",
    url: "https://www.dawnphase.com",
    siteName: "Dawn Phase",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawn Phase — Know your cycle. Own your health.",
    description: "Privacy-first cycle and perimenopause tracker.",
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
      <head>
        <link rel="apple-touch-icon" href="/favicon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased">
        <WebsiteSchema />
        {children}
      </body>
    </html>
  );
}
