"use client";

import { logout } from "@/lib/api";

export default function DangerZone() {
  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <section className="bg-white rounded-2xl border border-red-100 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Account</h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Log out
        </button>
        <button className="w-full text-left px-4 py-3 text-sm text-red-600 border border-red-100 rounded-xl hover:bg-red-50 transition-colors">
          Delete account and all data
        </button>
      </div>
    </section>
  );
}
