import type { Metadata } from "next";
import LogForm from "@/components/dashboard/LogForm";
import RecentLogs from "@/components/dashboard/RecentLogs";

export const metadata: Metadata = { title: "Daily Log" };

export default function LogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Daily log</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track your symptoms, mood, and energy today
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LogForm />
        </div>
        <div>
          <RecentLogs />
        </div>
      </div>
    </div>
  );
}
