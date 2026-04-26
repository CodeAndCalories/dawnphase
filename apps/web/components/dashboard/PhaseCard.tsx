import { cn } from "@/lib/utils";

interface PhaseCardProps {
  phase: string;
  day: number;
  description: string;
  color: string;
  badge: string;
}

export default function PhaseCard({ phase, day, description, color, badge }: PhaseCardProps) {
  return (
    <div className={cn("rounded-2xl border p-6", color)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{phase} phase</h3>
        <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", badge)}>
          Day {day}
        </span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
