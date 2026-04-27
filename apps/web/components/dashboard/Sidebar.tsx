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

          {/* Manage billing — button styled as a nav link, desktop only */}
          <button
            onClick={openBillingPortal}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8C6B5A] hover:bg-[#E8637A]/10 hover:text-[#C94B6D] transition-colors"
          >
            <CreditCard size={16} strokeWidth={2} />
            Manage billing
          </button>
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
