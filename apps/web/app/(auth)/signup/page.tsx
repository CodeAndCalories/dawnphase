"use client";

import AuthForm from "@/components/ui/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F6] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="font-display text-2xl font-bold text-[#C94B6D]">
              Dawn Phase
            </span>
          </a>
          <h1 className="font-display mt-6 text-3xl font-bold text-[#C94B6D]">
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
    </div>
  );
}
