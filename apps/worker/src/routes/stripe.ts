import { Hono } from "hono";
import type { Env } from "../types";
import { dbRun, dbFirst } from "../lib/db";

const stripe = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

const PRICE_ID_PRO = "price_1TQKJWPLESHBmj2PxyzGZit7";

stripe.post("/checkout", async (c) => {
  const userId = c.get("userId");

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": PRICE_ID_PRO,
      "line_items[0][quantity]": "1",
      success_url: "https://www.dawnphase.com/dashboard",
      cancel_url: "https://www.dawnphase.com",
      "metadata[user_id]": userId,
    }),
  });

  if (!res.ok) {
    return c.json({ message: "Failed to create checkout session" }, 500);
  }

  const session = (await res.json()) as { url: string };
  return c.json({ url: session.url });
});

stripe.post("/portal", async (c) => {
  const userId = c.get("userId");

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
        return_url: "https://www.dawnphase.com/settings",
      }),
    }
  );

  const portal = (await res.json()) as { url: string };
  return c.json({ url: portal.url });
});

// Webhook — verify Stripe signature and update subscription status
stripe.post("/webhook", async (c) => {
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature") ?? "";

  if (!sig || !c.env.STRIPE_WEBHOOK_SECRET || c.env.STRIPE_WEBHOOK_SECRET === "pending") {
    return c.json({ message: "Webhook not configured" }, 400);
  }

  const event = JSON.parse(body) as {
    type: string;
    data: { object: Record<string, unknown> };
  };

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = (session.metadata as Record<string, string>)?.user_id;
    const customerId = session.customer as string;
    if (userId && customerId) {
      await dbRun(
        c.env.DB,
        "UPDATE users SET subscription_status = 'active', stripe_customer_id = ? WHERE id = ?",
        [customerId, userId]
      );
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
  }

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object;
    const customerId = sub.customer as string;
    const status = sub.status as string;
    const validStatuses = ["trialing", "active", "past_due", "canceled", "incomplete"];
    if (validStatuses.includes(status)) {
      await dbRun(
        c.env.DB,
        "UPDATE users SET subscription_status = ? WHERE stripe_customer_id = ?",
        [status, customerId]
      );
    }
  }

  return c.json({ received: true });
});

export default stripe;
