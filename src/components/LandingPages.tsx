"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import AnimateIn from "./AnimateIn";

const features = [
  {
    title: "Strategic Lead Capture",
    desc: "Multiple conversion points placed where visitors are most likely to act. Not one form buried at the bottom.",
  },
  {
    title: "SEO & AEO Optimized",
    desc: "Built for both traditional search engines and AI-driven answer engines. Your pages get found.",
  },
  {
    title: "Sub-millisecond Load Times",
    desc: "Clean, fast code. No bloated builders. No drag-and-drop lag.",
  },
  {
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
    body: "Showcase floor plans, pricing, amenities, and lifestyle content for any building. Whether it\u2019s a pre-construction project or an established building you specialize in.",
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
    <section
      id="pages"
      className="py-24 md:py-32 border-b border-light-border bg-light-bg overflow-hidden relative"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <AnimateIn>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-light-text uppercase block mb-4">
              Landing Pages
            </span>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h3 className="text-3xl md:text-5xl font-medium text-light-text tracking-tight mb-6">
              Engineered to convert.
            </h3>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-light-muted text-lg border-l border-light-text pl-6 font-light">
              Every Parallel Base landing page is built to turn visitors into
              leads. Strategic lead capture, fast load times, and direct CRM
              integration. Not a template. A system.
            </p>
          </AnimateIn>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-20 md:mb-24">
          {features.map((f, i) => (
            <AnimateIn key={f.title} delay={0.05 * i}>
              <div className="hover-border-accent-dark border-t border-light-border pt-6 group">
                <h5 className="text-light-text font-medium mb-2">{f.title}</h5>
                <p className="text-sm text-light-muted font-light">{f.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Tabbed Interface — editorial hairline style */}
        <AnimateIn>
          <div className="max-w-6xl mx-auto">
            {/* Tab headers: numbered hairline labels */}
            <div className="grid grid-cols-3 border-t border-light-border">
              {pageTypes.map((type, i) => {
                const isActive = activeType === i;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTab(i)}
                    className="relative group text-left py-5 px-1 md:px-2 transition-colors"
                  >
                    {/* Active underline */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] transition-all ${
                        isActive ? "bg-accent" : "bg-transparent"
                      }`}
                    />
                    <div className="flex items-center gap-3 md:gap-4">
                      <span
                        className={`text-[10px] font-medium tracking-[0.2em] transition-colors ${
                          isActive ? "text-accent" : "text-light-muted"
                        }`}
                      >
                        {type.num}
                      </span>
                      <div
                        className={`hidden sm:block w-6 h-[1px] transition-colors ${
                          isActive ? "bg-accent" : "bg-light-border"
                        }`}
                      />
                      <span
                        className={`text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-colors ${
                          isActive
                            ? "text-light-text"
                            : "text-light-muted group-hover:text-light-text"
                        }`}
                      >
                        {type.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content: asymmetric split on light bg */}
            <div className="border-t border-light-border pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">
              {/* Index marker */}
              <div className="hidden lg:block absolute top-6 right-0 font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted">
                {current.num} / {String(pageTypes.length).padStart(2, "0")}
              </div>

              {/* Text side */}
              <div
                key={current.id + "-text"}
                className="lg:col-span-5 tab-animate-in"
              >
                <span className="text-[10px] font-semibold tracking-[0.2em] text-accent uppercase block mb-5">
                  {current.label} Pages
                </span>
                <h4 className="text-3xl md:text-4xl font-medium text-light-text leading-[1.1] tracking-[-0.02em] mb-6">
                  {current.headline}
                </h4>
                <p className="text-light-muted leading-relaxed font-light max-w-md">
                  {current.body}
                </p>
                <div className="mt-8 w-12 h-[2px] bg-accent" />
              </div>

              {/* Image side */}
              <div className="lg:col-span-7">
                <div
                  key={current.id + "-img"}
                  className="tab-animate-in relative"
                >
                  {/* Teal corner brackets */}
                  <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-accent z-20" />
                  <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-accent z-20" />

                  {/* Ink frame */}
                  <div className="border border-light-text/80 relative overflow-hidden bg-white">
                    <Image
                      src={current.image}
                      alt={`${current.label} page example`}
                      width={1200}
                      height={750}
                      sizes="(max-width: 1024px) 100vw, 720px"
                      className="w-full h-auto object-cover object-top block"
                      priority={activeType === 0}
                    />
                  </div>

                  {/* Caption under image */}
                  <div className="flex items-center justify-between mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted">
                    <span>FIG. {current.num}</span>
                    <span>{current.label.toUpperCase()} — LIVE EXAMPLE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
