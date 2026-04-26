"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenLine,
  Droplets,
  TrendingUp,
  Settings,
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

const SUB_BADGE: Record<string, { label: string; cls: string }> = {
  trialing:   { label: "Trial",        cls: "bg-blue-100   text-blue-800"   },
  active:     { label: "Active",       cls: "bg-green-100  text-green-800"  },
  past_due:   { label: "Past due",     cls: "bg-red-100    text-red-700"    },
  canceled:   { label: "Canceled",     cls: "bg-gray-100   text-gray-500"   },
  incomplete: { label: "Incomplete",   cls: "bg-yellow-100 text-yellow-800" },
};

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
  const sub      = SUB_BADGE[status];

  return (
    <>
      {/* ── Desktop sidebar (hidden below md) ─────────────────────────── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-60 bg-[#FDF6F0] border-r border-[rgba(232,99,122,0.12)] z-40">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 px-5 py-5 shrink-0"
        >
          <span className="font-display font-bold text-lg text-[#C94B6D] tracking-tight leading-none">
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
                    ? "bg-[#E8637A] text-white shadow-sm"
                    : "text-[#8C6B5A] hover:bg-[#E8637A]/10 hover:text-[#C94B6D]"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                {label}
              </a>
            );
          })}
        </nav>

        {/* Bottom user area */}
        <div className="px-4 py-4 border-t border-[rgba(232,99,122,0.12)] space-y-3 shrink-0">
          {/* Email + subscription badge */}
          <div className="space-y-1.5">
            <p
              className="text-xs text-[#8C6B5A] truncate font-medium"
              title={email}
            >
              {email}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {sub && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sub.cls}`}
                >
                  {sub.label}
                </span>
              )}
              <button
                onClick={openBillingPortal}
                className="text-[10px] text-[#8C6B5A] hover:text-[#C94B6D] underline decoration-dotted transition-colors"
              >
                Manage billing
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs text-[#8C6B5A] hover:text-[#C94B6D] transition-colors w-full"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom tab bar (shown below md) ──────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FDF6F0] border-t border-[rgba(232,99,122,0.12)] z-40 flex items-center justify-around px-2">
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
                active ? "text-[#E8637A]" : "text-[#8C6B5A]"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
