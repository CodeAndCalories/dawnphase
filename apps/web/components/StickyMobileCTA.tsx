"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "dp_sticky_dismissed";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrolled / docHeight >= 0.5) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!visible || dismissed) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#c94f68] bg-[#ede8f7] px-4 py-3 flex items-center gap-3 shadow-lg">
      <p className="flex-1 text-sm font-medium text-[#140c18]">
        Track your cycle free →
      </p>
      <a
        href="/signup"
        className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white whitespace-nowrap"
        style={{ background: "linear-gradient(135deg, #c94f68, #e06e40)" }}
      >
        Start 7-day trial
      </a>
      <button
        onClick={dismiss}
        className="shrink-0 text-xl leading-none text-[#3d2855] hover:text-[#140c18] transition-colors"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
