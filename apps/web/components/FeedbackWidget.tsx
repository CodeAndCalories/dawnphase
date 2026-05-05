"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { api } from "@/lib/api";

type Status = "idle" | "sending" | "success" | "rate_limited" | "error";

export default function FeedbackWidget() {
  const [open,    setOpen]    = useState(false);
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || status === "sending") return;
    setStatus("sending");
    try {
      const res = await api.post<{ ok: boolean; rateLimited?: boolean }>(
        "/feedback/message",
        { message: message.trim() }
      );
      if (res.rateLimited) {
        setStatus("rate_limited");
      } else {
        setStatus("success");
        setTimeout(() => {
          setOpen(false);
          setMessage("");
          setStatus("idle");
        }, 2000);
      }
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    setOpen(false);
    setMessage("");
    setStatus("idle");
  }

  return (
    <>
      {/* Floating pill — sits above the mobile tab bar (bottom-24) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Share feedback"
        className="fixed bottom-[5.5rem] right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all"
        style={{ background: "linear-gradient(135deg, #c94f68, #e06e40)" }}
      >
        <MessageSquare size={14} strokeWidth={2.5} />
        Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={handleClose}
          />

          {/* Panel */}
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1E0F30]">Share feedback</h2>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="text-[#3d2855]/40 hover:text-[#3d2855] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success */}
            {status === "success" && (
              <p className="text-center text-sm text-[#3d2855] py-6">
                Thanks! We read every message 💜
              </p>
            )}

            {/* Rate limited */}
            {status === "rate_limited" && (
              <p className="text-center text-sm text-[#7a5a8a] py-6">
                You&apos;ve already sent feedback today — check back tomorrow 💜
              </p>
            )}

            {/* Form */}
            {(status === "idle" || status === "sending" || status === "error") && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value.slice(0, 500))}
                  placeholder="What's working? What's missing?"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-xl border border-[#E6D7F3] bg-white text-sm text-[#1E0F30] placeholder-[#b09ac0] focus:outline-none focus:ring-2 focus:ring-[#c94f68]/25 resize-none transition-shadow"
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-[#b09ac0]">{message.length}/500</span>
                    {status === "error" && (
                      <span className="text-xs text-red-500">Something went wrong — try again</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!message.trim() || status === "sending"}
                    className="shrink-0 px-5 py-2 rounded-full text-white text-sm font-semibold shadow-sm disabled:opacity-50 hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: "linear-gradient(135deg, #c94f68, #e06e40)" }}
                  >
                    {status === "sending" ? "Sending…" : "Send"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
