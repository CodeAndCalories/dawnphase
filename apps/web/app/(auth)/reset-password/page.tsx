"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const API_BASE =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [token,     setToken]     = useState<string | null>(null);
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  // Read token from URL on mount (avoids Suspense requirement for useSearchParams)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    if (!token) {
      setError("No reset token found — please request a new link.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const body = await res.json().catch(() => ({})) as { message?: string };
      if (!res.ok) {
        throw new Error(body.message ?? "Something went wrong");
      }
      // Redirect to login with a success message via query param
      router.push("/login?reset=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Show a brief loading state while token is being read from URL
  if (token === null && typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("token")) {
      return (
        <div className="min-h-screen flex flex-col bg-[#FFF9F6]">
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md text-center space-y-4">
              <p className="text-[#8C6B5A]">Invalid reset link.</p>
              <a href="/forgot-password" className="text-sm text-[#E8637A] hover:underline">
                Request a new one →
              </a>
            </div>
          </main>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F6]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2D1B1E]">
              Choose a new password
            </h1>
            <p className="mt-2 text-[#8C6B5A]">
              Must be at least 8 characters.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[rgba(232,99,122,0.12)] shadow-sm p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-[#8C6B5A] mb-1.5">
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8637A]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8C6B5A] mb-1.5">
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
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
              {loading ? "Saving…" : "Update password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
