"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const features = [
  {
    number: "01",
    label: "Landing Pages",
    stat: "3–5\u00D7",
    statCaption: "Conversion Delta",
    desc: "Custom-built pages that turn visitors into leads.",
  },
  {
    number: "02",
    label: "Ad Campaigns",
    stat: "100%",
    statCaption: "Data-Driven Targeting",
    desc: "Google and Meta ads targeted to your property's data.",
  },
  {
    number: "03",
    label: "CRM Delivery",
    stat: "<60s",
    statCaption: "Lead Latency",
    desc: "Leads flow directly into your CRM in under 60 seconds.",
  },
];

export default function StatusQuo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why"
      ref={ref}
      className="relative py-20 md:py-28 border-b border-light-border bg-light-bg overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header: title left, subhead + CTA right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="absolute -top-6 left-0 w-6 h-[1px] bg-light-text/30" />
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.05] font-medium tracking-[-0.035em] text-light-text">
              Lead Generation
              <br className="hidden sm:block" /> Autopilot
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-6 sm:gap-10 items-start sm:items-end"
          >
            <p className="text-sm md:text-base text-light-muted leading-relaxed font-light max-w-xs">
              Use Parallel Base to launch landing pages, run ad campaigns, and
              capture leads straight into your CRM. All from a single order.
            </p>
            <Link
              href="/get-started"
              className="shrink-0 inline-flex items-center justify-center px-7 py-3.5 bg-light-text text-light-bg text-[10px] font-semibold tracking-[0.2em] uppercase border border-light-text hover:bg-transparent hover:text-light-text transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Capabilities row with traveling pulse */}
        <div className="relative">
          {/* Horizontal hairline + animated pulse */}
          <div className="relative h-[1px] bg-light-border overflow-hidden">
            {isInView && (
              <motion.div
                initial={{ left: "-15%" }}
                animate={{ left: "110%" }}
                transition={{
                  duration: 4,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-1/2 -translate-y-1/2 h-[1px] w-[180px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #00E5CC, transparent)",
                  boxShadow: "0 0 8px rgba(0, 229, 204, 0.6)",
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 pt-10 md:pt-12">
            {features.map((f, i) => (
              <motion.article
                key={f.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className={`group relative flex flex-col ${
                  i > 0
                    ? "md:border-l md:border-light-border md:pl-8 lg:pl-12"
                    : ""
                } ${i > 0 ? "pt-10 md:pt-0" : ""}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-light-muted group-hover:text-light-text transition-colors">
                    {f.number}
                  </span>
                  <div className="w-6 h-[1px] bg-light-border group-hover:bg-light-text/40 transition-colors" />
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-light-text">
                    {f.label}
                  </h3>
                </div>

                {/* Stat display */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <div
                      className="text-light-text font-medium tracking-[-0.04em] leading-none"
                      style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)" }}
                    >
                      {f.stat}
                    </div>
                    <div className="w-1.5 h-1.5 bg-accent translate-y-[-2px]" />
                  </div>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-light-muted">
                    {f.statCaption}
                  </div>
                </div>

                <p className="text-[15px] leading-[1.65] text-light-muted font-light max-w-[280px]">
                  {f.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Corner registration mark */}
      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none hidden md:block">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M0 6H12M6 0V12" stroke="#1A1A1A" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}
