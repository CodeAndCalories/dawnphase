"use client";

import { useState } from "react";
import Header from "@/components/Header";

const API_BASE =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

export default function ForgotPasswordPage() {
  const [email,     setEmail]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(body.message ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F6]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-8 text-center space-y-4">
              <div className="text-4xl">📬</div>
              <h1 className="text-xl font-semibold text-[#2D1B1E]">
                Check your email
              </h1>
              <p className="text-sm text-[#8C6B5A] leading-relaxed">
                If <strong>{email}</strong> is registered with Dawn Phase,
                we&apos;ve sent a reset link. It expires in 1 hour.
              </p>
              <a
                href="/login"
                className="inline-block text-sm text-[#E8637A] font-medium hover:underline"
              >
                ← Back to log in
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#2D1B1E]">
                  Forgot your password?
                </h1>
                <p className="mt-2 text-[#8C6B5A]">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-8 space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-[#8C6B5A] mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8637A]/20"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#E8637A] hover:bg-[#C94B6D] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 text-sm"
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#8C6B5A]">
                Remember it?{" "}
                <a href="/login" className="font-medium text-[#E8637A] hover:underline">
                  Log in
                </a>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
