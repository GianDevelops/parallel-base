import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface LineItem {
  name: string;
  amount: number; // in dollars
  recurring?: boolean; // true → subscription line, false → one-time
}

interface CheckoutBody {
  email: string;
  name: string;
  phone?: string;
  property?: string;
  campaignType?: string;
  autoRenewAds?: boolean;
  lineItems: LineItem[];
  metadata?: Record<string, string>;
  idempotencyKey?: string;
}

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey
  ? new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" })
  : null;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured. Set STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as CheckoutBody;
    const { email, name, lineItems, metadata = {}, autoRenewAds, idempotencyKey } = body;

    if (!email || !lineItems?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Stripe idempotency: identical requests with the same key return the same result
    // without creating duplicate objects, regardless of retries.
    const idemRequestOptions = idempotencyKey
      ? { idempotencyKey }
      : undefined;

    // Create or retrieve customer (idempotent by email)
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer = existing.data[0]
      ? existing.data[0]
      : await stripe.customers.create({
          email,
          name,
          phone: body.phone,
          metadata: {
            campaignType: body.campaignType || "",
            property: body.property || "",
          },
        });

    const recurring = lineItems.filter((li) => li.recurring);
    const oneTime = lineItems.filter((li) => !li.recurring);

    // SUBSCRIPTION path: any auto-renew items present
    if (autoRenewAds && recurring.length > 0) {
      // Create products + prices on the fly. For each recurring line item, create a
      // monthly recurring price; one-time items become invoice items on the first invoice.
      const subscriptionItems = await Promise.all(
        recurring.map(async (li) => {
          const product = await stripe!.products.create({ name: li.name });
          const price = await stripe!.prices.create({
            product: product.id,
            unit_amount: Math.round(li.amount * 100),
            currency: "usd",
            recurring: { interval: "month" },
          });
          return { price: price.id };
        })
      );

      // Add one-time items as invoice items on the upcoming first invoice
      for (const li of oneTime) {
        await stripe.invoiceItems.create({
          customer: customer.id,
          amount: Math.round(li.amount * 100),
          currency: "usd",
          description: li.name,
        });
      }

      const subscription = await stripe.subscriptions.create(
        {
          customer: customer.id,
          items: subscriptionItems,
          payment_behavior: "default_incomplete",
          payment_settings: { save_default_payment_method: "on_subscription" },
          expand: ["latest_invoice.confirmation_secret"],
          metadata,
        },
        idemRequestOptions
      );

      const invoice = subscription.latest_invoice as Stripe.Invoice & {
        confirmation_secret?: { client_secret: string };
      };
      const clientSecret = invoice.confirmation_secret?.client_secret;

      if (!clientSecret) {
        return NextResponse.json(
          { error: "Could not retrieve client secret from subscription invoice." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        clientSecret,
        mode: "subscription",
        subscriptionId: subscription.id,
        customerId: customer.id,
      });
    }

    // PAYMENT path: one-time charge for the full total
    const totalCents = lineItems.reduce(
      (sum, li) => sum + Math.round(li.amount * 100),
      0
    );

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totalCents,
        currency: "usd",
        customer: customer.id,
        receipt_email: email,
        automatic_payment_methods: { enabled: true },
        description: lineItems.map((li) => li.name).join(", "),
        metadata,
      },
      idemRequestOptions
    );

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      mode: "payment",
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
