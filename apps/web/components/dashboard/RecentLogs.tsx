const mockLogs = [
  { date: "Apr 24", flow: "Light", mood: ["Calm"], symptoms: ["Fatigue"] },
  { date: "Apr 23", flow: "Medium", mood: ["Irritable"], symptoms: ["Cramps", "Bloating"] },
  { date: "Apr 22", flow: "Heavy", mood: ["Tired"], symptoms: ["Cramps"] },
];

export default function RecentLogs() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Recent logs</h3>
      <ul className="space-y-4">
        {mockLogs.map((log) => (
          <li key={log.date} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">{log.date}</span>
              <span className="text-xs text-gray-500">Flow: {log.flow}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {[...log.mood, ...log.symptoms].map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
