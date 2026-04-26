"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

// ── Shared user type used by every dashboard page ─────────────────────────────

export interface User {
  id: string;
  email: string;
  mode: "cycle" | "perimenopause";
  subscription_status:
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "incomplete";
  trial_ends_at: string | null;
  created_at: string;
}

// ── Statuses that grant dashboard access ──────────────────────────────────────

export const PAID_STATUSES = new Set<User["subscription_status"]>([
  "trialing",
  "active",
  "past_due",
]);

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Must be called at the top of every protected dashboard page.
 *
 * Normal flow:
 *   - No JWT          → /login
 *   - "incomplete"    → POST /stripe/checkout → redirect to Stripe
 *   - "canceled"      → /settings?resubscribe=1
 *   - paid status     → resolves { user }
 *
 * Checkout-return flow (?checkout=success in URL):
 *   - Stripe fires the webhook asynchronously; the DB may still show
 *     "incomplete" for a few seconds after the user lands back here.
 *   - We poll /auth/me every 2 s for up to 10 s waiting for the webhook
 *     to flip the status.  statusMessage is "Activating your account…"
 *     during this time.
 *   - If the status updates in time → clean URL, grant access normally.
 *   - If 10 s elapse with no update → grant access anyway with
 *     activating=true so the page can show a soft banner instead of
 *     looping back to Stripe.
 *
 * Returns:
 *   user          – resolved User, or null while loading
 *   loading       – true while any async work is in progress
 *   redirecting   – specifically true while POSTing to /stripe/checkout
 *   activating    – true when let in after exhausted polling (webhook lag)
 *   statusMessage – human-readable string for the loading spinner, or null
 */
export function useRequireSubscription(): {
  user: User | null;
  loading: boolean;
  redirecting: boolean;
  activating: boolean;
  statusMessage: string | null;
} {
  const router = useRouter();
  const [user,          setUser]          = useState<User | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [redirecting,   setRedirecting]   = useState(false);
  const [activating,    setActivating]    = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("dp_token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    // Detect return from Stripe checkout (?checkout=success)
    const checkoutReturn =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("checkout") === "success";

    async function run() {
      try {
        const { user: me } = await api.get<{ user: User }>("/auth/me");
        if (!mounted) return;

        // ── Already paid → grant access ───────────────────────────────────────
        if (PAID_STATUSES.has(me.subscription_status)) {
          setUser(me);
          setLoading(false);
          return;
        }

        // ── Canceled → settings ───────────────────────────────────────────────
        if (me.subscription_status === "canceled") {
          router.push("/settings?resubscribe=1");
          return;
        }

        // ── Incomplete status ─────────────────────────────────────────────────
        if (checkoutReturn) {
          // Coming back from Stripe — the webhook may not have fired yet.
          // Poll /auth/me every 2 s for up to 10 s.
          setStatusMessage("Activating your account…");

          for (let attempt = 0; attempt < 5; attempt++) {
            await new Promise<void>((r) => setTimeout(r, 2000));
            if (!mounted) return;

            try {
              const { user: polled } = await api.get<{ user: User }>("/auth/me");
              if (!mounted) return;

              if (PAID_STATUSES.has(polled.subscription_status)) {
                // Webhook landed — clean up URL and grant access
                window.history.replaceState(null, "", "/dashboard");
                setUser(polled);
                setLoading(false);
                setStatusMessage(null);
                return;
              }
            } catch {
              // Transient error — keep trying
            }
          }

          // 10 s elapsed, webhook still hasn't fired. Let them in with a banner
          // rather than looping them back to Stripe.
          if (!mounted) return;
          window.history.replaceState(null, "", "/dashboard");
          setActivating(true);
          setUser(me);
          setLoading(false);
          setStatusMessage(null);
          return;
        }

        // ── Incomplete with no checkout param → send to Stripe ───────────────
        setRedirecting(true);
        setStatusMessage("Setting up your account…");
        try {
          const { url } = await api.post<{ url: string }>("/stripe/checkout", {});
          if (!mounted) return;
          window.location.href = url;
        } catch {
          if (!mounted) return;
          router.push("/signup");
        }
      } catch {
        if (!mounted) return;
        router.push("/login");
      }
    }

    run();
    return () => { mounted = false; };
  }, [router]);

  return {
    user,
    loading: loading || redirecting,
    redirecting,
    activating,
    statusMessage,
  };
}

// ── Legacy helpers (kept for backward compatibility) ─────────────────────────

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("dp_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function redirectIfUnauthenticated(redirectTo = "/login") {
  if (typeof window !== "undefined" && !isAuthenticated()) {
    window.location.href = redirectTo;
  }
}

export function redirectIfAuthenticated(redirectTo = "/dashboard") {
  if (typeof window !== "undefined" && isAuthenticated()) {
    window.location.href = redirectTo;
  }
}
