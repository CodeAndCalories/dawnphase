"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "dp_exit_shown";

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      let idleTimer: ReturnType<typeof setTimeout>;

      const resetTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (!sessionStorage.getItem(SESSION_KEY)) {
            setVisible(true);
            sessionStorage.setItem(SESSION_KEY, "1");
          }
        }, 30000);
      };

      const events = ["touchstart", "touchmove", "scroll", "click"] as const;
      events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
      resetTimer();

      return () => {
        clearTimeout(idleTimer);
        events.forEach((e) => window.removeEventListener(e, resetTimer));
      };
    } else {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 20 && !sessionStorage.getItem(SESSION_KEY)) {
          setVisible(true);
          sessionStorage.setItem(SESSION_KEY, "1");
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, []);

  const close = () => setVisible(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent" }),
      });
    } catch {
      // silently fail — user still sees confirmation
    }
    setSubmitted(true);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[#FFF9F6] p-8 shadow-2xl">
        <button
          onClick={close}
          className="absolute right-4 top-4 text-2xl leading-none text-[#8C6B5A] hover:text-[#2D1B1E] transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#C94B6D] mb-2">Before you go...</h2>
        <p className="text-[#8C6B5A] mb-6 leading-relaxed">
          Track your cycle free for 7 days — no card required until you decide.
        </p>

        {submitted ? (
          <p className="text-center text-[#E8637A] font-semibold py-4 text-lg">
            ✓ Check your inbox!
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full rounded-xl border border-[rgba(232,99,122,0.3)] bg-white px-4 py-3 text-sm text-[#2D1B1E] placeholder-[#8C6B5A]/60 focus:outline-none focus:border-[#E8637A] transition-colors"
              />
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:scale-[1.01]"
                style={{ background: "linear-gradient(135deg, #E8637A, #F4956A)" }}
              >
                Send me access
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-[rgba(232,99,122,0.15)]" />
              <span className="text-xs text-[#8C6B5A]/50">or</span>
              <div className="flex-1 h-px bg-[rgba(232,99,122,0.15)]" />
            </div>

            <a
              href="/signup"
              className="mt-3 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold text-white transition-all hover:scale-[1.01]"
              style={{ background: "linear-gradient(135deg, #E8637A, #A855C8)" }}
            >
              Start free trial →
            </a>
          </>
        )}

        <p className="mt-5 text-center text-xs text-[#8C6B5A]/60">
          Join women who finally understand their cycles
        </p>
      </div>
    </div>
  );
}
