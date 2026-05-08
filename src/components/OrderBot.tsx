"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import StripePayment from "./StripePayment";

const AVATAR_SRC = "/images/bot/avatar.jpg";

const SERVICES = [
  {
    id: "google_ads",
    name: "Google Ads Campaign",
    price: 395,
    tag: "High Intent",
    desc: "30 days · ad budget included. Search + Display + Performance Max.",
  },
  {
    id: "meta_ads",
    name: "Meta Ads Campaign",
    price: 345,
    tag: "Visual Impact",
    desc: "30 days · ad budget included. Facebook + Instagram targeting.",
  },
  {
    id: "landing_page",
    name: "Lead Generation Landing Page",
    price: 595,
    tag: "Conversion Engine",
    desc: "6 months live · 30% off renewal. Custom page, lead capture, CRM-wired.",
    recommended: true,
  },
  {
    id: "youtube",
    name: "Property Tour Video on YouTube",
    price: 245,
    tag: "Video Reach",
    desc: "Targeted YouTube placement for your property tour video.",
  },
];

// Landing page pricing varies by campaign type
const LANDING_PAGE_VARIANTS: Record<
  "listing" | "brand" | "building",
  { label: string; price: number; blurb: string }
> = {
  listing: {
    label: "Listing Landing Page",
    price: 595,
    blurb: "One property. One mission. One page built to sell it.",
  },
  brand: {
    label: "Brand Landing Page",
    price: 1295,
    blurb: "Establish territory authority. Your market, your brand, your pipeline.",
  },
  building: {
    label: "Building / New Construction Landing Page",
    price: 995,
    blurb: "Floor plans, amenities, and lifestyle content for a specific building or development.",
  },
};

const BUNDLE = {
  ids: ["google_ads", "meta_ads", "landing_page"],
  label: "Full Stack Package",
  tagline: "Best Results · Most agents choose this",
};

const STEPS = [
  "welcome",
  "contact",
  "campaign",
  "property",
  "launch",
  "services",
  "upsell",
  "destination",
  "targeting",
  "creative",
  "brand_assets",
  "domain",
  "summary",
  "payment",
  "confirmation",
];

const CREATIVE_PRICE = 15;
const DOMAIN_PRICE = 25;

// Sample ad creatives shown when the customer asks us to build creative for them.
// We pick 3 at random for the style picker.
const CREATIVE_SAMPLES = [
  { file: "ad-malibu-luxury.jpg", label: "Malibu Luxury" },
  { file: "ad-miami-dream.jpg", label: "Miami Dream" },
  { file: "ad-newport-coastal.jpg", label: "Newport Coastal" },
  { file: "ad-santa-monica-ocean.jpg", label: "Santa Monica Ocean" },
  { file: "ad-seattle-luxury.jpg", label: "Seattle Luxury" },
];

const minDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
};

const fmtDate = (s: string) =>
  new Date(s + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const fmtCur = (n: number) => "$" + n.toLocaleString();

/* ── Bubble Components ── */

function PBAvatar() {
  return (
    <div className="relative w-[34px] h-[34px] rounded-full flex-shrink-0 overflow-hidden border border-accent/40 shadow-[0_0_12px_rgba(0,229,204,0.2)]">
      <Image
        src={AVATAR_SRC}
        alt="Parallel Base assistant"
        fill
        sizes="34px"
        className="object-cover object-[50%_25%]"
      />
    </div>
  );
}

function BotBubble({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const [show, setShow] = useState(delay === 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);

  useEffect(() => {
    if (show && ref.current)
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [show]);

  if (!show)
    return (
      <div className="flex gap-2.5 items-start mb-2.5">
        <PBAvatar />
        <div className="bg-surface px-5 py-4 rounded-2xl rounded-tl-sm border border-border/50 flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-muted/50"
              style={{ animation: `dotPulse 1.2s ease infinite ${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );

  return (
    <div
      ref={ref}
      className="flex gap-2.5 items-start mb-2.5 animate-[fadeUp_0.35s_ease]"
    >
      <PBAvatar />
      <div className="bg-surface text-muted px-4 py-3.5 rounded-2xl rounded-tl-sm border border-border/50 max-w-[82%] text-sm leading-relaxed shadow-sm">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  return (
    <div
      ref={ref}
      className="flex justify-end mb-2.5 animate-[fadeUp_0.25s_ease]"
    >
      <div className="bg-accent text-background px-4 py-3 rounded-2xl rounded-tr-sm max-w-[75%] text-sm leading-snug font-medium shadow-sm">
        {children}
      </div>
    </div>
  );
}

/* ── Input Components ── */

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background text-foreground text-sm outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)] placeholder:text-muted/50"
    />
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-7 py-3.5 rounded-xl text-sm font-bold tracking-[0.01em] transition-all ${
        disabled
          ? "bg-surface-light text-muted/40 cursor-not-allowed"
          : "bg-accent text-background cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,229,204,0.3)] active:translate-y-0 active:shadow-none"
      }`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-5 py-3 rounded-xl border border-border/50 text-muted text-sm cursor-pointer transition-all hover:border-accent hover:text-accent hover:bg-accent/5"
    >
      {children}
    </button>
  );
}

/* ── Card Components ── */

function ServiceCard({
  service,
  selected,
  onToggle,
}: {
  service: (typeof SERVICES)[0];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className={`border px-3.5 py-2 rounded-xl cursor-pointer transition-all relative ${
        selected
          ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgba(0,229,204,0.1)]"
          : "border-border/50 bg-background hover:border-border-light"
      }`}
    >
      <div className="flex justify-between items-center gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[13.5px] text-foreground leading-tight">
              {service.name}
            </span>
            <span
              className={`text-[9px] font-bold tracking-[0.08em] uppercase leading-none ${
                selected ? "text-accent" : "text-muted/40"
              }`}
            >
              {service.tag}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`font-bold text-[15px] ${selected ? "text-accent" : "text-foreground"}`}
          >
            {fmtCur(service.price)}
          </span>
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              selected
                ? "border-accent bg-accent"
                : "border-muted/40 bg-transparent"
            }`}
          >
            {selected && (
              <span className="text-background font-extrabold text-[13px]">
                ✓
              </span>
            )}
          </div>
        </div>
      </div>
      {service.recommended && (
        <div className="absolute -top-2 right-3 bg-accent text-background text-[9px] font-bold px-2 py-0.5 rounded-md tracking-[0.05em] uppercase leading-none">
          Recommended
        </div>
      )}
    </div>
  );
}

function TargetingGroup({
  label,
  sub,
  values,
  onChange,
}: {
  label: string;
  sub: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const visibleCount = values.filter((_, i) => i === 0 || values[i] !== "" || values.slice(0, i).some((v, j) => j > 0 && v !== "")).length || 1;
  const [shown, setShown] = useState(1);

  const addRow = () => {
    if (shown < values.length) setShown(shown + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <div className="text-[13px] font-semibold text-foreground">{label}</div>
          <div className="text-[11px] text-muted/50">{sub}</div>
        </div>
        {shown < values.length && (
          <button
            onClick={addRow}
            className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm font-bold hover:bg-accent/20 transition-colors cursor-pointer"
          >
            +
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {values.slice(0, shown).map((v, i) => (
          <div key={i} className="animate-[fadeUp_0.25s_ease]">
            <TextInput
              placeholder={`${label} ${i + 1} (optional)`}
              value={v}
              onChange={(nv) => {
                const u = [...values];
                u[i] = nv;
                onChange(u);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Bot ── */

interface OrderData {
  name: string;
  phone: string;
  email: string;
  property: string;
  brandFocusArea: string;
  buildingName: string;
  buildingMaterialsLink: string;
  brandAssetsLink: string;
  services: string[];
  campaignType: "" | "listing" | "brand" | "building";
  skipAds: boolean;
  adDestination: string;
  geos: string[];
  audiences: string[];
  websites: string[];
  creativeOption: "" | "own" | "provide";
  creativeStyle: string;
  creativeLink: string;
  autoRenewAds: boolean;
  domainOwnership: "" | "owns" | "needs_purchase";
  existingDomain: string;
  domainOptions: string[];
  launchDate: string;
}

export default function OrderBot() {
  const [step, setStepRaw] = useState(0);
  const [data, setData] = useState<OrderData>({
    name: "",
    phone: "",
    email: "",
    property: "",
    brandFocusArea: "",
    buildingName: "",
    buildingMaterialsLink: "",
    brandAssetsLink: "",
    services: [],
    campaignType: "",
    skipAds: false,
    adDestination: "",
    geos: ["", "", "", ""],
    audiences: ["", "", "", ""],
    websites: ["", "", "", ""],
    creativeOption: "",
    creativeStyle: "",
    creativeLink: "",
    autoRenewAds: false,
    domainOwnership: "",
    existingDomain: "",
    domainOptions: ["", "", "", "", ""],
    launchDate: "",
  });
  const [msgs, setMsgs] = useState<{ from: string; text: string }[]>([]);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // History stack of visited step indices for the Back button
  const historyRef = useRef<number[]>([0]);

  // 3 random creative samples chosen on the client to avoid hydration mismatch
  const [creativeSamples, setCreativeSamples] = useState<typeof CREATIVE_SAMPLES>([]);
  useEffect(() => {
    if (data.creativeOption === "provide" && creativeSamples.length === 0) {
      const shuffled = [...CREATIVE_SAMPLES].sort(() => Math.random() - 0.5);
      setCreativeSamples(shuffled.slice(0, 3));
    }
  }, [data.creativeOption, creativeSamples.length]);

  // Wrap setStep so every forward transition is recorded
  const setStep = (next: number) => {
    historyRef.current.push(next);
    setStepRaw(next);
  };

  const goBack = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop();
    const previous = historyRef.current[historyRef.current.length - 1];
    setMsgs([]);
    setStepRaw(previous);
  };

  const cur = STEPS[step];
  const hasLP = data.services.includes("landing_page");
  const hasGoogle = data.services.includes("google_ads");
  const hasMeta = data.services.includes("meta_ads");
  const hasAds = hasGoogle || hasMeta;
  const adPlatformCount = [hasGoogle, hasMeta].filter(Boolean).length;
  const creativeCost =
    data.creativeOption === "provide" ? adPlatformCount * CREATIVE_PRICE : 0;
  const domainCost =
    data.domainOwnership === "needs_purchase" ? DOMAIN_PRICE : 0;

  // Landing page price depends on campaignType (if set), otherwise default from SERVICES
  const lpVariant = data.campaignType
    ? LANDING_PAGE_VARIANTS[data.campaignType]
    : null;
  const lpPrice = lpVariant?.price ?? 595;
  const lpLabel = lpVariant?.label ?? "Lead Generation Landing Page";

  const servicesSubtotal = data.services.reduce((sum, id) => {
    if (id === "landing_page") return sum + lpPrice;
    return sum + (SERVICES.find((x) => x.id === id)?.price || 0);
  }, 0);
  const total = servicesSubtotal + creativeCost + domainCost;

  // Dynamic bundle price: ads + landing page price (depends on campaign type)
  const bundlePrice = 395 + 345 + lpPrice;

  const goTo = (name: string) => {
    const i = STEPS.indexOf(name);
    if (i >= 0) {
      // Clear chat on any structural jump so previous reply bubbles don't
      // bleed into a fresh step (e.g. user URL bubble showing on summary).
      setMsgs([]);
      setStep(i);
    }
  };

  const shouldSkip = (name: string): boolean => {
    if (name === "upsell" && (hasLP || !hasAds)) return true;
    if (name === "destination" && (hasLP || !hasAds)) return true;
    if (name === "targeting" && !hasAds) return true;
    if (name === "creative" && !hasAds) return true;
    // brand_assets is shown for: any brand campaign, or LP-only listing
    // (LP-only building already collects materials in the property step)
    if (
      name === "brand_assets" &&
      data.campaignType !== "brand" &&
      !(data.skipAds && data.campaignType === "listing")
    )
      return true;
    // Domain is only for the LP-only path (skipAds). Ad flows skip it.
    if (name === "domain" && !data.skipAds) return true;
    return false;
  };

  const next = () => {
    let target = step + 1;
    while (target < STEPS.length && shouldSkip(STEPS[target])) target++;
    setMsgs([]);
    setStep(target);
  };

  const addUser = (text: string) =>
    setMsgs((p) => [...p, { from: "user", text }]);

  const submitOrder = async (paid: boolean) => {
    setSubmitting(true);
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          total,
          creativeCost,
          services_detail: data.services.map((id) => {
            if (id === "landing_page") {
              return { name: lpLabel, price: lpPrice };
            }
            const s = SERVICES.find((x) => x.id === id);
            return { name: s?.name, price: s?.price };
          }),
          campaignType: data.campaignType,
          brandFocusArea: data.brandFocusArea,
          buildingName: data.buildingName,
          buildingMaterialsLink: data.buildingMaterialsLink,
          brandAssetsLink: data.brandAssetsLink,
          autoRenewAds: data.autoRenewAds,
          creativeStyle: data.creativeStyle,
          creativeLink: data.creativeLink,
          skipAds: data.skipAds,
          domainOwnership: data.domainOwnership,
          existingDomain: data.existingDomain,
          domainOptions: data.domainOptions.filter((v) => v.trim()),
          launchDateFormatted: data.launchDate ? fmtDate(data.launchDate) : "",
          paymentStatus: paid ? "paid" : "pending",
        }),
      });
    } catch {
      // Silently continue — order still shows as confirmed in UI
    }
    setSubmitting(false);
    addUser(paid ? "Payment successful" : "Order placed");
    goTo("confirmation");
  };

  // Build line items in the shape the /api/checkout route expects
  const buildLineItems = () => {
    const items: { name: string; amount: number; recurring?: boolean }[] = [];
    for (const id of data.services) {
      if (id === "landing_page") {
        items.push({ name: lpLabel, amount: lpPrice });
      } else {
        const s = SERVICES.find((x) => x.id === id);
        if (!s) continue;
        // Ads recur monthly when auto-renew is on
        const isAd = id === "google_ads" || id === "meta_ads";
        items.push({
          name: s.name,
          amount: s.price,
          recurring: isAd && data.autoRenewAds,
        });
      }
    }
    if (data.creativeOption === "provide" && adPlatformCount > 0) {
      items.push({
        name: `Ad Creative (${adPlatformCount}× platform${adPlatformCount > 1 ? "s" : ""})`,
        amount: adPlatformCount * CREATIVE_PRICE,
      });
    }
    if (data.domainOwnership === "needs_purchase") {
      items.push({ name: "Domain Registration", amount: DOMAIN_PRICE });
    }
    return items;
  };

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, step]);

  const selectBundle = () =>
    setData((d) => ({ ...d, services: [...BUNDLE.ids] }));

  const inputWrap = "pl-11 flex flex-col gap-2 animate-[fadeUp_0.3s_ease]";

  function renderStep() {
    switch (cur) {
      case "welcome":
        return (
          <>
            <BotBubble>
              <div className="mb-1.5">
                <strong className="text-base text-foreground">
                  Welcome to Parallel Base
                </strong>
              </div>
              Can&apos;t wait to get your property in front of the right buyers.
              This takes about 2 minutes. Let&apos;s build your campaign.
            </BotBubble>
            <BotBubble delay={1000}>
              Tap{" "}
              <strong className="text-accent">Start Order</strong> to
              get started.
            </BotBubble>
            {ready && (
              <div className="pl-11 animate-[fadeUp_0.3s_ease]">
                <PrimaryButton onClick={next}>Start Order →</PrimaryButton>
              </div>
            )}
          </>
        );

      case "contact":
        return (
          <>
            <BotBubble>
              Let&apos;s start with your contact info so we can keep you updated
              on your campaign.
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <TextInput
                  placeholder="Full Name"
                  value={data.name}
                  onChange={(v) => setData((d) => ({ ...d, name: v }))}
                />
                <TextInput
                  placeholder="Phone Number"
                  value={data.phone}
                  onChange={(v) => setData((d) => ({ ...d, phone: v }))}
                  type="tel"
                />
                <TextInput
                  placeholder="Email Address"
                  value={data.email}
                  onChange={(v) => setData((d) => ({ ...d, email: v }))}
                  type="email"
                />
                <PrimaryButton
                  disabled={!data.name || !data.phone || !data.email}
                  onClick={() => {
                    addUser(`${data.name} · ${data.phone} · ${data.email}`);
                    next();
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "property": {
        const isBrand = data.campaignType === "brand";
        const isBuilding = data.campaignType === "building";
        return (
          <>
            <BotBubble>
              Great,{" "}
              <strong className="text-foreground">
                {data.name.split(" ")[0]}
              </strong>
              !{" "}
              {isBrand ? (
                <>
                  Which market are you focused on? Drop in the city,
                  neighborhood, or niche you want to dominate — we&apos;ll
                  build the campaign around it.
                </>
              ) : isBuilding ? (
                <>
                  What&apos;s the building or new construction project? Share
                  the name, the address (or MLS link), and a link to your
                  materials —{" "}
                  <strong className="text-foreground">
                    floor plans, renderings, brochures, and project info
                  </strong>
                  , plus{" "}
                  <strong className="text-foreground">
                    your headshot and any brand images
                  </strong>{" "}
                  you&apos;d like used. Google Drive, Dropbox, or a project
                  page works.
                </>
              ) : (
                <>What&apos;s the property address or MLS link?</>
              )}
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                {isBrand ? (
                  <TextInput
                    placeholder="e.g. Coral Gables, FL"
                    value={data.brandFocusArea}
                    onChange={(v) =>
                      setData((d) => ({ ...d, brandFocusArea: v }))
                    }
                  />
                ) : isBuilding ? (
                  <>
                    <TextInput
                      placeholder="Building / project name (e.g. The Estates at Coral Gables)"
                      value={data.buildingName}
                      onChange={(v) =>
                        setData((d) => ({ ...d, buildingName: v }))
                      }
                    />
                    <TextInput
                      placeholder="Address or MLS URL"
                      value={data.property}
                      onChange={(v) => setData((d) => ({ ...d, property: v }))}
                    />
                    <TextInput
                      placeholder="Marketing materials link (Drive, Dropbox, or URL)"
                      value={data.buildingMaterialsLink}
                      onChange={(v) =>
                        setData((d) => ({ ...d, buildingMaterialsLink: v }))
                      }
                      type="url"
                    />
                  </>
                ) : (
                  <TextInput
                    placeholder="Property address or MLS URL"
                    value={data.property}
                    onChange={(v) => setData((d) => ({ ...d, property: v }))}
                  />
                )}
                <PrimaryButton
                  disabled={
                    isBrand
                      ? !data.brandFocusArea.trim()
                      : isBuilding
                      ? !data.buildingName.trim() ||
                        !data.property.trim() ||
                        !data.buildingMaterialsLink.trim()
                      : !data.property
                  }
                  onClick={() => {
                    if (isBrand) {
                      addUser(data.brandFocusArea);
                    } else if (isBuilding) {
                      addUser(
                        `${data.buildingName} — ${data.property} · materials: ${data.buildingMaterialsLink}`
                      );
                    } else {
                      addUser(data.property);
                    }
                    // LP-only path skips services/ads steps. Brand and
                    // Listing campaigns get the brand-assets prompt first;
                    // Building already collected materials in this step.
                    if (data.skipAds) {
                      if (
                        data.campaignType === "brand" ||
                        data.campaignType === "listing"
                      )
                        goTo("brand_assets");
                      else goTo("domain");
                    } else next();
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );
      }

      case "services": {
        // Dynamic service list — swap generic landing_page with campaign-specific variant
        const displayServices = SERVICES.map((s) =>
          s.id === "landing_page"
            ? { ...s, name: lpLabel, price: lpPrice }
            : s
        );
        return (
          <>
            <BotBubble>
              <div>
                Which services do you need for this{" "}
                <strong className="text-foreground">
                  {data.campaignType} campaign
                </strong>
                ? Select all that apply.
              </div>
              <div className="mt-2 flex items-start gap-2 text-[12.5px]">
                <span className="text-accent flex-shrink-0">⚡</span>
                <span className="leading-snug">
                  Running{" "}
                  <strong className="text-foreground">
                    ads + {lpLabel}
                  </strong>{" "}
                  together gets{" "}
                  <strong className="text-foreground">3–5× more leads</strong>{" "}
                  than ads alone.
                </span>
              </div>
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                {/* Bundle option */}
                <div
                  onClick={selectBundle}
                  className={`border px-3.5 py-2 rounded-xl cursor-pointer transition-all ${
                    data.services.length >= 3 &&
                    BUNDLE.ids.every((id) => data.services.includes(id))
                      ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgba(0,229,204,0.1)]"
                      : "border-dashed border-accent/25 bg-accent/5"
                  }`}
                >
                  <div className="flex justify-between items-center gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[13.5px] text-foreground leading-tight">
                          {BUNDLE.label}
                        </span>
                        <span className="text-[9px] font-bold text-accent tracking-[0.08em] uppercase leading-none">
                          {BUNDLE.tagline}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[15px] text-accent flex-shrink-0">
                      {fmtCur(bundlePrice)}
                    </span>
                  </div>
                </div>

                {displayServices.map((s) => (
                  <ServiceCard
                    key={s.id}
                    service={s}
                    selected={data.services.includes(s.id)}
                    onToggle={() =>
                      setData((d) => ({
                        ...d,
                        services: d.services.includes(s.id)
                          ? d.services.filter((x) => x !== s.id)
                          : [...d.services, s.id],
                      }))
                    }
                  />
                ))}

                <PrimaryButton
                  disabled={data.services.length === 0}
                  onClick={() => {
                    addUser(
                      data.services
                        .map((id) =>
                          id === "landing_page"
                            ? lpLabel
                            : SERVICES.find((s) => s.id === id)?.name
                        )
                        .join(", ")
                    );
                    next();
                  }}
                >
                  Continue:{" "}
                  {data.services.length > 0
                    ? fmtCur(total)
                    : "Select services"}{" "}
                  →
                </PrimaryButton>
              </div>
            )}
          </>
        );
      }

      case "campaign": {
        const adOptions = [
          {
            id: "listing" as const,
            label: "Listing",
            sub: "A specific property you\u2019re selling.",
          },
          {
            id: "brand" as const,
            label: "Brand",
            sub: "Your agent brand / market territory.",
          },
          {
            id: "building" as const,
            label: "Building / New Construction",
            sub: "A specific building or development.",
          },
        ];
        return (
          <>
            <BotBubble>
              What ad are we running today? Pick the focus and we&apos;ll tailor
              the rest of the order around it.
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                {!data.skipAds &&
                  adOptions.map((opt) => {
                    const selected =
                      !data.skipAds && data.campaignType === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() =>
                          setData((d) => ({
                            ...d,
                            campaignType: opt.id,
                            skipAds: false,
                          }))
                        }
                        className={`border px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                          selected
                            ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgba(0,229,204,0.1)]"
                            : "border-border/50 bg-background hover:border-border-light"
                        }`}
                      >
                        <div
                          className={`font-semibold text-[14px] leading-tight ${
                            selected ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {opt.label} Ads
                        </div>
                        <div className="text-[12px] text-muted/70 mt-0.5 leading-snug">
                          {opt.sub}
                        </div>
                      </div>
                    );
                  })}

                {/* 4th option: No ads — just a landing page. Expands inline to pick LP type. */}
                <div
                  onClick={() =>
                    setData((d) => ({
                      ...d,
                      skipAds: !d.skipAds,
                      // when toggling back to ads, clear campaignType so the user re-picks
                      campaignType: d.skipAds ? "" : d.campaignType,
                    }))
                  }
                  className={`border px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                    data.skipAds
                      ? "border-accent bg-accent/10 shadow-[0_0_0_3px_rgba(0,229,204,0.1)]"
                      : "border-dashed border-border/60 bg-background hover:border-border-light"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div
                        className={`font-semibold text-[14px] leading-tight ${
                          data.skipAds ? "text-accent" : "text-foreground"
                        }`}
                      >
                        No ads — just a landing page
                      </div>
                      <div className="text-[12px] text-muted/70 mt-0.5 leading-snug">
                        Skip the ad campaign and just order the landing page.
                      </div>
                    </div>
                    {data.skipAds && (
                      <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-accent/70 flex-shrink-0 mt-0.5">
                        ← Back to ads
                      </span>
                    )}
                  </div>

                  {data.skipAds && (
                    <div
                      className="mt-4 pt-4 border-t border-accent/20 animate-[fadeUp_0.3s_ease]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-muted/60 mb-2">
                        Which landing page?
                      </div>
                      <div className="flex flex-col gap-2">
                        {adOptions.map((opt) => {
                          const subSelected = data.campaignType === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() =>
                                setData((d) => ({
                                  ...d,
                                  campaignType: opt.id,
                                }))
                              }
                              className={`text-left px-3 py-2 rounded-lg border text-[13.5px] transition-all ${
                                subSelected
                                  ? "border-accent bg-accent/10 text-accent font-semibold"
                                  : "border-border/50 bg-background text-foreground hover:border-border-light"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <PrimaryButton
                  disabled={!data.campaignType}
                  onClick={() => {
                    if (!data.campaignType) return;
                    const label =
                      data.campaignType[0].toUpperCase() +
                      data.campaignType.slice(1);
                    if (data.skipAds) {
                      // LP-only path: preconfigure services so the property step
                      // continues straight to the domain question (skipping ad steps).
                      setData((d) => ({ ...d, services: ["landing_page"] }));
                      addUser(`${label} landing page only (no ads)`);
                      next(); // → property step
                    } else {
                      addUser(`${label} campaign`);
                      next();
                    }
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );
      }

      case "upsell":
        return (
          <>
            <BotBubble>
              <div className="mb-2">
                <strong className="text-foreground">Quick heads up:</strong>{" "}
                you&apos;re running ads without a dedicated landing page.
              </div>
              <div className="text-[13.5px] leading-snug">
                When ad traffic lands on a generic brokerage page or Zillow
                listing,{" "}
                <strong className="text-foreground">
                  you lose 70–80% of potential leads
                </strong>
                . Our landing pages are engineered to capture those leads:
                strategic forms, sub-millisecond load times, and direct CRM
                delivery.
              </div>
              <div className="text-[13.5px] mt-2.5 leading-snug">
                Agents who add a landing page see{" "}
                <strong className="text-foreground">
                  3–5× higher conversion rates
                </strong>
                .
              </div>
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <PrimaryButton
                  onClick={() => {
                    setData((d) => ({
                      ...d,
                      services: [...d.services, "landing_page"],
                    }));
                    addUser(`Added ${lpLabel} +${fmtCur(lpPrice)}`);
                    goTo("targeting");
                  }}
                >
                  Add {lpLabel} +{fmtCur(lpPrice)} →
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => {
                    addUser("Skipping landing page");
                    next();
                  }}
                >
                  No thanks, continue without →
                </SecondaryButton>
              </div>
            )}
          </>
        );

      case "destination":
        return (
          <>
            <BotBubble>
              Got it. Since you&apos;re not using one of our landing pages,
              where should your ads send traffic? Drop the URL below.
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <TextInput
                  placeholder="https://your-page.com/listing"
                  value={data.adDestination}
                  onChange={(v) =>
                    setData((d) => ({ ...d, adDestination: v }))
                  }
                  type="url"
                />
                <PrimaryButton
                  disabled={!data.adDestination}
                  onClick={() => {
                    addUser(data.adDestination);
                    next();
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "targeting":
        return (
          <>
            <BotBubble>
              Our algorithm already determines the best placements for your ad:
              optimal geographies, audiences, and websites. But if you have
              specific preferences, add them below.
            </BotBubble>
            {ready && (
              <div className={`${inputWrap} !gap-2.5`}>
                <TargetingGroup
                  label="Geographies"
                  sub="Cities, zip codes, or neighborhoods"
                  values={data.geos}
                  onChange={(v) => setData((d) => ({ ...d, geos: v }))}
                />
                <TargetingGroup
                  label="Audiences"
                  sub="Demographics, interests, behaviors"
                  values={data.audiences}
                  onChange={(v) => setData((d) => ({ ...d, audiences: v }))}
                />
                <TargetingGroup
                  label="Websites"
                  sub="Specific sites for display placement"
                  values={data.websites}
                  onChange={(v) => setData((d) => ({ ...d, websites: v }))}
                />
                <PrimaryButton
                  onClick={() => {
                    const any = [
                      ...data.geos,
                      ...data.audiences,
                      ...data.websites,
                    ].some((v) => v.trim());
                    addUser(
                      any
                        ? "Added targeting preferences"
                        : "Using algorithm defaults"
                    );
                    next();
                  }}
                >
                  {[...data.geos, ...data.audiences, ...data.websites].some(
                    (v) => v.trim()
                  )
                    ? "Submit Preferences →"
                    : "Use Algorithm Defaults →"}
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "creative":
        return (
          <>
            {!data.creativeOption && (
              <BotBubble>
                Last thing on the ads — do you have your own ad creative, or
                should we build it for you?
              </BotBubble>
            )}
            {!data.creativeOption && ready && (
              <div className={inputWrap}>
                <SecondaryButton
                  onClick={() => {
                    setMsgs([]);
                    setData((d) => ({ ...d, creativeOption: "own" }));
                  }}
                >
                  I have my own creative →
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    setMsgs([]);
                    setData((d) => ({ ...d, creativeOption: "provide" }));
                  }}
                >
                  Build creative for me (+
                  {fmtCur(adPlatformCount * CREATIVE_PRICE)}) →
                </PrimaryButton>
              </div>
            )}
            {data.creativeOption === "own" && (
              <>
                <BotBubble delay={400}>
                  <div className="mb-2">
                    <strong className="text-foreground">
                      Drop a link to your creative — Google Drive, Dropbox, or
                      a folder URL works.
                    </strong>
                  </div>
                  <div className="text-[13.5px] leading-relaxed space-y-2">
                    {hasGoogle && (
                      <div>
                        <div className="text-accent text-[11px] font-bold tracking-[0.08em] uppercase mb-1">
                          Google Ads
                        </div>
                        <div className="text-muted">
                          Images: 1200×628, 1080×1080, 300×600 (JPG/PNG, &lt;150KB each)
                        </div>
                      </div>
                    )}
                    {hasMeta && (
                      <div>
                        <div className="text-accent text-[11px] font-bold tracking-[0.08em] uppercase mb-1">
                          Meta Ads
                        </div>
                        <div className="text-muted">
                          Images/Video: 1080×1080 (feed), 1080×1920 (story/reel), 1200×628 (link)
                        </div>
                      </div>
                    )}
                  </div>
                </BotBubble>
                {ready && (
                  <div className={inputWrap}>
                    <TextInput
                      placeholder="Creative link (Drive, Dropbox, or URL)"
                      value={data.creativeLink}
                      onChange={(v) =>
                        setData((d) => ({ ...d, creativeLink: v }))
                      }
                      type="url"
                    />
                    <PrimaryButton
                      disabled={!data.creativeLink.trim()}
                      onClick={() => {
                        addUser(`Creative: ${data.creativeLink}`);
                        next();
                      }}
                    >
                      Continue →
                    </PrimaryButton>
                  </div>
                )}
              </>
            )}
            {data.creativeOption === "provide" && (
              <>
                <BotBubble delay={400}>
                  Got it. Pick a style you like — we&apos;ll model your creative
                  after it.{" "}
                  <span className="text-muted/70">
                    +{fmtCur(adPlatformCount * CREATIVE_PRICE)} added.
                  </span>
                </BotBubble>
                {ready && creativeSamples.length > 0 && (
                  <div className="animate-[fadeUp_0.3s_ease]">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {creativeSamples.map((sample) => {
                        const selected = data.creativeStyle === sample.file;
                        return (
                          <button
                            key={sample.file}
                            onClick={() =>
                              setData((d) => ({
                                ...d,
                                creativeStyle: sample.file,
                              }))
                            }
                            className={`group relative border-2 overflow-hidden transition-all rounded-lg ${
                              selected
                                ? "border-accent shadow-[0_0_0_3px_rgba(0,229,204,0.15)]"
                                : "border-border/50 hover:border-border-light"
                            }`}
                          >
                            <Image
                              src={`/images/ads/${sample.file}`}
                              alt={`${sample.label} ad style`}
                              width={400}
                              height={300}
                              sizes="(max-width: 768px) 33vw, 200px"
                              className="w-full h-auto block"
                            />
                            {selected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-accent rounded-full flex items-center justify-center shadow-[0_0_0_2px_rgba(0,0,0,0.5)]">
                                <span className="text-background font-extrabold text-[11px] leading-none">
                                  ✓
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <PrimaryButton
                      onClick={next}
                      disabled={!data.creativeStyle}
                    >
                      {data.creativeStyle ? "Continue →" : "Pick a style above"}
                    </PrimaryButton>
                  </div>
                )}
              </>
            )}
          </>
        );

      case "brand_assets":
        return (
          <>
            <BotBubble>
              {data.campaignType === "brand"
                ? "Last thing on the brand —"
                : "One more thing —"}{" "}
              drop a link to your{" "}
              <strong className="text-foreground">
                headshot, logo, and any brand materials
              </strong>{" "}
              you&apos;d like featured on the page. Google Drive, Dropbox, or a
              folder URL all work.
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <TextInput
                  placeholder="Brand assets link (Drive, Dropbox, or URL)"
                  value={data.brandAssetsLink}
                  onChange={(v) =>
                    setData((d) => ({ ...d, brandAssetsLink: v }))
                  }
                  type="url"
                />
                <PrimaryButton
                  disabled={!data.brandAssetsLink.trim()}
                  onClick={() => {
                    addUser(`Brand assets: ${data.brandAssetsLink}`);
                    if (data.skipAds) goTo("domain");
                    else next();
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "domain":
        return (
          <>
            {!data.domainOwnership && (
              <BotBubble>
                Quick question on the domain. Do you already own a URL for this
                landing page, or would you like us to buy one for you?
              </BotBubble>
            )}
            {!data.domainOwnership && ready && (
              <div className={inputWrap}>
                <SecondaryButton
                  onClick={() => {
                    setMsgs([]);
                    setData((d) => ({ ...d, domainOwnership: "owns" }));
                  }}
                >
                  I already have a domain →
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    setMsgs([]);
                    setData((d) => ({
                      ...d,
                      domainOwnership: "needs_purchase",
                    }));
                  }}
                >
                  Buy a domain for me (+{fmtCur(DOMAIN_PRICE)}) →
                </PrimaryButton>
              </div>
            )}

            {data.domainOwnership === "owns" && (
              <>
                <BotBubble delay={400}>
                  Drop the domain below — we&apos;ll point the landing page to
                  it.
                </BotBubble>
                {ready && (
                  <div className={inputWrap}>
                    <TextInput
                      placeholder="yourdomain.com"
                      value={data.existingDomain}
                      onChange={(v) =>
                        setData((d) => ({ ...d, existingDomain: v }))
                      }
                    />
                    <PrimaryButton
                      disabled={!data.existingDomain.trim()}
                      onClick={() => {
                        addUser(data.existingDomain);
                        goTo("summary");
                      }}
                    >
                      Continue →
                    </PrimaryButton>
                  </div>
                )}
              </>
            )}

            {data.domainOwnership === "needs_purchase" && (
              <>
                <BotBubble delay={400}>
                  Got it. Give us{" "}
                  <strong className="text-foreground">5 domain options</strong>{" "}
                  in order of preference. We&apos;ll grab the first one
                  available — backups in case any are already taken.
                </BotBubble>
                {ready && (
                  <div className={inputWrap}>
                    {data.domainOptions.map((val, i) => (
                      <TextInput
                        key={i}
                        placeholder={`${i + 1}. ${
                          i === 0 ? "First choice" : "Backup"
                        } (e.g. yoursite.com)`}
                        value={val}
                        onChange={(nv) => {
                          const next = [...data.domainOptions];
                          next[i] = nv;
                          setData((d) => ({ ...d, domainOptions: next }));
                        }}
                      />
                    ))}
                    <PrimaryButton
                      disabled={
                        data.domainOptions.filter((v) => v.trim()).length < 1
                      }
                      onClick={() => {
                        const filled = data.domainOptions.filter((v) =>
                          v.trim()
                        );
                        addUser(`Domain options: ${filled.join(", ")}`);
                        goTo("summary");
                      }}
                    >
                      Continue →
                    </PrimaryButton>
                  </div>
                )}
              </>
            )}
          </>
        );

      case "launch":
        return (
          <>
            <BotBubble>
              When would you like your campaign to go live? We need at least{" "}
              <strong className="text-foreground">2 business days</strong> to
              build everything out.
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <input
                  type="date"
                  min={minDate()}
                  value={data.launchDate}
                  onChange={(e) =>
                    setData((d) => ({ ...d, launchDate: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background text-foreground text-sm outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,229,204,0.1)]"
                />
                <PrimaryButton
                  disabled={!data.launchDate}
                  onClick={() => {
                    addUser(`Launch: ${fmtDate(data.launchDate)}`);
                    next();
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "summary":
        return (
          <>
            <div className="w-full bg-surface border border-border/50 rounded-xl px-3.5 py-2.5 mb-2 animate-[fadeUp_0.3s_ease]">
              <div className="mb-1.5">
                <strong className="text-[14px] text-foreground">
                  Order Summary
                </strong>
              </div>
              <div className="border-t border-border pt-1.5">
                {data.campaignType === "building" && data.buildingName && (
                  <div className="flex justify-between gap-4 mb-1.5 text-xs">
                    <span className="text-muted/50 uppercase tracking-[0.06em]">
                      Building
                    </span>
                    <span className="text-muted text-right">
                      {data.buildingName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between gap-4 mb-1.5 text-xs">
                  <span className="text-muted/50 uppercase tracking-[0.06em]">
                    {data.campaignType === "brand" ? "Focus Market" : "Property"}
                  </span>
                  <span className="text-muted text-right">
                    {data.campaignType === "brand"
                      ? data.brandFocusArea
                      : data.property}
                  </span>
                </div>
                {data.campaignType === "building" &&
                  data.buildingMaterialsLink && (
                    <div className="flex justify-between gap-4 mb-1.5 text-xs">
                      <span className="text-muted/50 uppercase tracking-[0.06em]">
                        Materials
                      </span>
                      <span className="text-muted/70 text-right break-all text-[12px]">
                        {data.buildingMaterialsLink}
                      </span>
                    </div>
                  )}
                {data.brandAssetsLink && (
                  <div className="flex justify-between gap-4 mb-1.5 text-xs">
                    <span className="text-muted/50 uppercase tracking-[0.06em]">
                      Brand Assets
                    </span>
                    <span className="text-muted/70 text-right break-all text-[12px]">
                      {data.brandAssetsLink}
                    </span>
                  </div>
                )}

                {data.campaignType && (
                  <div className="flex justify-between gap-4 mb-1.5 text-xs">
                    <span className="text-muted/50 uppercase tracking-[0.06em]">
                      Campaign
                    </span>
                    <span className="text-muted text-right">
                      {data.campaignType[0].toUpperCase() +
                        data.campaignType.slice(1)}
                    </span>
                  </div>
                )}

                <div className="text-[11px] text-muted/50 mb-1 tracking-[0.06em] uppercase">
                  Services
                </div>
                {data.services.map((id) => {
                  const s = SERVICES.find((x) => x.id === id);
                  const isLP = id === "landing_page";
                  const name = isLP ? lpLabel : s?.name;
                  const price = isLP ? lpPrice : s?.price || 0;
                  return (
                    <div key={id} className="mb-1">
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-muted">{name}</span>
                        <span className="font-semibold text-foreground flex-shrink-0">
                          {fmtCur(price)}
                        </span>
                      </div>
                      {(id === "google_ads" || id === "meta_ads") && (
                        <div className="text-[11px] text-muted/50 leading-tight">
                          30-day campaign · ad budget included
                        </div>
                      )}
                      {isLP && (
                        <div className="text-[11px] text-muted/50 leading-tight">
                          Includes 6 months live · 30% off renewal thereafter
                        </div>
                      )}
                    </div>
                  );
                })}
                {data.creativeOption === "provide" && (
                  <div className="flex justify-between gap-4 mb-0.5 text-sm">
                    <span className="text-muted">
                      Ad Creative ({adPlatformCount}× platform
                      {adPlatformCount > 1 ? "s" : ""})
                    </span>
                    <span className="font-semibold text-foreground flex-shrink-0">
                      {fmtCur(adPlatformCount * CREATIVE_PRICE)}
                    </span>
                  </div>
                )}
                {data.domainOwnership === "needs_purchase" && (
                  <div className="flex justify-between gap-4 mb-0.5 text-sm">
                    <span className="text-muted">Domain Registration</span>
                    <span className="font-semibold text-foreground flex-shrink-0">
                      {fmtCur(DOMAIN_PRICE)}
                    </span>
                  </div>
                )}
                {data.creativeOption === "own" && data.creativeLink && (
                  <div className="flex justify-between gap-4 mt-1.5 text-xs">
                    <span className="text-muted/50 uppercase tracking-[0.06em]">
                      Creative
                    </span>
                    <span className="text-muted/70 text-right break-all text-[12px]">
                      {data.creativeLink}
                    </span>
                  </div>
                )}

                {!hasLP && data.adDestination && (
                  <div className="flex justify-between gap-4 mt-1.5 text-xs">
                    <span className="text-muted/50 uppercase tracking-[0.06em]">Ad Destination</span>
                    <span className="text-muted/70 text-right break-all text-[12px]">{data.adDestination}</span>
                  </div>
                )}

                {data.skipAds && data.domainOwnership === "owns" &&
                  data.existingDomain && (
                    <div className="flex justify-between gap-4 mt-1.5 text-xs">
                      <span className="text-muted/50 uppercase tracking-[0.06em]">
                        Domain
                      </span>
                      <span className="text-muted/70 text-right break-all text-[12px]">
                        {data.existingDomain}
                      </span>
                    </div>
                  )}
                {data.skipAds && data.domainOwnership === "needs_purchase" && (
                  <div className="mt-1.5 text-xs">
                    <div className="text-muted/50 uppercase tracking-[0.06em] mb-0.5">
                      Domain Options
                    </div>
                    <div className="text-muted/70 text-[12px] leading-snug">
                      {data.domainOptions
                        .filter((v) => v.trim())
                        .map((v, i) => `${i + 1}. ${v}`)
                        .join("  ·  ")}
                    </div>
                  </div>
                )}

                {!data.skipAds && data.launchDate && (
                  <div className="flex justify-between gap-4 mt-1.5 mb-2 text-xs">
                    <span className="text-muted/50 uppercase tracking-[0.06em]">Launch</span>
                    <span className="text-muted">{fmtDate(data.launchDate)}</span>
                  </div>
                )}

                <div className="border-t border-border pt-2 flex justify-between items-center">
                  <span className="font-bold text-base text-foreground">
                    Total
                  </span>
                  <span className="font-bold text-xl text-accent">
                    {fmtCur(total)}
                  </span>
                </div>

                {hasAds && (
                  <div
                    onClick={() =>
                      setData((d) => ({ ...d, autoRenewAds: !d.autoRenewAds }))
                    }
                    className={`mt-2 border rounded-lg px-2.5 py-1.5 cursor-pointer transition-all flex items-center gap-2.5 ${
                      data.autoRenewAds
                        ? "border-accent bg-accent/10"
                        : "border-border/50 bg-background hover:border-border-light"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        data.autoRenewAds
                          ? "border-accent bg-accent"
                          : "border-muted/40 bg-transparent"
                      }`}
                    >
                      {data.autoRenewAds && (
                        <span className="text-background font-extrabold text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 leading-tight">
                      <span className="text-[12.5px] font-semibold text-foreground">
                        Auto-renew ads every 30 days
                      </span>
                      <span className="text-[11px] text-muted/70 ml-2">
                        · same rate · cancel anytime
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {ready && (
              <div className="animate-[fadeUp_0.3s_ease]">
                <PrimaryButton onClick={() => goTo("payment")}>
                  Continue to Payment: {fmtCur(total)} →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "payment":
        return (
          <>
            <BotBubble>
              <span className="text-[13.5px]">
                <strong className="text-foreground">Secure checkout</strong> —
                pay <strong className="text-foreground">{fmtCur(total)}</strong>
                {data.autoRenewAds && hasAds && (
                  <span className="text-muted/70">
                    {" · ads auto-renew every 30 days"}
                  </span>
                )}
              </span>
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <StripePayment
                  email={data.email}
                  name={data.name}
                  phone={data.phone}
                  property={
                    data.campaignType === "brand"
                      ? data.brandFocusArea
                      : data.campaignType === "building" && data.buildingName
                      ? `${data.buildingName} — ${data.property}`
                      : data.property
                  }
                  campaignType={data.campaignType}
                  autoRenewAds={data.autoRenewAds && hasAds}
                  lineItems={buildLineItems()}
                  total={total}
                  metadata={{
                    name: data.name,
                    email: data.email,
                    property:
                      data.campaignType === "brand"
                        ? data.brandFocusArea
                        : data.campaignType === "building" && data.buildingName
                        ? `${data.buildingName} — ${data.property}`
                        : data.property,
                    campaignType: data.campaignType,
                  }}
                  onSuccess={() => {
                    addUser(`Paid ${fmtCur(total)}`);
                    submitOrder(true);
                  }}
                />
              </div>
            )}
          </>
        );

      case "confirmation":
        return (
          <BotBubble>
            <div className="text-center py-3">
              <div className="text-[42px] mb-2.5">🚀</div>
              <div className="text-lg font-bold text-foreground mb-2">
                Order Placed!
              </div>
              <div className="text-sm leading-relaxed text-muted">
                Thanks,{" "}
                <strong className="text-foreground">
                  {data.name.split(" ")[0]}
                </strong>
                . Your payment is processed and your campaign is being built
                right now. You&apos;ll receive a confirmation email at{" "}
                <strong className="text-foreground">{data.email}</strong> with
                your order details, receipt, and next steps.
              </div>
              <div className="mt-3.5 px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/25 text-[13px] text-accent">
                {data.skipAds ? (
                  <>We&apos;ll have your landing page ready within 3–5 business days.</>
                ) : (
                  <>
                    Target launch: <strong>{fmtDate(data.launchDate)}</strong>
                  </>
                )}
              </div>
            </div>
          </BotBubble>
        );
    }
  }

  return (
    <div className="w-full h-full mx-auto bg-surface/80 backdrop-blur-sm flex flex-col rounded-2xl border border-border/30 overflow-hidden shadow-2xl shadow-black/30 max-w-[800px]">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border/20 flex items-center gap-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.03] to-transparent animate-[shimmer_3s_ease_infinite]" />
        <div className="relative w-[34px] h-[34px] rounded-full overflow-hidden border border-accent/40 shadow-[0_0_12px_rgba(0,229,204,0.2)]">
          <div className="absolute -inset-[2px] rounded-full animate-[pulse-ring_2s_ease_infinite] border border-accent/30 z-10 pointer-events-none" />
          <Image
            src={AVATAR_SRC}
            alt="Parallel Base assistant"
            fill
            sizes="34px"
            className="object-cover"
          />
        </div>
        <div className="relative flex-1">
          <div className="font-bold text-sm text-foreground">
            Parallel Base
          </div>
        </div>
        {historyRef.current.length > 1 &&
          cur !== "confirmation" &&
          cur !== "payment" &&
          !submitting && (
            <button
              onClick={goBack}
              className="relative flex items-center gap-1.5 text-[11px] text-muted hover:text-foreground transition-colors px-2.5 py-1 border border-border/40 rounded-md hover:border-border-light"
              aria-label="Go back to previous step"
            >
              <span className="text-[14px] leading-none">←</span>
              Back
            </button>
          )}
        <div className="relative flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(0,229,204,0.4)] animate-pulse" />
          <span className="text-[10px] text-accent/60 font-medium">Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0 px-4 py-3 overflow-y-auto flex flex-col">
        {msgs.map((m, i) =>
          m.from === "user" ? (
            <UserBubble key={i}>{m.text}</UserBubble>
          ) : (
            <BotBubble key={i}>{m.text}</BotBubble>
          )
        )}
        {renderStep()}
        <div ref={endRef} />
      </div>

      {/* Progress bar */}
      <div className="px-5 py-3 border-t border-border/20 rounded-b-2xl">
        <div className="flex justify-between mb-1.5 text-[11px] text-muted/40">
          <span>
            Step {Math.min(step + 1, STEPS.length - 1)} of {STEPS.length - 1}
          </span>
          <span className="text-accent/60 font-medium">
            {Math.round((step / (STEPS.length - 1)) * 100)}%
          </span>
        </div>
        <div className="h-[3px] bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,229,204,0.4)]"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
