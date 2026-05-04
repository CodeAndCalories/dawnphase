"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenLine,
  Droplets,
  TrendingUp,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import { api } from "@/lib/api";

const NAV = [
  { href: "/dashboard",   label: "Dashboard",  Icon: LayoutDashboard },
  { href: "/log",         label: "Log Today",  Icon: PenLine          },
  { href: "/cycles/new",  label: "Log Period", Icon: Droplets         },
  { href: "/insights",    label: "Insights",   Icon: TrendingUp       },
  { href: "/settings",    label: "Settings",   Icon: Settings         },
];

// "incomplete" means checkout completed but webhook hasn't updated the
// DB yet — treat it identically to "trialing" from the user's perspective.
function getSubBadge(status: string): { label: string; cls: string } {
  if (status === "active")   return { label: "Active",   cls: "bg-green-100 text-green-800" };
  if (status === "past_due") return { label: "Past due", cls: "bg-amber-100 text-amber-800" };
  if (status === "canceled") return { label: "Canceled", cls: "bg-red-100   text-red-700"   };
  // trialing, incomplete, or anything else → show Trial
  return { label: "Trial", cls: "bg-blue-100 text-blue-800" };
}

function getJWTPayload(): { email: string; status: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem("dp_token");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1])) as {
      email: string;
      status: string;
    };
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem("dp_token");
  window.location.href = "/";
}

async function openBillingPortal() {
  try {
    const { url } = await api.post<{ url: string }>("/stripe/portal", {});
    window.location.href = url;
  } catch {
    window.location.href =
      "https://billing.stripe.com/p/login/eVq8wR3AQ3Aeejr5zEcs800";
  }
}

export default function Sidebar() {
  const pathname = usePathname();
  const payload  = getJWTPayload();
  const email    = payload?.email ?? "";
  const status   = payload?.status ?? "";
  const sub      = getSubBadge(status);

  return (
    <>
      {/* ── Desktop sidebar (hidden below md) ─────────────────────────── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-60 bg-[#1E0F30] border-r border-[rgba(255,255,255,0.08)] z-40">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 px-5 py-5 shrink-0"
        >
          <span className="font-display font-bold text-lg text-white tracking-tight leading-none">
            Dawn Phase
          </span>
        </a>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, label, Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#c94f68] text-white shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                {label}
              </a>
            );
          })}

          {/* Manage billing — button styled as a nav link, desktop only */}
          <button
            onClick={openBillingPortal}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <CreditCard size={16} strokeWidth={2} />
            Manage billing
          </button>
        </nav>

        {/* Bottom user area */}
        <div className="px-4 py-4 border-t border-[rgba(255,255,255,0.1)] space-y-3 shrink-0">
          {/* Email + subscription badge */}
          <div className="space-y-1.5">
            <p
              className="text-xs text-white/60 truncate font-medium"
              title={email}
            >
              {email}
            </p>
            {sub && (
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sub.cls}`}
              >
                {sub.label}
              </span>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors w-full"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom tab bar (shown below md) ──────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1E0F30] border-t border-[rgba(255,255,255,0.1)] z-50 flex items-center justify-around px-2"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV.map(({ href, label, Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <a
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors min-w-[52px] ${
                active ? "text-[#E8637A]" : "text-white/60"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
              {/* Active dot indicator */}
              <span
                className={`w-1 h-1 rounded-full mt-0.5 transition-opacity ${
                  active ? "bg-[#E8637A] opacity-100" : "opacity-0"
                }`}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
