const symptoms = ["Cramps", "Bloating", "Headache", "Fatigue", "Mood swings", "Acne"];
const phases = ["Menstrual", "Follicular", "Ovulatory", "Luteal"];

// Mock intensity data: 0 = none, 1 = mild, 2 = moderate, 3 = high
const heatmap: number[][] = [
  [3, 1, 0, 2],
  [2, 1, 0, 3],
  [2, 0, 0, 1],
  [3, 1, 0, 2],
  [1, 0, 0, 3],
  [1, 2, 3, 1],
];

const intensityClass = ["bg-gray-100", "bg-purple-100", "bg-purple-300", "bg-purple-500"];
const intensityLabel = ["None", "Mild", "Moderate", "High"];

export default function SymptomsHeatmap() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Symptoms by phase</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left text-gray-400 font-medium pb-3 pr-4">Symptom</th>
              {phases.map((p) => (
                <th key={p} className="text-center text-gray-400 font-medium pb-3 px-2">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody className="space-y-1">
            {symptoms.map((sym, si) => (
              <tr key={sym}>
                <td className="text-gray-700 font-medium pr-4 py-1.5">{sym}</td>
                {heatmap[si].map((intensity, pi) => (
                  <td key={pi} className="text-center py-1.5 px-2">
                    <div
                      title={intensityLabel[intensity]}
                      className={`w-7 h-7 rounded-lg mx-auto ${intensityClass[intensity]}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-3">
        {intensityLabel.map((l, i) => (
          <span key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`w-3 h-3 rounded ${intensityClass[i]} inline-block`} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
