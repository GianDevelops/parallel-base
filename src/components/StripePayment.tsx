"use client";

import { useEffect, useRef, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface LineItem {
  name: string;
  amount: number;
  recurring?: boolean;
}

interface PaymentProps {
  email: string;
  name: string;
  phone?: string;
  property?: string;
  campaignType?: string;
  autoRenewAds?: boolean;
  lineItems: LineItem[];
  metadata?: Record<string, string>;
  total: number;
  onSuccess: () => void;
}

const pubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  if (!stripePromise && pubKey) stripePromise = loadStripe(pubKey);
  return stripePromise;
};

// Fingerprint identifies an order — if the order changes, a new PaymentIntent is created.
// If it's the same (e.g. user navigates back/forward), the existing intent is reused.
const FINGERPRINT_KEY = "pb_pi_fp";
const SECRET_KEY = "pb_pi_secret";
const IDEM_KEY = "pb_pi_idem";

function buildFingerprint(props: PaymentProps): string {
  return JSON.stringify({
    email: props.email,
    autoRenew: !!props.autoRenewAds,
    items: props.lineItems.map((li) => ({
      n: li.name,
      a: li.amount,
      r: !!li.recurring,
    })),
  });
}

function clearCachedIntent() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(FINGERPRINT_KEY);
  sessionStorage.removeItem(SECRET_KEY);
  sessionStorage.removeItem(IDEM_KEY);
}

// Stripe uses idempotency keys to dedupe — identical key → identical result, no new objects.
// Tied to the order fingerprint so changing the order generates a fresh key.
function getOrCreateIdempotencyKey(fp: string): string {
  if (typeof window === "undefined") {
    return `pb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
  }
  const storedFp = sessionStorage.getItem(FINGERPRINT_KEY);
  const storedKey = sessionStorage.getItem(IDEM_KEY);
  if (storedFp === fp && storedKey) return storedKey;
  const key = `pb_${crypto.randomUUID()}`;
  // CRITICAL: store fingerprint + key together. If we only stored the key, a second
  // call before the API response would see no fingerprint match and create a new key.
  sessionStorage.setItem(FINGERPRINT_KEY, fp);
  sessionStorage.setItem(IDEM_KEY, key);
  return key;
}

export default function StripePayment(props: PaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  // Synchronous lock: prevents racing parallel fetches when useEffect re-fires
  // before the first call has written its result to sessionStorage.
  const inflightFpRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pubKey) {
      setLoadError(
        "Stripe is not configured yet. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY to .env.local."
      );
      return;
    }

    const fp = buildFingerprint(props);

    // Reuse cached intent if the order is unchanged
    if (typeof window !== "undefined") {
      const cachedFp = sessionStorage.getItem(FINGERPRINT_KEY);
      const cachedSecret = sessionStorage.getItem(SECRET_KEY);
      if (cachedFp === fp && cachedSecret) {
        setClientSecret(cachedSecret);
        return;
      }
    }

    // If a fetch is already in-flight for this exact fingerprint, skip
    if (inflightFpRef.current === fp) return;
    inflightFpRef.current = fp;

    const idempotencyKey = getOrCreateIdempotencyKey(fp);

    let active = true;
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: props.email,
        name: props.name,
        phone: props.phone,
        property: props.property,
        campaignType: props.campaignType,
        autoRenewAds: props.autoRenewAds,
        lineItems: props.lineItems,
        metadata: props.metadata,
        idempotencyKey,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        inflightFpRef.current = null;
        if (!active) return;
        if (data.clientSecret) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(FINGERPRINT_KEY, fp);
            sessionStorage.setItem(SECRET_KEY, data.clientSecret);
          }
          setClientSecret(data.clientSecret);
        } else {
          setLoadError(data.error || "Could not initialize payment.");
        }
      })
      .catch((e) => {
        inflightFpRef.current = null;
        if (active) setLoadError(e.message);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.email,
    props.autoRenewAds,
    JSON.stringify(props.lineItems),
  ]);

  if (loadError) {
    return (
      <div className="border border-red-500/40 bg-red-500/10 px-4 py-3 rounded-xl text-sm text-red-400">
        {loadError}
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="border border-border/50 bg-background px-4 py-6 rounded-xl text-sm text-muted text-center">
        Preparing secure payment…
      </div>
    );
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#00E5CC",
            colorBackground: "#0C0C0C",
            colorText: "#EDEDED",
            colorDanger: "#ef4444",
            fontFamily: "Satoshi, system-ui, sans-serif",
            borderRadius: "12px",
          },
        },
      }}
    >
      <PaymentForm total={props.total} onSuccess={props.onSuccess} />
    </Elements>
  );
}

function PaymentForm({
  total,
  onSuccess,
}: {
  total: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed.");
      setSubmitting(false);
      return;
    }

    // Clear cached intent so a future order in the same session starts fresh
    clearCachedIntent();
    setSubmitting(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <PaymentElement options={{ layout: { type: "tabs", defaultCollapsed: false } }} />
      {error && (
        <div className="text-[13px] text-red-400 border border-red-500/40 bg-red-500/10 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className={`w-full px-7 py-3 rounded-xl text-sm font-bold tracking-[0.01em] transition-all ${
          submitting || !stripe
            ? "bg-surface-light text-muted/40 cursor-not-allowed"
            : "bg-accent text-background cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,229,204,0.3)] active:translate-y-0 active:shadow-none"
        }`}
      >
        {submitting ? "Processing…" : `Pay $${total.toLocaleString()} →`}
      </button>
      <p className="text-[10px] text-muted/40 text-center font-mono uppercase tracking-[0.15em]">
        Secured by Stripe
      </p>
    </form>
  );
}
