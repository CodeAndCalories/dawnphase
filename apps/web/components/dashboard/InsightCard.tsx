interface InsightCardProps {
  label: string;
  value: string;
  trend?: string;
}

export default function InsightCard({ label, value, trend }: InsightCardProps) {
  const trendNum = trend ? parseInt(trend, 10) : null;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trendNum !== null && trendNum !== 0 && (
          <span className={`text-sm font-medium ${trendNum > 0 ? "text-rose-500" : "text-green-500"}`}>
            {trendNum > 0 ? `+${trendNum}` : trendNum}d
          </span>
        )}
      </div>
    </div>
  );
}
