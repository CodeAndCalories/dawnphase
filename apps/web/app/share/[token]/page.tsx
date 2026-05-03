import type { Metadata } from "next";
import Image from "next/image";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

const WORKER_URL =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

interface ShareData {
  phase:              string | null;
  cycle_day:         number | null;
  days_until_period: number | null;
  phase_tip:         string | null;
  mode:              string;
}

const PHASE_EMOJI: Record<string, string> = {
  Menstrual:     "🌊",
  Follicular:    "🌱",
  Ovulatory:     "☀️",
  Luteal:        "🌙",
  Perimenopause: "🌸",
};

const PHASE_DESC: Record<string, string> = {
  Menstrual:     "Energy is lower and rest is restorative. A quieter, more inward week.",
  Follicular:    "Energy is building and mood tends to lift. Plans and activities feel good.",
  Ovulatory:     "Peak energy, communication, and social confidence this week.",
  Luteal:        "Energy gradually winds down. Self-care and support matter more.",
  Perimenopause: "Navigating hormonal changes — each day can feel a little different.",
};

async function getShareData(token: string): Promise<ShareData | null> {
  try {
    const res = await fetch(`${WORKER_URL}/share/${token}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json() as Promise<ShareData>;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const data = await getShareData(token);
  const phase = data?.phase ?? "cycle phase";
  return {
    title:       `${phase} — shared via Dawn Phase`,
    description: "Someone shared their current cycle phase with you.",
    robots:      "noindex",
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const data = await getShareData(token);

  if (!data || !data.phase) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(135deg, #ede8f7 0%, #FFF0F3 100%)" }}
      >
        <Image src="/logo.png" alt="Dawn Phase" width={40} height={40} className="rounded-xl mb-6" />
        <h1 className="text-xl font-bold text-[#140c18] mb-2">Link not found</h1>
        <p className="text-sm text-[#3d2855] text-center max-w-xs">
          This share link may have been revoked or expired.
        </p>
        <a href="/" className="mt-6 text-sm font-semibold text-[#c94f68] hover:underline">
          Visit Dawn Phase →
        </a>
      </div>
    );
  }

  const emoji = PHASE_EMOJI[data.phase] ?? "🌸";
  const desc  = PHASE_DESC[data.phase]  ?? "";
  const isPeri = data.mode === "perimenopause";

  return (
    <div
      className="min-h-screen px-4 py-10 flex flex-col items-center"
      style={{ background: "linear-gradient(135deg, #ede8f7 0%, #FFF0F3 100%)" }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 mb-10">
        <Image src="/logo.png" alt="Dawn Phase" width={32} height={32} className="rounded-lg" />
        <span className="text-sm font-bold text-[#140c18] tracking-tight">Dawn Phase</span>
      </a>

      {/* Main card */}
      <div className="w-full max-w-md">
        <p className="text-center text-xs font-semibold text-[#3d2855] uppercase tracking-widest mb-6">
          Someone shared their cycle phase with you
        </p>

        {/* Phase display */}
        <div
          className="rounded-3xl p-8 mb-5 text-center shadow-lg border border-[rgba(130,80,170,0.12)]"
          style={{ background: "white" }}
        >
          <div className="text-6xl mb-4 leading-none">{emoji}</div>
          <h1 className="text-2xl font-bold text-[#5a3575] mb-2">
            {data.phase}{isPeri ? "" : " Phase"}
          </h1>

          {isPeri ? (
            <p className="text-sm text-[#3d2855] leading-relaxed">
              She&apos;s navigating perimenopause — symptoms can vary day to day.
            </p>
          ) : (
            <>
              {data.cycle_day && (
                <p className="text-base text-[#3d2855] mb-1">
                  Day <span className="font-semibold text-[#140c18]">{data.cycle_day}</span> of her cycle
                </p>
              )}
              {data.days_until_period != null && (
                <p className="text-sm text-[#3d2855]">
                  Next period in approximately{" "}
                  <span className="font-semibold text-[#140c18]">{data.days_until_period}</span>{" "}
                  day{data.days_until_period === 1 ? "" : "s"}
                </p>
              )}
            </>
          )}
        </div>

        {/* What this means */}
        {desc && (
          <div className="rounded-2xl p-6 mb-5 border border-[rgba(130,80,170,0.1)]" style={{ background: "#f4e6f0" }}>
            <p className="text-xs font-bold text-[#3d2855] uppercase tracking-widest mb-2">
              What this means this week
            </p>
            <p className="text-sm text-[#140c18] leading-relaxed">{desc}</p>
          </div>
        )}

        {/* Partner tip */}
        {data.phase_tip && (
          <div
            className="rounded-2xl p-6 mb-8 border border-[rgba(130,80,170,0.15)]"
            style={{ background: "white" }}
          >
            <p className="text-xs font-bold text-[#c94f68] uppercase tracking-widest mb-2">
              💛 Tip for you this week
            </p>
            <p className="text-sm text-[#140c18] leading-relaxed">{data.phase_tip}</p>
          </div>
        )}

        {/* Learn more */}
        <div
          className="rounded-2xl p-6 text-center border border-[rgba(130,80,170,0.12)]"
          style={{ background: "white" }}
        >
          <p className="text-sm font-semibold text-[#140c18] mb-1">
            Want to understand your own cycle?
          </p>
          <p className="text-xs text-[#3d2855] mb-4">
            Dawn Phase — privacy-first cycle tracking
          </p>
          <a
            href="/"
            className="inline-block rounded-full px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] shadow-md shadow-[#c94f68]/20"
            style={{ background: "linear-gradient(135deg, #c94f68, #5a3575)" }}
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-10 text-center text-xs text-[#3d2855]/60 max-w-sm leading-relaxed">
        This page shows general cycle phase information only.
        No personal health data, symptoms, or identifying details are shared.
      </p>
    </div>
  );
}
