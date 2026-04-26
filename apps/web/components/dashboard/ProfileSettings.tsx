"use client";

import { useState } from "react";

export default function ProfileSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Average cycle length (days)</label>
          <input type="number" defaultValue={28} min={21} max={45}
            className="w-32 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300" />
        </div>
        <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
          Save changes
        </button>
      </div>
    </section>
  );
}
