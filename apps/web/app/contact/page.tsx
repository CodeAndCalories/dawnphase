import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Dawn Phase — We're here to help",
  description:
    "Get in touch with Dawn Phase support for questions about your account, privacy, or billing.",
  openGraph: {
    title: "Contact Dawn Phase — We're here to help",
    description:
      "Get in touch with Dawn Phase support for questions about your account, privacy, or billing.",
  },
};

const CONTACTS = [
  {
    emoji: "💬",
    title: "General questions",
    body: "Questions about the app, your account, or anything else.",
    label: "hello@dawnphase.com",
    href: "mailto:hello@dawnphase.com",
  },
  {
    emoji: "🔒",
    title: "Privacy & data requests",
    body: "Data access, export, deletion, or privacy policy questions.",
    label: "privacy@dawnphase.com",
    href: "mailto:privacy@dawnphase.com",
  },
  {
    emoji: "💳",
    title: "Billing & subscription",
    body: "Manage your plan, update payment details, or cancel.",
    label: "Open billing portal",
    href: "https://billing.stripe.com/p/login/eVq8wR3AQ3Aeejr5zEcs800",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#140c18]">Get in touch</h1>
          <p className="text-[#3d2855] mt-2 text-lg">
            We&apos;d love to hear from you. Usually respond within 24 hours.
          </p>
        </div>

        <div className="space-y-4">
          {CONTACTS.map(({ emoji, title, body, label, href }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-start gap-5 bg-white rounded-2xl border border-[rgba(130,80,170,0.12)] shadow-sm p-6 hover:shadow-md hover:border-[#c94f68]/30 transition-all group"
            >
              <span className="text-3xl shrink-0 mt-0.5">{emoji}</span>
              <div className="min-w-0">
                <p className="font-semibold text-[#140c18] group-hover:text-[#5a3575] transition-colors">
                  {title}
                </p>
                <p className="text-sm text-[#3d2855] mt-0.5">{body}</p>
                <p className="text-sm font-medium text-[#c94f68] mt-2 truncate">
                  {label} →
                </p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-[#3d2855] mt-10">
          You can also manage your account from the{" "}
          <Link href="/settings" className="text-[#c94f68] hover:underline font-medium">
            Settings page
          </Link>{" "}
          once logged in.
        </p>
      </main>

      <footer className="border-t border-gray-100 py-8 px-6 mt-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#3d2855]">
          <span>© 2026 Dawn Phase · Your data stays yours.</span>
          <nav className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#5a3575] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#5a3575] transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
