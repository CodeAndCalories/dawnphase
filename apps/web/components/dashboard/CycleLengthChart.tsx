"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { cycle: "Oct", length: 27 },
  { cycle: "Nov", length: 29 },
  { cycle: "Dec", length: 28 },
  { cycle: "Jan", length: 30 },
  { cycle: "Feb", length: 27 },
  { cycle: "Mar", length: 28 },
];

export default function CycleLengthChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-6">Cycle length over time</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="cycle" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis domain={[20, 35]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }}
            formatter={(v: number) => [`${v} days`, "Cycle length"]}
          />
          <Line type="monotone" dataKey="length" stroke="#a855f7" strokeWidth={2.5} dot={{ fill: "#a855f7", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
