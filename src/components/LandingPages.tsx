"use client";

import { useState, useCallback } from "react";
import AnimateIn from "./AnimateIn";
import {
  Crosshair,
  Image as ImageIcon,
  MagnifyingGlass,
  Database,
  HouseLine,
  Gauge,
} from "@phosphor-icons/react";

const features = [
  {
    icon: Crosshair,
    title: "Strategic Lead Capture",
    desc: "Frictionless forms integrated natively into the layout. No intrusive pop-ups, just logical conversion points.",
  },
  {
    icon: ImageIcon,
    title: "High-Impact Property Visuals",
    desc: "Cinematic hero sections and dynamic masonry galleries that treat high-end photography with architectural respect.",
  },
  {
    icon: MagnifyingGlass,
    title: "SEO & AEO Optimized",
    desc: "Structure built for Google's crawlers and AI search engines. Schema markup injected systematically.",
  },
  {
    icon: Database,
    title: "CRM Integration",
    desc: "Webhooks configured out of the box. Leads flow directly into Follow Up Boss, Salesforce, or your chosen system.",
  },
  {
    icon: HouseLine,
    title: "MLS IDX Integration",
    desc: "Live real estate data streams connected cleanly via API, avoiding clunky iframes that destroy loading speeds.",
  },
  {
    icon: Gauge,
    title: "Sub-millisecond Loads",
    desc: "Built on edge networks. Ad clicks bounce if the page is slow. Our architecture ensures instant delivery globally.",
  },
];

const pageTypes = [
  {
    id: "listing",
    num: "01",
    label: "Listing",
    headline: (
      <>
        One property.
        <br />
        One mission.
        <br />
        One page built to sell it.
      </>
    ),
    body: "A dedicated environment free from the distractions of a portal. High-res galleries, immersive neighborhood data, and a layout engineered to push the user toward scheduling a private showing.",
    bestFor: "High-End Trophy Listings",
  },
  {
    id: "brand",
    num: "02",
    label: "Brand",
    headline: (
      <>
        Your market.
        <br />
        Your brand.
        <br />
        Your pipeline.
      </>
    ),
    body: "Hyper-local community guides that establish absolute authority. Designed to capture long-tail organic search and serve as the destination for top-of-funnel ad campaigns targeting specific territories.",
    bestFor: "Farming & Territory Domination",
  },
  {
    id: "buildings",
    num: "03",
    label: "Buildings",
    headline: (
      <>
        Give every building
        <br />
        its own stage.
      </>
    ),
    body: "Complex architectures displaying availability matrices, floorplans, and holistic building specs. Perfect for new developments or cornering the market on specific luxury condo buildings.",
    bestFor: "New Devs & Condo Specialists",
  },
];

export default function LandingPages() {
  const [activeType, setActiveType] = useState(0);
  const current = pageTypes[activeType];

  const handleTab = useCallback((index: number) => {
    setActiveType(index);
  }, []);

  return (
    <section id="pages" className="py-24 md:py-32 border-b border-light-border bg-light-bg overflow-hidden relative">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <AnimateIn>
            <span className="text-xs font-semibold tracking-[0.2em] text-background uppercase block mb-4">
              Landing Pages
            </span>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h3 className="text-3xl md:text-5xl font-medium text-light-text tracking-tight mb-6">
              Not another pretty page that does nothing.
            </h3>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-light-muted text-lg border-l border-light-text pl-6">
              A beautiful aesthetic is the baseline, not the deliverable. We
              engineer digital environments designed specifically to intercept
              traffic and convert it into qualified CRM data.
            </p>
          </AnimateIn>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 mb-24">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimateIn key={f.title} delay={0.05 * i}>
                <div className="hover-border-accent-dark border-t border-light-border pt-6 group">
                  <Icon className="text-2xl text-light-muted group-hover:text-background transition-colors mb-4 block w-6 h-6" />
                  <h5 className="text-light-text font-medium mb-2">
                    {f.title}
                  </h5>
                  <p className="text-sm text-light-muted font-light">{f.desc}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* Tabbed Interface */}
        <AnimateIn>
          <div className="border border-border bg-background p-2 max-w-5xl mx-auto">
            {/* Tab Headers */}
            <div className="flex flex-col sm:flex-row border-b border-border bg-surface">
              {pageTypes.map((type, i) => (
                <button
                  key={type.id}
                  onClick={() => handleTab(i)}
                  className={`flex-1 py-4 px-6 text-left text-sm tracking-wide uppercase font-semibold transition-all ${
                    i > 0 ? "border-l border-border" : ""
                  } ${
                    activeType === i
                      ? "text-foreground bg-surface-light"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <span
                    className={`mr-2 ${
                      activeType === i ? "text-accent" : "opacity-50"
                    }`}
                  >
                    {type.num}.
                  </span>
                  {type.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-14 bg-background min-h-[300px] flex items-center relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-surface/50 to-transparent hidden lg:block" />
              <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

              <div key={current.id} className="w-full relative z-10 max-w-2xl tab-animate-in">
                <h4 className="text-3xl font-medium text-foreground mb-6">
                  {current.headline}
                </h4>
                <p className="text-muted leading-relaxed font-light mb-8">
                  {current.body}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-foreground font-medium">Best for:</span>
                  <span className="bg-accent/10 text-accent font-semibold px-3 py-1 border border-accent/20">
                    {current.bestFor}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
