import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env, User } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";
import { signJWT, verifyJWT } from "../lib/jwt";
import { sendEmail, welcomeEmail, passwordResetEmail } from "../lib/email";

const auth = new Hono<{ Bindings: Env }>();

const signupSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
  name:     z.string().min(1),
  ref_code: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

auth.post("/signup", zValidator("json", signupSchema), async (c) => {
  const { email, password, name, ref_code } = c.req.valid("json");

  const existing = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM users WHERE email = ?",
    [email]
  );
  if (existing) {
    return c.json({ message: "Email already in use" }, 409);
  }

  const id = newId();
  const passwordHash = await hashPassword(password);

  // subscription_status starts as 'incomplete' until Stripe checkout
  // completes. The webhook (checkout.session.completed) flips it to
  // 'trialing' and sets trial_ends_at at that point.
  await dbRun(
    c.env.DB,
    `INSERT INTO users
       (id, email, password_hash, mode, subscription_status, created_at)
     VALUES
       (?, ?, ?, 'cycle', 'incomplete', datetime('now'))`,
    [id, email, passwordHash]
  );

  const token = await signJWT(
    { sub: id, email, status: "incomplete" },
    c.env.JWT_SECRET
  );

  // Track referral conversion — fire-and-forget, never blocks the response
  if (ref_code) {
    (async () => {
      try {
        const row = await dbFirst<{ id: string }>(
          c.env.DB,
          "SELECT id FROM referrals WHERE referral_code = ? AND status = 'pending'",
          [ref_code]
        );
        if (row) {
          await dbRun(
            c.env.DB,
            `UPDATE referrals
             SET referred_user_id = ?,
                 referred_email   = ?,
                 status           = 'converted',
                 converted_at     = datetime('now')
             WHERE id = ?`,
            [id, email, row.id]
          );
        }
      } catch {}
    })();
  }

  // Fire-and-forget welcome email
  sendEmail(c.env.RESEND_API_KEY, {
    to: email,
    subject: "Welcome to Dawn Phase 🌅",
    html: welcomeEmail(email),
  }).catch(() => {});

  return c.json(
    { token, user: { id, email, name, mode: "cycle", status: "incomplete" } },
    201
  );
});

auth.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const user = await dbFirst<User>(
    c.env.DB,
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (!user) {
    return c.json({ message: "Invalid email or password" }, 401);
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.password_hash) {
    return c.json({ message: "Invalid email or password" }, 401);
  }

  const token = await signJWT(
    { sub: user.id, email: user.email, status: user.subscription_status },
    c.env.JWT_SECRET
  );

  return c.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      mode: user.mode,
      status: user.subscription_status,
    },
  });
});

auth.get("/me", async (c) => {
  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authorization.slice(7);
  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ message: "Invalid or expired token" }, 401);
  }

  const user = await dbFirst<User>(
    c.env.DB,
    `SELECT id, email, mode, birth_date, subscription_status, trial_ends_at, created_at
     FROM users WHERE id = ?`,
    [payload.sub]
  );

  if (!user) return c.json({ message: "User not found" }, 404);
  return c.json({ user });
});

const patchMeSchema = z.object({
  mode: z.enum(["cycle", "perimenopause"]).optional(),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
});

auth.patch("/me", zValidator("json", patchMeSchema), async (c) => {
  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const token = authorization.slice(7);
  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ message: "Invalid or expired token" }, 401);

  const body = c.req.valid("json");
  const sets: string[] = [];
  const vals: (string | null)[] = [];

  if (body.mode !== undefined)       { sets.push("mode = ?");       vals.push(body.mode); }
  if (body.birth_date !== undefined) { sets.push("birth_date = ?"); vals.push(body.birth_date); }

  if (sets.length > 0) {
    vals.push(payload.sub);
    await dbRun(c.env.DB, `UPDATE users SET ${sets.join(", ")} WHERE id = ?`, vals);
  }

  const user = await dbFirst<User>(
    c.env.DB,
    "SELECT id, email, mode, birth_date, subscription_status, trial_ends_at, created_at FROM users WHERE id = ?",
    [payload.sub]
  );
  if (!user) return c.json({ message: "User not found" }, 404);
  return c.json({ user });
});

auth.delete("/me", async (c) => {
  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const token = authorization.slice(7);
  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ message: "Invalid or expired token" }, 401);

  await dbRun(c.env.DB, "DELETE FROM users WHERE id = ?", [payload.sub]);
  return c.json({ message: "Account deleted" });
});

// ── Forgot password ────────────────────────────────────────────────────────────

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

auth.post("/forgot-password", zValidator("json", forgotPasswordSchema), async (c) => {
  const { email } = c.req.valid("json");
  const appUrl = c.env.APP_URL ?? "https://www.dawnphase.com";

  const user = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (user) {
    const token = crypto.randomUUID();
    const expires = Date.now() + 3_600_000; // 1 hour

    await dbRun(
      c.env.DB,
      "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
      [token, expires, user.id]
    );

    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    sendEmail(c.env.RESEND_API_KEY, {
      to: email,
      subject: "Reset your Dawn Phase password",
      html: passwordResetEmail(email, resetUrl),
    }).catch(() => {});
  }

  // Always return 200 — don't reveal whether the email exists.
  return c.json({
    message: "If that email is registered, a reset link is on its way.",
  });
});

// ── Reset password ─────────────────────────────────────────────────────────────

const resetPasswordSchema = z.object({
  token:    z.string().min(1),
  password: z.string().min(8),
});

auth.post("/reset-password", zValidator("json", resetPasswordSchema), async (c) => {
  const { token, password } = c.req.valid("json");

  const user = await dbFirst<{ id: string }>(
    c.env.DB,
    "SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > ?",
    [token, Date.now()]
  );

  if (!user) {
    return c.json({ message: "Invalid or expired link" }, 400);
  }

  const passwordHash = await hashPassword(password);

  await dbRun(
    c.env.DB,
    `UPDATE users
     SET password_hash         = ?,
         reset_token           = NULL,
         reset_token_expires   = NULL
     WHERE id = ?`,
    [passwordHash, user.id]
  );

  return c.json({ message: "Password updated successfully" });
});

export default auth;
