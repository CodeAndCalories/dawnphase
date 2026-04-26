"use client";

import { useState } from "react";

interface ToggleProps {
  label: string;
  description: string;
  defaultChecked?: boolean;
}

function Toggle({ label, description, defaultChecked }: ToggleProps) {
  const [on, setOn] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative w-10 h-6 rounded-full transition-colors ${on ? "bg-purple-500" : "bg-gray-200"}`}
      >
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-4" : ""}`} />
      </button>
    </label>
  );
}

export default function NotificationSettings() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">Notifications</h2>
      <div className="space-y-5">
        <Toggle label="Period reminder" description="Email 2 days before predicted period" defaultChecked />
        <Toggle label="Ovulation reminder" description="Email on predicted ovulation day" />
        <Toggle label="Daily log reminder" description="Email reminder to log symptoms each morning" />
        <Toggle label="Phase transition" description="Email when you enter a new cycle phase" defaultChecked />
      </div>
    </section>
  );
}
