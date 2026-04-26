"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

// ── Types ────────────────────────────────────────────────────────────────────

interface UserMe {
  id: string;
  email: string;
  mode: "cycle" | "perimenopause";
}

interface DailyLogFromAPI {
  date: string;
  flow_intensity: "none" | "spotting" | "light" | "medium" | "heavy" | null;
  mood: string | null;           // JSON string e.g. '["😊"]'
  energy: number | null;
  cramps: number | null;
  bloating: number | null;
  headache: number | null;
  sleep_hours: number | null;
  notes: string | null;
  hot_flashes: number | null;
  night_sweats: number | null;
  brain_fog: number | null;
  custom_symptoms: string | null; // JSON string e.g. '["Acne","Anxiety"]'
}

// ── Constants ─────────────────────────────────────────────────────────────────

type FlowValue = "none" | "light" | "medium" | "heavy";

const FLOW_OPTIONS: { value: FlowValue; label: string }[] = [
  { value: "none",   label: "None"   },
  { value: "light",  label: "Light"  },
  { value: "medium", label: "Medium" },
  { value: "heavy",  label: "Heavy"  },
];

const MOOD_EMOJIS = ["😢", "😟", "😐", "🙂", "😊"];
const ENERGY_LABELS = ["Very low", "Low", "Moderate", "High", "Very high"];

interface SymptomDef {
  key: string;
  label: string;
  periPriority?: boolean;
}

const ALL_SYMPTOMS: SymptomDef[] = [
  { key: "hot_flashes",      label: "Hot flashes",       periPriority: true },
  { key: "night_sweats",     label: "Night sweats",      periPriority: true },
  { key: "cramps",           label: "Cramps"                                },
  { key: "bloating",         label: "Bloating"                              },
  { key: "headache",         label: "Headache"                              },
  { key: "Breast tenderness",label: "Breast tenderness"                     },
  { key: "Acne",             label: "Acne"                                  },
  { key: "brain_fog",        label: "Brain fog"                             },
  { key: "Anxiety",          label: "Anxiety"                               },
];

// These map directly to dedicated DB columns (0 or 1)
const BUILTIN_KEYS = new Set(["cramps","bloating","headache","brain_fog","hot_flashes","night_sweats"]);

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function displayDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

function safeParseJSON(s: string | null): string[] {
  if (!s) return [];
  try { return JSON.parse(s) as string[]; } catch { return []; }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LogPage() {
  const router = useRouter();
  const today = todayStr();

  // Meta state
  const [loading,     setLoading]    = useState(true);
  const [userMode,    setUserMode]   = useState<"cycle" | "perimenopause">("cycle");
  const [hasExisting, setHasExisting]= useState(false);
  const [saving,      setSaving]     = useState(false);
  const [saved,       setSaved]      = useState(false);
  const [error,       setError]      = useState<string | null>(null);

  // Form state
  const [flow,     setFlow]    = useState<FlowValue>("none");
  const [mood,     setMood]    = useState<string | null>(null);
  const [energy,   setEnergy]  = useState(3);
  const [sleep,    setSleep]   = useState(8);
  const [symptoms, setSymptoms]= useState<Set<string>>(new Set());
  const [notes,    setNotes]   = useState("");

  // ── Auth + hydrate ──────────────────────────────────────────────────────────
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("dp_token") : null;
    if (!token) { router.push("/login"); return; }

    Promise.all([
      api.get<{ user: UserMe }>("/auth/me"),
      api.get<{ log: DailyLogFromAPI }>(`/logs/${today}`).catch(() => null),
    ])
      .then(([meRes, logRes]) => {
        setUserMode(meRes.user.mode);

        if (logRes) {
          const l = logRes.log;
          setHasExisting(true);
          if (l.flow_intensity && l.flow_intensity !== "spotting") {
            setFlow(l.flow_intensity);
          }
          const moodArr = safeParseJSON(l.mood);
          if (moodArr[0]) setMood(moodArr[0]);
          if (l.energy)      setEnergy(l.energy);
          if (l.sleep_hours) setSleep(l.sleep_hours);
          if (l.notes)       setNotes(l.notes);

          const s = new Set<string>();
          if (l.cramps)       s.add("cramps");
          if (l.bloating)     s.add("bloating");
          if (l.headache)     s.add("headache");
          if (l.brain_fog)    s.add("brain_fog");
          if (l.hot_flashes)  s.add("hot_flashes");
          if (l.night_sweats) s.add("night_sweats");
          safeParseJSON(l.custom_symptoms).forEach(k => s.add(k));
          setSymptoms(s);
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router, today]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.post("/logs", {
        date:           today,
        flow_intensity: flow,
        mood:           mood ? [mood] : [],
        energy,
        sleep_hours:    sleep,
        cramps:         symptoms.has("cramps")       ? 1 : 0,
        bloating:       symptoms.has("bloating")     ? 1 : 0,
        headache:       symptoms.has("headache")     ? 1 : 0,
        brain_fog:      symptoms.has("brain_fog")    ? 1 : 0,
        hot_flashes:    symptoms.has("hot_flashes")  ? 1 : 0,
        night_sweats:   symptoms.has("night_sweats") ? 1 : 0,
        custom_symptoms: Array.from(symptoms).filter(k => !BUILTIN_KEYS.has(k)),
        notes: notes.trim(),
      });
      setSaved(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function toggleSymptom(key: string) {
    setSymptoms(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const orderedSymptoms =
    userMode === "perimenopause"
      ? [...ALL_SYMPTOMS.filter(s => s.periPriority), ...ALL_SYMPTOMS.filter(s => !s.periPriority)]
      : ALL_SYMPTOMS;

  // ── Render ───────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Success overlay */}
      {saved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center space-y-2">
            <div className="text-6xl">✓</div>
            <p className="text-xl font-semibold text-[#E8637A]">Logged!</p>
            <p className="text-sm text-[#8C6B5A]">Taking you back to your dashboard…</p>
          </div>
        </div>
      )}

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#C94B6D]">Daily log</h1>
        <p className="text-[#8C6B5A] text-sm mt-1">{displayDate(today)}</p>
      </div>

      {/* "Already logged" banner */}
      {hasExisting && (
        <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800 flex items-center gap-2">
          <span>📋</span>
          <span>You've already logged today — saving will update your entry.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Flow ── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Flow intensity
          </h2>
          <div className="flex flex-wrap gap-3">
            {FLOW_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFlow(opt.value)}
                className={`min-h-[44px] px-6 py-2 rounded-full font-medium text-sm border-2 transition-all ${
                  flow === opt.value
                    ? "bg-[#E8637A] border-[#E8637A] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#8C6B5A] hover:border-[#E8637A]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Mood ── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Mood
          </h2>
          <div className="flex gap-3">
            {MOOD_EMOJIS.map((emoji, i) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setMood(prev => (prev === emoji ? null : emoji))}
                title={ENERGY_LABELS[i]}
                className={`min-h-[48px] min-w-[48px] text-2xl rounded-full flex items-center justify-center transition-all ${
                  mood === emoji
                    ? "bg-[#E8637A]/15 ring-2 ring-[#E8637A] scale-110"
                    : "bg-white hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </section>

        {/* ── Energy ── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Energy
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setEnergy(n)}
                className={`min-h-[44px] min-w-[44px] rounded-full font-semibold text-sm border-2 transition-all ${
                  energy === n
                    ? "bg-[#E8637A] border-[#E8637A] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#8C6B5A] hover:border-[#E8637A]"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-sm text-[#8C6B5A] ml-1">
              {ENERGY_LABELS[energy - 1]}
            </span>
          </div>
        </section>

        {/* ── Sleep ── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Sleep hours
          </h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSleep(s => Math.max(4, parseFloat((s - 0.5).toFixed(1))))}
              className="min-h-[44px] min-w-[44px] rounded-full border-2 border-gray-200 bg-white text-xl font-bold text-[#8C6B5A] hover:border-[#E8637A] transition-colors flex items-center justify-center"
            >
              −
            </button>
            <span className="text-3xl font-semibold text-[#2D1B1E] min-w-[72px] text-center tabular-nums">
              {sleep % 1 === 0 ? sleep : sleep.toFixed(1)}h
            </span>
            <button
              type="button"
              onClick={() => setSleep(s => Math.min(12, parseFloat((s + 0.5).toFixed(1))))}
              className="min-h-[44px] min-w-[44px] rounded-full border-2 border-gray-200 bg-white text-xl font-bold text-[#8C6B5A] hover:border-[#E8637A] transition-colors flex items-center justify-center"
            >
              +
            </button>
          </div>
        </section>

        {/* ── Symptoms ── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Symptoms
          </h2>
          <div className="flex flex-wrap gap-3">
            {orderedSymptoms.map(s => (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSymptom(s.key)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm border-2 transition-all ${
                  symptoms.has(s.key)
                    ? "bg-[#E8637A] border-[#E8637A] text-white font-semibold shadow-sm"
                    : "border-gray-200 bg-white text-[#8C6B5A] font-medium hover:border-[#E8637A]"
                } ${s.periPriority && userMode === "perimenopause" ? "ring-1 ring-offset-1 ring-[#E8637A]/30" : ""}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Notes ── */}
        <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
            Notes <span className="font-normal normal-case text-[#8C6B5A]">(optional)</span>
          </h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Anything else worth noting today…"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#2D1B1E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8637A]/40 resize-none"
          />
        </section>

        {error && (
          <p className="text-sm text-red-600 px-1">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving || saved}
          className="w-full min-h-[52px] bg-[#E8637A] hover:bg-[#C94B6D] text-white font-semibold text-base rounded-2xl transition-colors disabled:opacity-60 shadow-sm"
        >
          {saving ? "Saving…" : "Save today's log"}
        </button>
      </form>
    </div>
  );
}
