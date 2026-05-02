import { Hono } from "hono";
import type { Env } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";

interface UserCodeRow {
  referral_code: string | null;
}

function makeCode(): string {
  // DAWN- + 6 uppercase alphanumeric chars derived from a UUID
  return "DAWN-" + crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
}

const referral = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

// ── POST /referral/generate ────────────────────────────────────────────────────

referral.post("/generate", async (c) => {
  const userId = c.get("userId");

  // Check if user already has a code
  const userRow = await dbFirst<UserCodeRow>(
    c.env.DB,
    "SELECT referral_code FROM users WHERE id = ?",
    [userId]
  );

  if (userRow?.referral_code) {
    const code = userRow.referral_code;
    return c.json({
      code,
      url: `https://www.dawnphase.com/signup?ref=${code}`,
    });
  }

  // Generate a new unique code
  let code = makeCode();
  // Retry once on collision (vanishingly rare)
  const collision = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM referrals WHERE referral_code = ?",
    [code]
  );
  if (collision) code = makeCode();

  // Store on user + create referrals record
  await dbRun(c.env.DB, "UPDATE users SET referral_code = ? WHERE id = ?", [code, userId]);
  await dbRun(
    c.env.DB,
    "INSERT INTO referrals (id, referrer_id, referral_code, status) VALUES (?, ?, ?, 'pending')",
    [newId(), userId, code]
  );

  return c.json({ code, url: `https://www.dawnphase.com/signup?ref=${code}` });
});

// ── GET /referral/stats ───────────────────────────────────────────────────────

referral.get("/stats", async (c) => {
  const userId = c.get("userId");

  const userRow = await dbFirst<UserCodeRow>(
    c.env.DB,
    "SELECT referral_code FROM users WHERE id = ?",
    [userId]
  );

  const code = userRow?.referral_code ?? null;

  if (!code) {
    return c.json({ total_referrals: 0, converted: 0, pending: 0, code: null, url: null });
  }

  // Count all referral rows for this user
  const rows = await dbFirst<{ total: number; converted: number }>(
    c.env.DB,
    `SELECT
       COUNT(*) AS total,
       SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) AS converted
     FROM referrals WHERE referrer_id = ?`,
    [userId]
  );

  const total     = rows?.total     ?? 0;
  const converted = rows?.converted ?? 0;

  return c.json({
    total_referrals: total,
    converted,
    pending: total - converted,
    code,
    url: `https://www.dawnphase.com/signup?ref=${code}`,
  });
});

export default referral;
