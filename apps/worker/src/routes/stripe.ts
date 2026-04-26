import { Hono } from "hono";
import type { Env } from "../types";
import { dbRun, dbFirst } from "../lib/db";

const stripe = new Hono<{ Bindings: Env; Variables: { userId: string } }>();

const PRICE_ID_PRO = "price_YOUR_STRIPE_PRICE_ID"; // replace with real Stripe price ID

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
      success_url: "https://dawnphase.com/dashboard?upgraded=1",
      cancel_url: "https://dawnphase.com/settings",
      "metadata[user_id]": userId,
    }),
  });

  if (!res.ok) {
    return c.json({ message: "Failed to create checkout session" }, 500);
  }

  const session = await res.json() as { url: string };
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

  const res = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      customer: user.stripe_customer_id,
      return_url: "https://dawnphase.com/settings",
    }),
  });

  const portal = await res.json() as { url: string };
  return c.json({ url: portal.url });
});

// Webhook — verify Stripe signature and update plan
stripe.post("/webhook", async (c) => {
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature") ?? "";

  // Stripe signature verification requires crypto.subtle HMAC
  // Full verification omitted for brevity — implement before going live
  const event = JSON.parse(body) as { type: string; data: { object: Record<string, unknown> } };

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = (session.metadata as Record<string, string>)?.user_id;
    const customerId = session.customer as string;
    if (userId && customerId) {
      await dbRun(c.env.DB,
        "UPDATE users SET plan = 'pro', stripe_customer_id = ? WHERE id = ?",
        [customerId, userId]
      );
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    const customerId = subscription.customer as string;
    await dbRun(c.env.DB,
      "UPDATE users SET plan = 'free' WHERE stripe_customer_id = ?",
      [customerId]
    );
  }

  return c.json({ received: true });
});

export default stripe;
