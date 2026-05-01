import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { MiddlewareHandler } from "hono";
import type { Env } from "./types";
import { verifyJWT } from "./lib/jwt";
import authRoutes from "./routes/auth";
import cyclesRoutes from "./routes/cycles";
import logsRoutes from "./routes/logs";
import insightsRoutes from "./routes/insights";
import exportRoutes from "./routes/export";
import stripeRoutes from "./routes/stripe";
import remindersRoutes from "./routes/reminders";
import cronRoutes, { processReminders, processMonthlyReports } from "./routes/cron";
import leadsRoutes from "./routes/leads";
import feedbackRoutes from "./routes/feedback";
import adminRoutes from "./routes/admin";

type Variables = { userId: string };

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Global middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowed = [
        "https://dawnphase.com",
        "https://www.dawnphase.com",
        "http://localhost:3000",
      ];
      return allowed.includes(origin) ? origin : "https://www.dawnphase.com";
    },
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    maxAge: 86400,
  })
);

// Health check — no env info in response to avoid leaking deployment details
app.get("/health", (c) => c.json({ status: "ok" }));

// ── Auth middleware ─────────────────────────────────────────────────────────
// Defined FIRST so it can be applied to any path, including sub-paths of
// routes that are otherwise public (e.g. /auth/me within /auth/*).

const requireAuth: MiddlewareHandler<{ Bindings: Env; Variables: Variables }> =
  async (c, next) => {
    const authorization = c.req.header("Authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const token = authorization.slice(7);
    const payload = await verifyJWT(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json({ message: "Invalid or expired token" }, 401);
    }
    c.set("userId", payload.sub);
    return next();
  };

// ── Route-level auth middleware ─────────────────────────────────────────────
// All app.use() calls must come BEFORE the corresponding app.route() call
// so that middleware executes before route handlers (Hono processes in
// registration order).

// /auth/me (GET, PATCH, DELETE) — not in the approved public list.
// The route handlers also self-verify JWTs for belt-and-suspenders safety.
app.use("/auth/me", requireAuth);

// Public routes — no auth required
// POST /auth/signup, /auth/login, /auth/forgot-password, /auth/reset-password
// GET  /auth/me, PATCH /auth/me, DELETE /auth/me  ← protected above
app.route("/auth", authRoutes);

// POST /leads — public lead capture from free tools (no auth required)
app.route("/leads", leadsRoutes);

// POST /feedback — public; attaches user_id if token present
app.route("/feedback", feedbackRoutes);

// GET /admin/feedback — admin-key protected
app.route("/admin", adminRoutes);

// GET /cron/reminders — spec-approved public (called by Cloudflare cron trigger)
app.route("/cron", cronRoutes);

// Protected resource routes
app.use("/cycles/*",       requireAuth);
app.use("/logs/*",         requireAuth);
app.use("/insights/*",     requireAuth);
app.use("/export/*",       requireAuth);
app.use("/reminders/*",    requireAuth);
// Stripe: checkout and portal require auth; webhook is intentionally public
// (Stripe calls it directly — it has no user JWT, and verifies via webhook secret)
app.use("/stripe/checkout", requireAuth);
app.use("/stripe/portal",   requireAuth);

app.route("/stripe",    stripeRoutes);
app.route("/cycles",    cyclesRoutes);
app.route("/logs",      logsRoutes);
app.route("/insights",  insightsRoutes);
app.route("/export",    exportRoutes);
app.route("/reminders", remindersRoutes);

// 404
app.notFound((c) => c.json({ message: "Not found" }, 404));

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ message: "Internal server error" }, 500);
});

// Export fetch handler + scheduled handler for Cloudflare Cron Triggers.
// Dispatch by cron pattern so each schedule runs the correct job.
export default {
  fetch: app.fetch.bind(app),
  async scheduled(
    event: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    if (event.cron === "0 9 1 * *") {
      // 1st of month at 09:00 UTC → monthly cycle report
      ctx.waitUntil(processMonthlyReports(env));
    } else {
      // Daily 09:00 UTC (or any other cron) → period reminders
      ctx.waitUntil(processReminders(env));
    }
  },
};
