"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function UpgradePage() {
  const [loading, setLoading] = useState<"monthly" | "annual" | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("dp_token")) {
      window.location.href = "/login";
    }
  }, []);

  async function handleUpgrade(plan: "monthly" | "annual") {
    setLoading(plan);
    setError(null);
    try {
      const { url } = await api.post<{ url: string }>("/stripe/checkout", {
        plan,
        no_trial: true,
      });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#F3ECFA] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-[rgba(130,80,170,0.15)] p-8 w-full max-w-md text-center space-y-6">
        <div className="space-y-3">
          <p className="text-5xl">🌅</p>
          <h1 className="text-2xl font-bold text-[#1E0F30]">
            Your free trial has ended
          </h1>
          <p className="text-sm text-[#3d2855] leading-relaxed">
            Subscribe to keep tracking your cycle and accessing your data.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => handleUpgrade("monthly")}
            disabled={loading !== null}
            className="w-full py-3.5 bg-gradient-to-r from-[#c94f68] to-[#e06e40] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
          >
            {loading === "monthly" ? "Please wait…" : "Start subscription →"}
          </button>

          <button
            onClick={() => handleUpgrade("annual")}
            disabled={loading !== null}
            className="w-full py-2 text-sm font-medium text-[#5a3575] hover:text-[#c94f68] transition-colors disabled:opacity-60"
          >
            {loading === "annual" ? "Please wait…" : "Choose annual (save 20%)"}
          </button>
        </div>

        <p className="text-xs text-[#3d2855]/60">
          Secure payment via Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
