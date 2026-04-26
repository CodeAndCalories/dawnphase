import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Env, User } from "../types";
import { dbFirst, dbRun, newId } from "../lib/db";
import { signJWT, verifyJWT } from "../lib/jwt";
import { sendEmail, welcomeEmail } from "../lib/email";

const auth = new Hono<{ Bindings: Env }>();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
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
  const { email, password, name } = c.req.valid("json");

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

  await dbRun(
    c.env.DB,
    `INSERT INTO users
       (id, email, password_hash, mode, subscription_status, trial_ends_at, created_at)
     VALUES
       (?, ?, ?, 'cycle', 'trialing', datetime('now', '+7 days'), datetime('now'))`,
    [id, email, passwordHash]
  );

  const token = await signJWT(
    { sub: id, email, status: "trialing" },
    c.env.JWT_SECRET
  );

  // Fire-and-forget welcome email — name comes from signup body, not DB
  sendEmail(c.env.RESEND_API_KEY, {
    to: email,
    subject: "Welcome to Dawn Phase!",
    html: welcomeEmail(name),
  }).catch(() => {});

  return c.json(
    { token, user: { id, email, name, mode: "cycle", status: "trialing" } },
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
    `SELECT id, email, mode, subscription_status, trial_ends_at, created_at
     FROM users WHERE id = ?`,
    [payload.sub]
  );

  if (!user) return c.json({ message: "User not found" }, 404);
  return c.json({ user });
});

const patchMeSchema = z.object({
  mode: z.enum(["cycle", "perimenopause"]),
});

auth.patch("/me", zValidator("json", patchMeSchema), async (c) => {
  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  const token = authorization.slice(7);
  const payload = await verifyJWT(token, c.env.JWT_SECRET);
  if (!payload) return c.json({ message: "Invalid or expired token" }, 401);

  const { mode } = c.req.valid("json");
  await dbRun(c.env.DB, "UPDATE users SET mode = ? WHERE id = ?", [mode, payload.sub]);

  const user = await dbFirst<User>(
    c.env.DB,
    "SELECT id, email, mode, subscription_status, trial_ends_at, created_at FROM users WHERE id = ?",
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

export default auth;
