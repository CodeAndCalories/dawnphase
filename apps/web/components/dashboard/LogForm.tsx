"use client";

import { useState } from "react";
import { api } from "@/lib/api";

const SYMPTOMS = [
  "Cramps", "Bloating", "Headache", "Fatigue", "Breast tenderness",
  "Acne", "Back pain", "Nausea", "Mood swings", "Irritability",
  "Anxiety", "Brain fog", "Increased libido", "Decreased libido",
];

const FLOW_OPTIONS = ["None", "Spotting", "Light", "Medium", "Heavy"];
const MOOD_OPTIONS = ["Happy", "Calm", "Sad", "Anxious", "Irritable", "Energized", "Tired"];

export default function LogForm() {
  const [flow, setFlow] = useState("None");
  const [mood, setMood] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [energy, setEnergy] = useState(3);
  const [sleep, setSleep] = useState(7);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(arr: string[], setArr: (v: string[]) => void, val: string) {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/logs", { date: new Date().toISOString().split("T")[0], flow, mood, symptoms, energy, sleep, notes });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // handle error
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Flow</label>
        <div className="flex flex-wrap gap-2">
          {FLOW_OPTIONS.map((f) => (
            <button key={f} type="button" onClick={() => setFlow(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${flow === f ? "bg-rose-500 text-white border-rose-500" : "border-gray-200 text-gray-600 hover:border-rose-300"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Mood</label>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((m) => (
            <button key={m} type="button" onClick={() => toggle(mood, setMood, m)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${mood.includes(m) ? "bg-purple-500 text-white border-purple-500" : "border-gray-200 text-gray-600 hover:border-purple-300"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Symptoms</label>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((s) => (
            <button key={s} type="button" onClick={() => toggle(symptoms, setSymptoms, s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${symptoms.includes(s) ? "bg-pink-500 text-white border-pink-500" : "border-gray-200 text-gray-600 hover:border-pink-300"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Energy <span className="font-normal text-gray-500">({energy}/5)</span>
          </label>
          <input type="range" min={1} max={5} value={energy} onChange={(e) => setEnergy(+e.target.value)}
            className="w-full accent-purple-500" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Sleep <span className="font-normal text-gray-500">({sleep}h)</span>
          </label>
          <input type="range" min={3} max={12} value={sleep} onChange={(e) => setSleep(+e.target.value)}
            className="w-full accent-purple-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
          placeholder="Anything else worth noting today…"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none" />
      </div>

      <button type="submit" disabled={saving}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-sm">
        {saved ? "Saved!" : saving ? "Saving…" : "Save today's log"}
      </button>
    </form>
  );
}
