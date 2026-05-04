interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(
  apiKey: string,
  options: SendEmailOptions
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: options.from ?? "Dawn Phase <hello@dawnphase.com>",
      to: options.to,
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

// ── Shared layout wrapper ─────────────────────────────────────────────────────

function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0eb">
  <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#FFF9F6;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
    <!-- Header bar -->
    <div style="background:#E8637A;padding:24px 40px">
      <span style="color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.02em">Dawn Phase</span>
    </div>
    <!-- Body -->
    <div style="padding:40px">
      ${body}
    </div>
    <!-- Footer -->
    <div style="background:#FDF6F0;border-top:1px solid #f0e8e0;padding:24px 40px">
      <p style="margin:0;font-size:12px;color:#8C6B5A;line-height:1.6">
        You're receiving this because you have an account at
        <a href="https://www.dawnphase.com" style="color:#8C6B5A">dawnphase.com</a>.<br>
        <a href="https://www.dawnphase.com/settings" style="color:#8C6B5A">Manage email preferences</a>
        &nbsp;·&nbsp;
        <a href="https://www.dawnphase.com/privacy" style="color:#8C6B5A">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ── Welcome email ─────────────────────────────────────────────────────────────

export function welcomeEmail(email: string): string {
  return emailWrapper(`
    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      Welcome to Dawn Phase 🌅
    </h1>
    <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Hi ${email},
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Your <strong>7-day free trial has started</strong>. Here's what you can do right now:
    </p>

    <!-- Feature bullets -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;width:100%">
      ${[
        ["🩸", "Log your period start date", "and we'll map your cycle phases instantly"],
        ["📋", "Track daily symptoms", "flow, mood, energy, sleep, and more"],
        ["✨", "See your patterns", "insights built from your own cycle history"],
      ].map(([icon, bold, rest]) => `
      <tr>
        <td style="padding:8px 0;vertical-align:top;width:32px;font-size:18px">${icon}</td>
        <td style="padding:8px 0;vertical-align:top;font-size:15px;color:#2D1B1E;line-height:1.5">
          <strong>${bold}</strong> — ${rest}
        </td>
      </tr>`).join("")}
    </table>

    <!-- CTA button -->
    <div style="margin:0 0 36px">
      <a href="https://www.dawnphase.com/dashboard"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Go to your dashboard →
      </a>
    </div>

    <!-- Privacy note -->
    <p style="margin:0;padding:16px;background:#FDF6F0;border-radius:10px;font-size:13px;color:#8C6B5A;line-height:1.6;border-left:3px solid #E8637A">
      🔒 <strong style="color:#2D1B1E">Your data stays yours. Always.</strong><br>
      We never sell your health data or share it with advertisers. Ever.
    </p>
  `);
}

// ── Period reminder email ─────────────────────────────────────────────────────

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

const PHASE_TIPS: Record<CyclePhase, string> = {
  Menstrual:
    "You're in your menstrual phase. Rest is productive right now — gentle movement, warmth, and iron-rich foods will support your body.",
  Follicular:
    "You're in your follicular phase and energy is building. A great time to plan ahead, start new projects, and reconnect socially.",
  Ovulatory:
    "You're at peak energy in your ovulatory phase. Make the most of it — this is a great time for important conversations and decisions.",
  Luteal:
    "You're in your luteal phase. Wind down gradually, reduce caffeine, prioritise sleep, and be gentle with yourself as your body prepares.",
};

interface PeriodReminderOptions {
  email: string;
  daysAway: number;
  predictedDate: string; // e.g. "May 3"
  phase: CyclePhase;
}

export function periodReminderEmail(opts: PeriodReminderOptions): string {
  const { email, daysAway, predictedDate, phase } = opts;
  const tip = PHASE_TIPS[phase];
  const daysLabel = daysAway === 1 ? "1 day" : `${daysAway} days`;

  return emailWrapper(`
    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      Your period may be coming in ${daysLabel} 🌸
    </h1>
    <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Hi ${email},
    </p>
    <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Based on your cycle history, your next period is predicted around
      <strong>${predictedDate}</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#2D1B1E;line-height:1.6">
      You're currently in your <strong>${phase}</strong> phase.
    </p>

    <!-- Phase tip -->
    <div style="margin:0 0 32px;padding:16px 20px;background:#FDF6F0;border-radius:12px;border-left:3px solid #E8637A">
      <p style="margin:0;font-size:14px;color:#2D1B1E;line-height:1.6">
        💡 <strong>Phase tip:</strong> ${tip}
      </p>
    </div>

    <!-- CTA button -->
    <div style="margin:0 0 8px">
      <a href="https://www.dawnphase.com/log"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Log today's symptoms →
      </a>
    </div>
  `);
}

// ── Password reset email ──────────────────────────────────────────────────────

export function passwordResetEmail(email: string, resetUrl: string): string {
  return emailWrapper(`
    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      Reset your password
    </h1>
    <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Hi ${email},
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#2D1B1E;line-height:1.6">
      We received a request to reset your Dawn Phase password. Click the button
      below to choose a new one.
    </p>

    <!-- CTA button -->
    <div style="margin:0 0 32px">
      <a href="${resetUrl}"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Reset your password →
      </a>
    </div>

    <p style="margin:0;padding:16px;background:#FDF6F0;border-radius:10px;font-size:13px;color:#8C6B5A;line-height:1.6">
      This link expires in <strong style="color:#2D1B1E">1 hour</strong>. If you
      didn&apos;t request a password reset you can safely ignore this email — your
      password will not change.
    </p>
  `);
}

// ── Lead capture email ────────────────────────────────────────────────────────

export function leadCaptureEmail(
  email: string,
  _source: string,
  results: Record<string, string>
): string {
  const resultRows = Object.entries(results)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;font-size:14px;color:#8C6B5A;vertical-align:top">${label}</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;color:#2D1B1E;text-align:right;vertical-align:top">${value}</td>
      </tr>`
    )
    .join("");

  const resultsBlock = resultRows
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 28px;border-collapse:collapse;border:1px solid #F0E0D8;border-radius:12px;overflow:hidden">
        <tbody>${resultRows}</tbody>
       </table>`
    : "";

  return emailWrapper(`
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      Here are your results 🌅
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Hi ${email},
    </p>

    ${resultsBlock}

    <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#2D1B1E;text-transform:uppercase;letter-spacing:0.06em">
      Dawn Phase also lets you:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;width:100%">
      ${[
        ["📅", "Track changes across multiple cycles"],
        ["🌙", "See which phase you're in every day"],
        ["📄", "Get a doctor-ready report of your patterns"],
      ]
        .map(
          ([icon, text]) => `
      <tr>
        <td style="padding:6px 0;vertical-align:top;width:28px;font-size:16px">${icon}</td>
        <td style="padding:6px 0;vertical-align:top;font-size:14px;color:#2D1B1E;line-height:1.5">${text}</td>
      </tr>`
        )
        .join("")}
    </table>

    <div style="margin:0 0 16px">
      <a href="https://www.dawnphase.com/signup"
         style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#E8637A,#A855C8);color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Start tracking free for 7 days →
      </a>
    </div>
    <p style="margin:0;font-size:12px;color:#8C6B5A">No card required for 7 days.</p>
  `);
}

// ── Streak milestone email ────────────────────────────────────────────────────

export function streakMilestoneEmail(email: string, streakDays: number): string {
  return emailWrapper(`
    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      🔥 ${streakDays}-day streak!
    </h1>
    <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Hi ${email},
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#2D1B1E;line-height:1.6">
      You&apos;ve logged <strong>${streakDays} days in a row</strong>. That&apos;s a real commitment to understanding your cycle.
    </p>

    <!-- Milestone highlight -->
    <div style="margin:0 0 32px;padding:20px 24px;background:linear-gradient(135deg,#FFF0F0,#FDF6F0);border-radius:12px;border-left:3px solid #E8637A;text-align:center">
      <p style="margin:0 0 8px;font-size:40px;line-height:1">🔥</p>
      <p style="margin:0;font-size:28px;font-weight:700;color:#C94B6D">${streakDays} days</p>
    </div>

    <p style="margin:0 0 28px;font-size:15px;color:#2D1B1E;line-height:1.6">
      The more you log, the clearer your patterns become. Every entry builds a more complete picture of your cycle and health.
    </p>

    <!-- CTA button -->
    <div style="margin:0 0 8px">
      <a href="https://www.dawnphase.com/log"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Keep your streak going →
      </a>
    </div>
  `);
}

// ── Weekly cycle digest email ─────────────────────────────────────────────────

export interface WeeklyDigestOptions {
  email: string;
  currentPhase: string | null;
  cycleDay: number | null;
  daysUntilNextPeriod: number | null;
  wellnessTips: string[];
  streakDays: number;
  topSymptomThisWeek: string | null;
}

const PHASE_BADGE_COLORS: Record<string, string> = {
  Menstrual:     "#E8637A",
  Follicular:    "#A78BFA",
  Ovulatory:     "#F5C842",
  Luteal:        "#818CF8",
  Perimenopause: "#9B59B6",
};

export function weeklyDigestEmail(opts: WeeklyDigestOptions): string {
  const {
    email, currentPhase, cycleDay, daysUntilNextPeriod,
    wellnessTips, streakDays, topSymptomThisWeek,
  } = opts;

  const hour = new Date().getUTCHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const badgeColor = currentPhase ? (PHASE_BADGE_COLORS[currentPhase] ?? "#E8637A") : "#E8637A";

  const phaseBlock = currentPhase ? `
    <div style="margin:0 0 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <span style="display:inline-block;padding:5px 14px;background:${badgeColor}20;color:${badgeColor};border:1px solid ${badgeColor}40;border-radius:999px;font-size:13px;font-weight:700">
        ${currentPhase} phase
      </span>
      ${cycleDay ? `<span style="font-size:14px;color:#8C6B5A">Day ${cycleDay} of your cycle</span>` : ""}
    </div>` : "";

  const nextPeriodBlock = daysUntilNextPeriod != null ? `
    <div style="margin:0 0 24px;padding:14px 18px;background:#FDF6F0;border-radius:10px;border-left:3px solid #E8637A">
      <p style="margin:0;font-size:14px;color:#2D1B1E;line-height:1.5">
        📅 <strong>Days until next period:</strong> ${daysUntilNextPeriod} day${daysUntilNextPeriod === 1 ? "" : "s"}
      </p>
    </div>` : "";

  const tipsBlock = wellnessTips.length > 0 ? `
    <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#2D1B1E;text-transform:uppercase;letter-spacing:0.06em">
      🌿 ${currentPhase ?? "Wellness"} tips for this week:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;width:100%">
      ${wellnessTips.map((tip) => `
      <tr>
        <td style="padding:6px 0;vertical-align:top;width:18px;font-size:14px;color:#E8637A">·</td>
        <td style="padding:6px 0;vertical-align:top;font-size:14px;color:#2D1B1E;line-height:1.5">${tip}</td>
      </tr>`).join("")}
    </table>` : "";

  const streakBlock = streakDays > 0 ? `
    <div style="margin:0 0 20px;padding:12px 16px;background:#FFF0F0;border-radius:10px;border-left:3px solid #E8637A">
      <p style="margin:0;font-size:14px;color:#2D1B1E">
        🔥 <strong>${streakDays}-day streak</strong> — keep it going!
      </p>
    </div>` : `
    <div style="margin:0 0 20px;padding:12px 16px;background:#FDF6F0;border-radius:10px">
      <p style="margin:0;font-size:14px;color:#8C6B5A">
        Log today and start building your streak!
      </p>
    </div>`;

  const topSymptomBlock = topSymptomThisWeek ? `
    <p style="margin:0 0 28px;font-size:14px;color:#2D1B1E;line-height:1.5">
      📋 <strong>Most logged this week:</strong> ${topSymptomThisWeek}
    </p>` : "";

  return emailWrapper(`
    <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#C94B6D;line-height:1.2">
      🌅 Your cycle week ahead
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#2D1B1E;line-height:1.6">
      ${timeGreeting}, ${email} — here&apos;s your cycle week ahead.
    </p>

    ${phaseBlock}
    ${nextPeriodBlock}
    ${tipsBlock}
    ${streakBlock}
    ${topSymptomBlock}

    <div style="margin:0 0 8px">
      <a href="https://www.dawnphase.com/log"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Log today&apos;s symptoms →
      </a>
    </div>

    <p style="margin:16px 0 0;font-size:12px;color:#8C6B5A;line-height:1.6">
      <a href="https://www.dawnphase.com/settings" style="color:#8C6B5A">Manage email preferences in Settings</a>
    </p>
  `);
}

// ── Pre-period check-in email ─────────────────────────────────────────────────

export function prePeriodCheckInEmail(email: string, daysUntil: number): string {
  const daysLabel = `~${daysUntil} day${daysUntil === 1 ? "" : "s"}`;

  return emailWrapper(`
    <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      Pre-period check-in 🌸
    </h1>
    <p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Hi ${email},
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:#2D1B1E;line-height:1.6">
      Your period is predicted in <strong>${daysLabel}</strong>.
      Some women feel it coming. Others get surprised. Either way, logging
      how you feel now helps build your pattern.
    </p>

    <!-- Common pre-period symptoms -->
    <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#2D1B1E;text-transform:uppercase;letter-spacing:0.06em">
      Common pre-period symptoms to watch for:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px;width:100%">
      ${[
        "Breast tenderness",
        "Cramps",
        "Fatigue",
        "Bloating",
        "Mood shifts",
      ].map((s) => `
      <tr>
        <td style="padding:6px 0;vertical-align:top;width:20px;font-size:14px;color:#E8637A">·</td>
        <td style="padding:6px 0;vertical-align:top;font-size:14px;color:#2D1B1E;line-height:1.5">${s}</td>
      </tr>`).join("")}
    </table>

    <!-- CTA button -->
    <div style="margin:0 0 24px">
      <a href="https://www.dawnphase.com/log"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        Log today&apos;s symptoms &rarr;
      </a>
    </div>

    <!-- Soft note -->
    <p style="margin:0;padding:16px;background:#FDF6F0;border-radius:10px;font-size:13px;color:#8C6B5A;line-height:1.6;border-left:3px solid #E8637A">
      Tracking this builds your pre-period pattern over time so you can predict it better each cycle.
    </p>
  `);
}

// ── Monthly cycle report email ────────────────────────────────────────────────

export interface MonthlyReportOptions {
  email: string;
  month: string;                      // e.g. "April 2026"
  cyclesTracked: number;
  avgCycleLength: number | null;
  topSymptoms: string[];              // top 3 names
  avgMood: number | null;             // 1–5
  avgEnergy: number | null;           // 1–5
  avgSleep: number | null;            // hours
  currentPhase: string | null;
  daysUntilNextPeriod: number | null;
}

const MOOD_EMOJI_LIST = ["", "😢", "😟", "😐", "🙂", "😊"];

function moodEmoji(score: number | null): string {
  if (score == null) return "—";
  return MOOD_EMOJI_LIST[Math.max(1, Math.min(5, Math.round(score)))];
}

export function monthlyReportEmail(opts: MonthlyReportOptions): string {
  const {
    email, month, cyclesTracked, avgCycleLength,
    topSymptoms, avgMood, avgSleep,
    currentPhase, daysUntilNextPeriod,
  } = opts;

  const symptomPills = topSymptoms.length > 0
    ? topSymptoms.map((s) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 14px;background:#E8637A;color:#fff;border-radius:999px;font-size:12px;font-weight:700">${s}</span>`
      ).join("")
    : `<span style="font-size:13px;color:#8C6B5A">No symptoms logged this month</span>`;

  const phaseBlock = currentPhase
    ? `<p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">You&apos;re currently in your <strong>${currentPhase}</strong> phase.</p>`
    : "";

  const nextPeriodBlock = daysUntilNextPeriod != null
    ? `<p style="margin:0 0 8px;font-size:15px;color:#2D1B1E;line-height:1.6">Next period in approximately <strong>${daysUntilNextPeriod} day${daysUntilNextPeriod === 1 ? "" : "s"}</strong>.</p>`
    : "";

  return emailWrapper(`
    <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:#C94B6D;line-height:1.2">
      Your ${month} cycle summary
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:#8C6B5A">
      Hi ${email} — here&apos;s your last 30 days at a glance.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border-collapse:collapse">
      <tr>
        <td width="50%" style="padding:0 6px 10px 0;vertical-align:top">
          <div style="background:#FDF6F0;border-radius:12px;padding:14px 10px;text-align:center">
            <div style="font-size:10px;font-weight:700;color:#8C6B5A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Cycles tracked</div>
            <div style="font-size:30px;font-weight:700;color:#C94B6D;line-height:1">${cyclesTracked}</div>
          </div>
        </td>
        <td width="50%" style="padding:0 0 10px 6px;vertical-align:top">
          <div style="background:#FDF6F0;border-radius:12px;padding:14px 10px;text-align:center">
            <div style="font-size:10px;font-weight:700;color:#8C6B5A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Avg cycle</div>
            <div style="font-size:30px;font-weight:700;color:#C94B6D;line-height:1">${avgCycleLength ? avgCycleLength + "d" : "—"}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td width="50%" style="padding:0 6px 0 0;vertical-align:top">
          <div style="background:#FDF6F0;border-radius:12px;padding:14px 10px;text-align:center">
            <div style="font-size:10px;font-weight:700;color:#8C6B5A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Avg mood</div>
            <div style="font-size:30px;font-weight:700;color:#C94B6D;line-height:1">${moodEmoji(avgMood)}</div>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 6px;vertical-align:top">
          <div style="background:#FDF6F0;border-radius:12px;padding:14px 10px;text-align:center">
            <div style="font-size:10px;font-weight:700;color:#8C6B5A;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Avg sleep</div>
            <div style="font-size:30px;font-weight:700;color:#C94B6D;line-height:1">${avgSleep != null ? avgSleep + "h" : "—"}</div>
          </div>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#2D1B1E;text-transform:uppercase;letter-spacing:0.06em">Top symptoms this month:</p>
    <div style="margin:0 0 24px">${symptomPills}</div>

    ${phaseBlock}${nextPeriodBlock}
    ${(phaseBlock || nextPeriodBlock) ? '<div style="margin-bottom:20px"></div>' : ""}

    <p style="margin:0 0 28px;padding:14px 16px;background:#FDF6F0;border-radius:10px;border-left:3px solid #E8637A;font-size:14px;color:#2D1B1E;line-height:1.6">
      Every cycle you track builds a clearer picture of your health.
    </p>

    <div style="margin:0 0 24px;text-align:center">
      <a href="https://www.dawnphase.com/insights"
         style="display:inline-block;padding:14px 32px;background:#E8637A;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.01em">
        View your full insights →
      </a>
    </div>

    <p style="margin:0;font-size:12px;color:#8C6B5A;text-align:center;line-height:1.6">
      You&apos;re receiving this because you have an active Dawn Phase subscription.<br>
      <a href="https://www.dawnphase.com/settings" style="color:#8C6B5A">Manage preferences in Settings</a>
    </p>
  `);
}
