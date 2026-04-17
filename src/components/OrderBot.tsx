"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

const SERVICES = [
  {
    id: "google_ads",
    name: "Google Ads Campaign",
    price: 325,
    tag: "High Intent",
    desc: "Search, Display & Performance Max — intercepts buyers actively searching your market.",
  },
  {
    id: "meta_ads",
    name: "Meta Ads Campaign",
    price: 275,
    tag: "Visual Impact",
    desc: "Facebook & Instagram ads targeting life-event signals and financial behavior.",
  },
  {
    id: "landing_page",
    name: "Lead Generation Landing Page",
    price: 595,
    tag: "Conversion Engine",
    desc: "Custom-built, sub-millisecond page with lead capture forms and CRM integration.",
    recommended: true,
  },
  {
    id: "youtube",
    name: "Property Tour Video on YouTube",
    price: 245,
    tag: "Video Reach",
    desc: "Promote your property tour video to targeted audiences on YouTube.",
  },
];

const BUNDLE = {
  ids: ["google_ads", "meta_ads", "landing_page"],
  label: "Full Stack Package",
  tagline: "Best Results — Most agents choose this",
};

const STEPS = [
  "welcome",
  "contact",
  "property",
  "services",
  "upsell",
  "destination",
  "targeting",
  "launch",
  "summary",
  "confirmation",
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
    <div className="w-[34px] h-[34px] flex-shrink-0 bg-background border border-border flex items-center justify-center text-foreground font-black text-[11px] tracking-[0.04em]">
      PB
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
        <div className="bg-surface px-5 py-4 border border-border flex gap-1.5 items-center">
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
      <div className="bg-surface text-muted px-4 py-3.5 border border-border max-w-[82%] text-sm leading-relaxed">
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
      <div className="bg-accent text-background px-4 py-3 max-w-[75%] text-sm leading-snug font-medium">
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
      className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm outline-none transition-colors focus:border-accent placeholder:text-muted/50"
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
      className={`w-full px-7 py-3.5 text-sm font-bold tracking-[0.01em] transition-all ${
        disabled
          ? "bg-surface-light text-muted/40 cursor-not-allowed"
          : "bg-accent text-background cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,229,204,0.25)]"
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
      className="w-full px-5 py-3 border border-border text-muted text-sm cursor-pointer transition-colors hover:border-accent hover:text-accent"
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
      className={`border px-4 py-4 cursor-pointer transition-all relative ${
        selected
          ? "border-accent bg-accent/10"
          : "border-border bg-background hover:border-border-light"
      }`}
    >
      <div className="flex justify-between items-start mb-1.5">
        <div>
          <span
            className={`text-[10px] font-bold tracking-[0.08em] uppercase mb-1 block ${
              selected ? "text-accent" : "text-muted/50"
            }`}
          >
            {service.tag}
          </span>
          <span className="font-semibold text-[15px] text-foreground">
            {service.name}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className={`font-bold text-[17px] ${selected ? "text-accent" : "text-foreground"}`}
          >
            {fmtCur(service.price)}
          </span>
          <div
            className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
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
      <p className="text-[13px] text-muted/70 leading-snug">{service.desc}</p>
      {service.recommended && (
        <div className="absolute -top-2.5 right-4 bg-accent text-background text-[10px] font-bold px-2.5 py-0.5 tracking-[0.05em] uppercase">
          RECOMMENDED
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
  return (
    <div>
      <div className="text-[13px] font-semibold text-foreground mb-0.5">
        {label}
      </div>
      <div className="text-[11.5px] text-muted/50 mb-2">{sub}</div>
      <div className="flex flex-col gap-2">
        {values.map((v, i) => (
          <TextInput
            key={i}
            placeholder={`${label} ${i + 1} (optional)`}
            value={v}
            onChange={(nv) => {
              const u = [...values];
              u[i] = nv;
              onChange(u);
            }}
          />
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
  services: string[];
  adDestination: string;
  geos: string[];
  audiences: string[];
  websites: string[];
  launchDate: string;
}

export default function OrderBot() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OrderData>({
    name: "",
    phone: "",
    email: "",
    property: "",
    services: [],
    adDestination: "",
    geos: ["", "", ""],
    audiences: ["", "", ""],
    websites: ["", "", ""],
    launchDate: "",
  });
  const [msgs, setMsgs] = useState<{ from: string; text: string }[]>([]);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const cur = STEPS[step];
  const hasLP = data.services.includes("landing_page");
  const total = data.services.reduce(
    (s, id) => s + (SERVICES.find((x) => x.id === id)?.price || 0),
    0
  );

  const goTo = (name: string) => {
    const i = STEPS.indexOf(name);
    if (i >= 0) setStep(i);
  };

  const next = () => {
    if (STEPS[step + 1] === "upsell" && hasLP) setStep(step + 3);
    else if (STEPS[step + 1] === "destination" && hasLP) setStep(step + 2);
    else setStep(step + 1);
  };

  const addUser = (text: string) =>
    setMsgs((p) => [...p, { from: "user", text }]);

  const submitOrder = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          total,
          services_detail: data.services.map((id) => {
            const s = SERVICES.find((x) => x.id === id);
            return { name: s?.name, price: s?.price };
          }),
          launchDateFormatted: fmtDate(data.launchDate),
        }),
      });
    } catch (e) {
      // Silently continue — order still shows as confirmed in UI
    }
    setSubmitting(false);
    addUser("Order confirmed");
    goTo("confirmation");
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

  const inputWrap = "pl-11 flex flex-col gap-2.5 animate-[fadeUp_0.3s_ease]";

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
              This takes about 2 minutes — let&apos;s build your campaign.
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

      case "property":
        return (
          <>
            <BotBubble>
              Great,{" "}
              <strong className="text-foreground">
                {data.name.split(" ")[0]}
              </strong>
              ! What&apos;s the property address or MLS link?
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                <TextInput
                  placeholder="Property address or MLS URL"
                  value={data.property}
                  onChange={(v) => setData((d) => ({ ...d, property: v }))}
                />
                <PrimaryButton
                  disabled={!data.property}
                  onClick={() => {
                    addUser(data.property);
                    next();
                  }}
                >
                  Continue →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "services":
        return (
          <>
            <BotBubble>
              Which services do you need for this property? Select all that
              apply.
            </BotBubble>
            <BotBubble delay={700}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">⚡</span>
                <strong className="text-accent text-[12.5px] tracking-[0.03em]">
                  PRO TIP
                </strong>
              </div>
              <span className="text-[13.5px]">
                Agents who run{" "}
                <strong className="text-foreground">
                  Google Ads + Meta Ads + Landing Page
                </strong>{" "}
                together see{" "}
                <strong className="text-foreground">
                  3–5× more qualified leads
                </strong>{" "}
                than ads alone. The landing page is the conversion engine —
                without it, ad traffic has nowhere optimized to land.
              </span>
            </BotBubble>
            {ready && (
              <div className={inputWrap}>
                {/* Bundle option */}
                <div
                  onClick={selectBundle}
                  className={`border px-4 py-3.5 cursor-pointer transition-all ${
                    data.services.length >= 3 &&
                    BUNDLE.ids.every((id) => data.services.includes(id))
                      ? "border-accent bg-accent/10"
                      : "border-dashed border-accent/25 bg-accent/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-bold text-accent tracking-[0.08em] uppercase mb-0.5">
                        {BUNDLE.tagline}
                      </div>
                      <div className="font-semibold text-[15px] text-foreground">
                        {BUNDLE.label}
                      </div>
                      <div className="text-[12.5px] text-muted/60 mt-0.5">
                        Google Ads + Meta Ads + Landing Page
                      </div>
                    </div>
                    <span className="font-bold text-[17px] text-accent">
                      $1,195
                    </span>
                  </div>
                </div>

                <div className="text-center text-xs text-muted/40 py-0.5">
                  — or pick individually —
                </div>

                {SERVICES.map((s) => (
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
                        .map((id) => SERVICES.find((s) => s.id === id)?.name)
                        .join(", ")
                    );
                    next();
                  }}
                >
                  Continue —{" "}
                  {data.services.length > 0
                    ? fmtCur(total)
                    : "Select services"}{" "}
                  →
                </PrimaryButton>
              </div>
            )}
          </>
        );

      case "upsell":
        return (
          <>
            <BotBubble>
              <div className="mb-2">
                <strong className="text-foreground">Quick heads up —</strong>{" "}
                you&apos;re running ads without a dedicated landing page.
              </div>
              <div className="text-[13.5px] leading-snug">
                When ad traffic lands on a generic brokerage page or Zillow
                listing,{" "}
                <strong className="text-foreground">
                  you lose 70–80% of potential leads
                </strong>
                . Our landing pages are engineered to capture those leads —
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
                    addUser("Added Landing Page — $595");
                    goTo("targeting");
                  }}
                >
                  Add Landing Page — $595 →
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
              Our algorithm already determines the best placements for your ad —
              optimal geographies, audiences, and websites. But if you have
              specific preferences, add them below.
            </BotBubble>
            {ready && (
              <div className={`${inputWrap} !gap-3.5`}>
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
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm outline-none transition-colors focus:border-accent"
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
            <BotBubble>
              <div className="mb-2.5">
                <strong className="text-[15px] text-foreground">
                  Order Summary
                </strong>
              </div>
              <div className="border-t border-border pt-2.5">
                <div className="text-[11px] text-muted/50 mb-1 tracking-[0.06em] uppercase">
                  Property
                </div>
                <div className="text-sm mb-3 text-muted">{data.property}</div>

                <div className="text-[11px] text-muted/50 mb-1 tracking-[0.06em] uppercase">
                  Services
                </div>
                {data.services.map((id) => {
                  const s = SERVICES.find((x) => x.id === id);
                  return (
                    <div
                      key={id}
                      className="flex justify-between mb-1 text-sm"
                    >
                      <span className="text-muted">{s?.name}</span>
                      <span className="font-semibold text-foreground">
                        {fmtCur(s?.price || 0)}
                      </span>
                    </div>
                  );
                })}

                {!hasLP && data.adDestination && (
                  <>
                    <div className="text-[11px] text-muted/50 mb-1 mt-2 tracking-[0.06em] uppercase">
                      Ad Destination
                    </div>
                    <div className="text-[13px] mb-2 break-all text-muted/70">
                      {data.adDestination}
                    </div>
                  </>
                )}

                <div className="text-[11px] text-muted/50 mb-1 mt-2 tracking-[0.06em] uppercase">
                  Launch Date
                </div>
                <div className="text-sm mb-3 text-muted">
                  {fmtDate(data.launchDate)}
                </div>

                <div className="border-t border-border pt-2.5 mt-1.5 flex justify-between items-center">
                  <span className="font-bold text-base text-foreground">
                    Total
                  </span>
                  <span className="font-bold text-xl text-accent">
                    {fmtCur(total)}
                  </span>
                </div>
              </div>
            </BotBubble>
            <BotBubble delay={500}>
              Everything look good? We&apos;ll send you an invoice for payment
              once your campaign is ready. Hit confirm to place your order.
            </BotBubble>
            {ready && (
              <div className="pl-11 animate-[fadeUp_0.3s_ease]">
                <PrimaryButton onClick={submitOrder} disabled={submitting}>
                  {submitting
                    ? "Placing Order..."
                    : `Confirm Order — ${fmtCur(total)} →`}
                </PrimaryButton>
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
                . Your campaign is being built right now. You&apos;ll receive a
                confirmation email at{" "}
                <strong className="text-foreground">{data.email}</strong> with
                your order details, invoice, and next steps.
              </div>
              <div className="mt-3.5 px-4 py-2.5 bg-accent/10 border border-accent/25 text-[13px] text-accent">
                Target launch:{" "}
                <strong>{fmtDate(data.launchDate)}</strong>
              </div>
            </div>
          </BotBubble>
        );
    }
  }

  return (
    <div className="w-full max-w-[480px] mx-auto h-full bg-[#050505] flex flex-col border-x border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-3 bg-[#080808]">
        <div className="w-[38px] h-[38px] bg-background border border-border flex items-center justify-center text-foreground font-extrabold text-[13px]">
          PB
        </div>
        <div>
          <div className="font-bold text-[15px] text-foreground">
            Parallel Base
          </div>
          <div className="text-[11.5px] text-muted/50">
            Campaign Order System
          </div>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,229,204,0.4)]" />
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0 px-4 py-5 overflow-y-auto flex flex-col">
        {msgs.map((m, i) =>
          m.from === "user" ? (
            <UserBubble key={i}>{m.text}</UserBubble>
          ) : (
            <BotBubble key={i}>{m.text}</BotBubble>
          )
        )}
        {renderStep()}
        <div ref={endRef} className="h-5" />
      </div>

      {/* Progress bar */}
      <div className="px-5 py-3 border-t border-border bg-[#050505]">
        <div className="flex justify-between mb-1.5 text-[11px] text-muted/40">
          <span>
            Step {Math.min(step + 1, STEPS.length - 1)} of {STEPS.length - 1}
          </span>
          <span>
            {Math.round((step / (STEPS.length - 1)) * 100)}%
          </span>
        </div>
        <div className="h-[3px] bg-surface overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
