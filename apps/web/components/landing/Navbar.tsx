"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Dawn Phase
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="/cycle-calculator" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Free tools
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Start free
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 space-y-3 pt-4">
          <a href="#features" className="block text-sm text-gray-600">Features</a>
          <a href="#how-it-works" className="block text-sm text-gray-600">How it works</a>
          <a href="#pricing" className="block text-sm text-gray-600">Pricing</a>
          <a href="/cycle-calculator" className="block text-sm text-gray-600">Free tools</a>
          <div className="pt-3 flex flex-col gap-2">
            <a href="/login" className="text-sm font-medium text-center py-2 border border-gray-200 rounded-full">
              Log in
            </a>
            <a href="/signup" className="text-sm font-medium text-center py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full">
              Start free
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
