"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const DISMISS_KEY  = "dp_pwa_dismissed";
const DISMISS_MS   = 7 * 24 * 60 * 60 * 1000; // 7 days
const SHOW_DELAY   = 10_000;                    // 10 seconds

// ── Detection helpers ─────────────────────────────────────────────────────────

function isAlreadyInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function wasDismissed(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  return Date.now() - parseInt(raw, 10) < DISMISS_MS;
}

function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type BannerState = "hidden" | "ios" | "android";

// ── Component ─────────────────────────────────────────────────────────────────

export default function PWAInstallPrompt() {
  const [state,    setState]    = useState<BannerState>("hidden");
  const promptRef  = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Never show if already installed, dismissed recently, or not on mobile
    if (isAlreadyInstalled() || wasDismissed() || !isMobileViewport()) return;

    const capturePrompt = (e: Event) => {
      e.preventDefault();
      promptRef.current = e as BeforeInstallPromptEvent;
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);

    const timer = setTimeout(() => {
      if (isAlreadyInstalled() || wasDismissed() || !isMobileViewport()) return;
      if (isIOS()) {
        setState("ios");
      } else if (promptRef.current) {
        setState("android");
      }
      // Non-iOS without a deferred prompt = browser doesn't support PWA install; stay hidden
    }, SHOW_DELAY);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", capturePrompt);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setState("hidden");
  }

  async function install() {
    const prompt = promptRef.current;
    if (!prompt) { dismiss(); return; }
    try {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") promptRef.current = null;
    } catch {
      // Prompt failed — silently dismiss
    }
    dismiss();
  }

  if (state === "hidden") return null;

  return (
    <div
      className="fixed left-0 right-0 z-40 bg-[#f4e6f0] border-t-2 border-[#c94f68]/30 px-4 py-3 flex items-center gap-3 shadow-lg md:hidden"
      style={{ bottom: 64 }} // sits above the 64px tab bar
    >
      <Image
        src="/logo.png"
        alt="Dawn Phase"
        width={32}
        height={32}
        className="rounded-lg shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#140c18] leading-tight">
          Add to your home screen
        </p>
        {state === "ios" ? (
          <p className="text-xs text-[#3d2855] mt-0.5">
            Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
          </p>
        ) : (
          <p className="text-xs text-[#3d2855] mt-0.5">
            Track your cycle anywhere
          </p>
        )}
      </div>

      {state === "android" && (
        <button
          onClick={install}
          className="shrink-0 px-4 py-2 bg-[#c94f68] text-white text-sm font-semibold rounded-full hover:bg-[#a83d72] transition-colors"
        >
          Add
        </button>
      )}

      <button
        onClick={dismiss}
        className="shrink-0 w-8 h-8 flex items-center justify-center text-[#3d2855] hover:text-[#140c18] text-xl leading-none transition-colors"
        aria-label="Dismiss install prompt"
      >
        ×
      </button>
    </div>
  );
}
