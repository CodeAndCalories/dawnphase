"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login, signup, api } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  mode: "login" | "signup";
}

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setError(null);
    setLoading(true);
    try {
      await login(values.email, values.password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
        />
        {formState.errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
        />
        {formState.errors.password && (
          <p className="mt-1 text-xs text-red-500">
            {formState.errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
      >
        {loading ? "Please wait…" : "Log in"}
      </button>

      <p className="text-center text-xs text-gray-500">
        <a href="/forgot-password" className="text-purple-600 hover:underline">
          Forgot password?
        </a>
      </p>
    </form>
  );
}

function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"account" | "billing">("account");

  const { register, handleSubmit, formState } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: SignupValues) {
    setError(null);
    setLoading(true);
    try {
      // Step 1 — create account; JWT stored in localStorage by signup()
      await signup(values.email, values.password, values.name);

      // Step 2 — redirect to Stripe checkout (7-day trial)
      setStep("billing");
      const { url } = await api.post<{ url: string }>("/stripe/checkout", {});
      window.location.href = url;
    } catch (err) {
      // If we're already past account creation (step === "billing") the
      // account exists but Stripe failed — send to dashboard instead of
      // leaving the user stranded.
      if (step === "billing") {
        window.location.href = "/dashboard";
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  // Full-page overlay while redirecting to Stripe — user should never
  // see the form again at this point.
  if (step === "billing" && loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[rgba(232,99,122,0.15)] p-12 flex flex-col items-center gap-5 text-center">
        <div className="w-10 h-10 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
        <div>
          <p className="font-semibold text-[#C94B6D] text-lg">
            Setting up your trial…
          </p>
          <p className="text-sm text-[#8C6B5A] mt-1">
            Taking you to secure checkout
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm border border-[rgba(232,99,122,0.15)] p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-[#8C6B5A] mb-1.5">
          Your name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Luna"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E8637A]/20 text-sm"
        />
        {formState.errors.name && (
          <p className="mt-1 text-xs text-red-500">
            {formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#8C6B5A] mb-1.5">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E8637A]/20 text-sm"
        />
        {formState.errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#8C6B5A] mb-1.5">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E8637A]/20 text-sm"
        />
        {formState.errors.password && (
          <p className="mt-1 text-xs text-red-500">
            {formState.errors.password.message}
          </p>
        )}
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
        {loading ? "Creating account…" : "Start your free trial"}
      </button>

      <p className="text-center text-xs text-[#8C6B5A]/70">
        No charge for 7 days. Card required to start trial.
      </p>
    </form>
  );
}

export default function AuthForm({ mode }: AuthFormProps) {
  return mode === "login" ? <LoginForm /> : <SignupForm />;
}
