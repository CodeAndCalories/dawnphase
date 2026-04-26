"use client";

import { useState, useEffect } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Join the waitlist — Dawn Phase";
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const existing = JSON.parse(
        localStorage.getItem("dp_waitlist") ?? "[]"
      ) as string[];
      if (!existing.includes(email)) {
        localStorage.setItem(
          "dp_waitlist",
          JSON.stringify([...existing, email])
        );
      }
    } catch {
      // localStorage unavailable (private browsing) — silent fail
    }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-dawn-warm">
      {/* Pre-launch banner */}
      <div
        style={{
          background: "#2D1B1E",
          color: "#FDF6F0",
          textAlign: "center",
          padding: "12px",
          fontSize: "14px",
        }}
      >
        🌅 Dawn Phase is launching soon — join the waitlist below to get early
        access and 30 days free.
      </div>

      {/* Page body */}
      <div className="flex items-center justify-center min-h-[calc(100vh-48px)] px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <a href="/" className="inline-block">
              <span className="font-display text-2xl font-bold text-dp-deeprose">
                Dawn Phase
              </span>
            </a>
            <h1 className="font-display mt-6 text-3xl font-bold text-dp-deeprose">
              Coming soon
            </h1>
            <p className="mt-2 text-dp-taupe">
              Join the waitlist for early access
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[rgba(232,99,122,0.15)] p-8 text-center">
              <div className="text-4xl mb-4">🌅</div>
              <p className="font-display font-semibold text-dp-deeprose text-lg mb-3">
                You&apos;re on the list!
              </p>
              <p className="text-dp-taupe text-sm leading-relaxed">
                We&apos;ll email you when Dawn Phase launches. Check your inbox
                for updates.
              </p>
              <a
                href="/"
                className="inline-block mt-6 text-sm text-dawn-rose hover:underline"
              >
                ← Back to home
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-[rgba(232,99,122,0.15)] p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-dp-taupe mb-1.5">
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-dawn-rose/20 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-dawn-rose to-dawn-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                Join the waitlist
              </button>

              <p className="text-center text-xs text-dp-taupe/70">
                No spam. Just your launch invite + 30 days free.
              </p>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-dp-taupe">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-dawn-rose hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
