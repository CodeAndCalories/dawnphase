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
import cronRoutes, { processReminders } from "./routes/cron";

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
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

// Health check
app.get("/health", (c) => c.json({ status: "ok", env: c.env.ENVIRONMENT }));

// Public routes
app.route("/auth", authRoutes);
app.route("/stripe", stripeRoutes);
app.route("/cron", cronRoutes);

// Auth middleware
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

app.use("/cycles/*", requireAuth);
app.use("/logs/*", requireAuth);
app.use("/insights/*", requireAuth);
app.use("/export/*", requireAuth);
app.use("/reminders/*", requireAuth);
app.use("/stripe/checkout", requireAuth);
app.use("/stripe/portal", requireAuth);

// Protected routes
app.route("/cycles", cyclesRoutes);
app.route("/logs", logsRoutes);
app.route("/insights", insightsRoutes);
app.route("/export", exportRoutes);
app.route("/reminders", remindersRoutes);

// 404
app.notFound((c) => c.json({ message: "Not found" }, 404));

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json({ message: "Internal server error" }, 500);
});

// Export fetch handler + scheduled handler for Cloudflare Cron Triggers.
// The scheduled() handler fires when wrangler.toml [triggers] crons match;
// it runs the same processReminders logic as GET /cron/reminders.
export default {
  fetch: app.fetch.bind(app),
  async scheduled(
    _event: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(processReminders(env));
  },
};
