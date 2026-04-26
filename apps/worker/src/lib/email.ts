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

export function welcomeEmail(name: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px">
      <h1 style="color:#7c3aed;font-size:24px;margin-bottom:8px">Welcome to Dawn Phase, ${name}!</h1>
      <p style="color:#4b5563;font-size:16px;line-height:1.6">
        You're all set. Start by logging your last period date and we'll map your cycle right away.
      </p>
      <a href="https://dawnphase.com/dashboard"
         style="display:inline-block;margin-top:24px;padding:12px 24px;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">
        Go to your dashboard →
      </a>
      <p style="margin-top:40px;color:#9ca3af;font-size:12px">
        You're receiving this because you signed up at dawnphase.com.<br>
        <a href="https://dawnphase.com/unsubscribe" style="color:#9ca3af">Unsubscribe</a>
      </p>
    </div>
  `;
}

export function periodReminderEmail(name: string, daysAway: number): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px">
      <h1 style="color:#7c3aed;font-size:24px;margin-bottom:8px">Period reminder, ${name}</h1>
      <p style="color:#4b5563;font-size:16px;line-height:1.6">
        Your period is predicted to start in <strong>${daysAway} day${daysAway === 1 ? "" : "s"}</strong>. Time to prep your essentials!
      </p>
      <a href="https://dawnphase.com/dashboard"
         style="display:inline-block;margin-top:24px;padding:12px 24px;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">
        View your dashboard →
      </a>
    </div>
  `;
}
