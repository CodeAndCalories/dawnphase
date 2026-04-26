import type { Metadata } from "next";
import CycleCalendarWidget from "@/components/dashboard/CycleCalendarWidget";
import PhaseCard from "@/components/dashboard/PhaseCard";
import QuickLogButton from "@/components/dashboard/QuickLogButton";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your cycle</h1>
          <p className="text-gray-500 text-sm mt-1">
            Today is cycle day <strong>14</strong>
          </p>
        </div>
        <QuickLogButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PhaseCard
          phase="Ovulatory"
          day={14}
          description="Peak energy and confidence. Great time for big conversations and creative work."
          color="bg-amber-50 border-amber-200"
          badge="bg-amber-100 text-amber-800"
        />
        <UpcomingEvents />
        <CycleCalendarWidget />
      </div>
    </div>
  );
}
