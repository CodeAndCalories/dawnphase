import type { Metadata } from "next";
import AuthForm from "@/components/ui/AuthForm";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F6]">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2D1B1E]">Welcome back</h1>
            <p className="mt-2 text-[#8C6B5A]">Sign in to your account</p>
          </div>
          <AuthForm mode="login" />
          <p className="mt-6 text-center text-sm text-[#8C6B5A]">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-[#E8637A] hover:underline">
              Sign up free
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
