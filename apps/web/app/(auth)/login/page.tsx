import type { Metadata } from "next";
import Image from "next/image";
import AuthForm from "@/components/ui/AuthForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="min-h-screen dawn-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Dawn Phase"
              width={48}
              height={48}
              className="mx-auto mb-2 rounded-xl"
            />
          </a>
          <a
            href="/"
            className="block text-center text-[#C94B6D] font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            Dawn Phase
          </a>
          <h1 className="mt-4 text-3xl font-bold text-[#2D1B1E]">
            Welcome back
          </h1>
          <p className="mt-2 text-[#8C6B5A]">Sign in to your account</p>
        </div>
        <AuthForm mode="login" />
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign up free
          </a>
        </p>
      </div>
    </div>
  );
}
