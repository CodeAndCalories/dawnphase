export default function CycleCalendarWidget() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="font-semibold text-gray-900 mb-4">This cycle</h3>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: 28 }, (_, i) => {
          const day = i + 1;
          let bg = "bg-gray-100";
          if (day <= 5) bg = "bg-rose-400";
          else if (day <= 13) bg = "bg-purple-100";
          else if (day === 14) bg = "bg-amber-400";
          else if (day <= 28) bg = "bg-indigo-100";
          const isToday = day === 14;
          return (
            <div
              key={day}
              title={`Day ${day}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${bg} ${isToday ? "ring-2 ring-offset-1 ring-amber-400" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />Period</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-100 inline-block" />Follicular</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Ovulation</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-100 inline-block" />Luteal</span>
      </div>
    </div>
  );
}
