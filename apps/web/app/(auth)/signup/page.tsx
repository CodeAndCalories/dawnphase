import type { Metadata } from "next";
import AuthForm from "@/components/ui/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <div className="min-h-screen dawn-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Dawn Phase
            </span>
          </a>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Start your journey
          </h1>
          <p className="mt-2 text-gray-600">
            Free for 14 days — no credit card required
          </p>
        </div>
        <AuthForm mode="signup" />
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
