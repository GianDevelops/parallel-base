"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimateIn from "./AnimateIn";
import { Crosshair, Target, ArrowsClockwise } from "@phosphor-icons/react";

const nodes = [
  {
    label: "CAPTURE",
    headline: "Pages engineered to convert.",
    desc: "Custom landing pages with strategic lead forms and direct CRM integration.",
    icon: Crosshair,
  },
  {
    label: "TARGET",
    headline: "Ads that find the right buyer.",
    desc: "Google and Meta campaigns built on your property's data.",
    icon: Target,
  },
  {
    label: "CONVERT",
    headline: "Connected from click to close.",
    desc: "One pipeline from ad impression to lead in your CRM.",
    icon: ArrowsClockwise,
    accent: true,
  },
];

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="bg-background border-b border-border text-foreground py-20 md:py-28"
      ref={ref}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-4 block">
            The Solution
          </span>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-16 md:mb-20">
            Two systems. One engine.
          </h3>
        </AnimateIn>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-[44px] left-[16.6%] right-[16.6%] h-[1px] bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              className="h-full bg-accent/40 origin-left"
            />
          </div>

          {/* Arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="absolute top-[38px] left-[calc(33.3%-4px)] text-accent/40 text-xs"
          >
            →
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
            className="absolute top-[38px] left-[calc(66.6%-4px)] text-accent/40 text-xs"
          >
            →
          </motion.div>

          <div className="grid grid-cols-3 gap-12">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`w-[88px] h-[88px] flex items-center justify-center mb-6 border bg-surface relative z-10 ${
                      node.accent
                        ? "border-accent shadow-[0_0_20px_rgba(0,229,204,0.15)]"
                        : "border-border"
                    }`}
                  >
                    <Icon
                      weight={node.accent ? "fill" : "regular"}
                      className={`w-7 h-7 ${node.accent ? "text-accent" : "text-foreground"}`}
                    />
                  </div>

                  <span
                    className={`text-[10px] font-bold tracking-[0.2em] mb-2 ${
                      node.accent ? "text-accent" : "text-muted"
                    }`}
                  >
                    {node.label}
                  </span>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    {node.headline}
                  </h4>
                  <p className="text-sm text-muted font-light leading-relaxed max-w-[260px]">
                    {node.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="md:hidden relative pl-14">
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-border">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="w-full h-full bg-accent/40 origin-top"
            />
          </div>

          <div className="space-y-10">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  className="relative"
                >
                  <div
                    className={`absolute -left-14 top-0 w-[38px] h-[38px] flex items-center justify-center border bg-surface z-10 ${
                      node.accent
                        ? "border-accent shadow-[0_0_12px_rgba(0,229,204,0.15)]"
                        : "border-border"
                    }`}
                  >
                    <Icon
                      weight={node.accent ? "fill" : "regular"}
                      className={`w-4 h-4 ${node.accent ? "text-accent" : "text-foreground"}`}
                    />
                  </div>

                  <span
                    className={`text-[10px] font-bold tracking-[0.2em] block mb-1 ${
                      node.accent ? "text-accent" : "text-muted"
                    }`}
                  >
                    {node.label}
                  </span>
                  <h4 className="text-base font-medium text-foreground mb-1">
                    {node.headline}
                  </h4>
                  <p className="text-sm text-muted font-light leading-relaxed">
                    {node.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
