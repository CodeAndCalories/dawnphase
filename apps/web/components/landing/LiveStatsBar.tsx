"use client";

import { useEffect, useState } from "react";

const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

interface LiveStats {
  users: string;
  logs: string;
}

const LOADING_ITEMS = [
  { value: "Growing community",             label: "women tracking their cycles" },
  { value: "Thousands of symptoms logged",  label: "across all cycles" },
  { value: "Privacy-first · No data selling", label: "Your data is never sold" },
];

export default function LiveStatsBar() {
  const [live, setLive] = useState<LiveStats | null>(null);

  useEffect(() => {
    fetch(`${WORKER_URL}/stats`, { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: LiveStats | null) => {
        if (data?.users) setLive(data);
      })
      .catch(() => {});
  }, []);

  const items = live
    ? [
        { value: `${live.users} women tracking`,      label: "and growing" },
        { value: `${live.logs} symptoms logged`,       label: "across all cycles" },
        { value: "Privacy-first · No data selling",    label: "Your data is never sold" },
      ]
    : LOADING_ITEMS;

  return (
    <section className="py-10 px-6 bg-[#FFFBF8] border-y border-[#E6D7F3]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        <p className="text-sm font-semibold text-[#5a3575] uppercase tracking-widest text-center">
          Join women who finally understand their cycles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-[#1E0F30] leading-none">
                {item.value}
              </p>
              <p className="text-xs text-[#3d2855] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
