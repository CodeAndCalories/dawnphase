"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

// ── Shared user type used by every dashboard page ─────────────────────────────

export interface User {
  id: string;
  email: string;
  mode: "cycle" | "perimenopause";
  birth_date: string | null;
  subscription_status:
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "incomplete";
  trial_ends_at: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

// ── Statuses that grant dashboard access ──────────────────────────────────────

export const PAID_STATUSES = new Set<User["subscription_status"]>([
  "trialing",
  "active",
  "past_due",
]);

// Returns true when a free-trial user's trial window has closed.
// Stripe-managed trialing users (stripe_customer_id set) are never expired here
// — their subscription state is governed by Stripe webhooks.
function isTrialExpired(user: User): boolean {
  if (user.subscription_status !== "trialing") return false;
  if (user.stripe_customer_id) return false;
  return !user.trial_ends_at || new Date(user.trial_ends_at) <= new Date();
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Must be called at the top of every protected dashboard page.
 *
 * Normal flow:
 *   - No JWT                                    → /login
 *   - "canceled"                                → /settings?resubscribe=1
 *   - "trialing" + no stripe_customer_id
 *       + trial_ends_at null or in the past     → /upgrade
 *   - paid status with valid trial              → resolves { user }
 *
 * Checkout-return flow (?checkout=success in URL):
 *   - Stripe fires the webhook asynchronously after the upgrade flow.
 *   - We poll /auth/me every 2 s for up to 10 s waiting for the webhook.
 *   - If status upgrades in time → clean URL, grant access normally.
 *   - If 10 s elapse → grant access with activating=true for a soft banner.
 *
 * Returns:
 *   user          – resolved User, or null while loading
 *   loading       – true while any async work is in progress
 *   redirecting   – unused (kept for API compatibility)
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

        // ── Canceled → settings ───────────────────────────────────────────────
        if (me.subscription_status === "canceled") {
          router.push("/settings?resubscribe=1");
          return;
        }

        const trialExpired = isTrialExpired(me);

        // ── Valid paid status → grant access ──────────────────────────────────
        if (PAID_STATUSES.has(me.subscription_status) && !trialExpired) {
          setUser(me);
          setLoading(false);
          return;
        }

        // ── Expired / invalid → upgrade wall (unless returning from Stripe) ──
        if (!checkoutReturn) {
          router.push("/upgrade");
          return;
        }

        // ── checkoutReturn: poll for webhook to flip status ───────────────────
        setStatusMessage("Activating your account…");

        for (let attempt = 0; attempt < 5; attempt++) {
          await new Promise<void>((r) => setTimeout(r, 2000));
          if (!mounted) return;

          try {
            const { user: polled } = await api.get<{ user: User }>("/auth/me");
            if (!mounted) return;

            if (PAID_STATUSES.has(polled.subscription_status) && !isTrialExpired(polled)) {
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

        // 10 s elapsed — let them in with a banner rather than looping
        if (!mounted) return;
        window.history.replaceState(null, "", "/dashboard");
        setActivating(true);
        setUser(me);
        setLoading(false);
        setStatusMessage(null);
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
