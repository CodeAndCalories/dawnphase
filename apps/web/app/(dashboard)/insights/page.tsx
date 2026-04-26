import type { Metadata } from "next";
import CycleLengthChart from "@/components/dashboard/CycleLengthChart";
import SymptomsHeatmap from "@/components/dashboard/SymptomsHeatmap";
import InsightCard from "@/components/dashboard/InsightCard";

export const metadata: Metadata = { title: "Insights" };

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <p className="text-gray-500 text-sm mt-1">
          Patterns and trends from your last 6 cycles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard label="Avg cycle length" value="28 days" trend="+1" />
        <InsightCard label="Avg period length" value="5 days" trend="0" />
        <InsightCard label="Cycles tracked" value="7" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CycleLengthChart />
        <SymptomsHeatmap />
      </div>
    </div>
  );
}
