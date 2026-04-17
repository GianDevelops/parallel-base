"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimateIn from "./AnimateIn";
import { WarningOctagon } from "@phosphor-icons/react";

const diagnostics = [
  {
    code: "ERR_01",
    label: "Generic Templates",
    status: "FAIL",
    metric: "0.4%",
    metricLabel: "avg. conversion rate",
  },
  {
    code: "ERR_02",
    label: "Wasted Ad Spend",
    status: "FAIL",
    metric: "73%",
    metricLabel: "of budget lost",
  },
  {
    code: "ERR_03",
    label: "Lost Leads",
    status: "FAIL",
    metric: "0",
    metricLabel: "CRM integrations",
  },
];

function DiagnosticCard({
  item,
  index,
  isInView,
}: {
  item: (typeof diagnostics)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
      className="bg-background border border-border p-5 relative overflow-hidden group"
    >
      {/* Red top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500/80" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-muted tracking-wider">
          {item.code}
        </span>
        <span className="text-[10px] font-bold tracking-[0.15em] text-red-400 bg-red-500/10 px-2 py-0.5 border border-red-500/20">
          {item.status}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-foreground mb-3">
        {item.label}
      </p>

      {/* Metric */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-red-400 tracking-tight">
          {item.metric}
        </span>
        <span className="text-[10px] text-muted uppercase tracking-wider">
          {item.metricLabel}
        </span>
      </div>

      {/* Scan line animation on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function StatusQuo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why"
      className="py-24 md:py-32 border-b border-light-border bg-light-bg"
      ref={ref}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          {/* Left: Label + diagnostic cards */}
          <div className="lg:sticky lg:top-32 self-start">
            <AnimateIn direction="left">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-background uppercase flex items-center gap-3 mb-8">
                <WarningOctagon weight="fill" className="w-4 h-4" />
                The Status Quo
              </h2>
            </AnimateIn>

            {/* System diagnostic label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-1.5 h-1.5 bg-red-400 animate-pulse" />
              <span className="text-[10px] font-mono text-light-muted tracking-wider uppercase">
                System Diagnostic
              </span>
            </motion.div>

            {/* Cards */}
            <div className="space-y-3">
              {diagnostics.map((item, i) => (
                <DiagnosticCard
                  key={item.code}
                  item={item}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="max-w-4xl">
            <AnimateIn delay={0.1}>
              <h3 className="text-3xl md:text-5xl font-medium text-light-text mb-10 tracking-tight leading-tight">
                The tools you&apos;ve been given weren&apos;t built for you.
              </h3>
            </AnimateIn>

            <div className="space-y-8 text-base md:text-lg text-light-muted font-light leading-relaxed">
              <AnimateIn delay={0.2}>
                <p className="border-l border-light-border pl-6">
                  You get handed a landing page template. You boost a post on
                  Instagram. You wait. Nothing happens. Or worse, you get leads
                  that ghost you.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <p className="border-l border-light-border pl-6">
                  Here&apos;s the truth most agents learn too late: generic
                  landing pages don&apos;t capture leads. Untargeted ads burn
                  money. And when those two systems don&apos;t talk to each
                  other, you&apos;re left chasing dead ends instead of closing
                  deals.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.4}>
                <div className="border-l-2 border-light-text pl-6 text-light-text font-medium text-xl leading-snug mt-12 bg-white p-6">
                  <p>
                    You didn&apos;t get into real estate to become a digital
                    marketer.
                  </p>
                  <span className="text-light-muted block mt-4 text-base">
                    But the agents who are winning right now?
                  </span>
                  <span className="text-background underline decoration-1 underline-offset-4 font-bold">
                    They have systems that work while they sleep.
                  </span>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
