"use client";

import { useEffect, useState } from "react";

const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

export default function HeroUrgency() {
  const [userCount, setUserCount] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${WORKER_URL}/stats`, { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { users?: string } | null) => {
        if (data?.users) setUserCount(data.users);
      })
      .catch(() => {});
  }, []);

  if (!userCount) return null;

  return (
    <p className="mt-4 text-sm text-dp-taupe/70">
      Join{" "}
      <span className="font-semibold text-dp-taupe/90">{userCount}</span>{" "}
      women who finally understand their cycle
    </p>
  );
}
