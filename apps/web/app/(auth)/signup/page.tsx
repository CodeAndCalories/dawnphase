"use client";

import { useEffect } from "react";
import AuthForm from "@/components/ui/AuthForm";
import Header from "@/components/Header";

export default function SignupPage() {
  // Persist referral code from URL into localStorage so AuthForm can pick it up
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) localStorage.setItem("dp_ref_code", ref);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F6]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-[#C94B6D]">
              Start your free trial
            </h1>
            <p className="mt-2 text-[#8C6B5A] text-sm">
              7 days free, then $14.99/mo. Cancel anytime.
            </p>
          </div>

          <AuthForm mode="signup" />

          <p className="mt-6 text-center text-sm text-[#8C6B5A]">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-[#E8637A] hover:underline">
              Log in
            </a>
          </p>

          <p className="mt-4 text-center text-xs text-[#8C6B5A]/70">
            By signing up you agree to our{" "}
            <a href="/terms" className="hover:underline">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
