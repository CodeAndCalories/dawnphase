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
 * - No JWT          → redirect to /login
 * - "incomplete"    → POST /stripe/checkout → redirect to Stripe
 * - "canceled"      → redirect to /settings?resubscribe=1
 * - "trialing" | "active" | "past_due" → resolve { user }
 *
 * While auth is in flight or a redirect is pending, `loading` is true.
 * `redirecting` is specifically true while the Stripe checkout URL is
 * being fetched — pages should show "Setting up your account…" at that
 * point rather than a generic spinner.
 */
export function useRequireSubscription(): {
  user: User | null;
  loading: boolean;
  redirecting: boolean;
} {
  const router = useRouter();
  const [user,        setUser]        = useState<User | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("dp_token") : null;
    if (!token) {
      router.push("/login");
      return;
    }

    api
      .get<{ user: User }>("/auth/me")
      .then(async ({ user: me }) => {
        // ── Not yet subscribed ────────────────────────────────────────────────
        if (!me.subscription_status || me.subscription_status === "incomplete") {
          setRedirecting(true);
          try {
            const { url } = await api.post<{ url: string }>(
              "/stripe/checkout",
              {}
            );
            window.location.href = url;
          } catch {
            // Stripe not reachable — send back to signup so they can retry
            router.push("/signup");
          }
          return;
        }

        // ── Canceled ─────────────────────────────────────────────────────────
        if (me.subscription_status === "canceled") {
          router.push("/settings?resubscribe=1");
          return;
        }

        // ── Active / trialing / past_due → grant access ───────────────────────
        setUser(me);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  return { user, loading: loading || redirecting, redirecting };
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
