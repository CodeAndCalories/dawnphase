"use client";

import { useState } from "react";

const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

// ── Print button ──────────────────────────────────────────────────────────────

export function PCOSPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#E8637A] text-[#E8637A] text-sm font-semibold hover:bg-[#E8637A] hover:text-white transition-all"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print / Save as PDF
    </button>
  );
}

// ── Email capture ─────────────────────────────────────────────────────────────

export function PCOSEmailCapture() {
  const [email,       setEmail]       = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${WORKER_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "pcos-guide",
          results: {
            "Your guide":    "PCOS Cycle Tracking: What to Log Every Day",
            "What's inside": "Daily tracking checklist, BBT & OPK guidance, pattern tips",
            "Bonus":         "Fertility specialist referral checklist",
          },
        }),
      });
      if (!res.ok) throw new Error("Could not send — please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4 space-y-2">
        <p className="text-2xl">📬</p>
        <p className="text-base font-semibold text-[#2D1B1E]">Guide sent! Check your inbox.</p>
        <p className="text-sm text-[#8C6B5A]">
          Can&apos;t find it? Check your spam folder, or{" "}
          <button
            type="button"
            onClick={() => { setSubmitted(false); setEmail(""); }}
            className="text-[#E8637A] underline"
          >
            try a different address
          </button>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 min-h-[48px] px-4 py-3 rounded-xl border-2 border-white/40 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/80 transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={submitting || !email}
          className="min-h-[48px] px-6 py-3 rounded-xl bg-white text-[#E8637A] font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
        >
          {submitting ? "Sending…" : "Send me the guide →"}
        </button>
      </div>
      {error && <p className="text-sm text-white/90 font-medium">{error}</p>}
      <p className="text-xs text-white/60">No spam. Unsubscribe any time.</p>
    </form>
  );
}
