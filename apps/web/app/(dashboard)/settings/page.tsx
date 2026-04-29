"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription, type User } from "@/lib/auth";
import { api } from "@/lib/api";

interface Reminder {
  active: number;
  reminder_days_before: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

function trialDaysLeft(trialEndsAt: string): number {
  return Math.max(
    0,
    Math.ceil(
      (new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );
}

function subLabel(user: User): string {
  if (user.subscription_status === "active")   return "Active";
  if (user.subscription_status === "trialing") {
    const days = user.trial_ends_at ? trialDaysLeft(user.trial_ends_at) : 0;
    return days > 0 ? `Trial — ${days} day${days === 1 ? "" : "s"} left` : "Trial ended";
  }
  if (user.subscription_status === "canceled")  return "Canceled";
  if (user.subscription_status === "past_due")  return "Payment past due";
  return "Incomplete";
}

const SUB_BADGE: Record<string, string> = {
  active:     "bg-green-100 text-green-800",
  trialing:   "bg-blue-100 text-blue-800",
  canceled:   "bg-gray-100 text-gray-600",
  past_due:   "bg-red-100 text-red-700",
  incomplete: "bg-yellow-100 text-yellow-800",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  // ── Auth + subscription gate ────────────────────────────────────────────────
  const { user: authUser, loading: authLoading, redirecting } = useRequireSubscription();

  // Local copy of user so handleModeChange can update it without re-running
  // the hook (which only fetches once on mount).
  const [user,        setUser]       = useState<User | null>(null);
  const [reminder,    setReminder]   = useState<Reminder>({ active: 1, reminder_days_before: 3 });
  const [dataLoading, setDataLoading]= useState(true);

  // Mode save
  const [modeSaving, setModeSaving] = useState(false);
  const [modeSaved,  setModeSaved]  = useState(false);

  // Birth date
  const [birthDate,    setBirthDate]    = useState("");
  const [birthSaving,  setBirthSaving]  = useState(false);
  const [birthSaved,   setBirthSaved]   = useState(false);
  const [birthError,   setBirthError]   = useState<string | null>(null);

  // Portal
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError,   setPortalError]   = useState<string | null>(null);

  // Reminders (local form state, separate from remote)
  const [remEnabled,    setRemEnabled]    = useState(true);
  const [remDays,       setRemDays]       = useState(3);
  const [remSaving,     setRemSaving]     = useState(false);
  const [remSaved,      setRemSaved]      = useState(false);
  const [remError,      setRemError]      = useState<string | null>(null);

  // Export
  const [exporting,    setExporting]    = useState(false);
  const [exportError,  setExportError]  = useState<string | null>(null);

  // Delete
  const [showDelete,   setShowDelete]   = useState(false);
  const [deleting,     setDeleting]     = useState(false);
  const [deleteError,  setDeleteError]  = useState<string | null>(null);

  // ── Load reminders once auth resolves ─────────────────────────────────────
  useEffect(() => {
    if (!authUser) return;
    setUser(authUser);
    setBirthDate(authUser.birth_date ?? "");
    api.get<{ reminder: Reminder }>("/reminders")
      .then((remRes) => {
        setReminder(remRes.reminder);
        setRemEnabled(remRes.reminder.active === 1);
        setRemDays(remRes.reminder.reminder_days_before);
      })
      .catch(() => {}) // no reminders yet — defaults are fine
      .finally(() => setDataLoading(false));
  }, [authUser]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  async function handleBirthSave() {
    setBirthSaving(true);
    setBirthSaved(false);
    setBirthError(null);
    try {
      const res = await api.patch<{ user: User }>("/auth/me", {
        birth_date: birthDate || null,
      });
      setUser(res.user);
      setBirthSaved(true);
      setTimeout(() => setBirthSaved(false), 2000);
    } catch (err) {
      setBirthError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setBirthSaving(false);
    }
  }

  async function handleModeChange(mode: "cycle" | "perimenopause") {
    if (!user || user.mode === mode) return;
    setModeSaving(true);
    setModeSaved(false);
    try {
      const res = await api.patch<{ user: User }>("/auth/me", { mode });
      setUser(res.user);
      setModeSaved(true);
      setTimeout(() => setModeSaved(false), 2000);
    } finally {
      setModeSaving(false);
    }
  }

  async function handlePortal() {
    setPortalLoading(true);
    setPortalError(null);
    try {
      const res = await api.post<{ url: string }>("/stripe/portal", {});
      window.location.href = res.url;
    } catch (err) {
      setPortalError(
        err instanceof Error ? err.message : "Could not open billing portal"
      );
      setPortalLoading(false);
    }
  }

  async function handleRemSave() {
    setRemSaving(true);
    setRemSaved(false);
    setRemError(null);
    try {
      const res = await api.patch<{ reminder: Reminder }>("/reminders", {
        active: remEnabled,
        reminder_days_before: remDays,
      });
      setReminder(res.reminder);
      setRemSaved(true);
      setTimeout(() => setRemSaved(false), 2000);
    } catch (err) {
      setRemError(err instanceof Error ? err.message : "Could not save reminders");
    } finally {
      setRemSaving(false);
    }
  }

  async function handleExportCsv() {
    setExporting(true);
    setExportError(null);
    try {
      const token = localStorage.getItem("dp_token");
      const res = await fetch(`${API_BASE}/export/csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "dawnphase-export.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteError(null);
    try {
      await api.delete("/auth/me");
      localStorage.removeItem("dp_token");
      window.location.href = "/login";
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Could not delete account");
      setDeleting(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (authLoading || dataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-[#E8637A]/30 border-t-[#E8637A] rounded-full animate-spin" />
        {redirecting && (
          <p className="text-sm text-[#8C6B5A]">Setting up your account…</p>
        )}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-5 pb-12">
      {/* ── Delete-account modal ─────────────────────────────────────────── */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <h2 className="text-base font-semibold text-[#2D1B1E]">
              Delete account?
            </h2>
            <p className="text-sm text-[#8C6B5A] leading-relaxed">
              This permanently deletes all your cycle data, logs, and account
              info. This cannot be undone.
            </p>
            {deleteError && (
              <p className="text-sm text-red-600">{deleteError}</p>
            )}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => { setShowDelete(false); setDeleteError(null); }}
                disabled={deleting}
                className="flex-1 min-h-[44px] rounded-xl border-2 border-gray-200 text-sm font-medium text-[#8C6B5A] hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 min-h-[44px] rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-[#C94B6D]">Settings</h1>
        <p className="text-sm text-[#8C6B5A] mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* ── ACCOUNT ──────────────────────────────────────────────────────── */}
      <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-5">
        <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
          Account
        </h2>

        {/* Email */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#8C6B5A] uppercase tracking-wide">
            Email
          </p>
          <p className="text-sm text-[#2D1B1E] bg-white px-4 py-2.5 rounded-xl border border-gray-200">
            {user.email}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#8C6B5A] uppercase tracking-wide">
            Tracking mode
          </p>
          <div className="flex gap-3">
            {(["cycle", "perimenopause"] as const).map(m => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                disabled={modeSaving}
                className={`flex-1 min-h-[44px] rounded-full text-sm font-medium border-2 transition-all disabled:opacity-60 ${
                  user.mode === m
                    ? "bg-[#E8637A] border-[#E8637A] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#8C6B5A] hover:border-[#E8637A]"
                }`}
              >
                {m === "cycle" ? "Cycle tracking" : "Perimenopause mode"}
              </button>
            ))}
          </div>
          {modeSaving && (
            <p className="text-xs text-[#8C6B5A]">Saving…</p>
          )}
          {modeSaved && (
            <p className="text-xs text-green-700">✓ Mode updated</p>
          )}
        </div>

        {/* Birth date — optional, powers Cosmic view */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#8C6B5A] uppercase tracking-wide">
            Date of birth{" "}
            <span className="font-normal normal-case text-[#8C6B5A]/70">
              (optional — unlocks ✨ Cosmic view)
            </span>
          </p>
          <div className="flex gap-3 items-center flex-wrap">
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="min-h-[44px] px-4 py-2 rounded-xl border-2 border-gray-200 bg-white text-sm text-[#2D1B1E] focus:outline-none focus:border-[#E8637A] transition-colors"
            />
            <button
              onClick={handleBirthSave}
              disabled={birthSaving}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {birthSaving ? "Saving…" : birthSaved ? "✓ Saved" : "Save"}
            </button>
          </div>
          {birthError && <p className="text-xs text-red-600">{birthError}</p>}
        </div>
      </section>

      {/* ── SUBSCRIPTION ─────────────────────────────────────────────────── */}
      <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-5">
        <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
          Subscription
        </h2>

        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[#2D1B1E]">Dawn Phase Pro</p>
            {user.subscription_status === "trialing" && user.trial_ends_at && (
              <p className="text-xs text-[#8C6B5A] mt-0.5">
                Trial ends{" "}
                {new Date(user.trial_ends_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </p>
            )}
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${SUB_BADGE[user.subscription_status] ?? "bg-gray-100 text-gray-600"}`}>
            {subLabel(user)}
          </span>
        </div>

        {portalError && (
          <p className="text-sm text-red-600">{portalError}</p>
        )}

        <button
          onClick={handlePortal}
          disabled={portalLoading}
          className="min-h-[44px] px-5 py-2.5 rounded-xl border-2 border-[#E8637A] text-[#E8637A] text-sm font-semibold hover:bg-[#E8637A] hover:text-white transition-all disabled:opacity-60"
        >
          {portalLoading ? "Opening…" : "Manage subscription"}
        </button>
      </section>

      {/* ── REMINDERS ────────────────────────────────────────────────────── */}
      <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-5">
        <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
          Reminders
        </h2>

        {/* Enable toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={remEnabled}
            onClick={() => setRemEnabled(v => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              remEnabled ? "bg-[#E8637A]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                remEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-[#2D1B1E]">
            Email me before my period
          </span>
        </label>

        {/* Days before */}
        <div
          className={`space-y-2 transition-opacity ${remEnabled ? "opacity-100" : "opacity-40 pointer-events-none"}`}
        >
          <p className="text-xs font-medium text-[#8C6B5A] uppercase tracking-wide">
            How many days before?
          </p>
          <div className="flex gap-3">
            {[3, 5, 7].map(d => (
              <button
                key={d}
                onClick={() => setRemDays(d)}
                className={`min-h-[44px] w-16 rounded-full text-sm font-semibold border-2 transition-all ${
                  remDays === d
                    ? "bg-[#E8637A] border-[#E8637A] text-white shadow-sm"
                    : "border-gray-200 bg-white text-[#8C6B5A] hover:border-[#E8637A]"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {remError && <p className="text-sm text-red-600">{remError}</p>}

        <button
          onClick={handleRemSave}
          disabled={remSaving}
          className="min-h-[44px] px-6 py-2.5 bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {remSaving ? "Saving…" : remSaved ? "✓ Saved" : "Save reminders"}
        </button>
      </section>

      {/* ── DATA ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#FDF6F0] rounded-2xl p-6 space-y-4">
        <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
          Data
        </h2>

        {exportError && (
          <p className="text-sm text-red-600">{exportError}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportCsv}
            disabled={exporting}
            className="min-h-[44px] px-5 py-2.5 rounded-xl border-2 border-[#E8637A] text-[#E8637A] text-sm font-semibold hover:bg-[#E8637A] hover:text-white transition-all disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Export my data (CSV)"}
          </button>

          <a
            href="/report"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-[44px] px-5 py-2.5 rounded-xl border-2 border-[#E8637A] text-[#E8637A] text-sm font-semibold hover:bg-[#E8637A] hover:text-white transition-all"
          >
            Doctor visit report ↗
          </a>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={() => setShowDelete(true)}
            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
          >
            Delete my account
          </button>
          <p className="text-xs text-[#8C6B5A] mt-1">
            Permanently removes all your data. This cannot be undone.
          </p>
        </div>
      </section>
    </div>
  );
}
