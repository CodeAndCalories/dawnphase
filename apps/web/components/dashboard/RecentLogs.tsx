"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface DailyLog {
  date: string;
  flow_intensity: string | null;
  mood: string | null;            // JSON string
  energy: number | null;
  cramps: number | null;
  bloating: number | null;
  headache: number | null;
  brain_fog: number | null;
  hot_flashes: number | null;
  night_sweats: number | null;
  custom_symptoms: string | null; // JSON string
}

function parseTags(log: DailyLog): string[] {
  const tags: string[] = [];
  if (log.cramps)       tags.push("Cramps");
  if (log.bloating)     tags.push("Bloating");
  if (log.headache)     tags.push("Headache");
  if (log.brain_fog)    tags.push("Brain fog");
  if (log.hot_flashes)  tags.push("Hot flashes");
  if (log.night_sweats) tags.push("Night sweats");
  try {
    if (log.custom_symptoms) {
      const cs = JSON.parse(log.custom_symptoms) as string[];
      tags.push(...cs);
    }
    if (log.mood) {
      const m = JSON.parse(log.mood) as string[];
      tags.unshift(...m);
    }
  } catch {}
  return tags;
}

function shortDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });
}

export default function RecentLogs() {
  const [logs,    setLogs]    = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ logs: DailyLog[] }>("/logs?limit=7")
      .then(res => setLogs(res.logs))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Recent logs</h3>
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
        </div>
      ) : logs.length === 0 ? (
        <p className="text-sm text-gray-400">No logs yet.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map(log => {
            const tags = parseTags(log);
            return (
              <li key={log.date} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-900">{shortDate(log.date)}</span>
                  {log.flow_intensity && log.flow_intensity !== "none" && (
                    <span className="text-xs text-gray-500 capitalize">
                      Flow: {log.flow_intensity}
                    </span>
                  )}
                </div>
                {log.energy && (
                  <div className="text-xs text-gray-500 mb-1.5">
                    Energy {log.energy}/5
                  </div>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 5).map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length > 5 && (
                      <span className="text-xs text-gray-400">+{tags.length - 5}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
