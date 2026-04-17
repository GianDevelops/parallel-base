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
          {features.map((f, i) => (
              <AnimateIn key={f.title} delay={0.05 * i}>
                <div className="hover-border-accent-dark border-t border-light-border pt-6 group">
                  <h5 className="text-light-text font-medium mb-2">
                    {f.title}
                  </h5>
                  <p className="text-sm text-light-muted font-light">{f.desc}</p>
                </div>
              </AnimateIn>
          ))}
        </div>

        {/* Tabbed Interface — V2: Card stack with depth */}
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

            {/* Tab Content — Card stack with depth */}
            <div className="p-8 md:p-14 bg-background min-h-[420px] relative overflow-hidden flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Text side */}
              <div
                key={current.id + "-text"}
                className="relative z-10 lg:w-[45%] pt-4 tab-animate-in"
              >
                <h4 className="text-3xl font-medium text-foreground mb-6">
                  {current.headline}
                </h4>
                <p className="text-muted leading-relaxed font-light">
                  {current.body}
                </p>
              </div>

              {/* Rotated floating card image */}
              <div className="hidden lg:flex lg:w-[55%] justify-center items-center py-4">
                <div
                  key={current.id}
                  className="tab-animate-in relative"
                  style={{
                    transform: "rotate(2.5deg)",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Shadow layer underneath for depth */}
                  <div
                    className="absolute inset-0 bg-black/40 blur-xl"
                    style={{
                      transform: "translate(8px, 12px)",
                    }}
                  />
                  {/* Card frame */}
                  <div className="relative border border-[#333] bg-[#1A1A1A] p-1.5">
                    <Image
                      src={current.image}
                      alt={`${current.label} page example`}
                      width={520}
                      height={380}
                      className="w-full h-auto object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile image (no rotation) */}
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
