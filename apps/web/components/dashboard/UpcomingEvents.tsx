interface UpcomingEventsProps {
  cycleDay: number | null;
}

interface Milestone {
  label: string;
  daysAway: number;
  color: string;
}

function getUpcomingEvents(cycleDay: number): Milestone[] {
  const milestones = [
    { day: 14, label: "Ovulation", color: "text-amber-600 bg-amber-50" },
    { day: 15, label: "Luteal phase starts", color: "text-purple-600 bg-purple-50" },
    { day: 21, label: "PMS window", color: "text-rose-600 bg-rose-50" },
    { day: 29, label: "Next period", color: "text-pink-600 bg-pink-50" },
  ];

  return milestones
    .filter((m) => m.day > cycleDay)
    .map((m) => ({ label: m.label, daysAway: m.day - cycleDay, color: m.color }))
    .slice(0, 3);
}

export default function UpcomingEvents({ cycleDay }: UpcomingEventsProps) {
  const events = cycleDay != null ? getUpcomingEvents(cycleDay) : [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Upcoming</h3>
      {events.length === 0 ? (
        <p className="text-sm text-gray-400">
          {cycleDay == null ? "No cycle data yet." : "End of cycle — new period expected soon."}
        </p>
      ) : (
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
      )}
    </div>
  );
}
