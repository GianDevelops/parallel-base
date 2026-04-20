"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimateIn from "./AnimateIn";
import { Target, Cursor, CheckCircle, Database } from "@phosphor-icons/react";

const pipelineSteps = [
  {
    label: "Ad Impression",
    desc: "Algorithm identifies buyer and serves contextual creative.",
    icon: Target,
    accent: false,
  },
  {
    label: "Page Visit",
    desc: "Prospect hits sub-millisecond environment optimized for capture.",
    icon: Cursor,
    accent: false,
  },
  {
    label: "Lead Captured",
    desc: "Frictionless form submission triggered by psychological layout.",
    icon: CheckCircle,
    accent: true,
  },
  {
    label: "CRM Delivery",
    desc: "Data injected instantly via API. Your team gets the SMS alert.",
    icon: Database,
    accent: false,
  },
];

export default function Integration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pipeline"
      className="py-32 md:py-48 border-b border-border bg-background relative overflow-hidden flex flex-col justify-center scroll-mt-20"
      ref={ref}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      {/* Header */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 w-full text-center mb-24">
        <AnimateIn>
          <span className="border border-accent/30 text-accent bg-accent/5 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase mb-6 inline-block">
            Full Stack Architecture
          </span>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h3 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-8">
            One system. Every stage.
            <br />
            <span className="text-muted">Nothing lost in between.</span>
          </h3>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="text-muted text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Standalone landing pages are useless without traffic. Ads are a waste
            of money without a conversion mechanism. Our integration ensures a
            mathematical flow of data from impression to CRM.
          </p>
        </AnimateIn>
      </div>

      {/* Pipeline animation */}
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
        {/* Desktop: horizontal */}
        <div className="hidden lg:block relative pt-8">
          {/* Track line */}
          <div className="absolute top-[72px] left-[12.5%] right-[12.5%] h-[1px] bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="h-full bg-accent/40 origin-left"
            />
            {/* Traveling dot */}
            {isInView && (
              <div
                className="absolute top-[-3.5px] w-2 h-2 bg-accent shadow-[0_0_10px_#00E5CC,0_0_20px_#00E5CC] z-10"
                style={{ animation: "flowHorizontal 4s linear infinite" }}
              />
            )}
          </div>

          <div className="flex justify-between items-start">
            {pipelineSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  className="w-1/4 flex flex-col items-center text-center px-4"
                >
                  <div
                    className={`w-12 h-12 bg-background flex items-center justify-center relative mb-4 border-2 ${
                      step.accent
                        ? "border-accent shadow-[0_0_15px_rgba(0,229,204,0.2)]"
                        : "border-surface-light"
                    }`}
                  >
                    <Icon
                      weight={step.accent ? "fill" : "regular"}
                      className={`w-5 h-5 ${step.accent ? "text-accent" : "text-foreground"}`}
                    />
                  </div>
                  <h5
                    className={`text-lg font-medium mb-2 ${
                      step.accent ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </h5>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden relative pl-16">
          {/* Vertical track */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-border">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="w-full h-full bg-accent/40 origin-top"
            />
            {isInView && (
              <div
                className="absolute left-[-3.5px] w-2 h-2 bg-accent shadow-[0_0_10px_#00E5CC,0_0_20px_#00E5CC] z-10"
                style={{ animation: "flowVertical 4s linear infinite" }}
              />
            )}
          </div>

          <div className="space-y-12">
            {pipelineSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                  className="relative"
                >
                  <div
                    className={`absolute -left-16 top-0 w-12 h-12 bg-background flex items-center justify-center border-2 z-10 ${
                      step.accent
                        ? "border-accent shadow-[0_0_15px_rgba(0,229,204,0.2)]"
                        : "border-surface-light"
                    }`}
                  >
                    <Icon
                      weight={step.accent ? "fill" : "regular"}
                      className={`w-5 h-5 ${step.accent ? "text-accent" : "text-foreground"}`}
                    />
                  </div>
                  <h5
                    className={`text-lg font-medium mb-1 ${
                      step.accent ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </h5>
                  <p className="text-xs text-muted font-light leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto mt-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <AnimateIn direction="left" delay={0.3}>
          <div className="border-l border-accent pl-6 bg-gradient-to-r from-surface to-transparent p-6">
            <span className="text-4xl font-medium text-foreground block mb-2">
              3–5&times;
            </span>
            <span className="text-sm font-semibold tracking-[0.15em] text-muted uppercase">
              Conversion Rate Delta*
            </span>
          </div>
        </AnimateIn>
        <AnimateIn direction="right" delay={0.4}>
          <div className="border-l border-accent pl-6 bg-gradient-to-r from-surface to-transparent p-6">
            <span className="text-4xl font-medium text-foreground block mb-2">
              &lt;60s
            </span>
            <span className="text-sm font-semibold tracking-[0.15em] text-muted uppercase">
              Lead-to-Call Window
            </span>
          </div>
        </AnimateIn>
      </div>
      <p className="text-center text-[10px] text-muted/50 mt-8 relative z-10">
        *Compared to industry average standalone landing pages without integrated
        remarketing loops.
      </p>
    </section>
  );
}
