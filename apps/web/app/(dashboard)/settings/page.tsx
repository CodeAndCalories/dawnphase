"use client";

import { useEffect, useState } from "react";
import { useRequireSubscription, type User } from "@/lib/auth";
import { api } from "@/lib/api";

interface Reminder {
  active: number;
  reminder_days_before: number;
  weekly_digest_enabled: number;
}

interface ShareStatus {
  token: string;
  url: string;
  view_count: number;
  created_at: string;
}

interface ReferralStats {
  total_referrals: number;
  converted: number;
  pending: number;
  code: string | null;
  url: string | null;
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
  const [reminder,    setReminder]   = useState<Reminder>({ active: 1, reminder_days_before: 3, weekly_digest_enabled: 1 });
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

  // Cancellation feedback
  const [showCancelFeedback,    setShowCancelFeedback]    = useState(false);
  const [cancelValue,           setCancelValue]           = useState("");
  const [cancelNotes,           setCancelNotes]           = useState("");
  const [cancelSubmitting,      setCancelSubmitting]      = useState(false);

  // Reminders (local form state, separate from remote)
  const [remEnabled,    setRemEnabled]    = useState(true);
  const [remDays,       setRemDays]       = useState(3);
  const [weeklyDigest,  setWeeklyDigest]  = useState(true);
  const [remSaving,     setRemSaving]     = useState(false);
  const [remSaved,      setRemSaved]      = useState(false);
  const [remError,      setRemError]      = useState<string | null>(null);

  // Referral
  const [referralStats,     setReferralStats]      = useState<ReferralStats | null>(null);
  const [referralGenerating, setReferralGenerating] = useState(false);
  const [referralCopied,    setReferralCopied]     = useState(false);

  // Partner share
  const [shareData,         setShareData]         = useState<ShareStatus | null>(null);
  const [shareCreating,     setShareCreating]     = useState(false);
  const [shareRevoking,     setShareRevoking]     = useState(false);
  const [shareCopied,       setShareCopied]       = useState(false);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
  const [shareError,        setShareError]        = useState<string | null>(null);

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
    // Show cancellation feedback if subscription just became canceled
    if (
      authUser.subscription_status === "canceled" &&
      typeof window !== "undefined" &&
      !localStorage.getItem("dp_cancel_feedback_done")
    ) {
      setShowCancelFeedback(true);
    }
    Promise.all([
      api.get<{ reminder: Reminder }>("/reminders")
        .then((remRes) => {
          setReminder(remRes.reminder);
          setRemEnabled(remRes.reminder.active === 1);
          setRemDays(remRes.reminder.reminder_days_before);
          setWeeklyDigest(remRes.reminder.weekly_digest_enabled !== 0);
        })
        .catch(() => {}),
      api.get<{ share: ShareStatus | null }>("/share/status")
        .then((res) => setShareData(res.share))
        .catch(() => {}),
      api.get<ReferralStats>("/referral/stats")
        .then((res) => setReferralStats(res))
        .catch(() => {}),
    ]).finally(() => setDataLoading(false));
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
        weekly_digest_enabled: weeklyDigest,
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

  async function handleCancelFeedbackSubmit() {
    if (!cancelValue || cancelSubmitting) return;
    setCancelSubmitting(true);
    try {
      await api.post("/feedback", {
        type: "cancellation",
        value: cancelValue,
        notes: cancelNotes.trim() || undefined,
      });
    } catch {
      // Best-effort
    } finally {
      if (typeof window !== "undefined") localStorage.setItem("dp_cancel_feedback_done", "1");
      setShowCancelFeedback(false);
      setCancelSubmitting(false);
    }
  }

  async function handleReferralGenerate() {
    setReferralGenerating(true);
    try {
      const res = await api.post<{ code: string; url: string }>("/referral/generate", {});
      setReferralStats((prev) => ({
        total_referrals: prev?.total_referrals ?? 0,
        converted:       prev?.converted       ?? 0,
        pending:         prev?.pending         ?? 0,
        code: res.code,
        url:  res.url,
      }));
    } catch {
      // silent — user stays on the "get link" state
    } finally {
      setReferralGenerating(false);
    }
  }

  async function handleReferralCopy() {
    const url = referralStats?.url;
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    } catch {}
  }

  async function handleShareCreate() {
    setShareCreating(true);
    setShareError(null);
    try {
      const res = await api.post<{ url: string; token: string; view_count: number }>("/share/create", {});
      setShareData({ url: res.url, token: res.token, view_count: res.view_count, created_at: new Date().toISOString() });
    } catch {
      setShareError("Could not create share link. Try again.");
    } finally {
      setShareCreating(false);
    }
  }

  async function handleShareRevoke() {
    setShareRevoking(true);
    setShareError(null);
    try {
      await api.delete("/share/revoke");
      setShareData(null);
      setShowRevokeConfirm(false);
    } catch {
      setShareError("Could not revoke link. Try again.");
    } finally {
      setShareRevoking(false);
    }
  }

  async function handleShareCopy() {
    if (!shareData) return;
    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // Fallback: select text manually
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
          <p className="text-sm text-[#3d2855]">Setting up your account…</p>
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
            <h2 className="text-base font-semibold text-[#1E0F30]">
              Delete account?
            </h2>
            <p className="text-sm text-[#3d2855] leading-relaxed">
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
                className="flex-1 min-h-[44px] rounded-xl border-2 border-gray-200 text-sm font-medium text-[#3d2855] hover:border-gray-400 transition-colors"
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

      {/* ── Cancellation feedback modal ──────────────────────────────── */}
      {showCancelFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-5">
            <div className="text-center space-y-1">
              <p className="text-2xl">💙</p>
              <h2 className="text-base font-bold text-[#1E0F30]">We&apos;re sorry to see you go</h2>
              <p className="text-sm text-[#3d2855]">What could we have done better?</p>
            </div>
            <div className="space-y-2">
              {[
                "Missing features I need",
                "Too expensive",
                "Didn't use it enough",
                "Found a better option",
                "Technical issues",
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCancelValue(option)}
                  className={`w-full min-h-[44px] px-4 py-3 text-sm text-left rounded-xl border-2 transition-all ${
                    cancelValue === option
                      ? "border-[#E8637A] bg-[#FFF0F3] text-[#C94B6D] font-medium"
                      : "border-gray-200 bg-white text-[#1E0F30] hover:border-[#E8637A]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#3d2855] uppercase tracking-wide">
                Tell us more <span className="font-normal normal-case">(optional)</span>
              </p>
              <textarea
                value={cancelNotes}
                onChange={e => setCancelNotes(e.target.value)}
                rows={3}
                maxLength={2000}
                placeholder="Any details help us improve…"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm text-[#1E0F30] resize-none focus:outline-none focus:border-[#E8637A] transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") localStorage.setItem("dp_cancel_feedback_done", "1");
                  setShowCancelFeedback(false);
                }}
                className="flex-1 min-h-[44px] rounded-xl border-2 border-gray-200 text-sm font-medium text-[#3d2855] hover:border-gray-400 transition-colors"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleCancelFeedbackSubmit}
                disabled={!cancelValue || cancelSubmitting}
                className="flex-1 min-h-[44px] rounded-xl bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {cancelSubmitting ? "Sending…" : "Send feedback"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-[#C94B6D]">Settings</h1>
        <p className="text-sm text-[#3d2855] mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* ── ACCOUNT ──────────────────────────────────────────────────────── */}
      <section className="bg-white border border-[#E6D7F3] rounded-2xl p-6 space-y-5">
        <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
          Account
        </h2>

        {/* Email */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#3d2855] uppercase tracking-wide">
            Email
          </p>
          <p className="text-sm text-[#1E0F30] bg-white px-4 py-2.5 rounded-xl border border-gray-200">
            {user.email}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#3d2855] uppercase tracking-wide">
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
                    : "border-gray-200 bg-white text-[#3d2855] hover:border-[#E8637A]"
                }`}
              >
                {m === "cycle" ? "Cycle tracking" : "Perimenopause mode"}
              </button>
            ))}
          </div>
          {modeSaving && (
            <p className="text-xs text-[#3d2855]">Saving…</p>
          )}
          {modeSaved && (
            <p className="text-xs text-green-700">✓ Mode updated</p>
          )}
        </div>

        {/* Birth date — optional, powers Cosmic view */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[#3d2855] uppercase tracking-wide">
            Date of birth{" "}
            <span className="font-normal normal-case text-[#3d2855]/70">
              (optional — unlocks ✨ Cosmic view)
            </span>
          </p>
          <div className="flex gap-3 items-center flex-wrap">
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="min-h-[44px] px-4 py-2 rounded-xl border-2 border-gray-200 bg-white text-sm text-[#1E0F30] focus:outline-none focus:border-[#E8637A] transition-colors"
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
      <section className="bg-white border border-[#E6D7F3] rounded-2xl p-6 space-y-5">
        <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest">
          Subscription
        </h2>

        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-[#1E0F30]">Dawn Phase Pro</p>
            {user.subscription_status === "trialing" && user.trial_ends_at && (
              <p className="text-xs text-[#3d2855] mt-0.5">
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
      <section className="bg-white border border-[#E6D7F3] rounded-2xl p-6 space-y-5">
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
          <span className="text-sm font-medium text-[#1E0F30]">
            Email me before my period
          </span>
        </label>

        {/* Days before */}
        <div
          className={`space-y-2 transition-opacity ${remEnabled ? "opacity-100" : "opacity-40 pointer-events-none"}`}
        >
          <p className="text-xs font-medium text-[#3d2855] uppercase tracking-wide">
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
                    : "border-gray-200 bg-white text-[#3d2855] hover:border-[#E8637A]"
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        {/* Weekly digest toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={weeklyDigest}
            onClick={() => setWeeklyDigest(v => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              weeklyDigest ? "bg-[#E8637A]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                weeklyDigest ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <div>
            <span className="text-sm font-medium text-[#1E0F30]">
              Weekly cycle digest
            </span>
            <p className="text-xs text-[#3d2855] mt-0.5">
              Monday morning: phase, wellness tips, streak & top symptoms
            </p>
          </div>
        </label>

        {remError && <p className="text-sm text-red-600">{remError}</p>}

        <button
          onClick={handleRemSave}
          disabled={remSaving}
          className="min-h-[44px] px-6 py-2.5 bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {remSaving ? "Saving…" : remSaved ? "✓ Saved" : "Save reminders"}
        </button>
      </section>

      {/* ── REFER A FRIEND ───────────────────────────────────────────────── */}
      <section className="bg-white border border-[#E6D7F3] rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest mb-1">
            Refer a friend
          </h2>
          <p className="text-sm font-semibold text-[#1E0F30]">Give a month, get a month</p>
          <p className="text-sm text-[#3d2855] leading-relaxed mt-1">
            Share your referral link. When a friend starts a paid subscription, you both get a free month added to your account.
          </p>
          <p className="text-xs text-[#3d2855]/70 mt-1 italic">
            Rewards applied manually while we build automation — we&apos;ll email you!
          </p>
        </div>

        {!referralStats?.code ? (
          <button
            onClick={handleReferralGenerate}
            disabled={referralGenerating}
            className="min-h-[44px] px-5 py-2.5 bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
          >
            {referralGenerating ? "Generating…" : "Get my referral link"}
          </button>
        ) : (
          <div className="space-y-3">
            {/* URL + copy */}
            <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2 flex-wrap">
              <p className="text-xs text-[#1E0F30] font-mono flex-1 break-all">
                {referralStats.url}
              </p>
              <button
                onClick={handleReferralCopy}
                className="shrink-0 min-h-[36px] px-3 rounded-lg bg-[#E8637A]/10 text-[#C94B6D] text-xs font-semibold hover:bg-[#E8637A]/20 transition-colors"
              >
                {referralCopied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            {/* Stats */}
            <p className="text-xs text-[#3d2855]">
              <span className="font-semibold text-[#1E0F30]">{referralStats.total_referrals}</span>{" "}
              friend{referralStats.total_referrals !== 1 ? "s" : ""} referred
              {referralStats.converted > 0 && (
                <> ·{" "}
                  <span className="font-semibold text-[#1E0F30]">{referralStats.converted}</span>{" "}
                  converted
                </>
              )}
            </p>

            {/* Share buttons */}
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `I've been using Dawn Phase for cycle tracking — it's privacy-first and actually built for irregular cycles. Try it free: ${referralStats.url}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[36px] px-4 rounded-xl bg-green-50 text-green-700 border border-green-200 text-xs font-semibold hover:bg-green-100 transition-colors"
              >
                📱 Share via WhatsApp
              </a>
              <button
                onClick={handleReferralCopy}
                className="min-h-[36px] px-4 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-[#3d2855] hover:border-[#E8637A] hover:text-[#C94B6D] transition-colors"
              >
                {referralCopied ? "✓ Link copied" : "Copy link"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── PARTNER SHARE ────────────────────────────────────────────────── */}
      <section className="bg-white border border-[#E6D7F3] rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-xs font-semibold text-[#C94B6D] uppercase tracking-widest mb-1">
            Share your cycle phase
          </h2>
          <p className="text-sm text-[#3d2855] leading-relaxed">
            Share a link so your partner, friend, or family member can see what phase you&apos;re in this week. No symptoms or personal data are shared.
          </p>
        </div>

        {shareError && <p className="text-sm text-red-600">{shareError}</p>}

        {!shareData ? (
          <button
            onClick={handleShareCreate}
            disabled={shareCreating}
            className="min-h-[44px] px-5 py-2.5 bg-[#E8637A] hover:bg-[#C94B6D] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
          >
            {shareCreating ? "Creating…" : "Create share link"}
          </button>
        ) : (
          <div className="space-y-3">
            {/* URL display + copy */}
            <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2 flex-wrap">
              <p className="text-xs text-[#1E0F30] font-mono flex-1 break-all">
                {shareData.url}
              </p>
              <button
                onClick={handleShareCopy}
                className="shrink-0 min-h-[36px] px-3 rounded-lg bg-[#E8637A]/10 text-[#C94B6D] text-xs font-semibold hover:bg-[#E8637A]/20 transition-colors"
              >
                {shareCopied ? "✓ Copied" : "Copy"}
              </button>
            </div>

            <p className="text-xs text-[#3d2855]">
              Views: <span className="font-semibold text-[#1E0F30]">{shareData.view_count}</span>
            </p>

            {/* Revoke */}
            {!showRevokeConfirm ? (
              <button
                onClick={() => setShowRevokeConfirm(true)}
                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                Revoke link
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRevokeConfirm(false)}
                  disabled={shareRevoking}
                  className="flex-1 min-h-[44px] rounded-xl border-2 border-gray-200 text-sm font-medium text-[#3d2855] hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShareRevoke}
                  disabled={shareRevoking}
                  className="flex-1 min-h-[44px] rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
                >
                  {shareRevoking ? "Revoking…" : "Yes, revoke"}
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-[#3d2855]/70 leading-snug">
          🔒 Only your current phase and general tips are visible. Never symptoms or personal health details.
        </p>
      </section>

      {/* ── DATA ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border border-[#E6D7F3] rounded-2xl p-6 space-y-4">
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
          <p className="text-xs text-[#3d2855] mt-1">
            Permanently removes all your data. This cannot be undone.
          </p>
        </div>
      </section>
    </div>
  );
}
