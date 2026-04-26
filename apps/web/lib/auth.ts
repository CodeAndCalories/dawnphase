"use client";

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
