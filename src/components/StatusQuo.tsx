"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Browsers, Target, ChartLineUp, ArrowRight } from "@phosphor-icons/react";

const features = [
  {
    icon: Browsers,
    label: "Landing Pages",
    desc: "Custom-built pages that turn visitors into leads.",
  },
  {
    icon: Target,
    label: "Ad Campaigns",
    desc: "Google and Meta ads targeted to your property's data.",
  },
  {
    icon: ChartLineUp,
    label: "CRM Delivery",
    desc: "Leads flow directly into your CRM in under 60 seconds.",
  },
];

export default function StatusQuo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why"
      className="py-24 md:py-32 border-b border-light-border bg-light-bg overflow-hidden"
      ref={ref}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Centered header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-light-text tracking-tight mb-5"
          >
            Lead Generation Autopilot
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base md:text-lg text-light-muted leading-relaxed max-w-2xl mx-auto"
          >
            Use Parallel Base to launch landing pages, run ad campaigns, and
            capture leads straight into your CRM. All from a single order.
          </motion.p>
        </div>

        {/* 3 feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-14">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="bg-white border border-light-border p-6 group hover:border-light-text/20 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-light-text mb-1.5">
                  {f.label}
                </h3>
                <p className="text-sm text-light-muted leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3.5 text-sm font-bold tracking-wide hover:bg-accent hover:text-background transition-colors group"
          >
            Get Started
            <ArrowRight
              weight="bold"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
