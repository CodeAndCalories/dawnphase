import { Hono } from "hono";
import type { Env } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";

interface ShareToken {
  id: string;
  user_id: string;
  token: string;
  expires_at: string | null;
  view_count: number;
  active: number;
  created_at: string;
}

interface UserRow {
  mode: "cycle" | "perimenopause";
  avg_cycle_length: number | null;
}

interface CycleRow {
  start_date: string;
}

const PHASE_TIPS: Record<string, string> = {
  Menstrual:
    "She may need more rest and warmth this week. Low-key plans work best.",
  Follicular:
    "Energy is rising — a good week for activities and making plans.",
  Ovulatory:
    "Social and communicative energy tends to peak. Great time to connect.",
  Luteal:
    "She may feel more tired or sensitive toward the end of this phase. Extra support goes a long way.",
  Perimenopause:
    "Symptoms can vary — checking in and being flexible helps most.",
};

function getPhase(day: number): string {
  if (day <= 5)   return "Menstrual";
  if (day <= 13)  return "Follicular";
  if (day === 14) return "Ovulatory";
  return "Luteal";
}

// Typed for both auth-gated (has userId) and public (no userId) handlers.
// Auth-gated handlers call c.get("userId"); the public /:token handler does not.
const share = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

// ── POST /create ──────────────────────────────────────────────────────────────

share.post("/create", async (c) => {
  const userId = c.get("userId");

  // Deactivate any existing active tokens for this user
  await dbRun(
    c.env.DB,
    "UPDATE share_tokens SET active = 0 WHERE user_id = ? AND active = 1",
    [userId]
  );

  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const id    = newId();

  await dbRun(
    c.env.DB,
    "INSERT INTO share_tokens (id, user_id, token, active) VALUES (?, ?, ?, 1)",
    [id, userId, token]
  );

  const url = `https://www.dawnphase.com/share/${token}`;
  return c.json({ url, token, view_count: 0 });
});

// ── DELETE /revoke ────────────────────────────────────────────────────────────

share.delete("/revoke", async (c) => {
  const userId = c.get("userId");
  await dbRun(
    c.env.DB,
    "UPDATE share_tokens SET active = 0 WHERE user_id = ? AND active = 1",
    [userId]
  );
  return c.json({ ok: true });
});

// ── GET /status ───────────────────────────────────────────────────────────────

share.get("/status", async (c) => {
  const userId = c.get("userId");
  const row = await dbFirst<ShareToken>(
    c.env.DB,
    "SELECT * FROM share_tokens WHERE user_id = ? AND active = 1 ORDER BY created_at DESC LIMIT 1",
    [userId]
  );
  if (!row) return c.json({ share: null });
  return c.json({
    share: {
      token:      row.token,
      view_count: row.view_count,
      created_at: row.created_at,
      url:        `https://www.dawnphase.com/share/${row.token}`,
    },
  });
});

// ── GET /:token (PUBLIC — no auth) ────────────────────────────────────────────

share.get("/:token", async (c) => {
  const token = c.req.param("token");

  const row = await dbFirst<ShareToken>(
    c.env.DB,
    "SELECT * FROM share_tokens WHERE token = ? AND active = 1",
    [token]
  );
  if (!row) return c.json({ message: "Not found" }, 404);

  // Increment view count — best-effort, don't block response on failure
  dbRun(c.env.DB, "UPDATE share_tokens SET view_count = view_count + 1 WHERE id = ?", [row.id]).catch(() => {});

  // Get user mode + average cycle length
  const user = await dbFirst<UserRow>(
    c.env.DB,
    `SELECT u.mode,
       (SELECT CAST(ROUND(AVG(c.cycle_length)) AS INTEGER)
        FROM cycles c WHERE c.user_id = u.id AND c.cycle_length IS NOT NULL
       ) AS avg_cycle_length
     FROM users u WHERE u.id = ?`,
    [row.user_id]
  );
  if (!user) return c.json({ message: "Not found" }, 404);

  // Perimenopause: skip cycle day calculation
  if (user.mode === "perimenopause") {
    return c.json({
      phase:              "Perimenopause",
      cycle_day:          null,
      days_until_period:  null,
      phase_tip:          PHASE_TIPS.Perimenopause,
      mode:               "perimenopause",
    });
  }

  // Get latest cycle start
  const latest = await dbFirst<CycleRow>(
    c.env.DB,
    "SELECT start_date FROM cycles WHERE user_id = ? ORDER BY start_date DESC LIMIT 1",
    [row.user_id]
  );

  if (!latest) {
    return c.json({ phase: null, cycle_day: null, days_until_period: null, phase_tip: null, mode: user.mode });
  }

  const msPerDay   = 86_400_000;
  const now        = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const lastPeriod = new Date(latest.start_date + "T00:00:00Z");
  const daysSince  = Math.max(1, Math.round((now.getTime() - lastPeriod.getTime()) / msPerDay) + 1);
  const avgLen     = user.avg_cycle_length ?? 28;
  const nextDate   = new Date(lastPeriod.getTime() + avgLen * msPerDay);
  const daysLeft   = Math.round((nextDate.getTime() - now.getTime()) / msPerDay);
  const phase      = getPhase(Math.min(daysSince, 28));

  return c.json({
    phase,
    cycle_day:         Math.min(daysSince, 90),
    days_until_period: daysLeft > 0 ? daysLeft : null,
    phase_tip:         PHASE_TIPS[phase],
    mode:              user.mode,
  });
});

export default share;
