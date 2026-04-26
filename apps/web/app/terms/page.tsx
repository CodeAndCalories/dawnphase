import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Dawn Phase.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      <Header />

      {/* Content */}
      <main className="max-w-[800px] mx-auto px-6 py-12 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#C94B6D]">Terms of Service</h1>
          <p className="text-sm text-[#8C6B5A]">Effective date: April 2026</p>
        </div>

        <p className="text-[#2D1B1E] leading-relaxed">
          By creating an account or using Dawn Phase, you agree to these terms.
          Please read them. They are written in plain language.
        </p>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            1. What Dawn Phase is
          </h2>
          <p className="text-[#2D1B1E] leading-relaxed">
            Dawn Phase is a personal cycle and hormone tracking app. It lets you
            log your period start dates, daily symptoms (flow, mood, energy,
            sleep, and more), and view predictions based on your cycle history.
            It also offers a perimenopause tracking mode with relevant symptom
            categories.
          </p>
          <p className="text-[#2D1B1E] leading-relaxed">
            Dawn Phase is a <strong>software service</strong>, not a medical
            device. See Section 4 for the full health disclaimer.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            2. Subscription and billing
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-[#2D1B1E]">
            <li>
              <strong>Price:</strong> Dawn Phase Pro costs{" "}
              <strong>$14.99 per month</strong>.
            </li>
            <li>
              <strong>Free trial:</strong> New accounts start with a{" "}
              <strong>7-day free trial</strong>. A valid payment method is
              required to begin the trial. You will not be charged until the
              trial ends.
            </li>
            <li>
              <strong>Auto-renewal:</strong> Your subscription automatically
              renews each month on your billing date. You will receive an email
              receipt from Stripe for each charge.
            </li>
            <li>
              <strong>Price changes:</strong> If we change the subscription
              price, we will give you at least 30 days' notice by email before
              the new price takes effect.
            </li>
            <li>
              <strong>Payments:</strong> All payments are processed by Stripe.
              Dawn Phase never sees or stores your card details. Stripe's own
              terms apply to payment processing.
            </li>
          </ul>
        </section>

        <hr className="border-gray-100" />

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            3. Cancellation policy
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-[#2D1B1E]">
            <li>
              <strong>Cancel anytime.</strong> You can cancel your subscription
              from the Settings → Subscription page at any time with no
              cancellation fee.
            </li>
            <li>
              <strong>Access after cancellation.</strong> Your access continues
              until the end of the current billing period. After that, your
              account will move to a read-only state.
            </li>
            <li>
              <strong>No refunds on the current period.</strong> We do not
              provide partial refunds for unused days in a billing period that
              has already been charged.
            </li>
            <li>
              <strong>Trial cancellations.</strong> If you cancel before the
              7-day trial ends, you will not be charged.
            </li>
          </ul>
        </section>

        <hr className="border-gray-100" />

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            4. Health disclaimer
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 space-y-3">
            <p className="text-[#2D1B1E] leading-relaxed font-medium">
              Dawn Phase is not a medical device and does not provide medical
              advice.
            </p>
            <p className="text-[#2D1B1E] leading-relaxed">
              The cycle predictions, phase estimates, and symptom insights
              provided by Dawn Phase are based on statistical averages and your
              personal logged data. They are intended for general informational
              and self-awareness purposes only.
            </p>
            <p className="text-[#2D1B1E] leading-relaxed">
              Dawn Phase is <strong>not</strong> a contraceptive method or a
              fertility treatment tool. Do not rely on it for pregnancy prevention
              or family planning. Consult a qualified healthcare provider for
              medical decisions, including those related to your menstrual health,
              fertility, or perimenopause.
            </p>
            <p className="text-[#2D1B1E] leading-relaxed">
              If you experience severe symptoms, unusual changes in your cycle,
              or any health concerns, please contact a doctor or healthcare
              professional.
            </p>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            5. Acceptable use
          </h2>
          <p className="text-[#2D1B1E] leading-relaxed">
            You agree to use Dawn Phase only for its intended purpose: personal
            cycle and symptom tracking. You agree not to:
          </p>
          <ul className="space-y-2 pl-5 list-disc text-[#2D1B1E]">
            <li>
              Attempt to access another person's account or data.
            </li>
            <li>
              Use automated tools, scrapers, or bots to interact with the
              service.
            </li>
            <li>
              Reverse-engineer, decompile, or attempt to extract the source
              code of the application.
            </li>
            <li>
              Use the service in any way that violates applicable local,
              national, or international law.
            </li>
            <li>
              Attempt to overload, disrupt, or compromise the security of the
              service or its infrastructure.
            </li>
          </ul>
          <p className="text-[#2D1B1E] leading-relaxed">
            Violation of these terms may result in immediate suspension or
            termination of your account.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            6. Changes to these terms
          </h2>
          <p className="text-[#2D1B1E] leading-relaxed">
            We may update these terms from time to time. When we do, we will
            update the effective date at the top of this page and, for material
            changes, notify you by email at least 14 days before the new terms
            take effect. Continued use of Dawn Phase after that date constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">
            7. Governing law
          </h2>
          <p className="text-[#2D1B1E] leading-relaxed">
            These terms are governed by the laws of the jurisdiction in which
            Dawn Phase operates. Any disputes arising from these terms will be
            resolved through binding arbitration or in the courts of that
            jurisdiction, at our election.
          </p>
        </section>

        <hr className="border-gray-100" />

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#2D1B1E]">8. Contact</h2>
          <p className="text-[#2D1B1E] leading-relaxed">
            Questions about these terms:{" "}
            <a
              href="mailto:hello@dawnphase.com"
              className="text-[#E8637A] hover:underline font-medium"
            >
              hello@dawnphase.com
            </a>
          </p>
          <p className="text-[#2D1B1E] leading-relaxed">
            For privacy-related questions, see our{" "}
            <Link href="/privacy" className="text-[#E8637A] hover:underline">
              Privacy Policy
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:privacy@dawnphase.com"
              className="text-[#E8637A] hover:underline"
            >
              privacy@dawnphase.com
            </a>
            .
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-4">
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#8C6B5A]">
          <span>© 2026 Dawn Phase · Your data stays yours.</span>
          <nav className="flex gap-5">
            <Link href="/privacy" className="hover:text-[#C94B6D] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C94B6D] transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
