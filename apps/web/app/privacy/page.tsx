import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dawn Phase collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#ede8f7]">
      <Header />

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-6 py-12 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#140c18]">Privacy Policy</h1>
          <p className="text-sm text-[#3d2855]">Effective date: April 2026</p>
        </div>

        <p className="text-[#140c18] leading-relaxed">
          Dawn Phase is built on one principle: your body data is yours. This policy
          explains exactly what we collect, why, and what we will never do with it.
          We keep this language plain on purpose.
        </p>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#140c18]">
            1. What data we collect
          </h2>
          <p className="text-[#140c18] leading-relaxed">
            We collect only what is necessary to provide the service:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-[#140c18]">
            <li>
              <strong>Account information</strong> — your email address and a
              hashed (non-reversible) version of your password.
            </li>
            <li>
              <strong>Cycle dates</strong> — period start dates and, where logged,
              end dates and cycle lengths.
            </li>
            <li>
              <strong>Daily symptom logs</strong> — flow intensity, mood, energy,
              sleep hours, and any symptoms you choose to record (cramps, bloating,
              headache, hot flashes, night sweats, brain fog, and free-text custom
              symptoms).
            </li>
            <li>
              <strong>Tracking mode</strong> — whether you use cycle tracking or
              perimenopause mode.
            </li>
            <li>
              <strong>Billing information</strong> — if you subscribe, Stripe
              processes your payment. We store only your Stripe customer ID and
              subscription status; we never see or store your card details.
            </li>
            <li>
              <strong>Reminder preferences</strong> — whether you have opted in to
              email reminders and how many days before your period you want them.
            </li>
          </ul>
          <p className="text-[#140c18] leading-relaxed">
            We do <strong>not</strong> collect your name, location, phone number,
            device identifiers, or any behavioural analytics beyond what is needed
            to show you your own data.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#140c18]">
            2. How we use your data
          </h2>
          <p className="text-[#140c18] leading-relaxed">
            Your data is used for one purpose only: to provide you with the Dawn
            Phase service. Specifically:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-[#140c18]">
            <li>
              Calculating your current cycle day and phase (menstrual, follicular,
              ovulatory, or luteal).
            </li>
            <li>Showing you your symptom history and insights.</li>
            <li>Sending reminder emails if you have opted in.</li>
            <li>Providing customer support when you contact us.</li>
            <li>Processing payments through Stripe.</li>
          </ul>
        </section>

        <hr className="border-gray-100" />

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#140c18]">
            3. What we will never do
          </h2>
          <p className="text-[#140c18] leading-relaxed">
            This is the part we want to be unmistakably clear about:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-[#140c18]">
            <li>
              <strong>We will never sell your data</strong> — to anyone, for any
              price.
            </li>
            <li>
              <strong>We will never share your data with advertisers</strong> —
              Dawn Phase has no advertising model and no ad-tech integrations.
            </li>
            <li>
              <strong>We will never use your health data to train AI models</strong>{" "}
              without your explicit written consent.
            </li>
            <li>
              <strong>We will never share your data with third parties</strong>{" "}
              except Stripe (payments) and Cloudflare (infrastructure), both of
              which process data only as needed to run the service under strict
              data-processing agreements.
            </li>
            <li>
              <strong>We will never transfer your data</strong> in a company sale
              without giving you 30 days' notice and the right to delete your
              account first.
            </li>
          </ul>
        </section>

        <hr className="border-gray-100" />

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#140c18]">
            4. Data storage and security
          </h2>
          <p className="text-[#140c18] leading-relaxed">
            Your data is stored in <strong>Cloudflare D1</strong>, a SQLite-based
            database that is encrypted at rest and replicated across Cloudflare's
            global network. All data in transit is protected by TLS 1.2 or higher.
          </p>
          <p className="text-[#140c18] leading-relaxed">
            Passwords are hashed with SHA-256 and are never stored in plain text.
            Authentication tokens (JWTs) expire after 30 days.
          </p>
          <p className="text-[#140c18] leading-relaxed">
            We do not use third-party analytics, tracking pixels, or session
            recording tools on the authenticated portions of the application.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#140c18]">
            5. Your rights
          </h2>
          <p className="text-[#140c18] leading-relaxed">
            You have full control over your data at any time:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-[#140c18]">
            <li>
              <strong>Export</strong> — download a CSV of all your daily logs from
              the Settings page at any time.
            </li>
            <li>
              <strong>Delete</strong> — permanently delete your account and all
              associated data from the Settings page. Deletion is immediate and
              irreversible.
            </li>
            <li>
              <strong>Correct</strong> — edit any log entry directly in the app.
            </li>
            <li>
              <strong>Access</strong> — request a full copy of your stored data by
              emailing us at{" "}
              <a
                href="mailto:privacy@dawnphase.com"
                className="text-[#c94f68] hover:underline"
              >
                privacy@dawnphase.com
              </a>
              .
            </li>
          </ul>
          <p className="text-[#140c18] leading-relaxed">
            If you are located in the European Economic Area, the UK, or
            California, you have additional rights under GDPR, UK GDPR, and CCPA
            respectively. Please contact us to exercise them.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#140c18]">6. Contact</h2>
          <p className="text-[#140c18] leading-relaxed">
            Questions, concerns, or data requests:{" "}
            <a
              href="mailto:privacy@dawnphase.com"
              className="text-[#c94f68] hover:underline font-medium"
            >
              privacy@dawnphase.com
            </a>
          </p>
          <p className="text-[#140c18] leading-relaxed">
            We aim to respond to all privacy enquiries within 5 business days.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-4">
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#3d2855]">
          <span>© 2026 Dawn Phase · Your data stays yours.</span>
          <nav className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#5a3575] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#5a3575] transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
