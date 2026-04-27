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
