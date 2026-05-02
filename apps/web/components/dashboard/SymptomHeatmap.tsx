"use client";

import { useRef, useState } from "react";

// Mirrors the DailyLog shape from the insights page
interface DailyLog {
  date: string;
  energy: number | null;
  mood: string | null;
  cramps: number | null;
  bloating: number | null;
  headache: number | null;
  brain_fog: number | null;
  hot_flashes: number | null;
  night_sweats: number | null;
  custom_symptoms: string | null;
}

interface DayCell {
  date: Date;
  dateStr: string;
  isToday: boolean;
  isFuture: boolean;
  count: number;
  hasLog: boolean;
  log: DailyLog | null;
}

// ── Color scale ───────────────────────────────────────────────────────────────

const INTENSITY_COLORS = ["#F0EAE7", "#F4C5C5", "#E8637A", "#C94B6D"] as const;

function getColor(count: number, hasLog: boolean, isFuture: boolean): string {
  if (isFuture) return "#F5F5F5";
  if (!hasLog || count === 0) return INTENSITY_COLORS[0];
  if (count <= 2) return INTENSITY_COLORS[1];
  if (count <= 4) return INTENSITY_COLORS[2];
  return INTENSITY_COLORS[3];
}

// ── Symptom helpers ───────────────────────────────────────────────────────────

function countSymptoms(log: DailyLog): number {
  let n = 0;
  if (log.cramps       && log.cramps       > 0) n++;
  if (log.bloating     && log.bloating     > 0) n++;
  if (log.headache     && log.headache     > 0) n++;
  if (log.brain_fog    && log.brain_fog    > 0) n++;
  if (log.hot_flashes  && log.hot_flashes  > 0) n++;
  if (log.night_sweats && log.night_sweats > 0) n++;
  if (log.custom_symptoms) {
    try { n += (JSON.parse(log.custom_symptoms) as string[]).length; } catch {}
  }
  return n;
}

function getSymptomNames(log: DailyLog): string[] {
  const names: string[] = [];
  if (log.cramps       && log.cramps       > 0) names.push("Cramps");
  if (log.bloating     && log.bloating     > 0) names.push("Bloating");
  if (log.headache     && log.headache     > 0) names.push("Headache");
  if (log.brain_fog    && log.brain_fog    > 0) names.push("Brain fog");
  if (log.hot_flashes  && log.hot_flashes  > 0) names.push("Hot flashes");
  if (log.night_sweats && log.night_sweats > 0) names.push("Night sweats");
  if (log.custom_symptoms) {
    try { names.push(...(JSON.parse(log.custom_symptoms) as string[])); } catch {}
  }
  return names;
}

function getMoodEmoji(moodJson: string | null): string {
  if (!moodJson) return "";
  try { return (JSON.parse(moodJson) as string[])[0] ?? ""; } catch { return ""; }
}

// ── Date helpers ──────────────────────────────────────────────────────────────

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatLong(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

function formatShort(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Grid builder ─────────────────────────────────────────────────────────────
// 12 rows (weeks, top=oldest), 7 cols (Mon–Sun)

function buildGrid(logs: DailyLog[]): { weeks: DayCell[][]; todayStr: string } {
  const logMap = new Map<string, DailyLog>();
  for (const l of logs) logMap.set(l.date, l);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(now);

  // Monday of the current week
  const dow          = now.getDay();               // 0=Sun
  const daysToMon    = dow === 0 ? 6 : dow - 1;
  const curMonday    = new Date(now);
  curMonday.setDate(now.getDate() - daysToMon);

  // Monday of 11 weeks ago
  const startMonday = new Date(curMonday);
  startMonday.setDate(curMonday.getDate() - 11 * 7);

  const weeks: DayCell[][] = [];
  for (let w = 0; w < 12; w++) {
    const week: DayCell[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startMonday);
      date.setDate(startMonday.getDate() + w * 7 + d);
      const dateStr = toDateStr(date);
      const log     = logMap.get(dateStr) ?? null;
      week.push({
        date,
        dateStr,
        isToday:  dateStr === todayStr,
        isFuture: date > now,
        count:    log ? countSymptoms(log) : 0,
        hasLog:   log !== null,
        log,
      });
    }
    weeks.push(week);
  }
  return { weeks, todayStr };
}

// ── Component ─────────────────────────────────────────────────────────────────

const DAY_LABELS_SHORT = ["M", "T", "W", "T", "F", "S", "S"];

export default function SymptomHeatmap({ logs }: { logs: DailyLog[] }) {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const [selected,    setSelected]    = useState<DayCell | null>(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [sharing,     setSharing]     = useState(false);

  const { weeks } = buildGrid(logs);

  // ── Share handler ────────────────────────────────────────────────────────
  async function handleShare() {
    if (!heatmapRef.current || sharing) return;
    setSharing(true);
    try {
      const { default: html2canvas } = await import(
        /* webpackIgnore: true */ "html2canvas" as never
      ) as { default: (el: HTMLElement, opts?: object) => Promise<HTMLCanvasElement> };
      const canvas = await html2canvas(heatmapRef.current, { scale: 2, useCORS: true });
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href     = url;
        a.download = "my-tracking-streak.png";
        a.click();
        URL.revokeObjectURL(url);
      });
    } catch {
      // html2canvas not available — copy insights link instead
      try {
        await navigator.clipboard.writeText(window.location.origin + "/insights");
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      } catch {}
    }
    setSharing(false);
  }

  return (
    <>
      {/* ── Day-detail popup ─────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-sm space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#2D1B1E]">{formatLong(selected.date)}</p>
              <button
                onClick={() => setSelected(null)}
                className="text-xl leading-none text-[#8C6B5A] hover:text-[#2D1B1E]"
                aria-label="Close"
              >×</button>
            </div>

            {selected.isFuture ? (
              <p className="text-sm text-[#8C6B5A]">Future date.</p>
            ) : selected.hasLog ? (
              <div className="space-y-2">
                {getSymptomNames(selected.log!).length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {getSymptomNames(selected.log!).map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#FFF0F3] text-[#C94B6D] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#8C6B5A]">Logged — no symptoms recorded.</p>
                )}
                <div className="flex gap-4 text-xs text-[#8C6B5A]">
                  {selected.log?.energy != null && (
                    <span>Energy: <strong className="text-[#2D1B1E]">{selected.log.energy}/5</strong></span>
                  )}
                  {selected.log?.mood && getMoodEmoji(selected.log.mood) && (
                    <span>Mood: {getMoodEmoji(selected.log.mood)}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-[#8C6B5A]">No entry for this day.</p>
                <a
                  href="/log"
                  className="inline-block text-sm font-semibold text-[#E8637A] hover:underline"
                >
                  Log today →
                </a>
              </div>
            )}

            <p className="text-xs text-[#8C6B5A]/60 pt-1 border-t border-gray-100">
              {selected.count} symptom{selected.count !== 1 ? "s" : ""} logged
            </p>
          </div>
        </div>
      )}

      {/* ── Main card ────────────────────────────────────────────────────── */}
      <div className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
              Your logging history
            </h2>
            <p className="text-xs text-[#8C6B5A] mt-1">
              12 weeks of symptom tracking at a glance
            </p>
          </div>
          <button
            onClick={handleShare}
            disabled={sharing}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #E8637A, #C94B6D)" }}
          >
            {sharing ? "…" : shareCopied ? "✓ Link copied" : "📊 Share"}
          </button>
        </div>

        {/* Heatmap grid */}
        <div ref={heatmapRef} className="overflow-x-auto">
          <div style={{ minWidth: 220 }}>
            {/* Day-of-week column headers */}
            <div className="flex mb-1">
              <div className="shrink-0" style={{ width: 40 }} />
              {DAY_LABELS_SHORT.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 text-center text-[10px] font-medium text-[#8C6B5A]"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Week rows */}
            <div className="space-y-0.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex items-center gap-0.5">
                  {/* Week label — shown every 2 weeks */}
                  <div
                    className="shrink-0 text-right pr-2 text-[10px] text-[#8C6B5A] leading-none"
                    style={{ width: 40 }}
                  >
                    {wi % 2 === 0 ? formatShort(week[0].date) : ""}
                  </div>

                  {/* Day cells */}
                  {week.map((day, di) => (
                    <button
                      key={di}
                      type="button"
                      onClick={() => !day.isFuture && setSelected(day)}
                      title={
                        day.isFuture
                          ? formatLong(day.date)
                          : day.hasLog
                          ? `${formatLong(day.date)} — ${day.count} symptom${day.count !== 1 ? "s" : ""} logged`
                          : `${formatLong(day.date)} — no entry`
                      }
                      aria-label={`${formatLong(day.date)}${day.hasLog ? `, ${day.count} symptoms` : ""}`}
                      className={`flex-1 rounded-sm transition-opacity ${
                        day.isFuture ? "cursor-default" : "cursor-pointer hover:opacity-75"
                      } ${
                        day.isToday
                          ? "ring-2 ring-[#C94B6D] ring-offset-[1px]"
                          : ""
                      }`}
                      style={{
                        aspectRatio: "1",
                        backgroundColor: getColor(day.count, day.hasLog, day.isFuture),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[10px] text-[#8C6B5A]">Less</span>
          <div className="flex items-center gap-1">
            {INTENSITY_COLORS.map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: color }}
                title={
                  i === 0 ? "No symptoms"
                  : i === 1 ? "1–2 symptoms"
                  : i === 2 ? "3–4 symptoms"
                  : "5+ symptoms"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-[#8C6B5A]">More</span>
          <span className="text-[10px] text-[#8C6B5A]/60 ml-1">· Tap any day to see details</span>
        </div>
      </div>
    </>
  );
}
