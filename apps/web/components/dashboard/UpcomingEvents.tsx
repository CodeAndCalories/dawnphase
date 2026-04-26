const events = [
  { label: "Luteal phase starts", daysAway: 2, color: "text-purple-600 bg-purple-50" },
  { label: "PMS window", daysAway: 10, color: "text-rose-600 bg-rose-50" },
  { label: "Next period", daysAway: 14, color: "text-pink-600 bg-pink-50" },
];

export default function UpcomingEvents() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Upcoming</h3>
      <ul className="space-y-3">
        {events.map((ev) => (
          <li key={ev.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{ev.label}</span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ev.color}`}>
              in {ev.daysAway}d
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
