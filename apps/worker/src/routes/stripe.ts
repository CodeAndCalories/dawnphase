import { Hono } from "hono";
import type { Env } from "../types";
import { dbRun, dbFirst } from "../lib/db";

const stripe = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

const PRICE_ID_PRO = "price_1TQKJWPLESHBmj2PxyzGZit7";
const TRIAL_DAYS = 7;

// ─── Create checkout session ──────────────────────────────────────────────────

stripe.post("/checkout", async (c) => {
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ message: "Stripe not configured" }, 503);
  }

  const userId = c.get("userId");
  const appUrl = c.env.APP_URL ?? "https://www.dawnphase.com";

  // Fetch user email so we can pass it to Stripe for fallback matching.
  const userRecord = await dbFirst<{ id: string; email: string }>(
    c.env.DB,
    "SELECT id, email FROM users WHERE id = ?",
    [userId]
  );
  if (!userRecord) {
    return c.json({ message: "User not found" }, 404);
  }

  console.log(`[stripe/checkout] userId=${userId} email=${userRecord.email}`);

  let res: Response;
  try {
    res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: "subscription",
        "line_items[0][price]": PRICE_ID_PRO,
        "line_items[0][quantity]": "1",
        // 7-day trial — card is required but not charged until day 8
        "subscription_data[trial_period_days]": String(TRIAL_DAYS),
        success_url: `${appUrl}/dashboard?checkout=success`,
        cancel_url:  `${appUrl}/`,
        // Three ways for the webhook to find the user — metadata, reference
        // id, and email — so a stale or missing field never silently drops updates.
        "metadata[user_id]":   userId,
        client_reference_id:   userId,
        customer_email:        userRecord.email,
        allow_promotion_codes: "true",
      }),
    });
  } catch (fetchErr) {
    console.error("[stripe/checkout] fetch threw:", fetchErr);
    return c.json({ message: `Stripe request failed: ${String(fetchErr)}` }, 500);
  }

  if (!res.ok) {
    // res.json() can itself throw if Stripe returns non-JSON — handle safely.
    let errMsg = `Stripe ${res.status}`;
    try {
      const body = await res.json() as { error?: { message?: string } };
      errMsg = body.error?.message ?? JSON.stringify(body);
    } catch {
      errMsg = await res.text().catch(() => `Stripe ${res.status} (unreadable body)`);
    }
    console.error("[stripe/checkout] Stripe API error:", errMsg);
    return c.json({ message: errMsg }, 500);
  }

  const session = (await res.json()) as { url: string; id: string };
  return c.json({ url: session.url, session_id: session.id });
});

// ─── Billing portal ───────────────────────────────────────────────────────────

stripe.post("/portal", async (c) => {
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ message: "Stripe not configured" }, 503);
  }

  const userId = c.get("userId");
  const appUrl = c.env.APP_URL ?? "https://www.dawnphase.com";

  const user = await dbFirst<{ stripe_customer_id: string | null }>(
    c.env.DB,
    "SELECT stripe_customer_id FROM users WHERE id = ?",
    [userId]
  );

  if (!user?.stripe_customer_id) {
    return c.json({ message: "No billing account found" }, 404);
  }

  const res = await fetch(
    "https://api.stripe.com/v1/billing_portal/sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        customer: user.stripe_customer_id,
        return_url: `${appUrl}/settings`,
      }),
    }
  );

  const portal = (await res.json()) as { url: string };
  return c.json({ url: portal.url });
});

// ─── Webhook ──────────────────────────────────────────────────────────────────
// Stripe sends events here. Register this URL in your Stripe dashboard:
//   https://dawnphase-worker.axigamingclips.workers.dev/stripe/webhook
// Events to enable: checkout.session.completed,
//                   customer.subscription.updated,
//                   customer.subscription.deleted

stripe.post("/webhook", async (c) => {
  const body = await c.req.text();

  // Skip signature verification until STRIPE_WEBHOOK_SECRET is a real whsec_ value.
  // TODO: implement full HMAC-SHA256 sig verification before going live.
  if (
    !c.env.STRIPE_WEBHOOK_SECRET ||
    c.env.STRIPE_WEBHOOK_SECRET === "pending"
  ) {
    console.warn("Webhook: STRIPE_WEBHOOK_SECRET not set — skipping sig verification");
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(body) as typeof event;
  } catch {
    return c.json({ message: "Invalid JSON" }, 400);
  }

  // checkout.session.completed fires when the user finishes Stripe checkout.
  // For a trial subscription the subscription starts in `trialing` status —
  // so we write `trialing` here. `customer.subscription.updated` handles the
  // transition to `active` once the trial ends and payment succeeds.
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerId = session.customer as string;

    // Resolve userId via three fallbacks so a stale/missing field never
    // silently drops the update.
    let userId =
      (session.metadata as Record<string, string> | null)?.user_id ||
      (session.client_reference_id as string | null);

    if (!userId) {
      const email =
        (session.customer_details as Record<string, string> | null)?.email ||
        (session.customer_email as string | null);
      if (email) {
        const found = await dbFirst<{ id: string }>(
          c.env.DB,
          "SELECT id FROM users WHERE email = ?",
          [email]
        );
        if (found) userId = found.id;
      }
    }

    if (!userId) {
      console.error("Webhook: could not resolve userId for session", session.id);
      return c.json({ received: true });
    }

    const result = await dbRun(
      c.env.DB,
      `UPDATE users
       SET subscription_status = 'trialing',
           stripe_customer_id  = ?
       WHERE id = ?`,
      [customerId, userId]
    );
    console.log(
      `User ${userId} → trialing (customer ${customerId}) changes=${result.meta.changes}`
    );
  }

  // Fired on every subscription state change (trial end, payment, cancel, etc.)
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object;
    const customerId = sub.customer as string;
    const status = sub.status as string;
    const valid = ["trialing", "active", "past_due", "canceled", "incomplete"];
    if (valid.includes(status)) {
      await dbRun(
        c.env.DB,
        "UPDATE users SET subscription_status = ? WHERE stripe_customer_id = ?",
        [status, customerId]
      );
      console.log(`Customer ${customerId} → ${status}`);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    const customerId = sub.customer as string;
    await dbRun(
      c.env.DB,
      "UPDATE users SET subscription_status = 'canceled' WHERE stripe_customer_id = ?",
      [customerId]
    );
    console.log(`Customer ${customerId} → canceled`);
  }

  return c.json({ received: true });
});

export default stripe;
