"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import AnimateIn from "./AnimateIn";
import {
  Crosshair,
  MagnifyingGlass,
  HouseLine,
  Gauge,
} from "@phosphor-icons/react";

const features = [
  {
    icon: Crosshair,
    title: "Strategic Lead Capture",
    desc: "Multiple conversion points placed where visitors are most likely to act. Not one form buried at the bottom.",
  },
  {
    icon: MagnifyingGlass,
    title: "SEO & AEO Optimized",
    desc: "Built for both traditional search engines and AI-driven answer engines. Your pages get found.",
  },
  {
    icon: Gauge,
    title: "Sub-millisecond Load Times",
    desc: "Clean, fast code. No bloated builders. No drag-and-drop lag.",
  },
  {
    icon: HouseLine,
    title: "MLS IDX Integration",
    desc: "Display similar active listings alongside your property. Keep visitors on your page longer.",
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
    image: "/images/listing/example.jpg",
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
    image: "/images/brand/example.jpg",
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
    image: "/images/buildings/example.jpg",
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
              Engineered to convert.
            </h3>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-light-muted text-lg border-l border-light-text pl-6">
              Every Parallel Base landing page is built to turn visitors into
              leads. Strategic lead capture, fast load times, and direct CRM
              integration. Not a template. A system.
            </p>
          </AnimateIn>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-20">
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
            <div className="p-8 md:p-14 bg-background min-h-[420px] relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Screenshot */}
              <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[42%] overflow-hidden">
                <div key={current.id} className="tab-animate-in h-full">
                  <Image
                    src={current.image}
                    alt={`${current.label} page example`}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover object-top opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none" />
              </div>

              <div key={current.id + "-text"} className="relative z-10 max-w-lg pt-4 tab-animate-in">
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

              {/* Mobile image */}
              <div className="lg:hidden mt-6 border border-border overflow-hidden">
                <Image
                  src={current.image}
                  alt={`${current.label} page example`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
