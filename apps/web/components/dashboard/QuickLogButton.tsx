"use client";

import { Plus } from "lucide-react";

export default function QuickLogButton() {
  return (
    <a
      href="/log"
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
    >
      <Plus size={16} />
      Log today
    </a>
  );
}
