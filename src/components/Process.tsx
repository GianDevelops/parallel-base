"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    headline: "Place your order.",
    body: "Select what you need — landing page, ad campaign, or both — plus any add-ons. Add your property or market details and check out. Takes minutes.",
    active: true,
  },
  {
    number: "02",
    headline: "We build it.",
    body: "Our team builds your campaign using your property data, our targeting algorithm, and conversion-tested page architecture.",
    active: false,
  },
  {
    number: "03",
    headline: "We launch it.",
    body: "Your campaign goes live. Leads start flowing directly into your CRM. You focus on closing.",
    active: false,
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 border-b border-light-border bg-light-bg" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold tracking-[0.2em] text-background uppercase block mb-4"
          >
            The Process
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-medium text-light-text tracking-tight"
          >
            From order to live in days, not weeks.
          </motion.h3>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl ml-4 md:ml-12 border-l border-light-border pl-8 md:pl-16 space-y-16 py-8">
          {/* Accent gradient line overlay */}
          <div className="absolute left-[-1px] top-0 h-full w-[1px] bg-gradient-to-b from-light-text via-light-border to-transparent hidden md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.25 }}
              className="relative"
            >
              {/* Diamond node */}
              <div
                className={`absolute -left-[37px] md:-left-[69px] top-0 w-3 h-3 bg-light-bg border transform rotate-45 z-10 transition-colors duration-500 ${
                  step.active ? "border-light-text" : "border-light-border hover:border-light-text"
                }`}
              />

              <span
                className={`text-sm font-bold tracking-[0.2em] mb-2 block ${
                  step.active ? "text-background" : "text-light-muted"
                }`}
              >
                Step {step.number}
              </span>
              <h4 className="text-2xl font-medium text-light-text mb-3">
                {step.headline}
              </h4>
              <p className="text-light-muted font-light leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 ml-4 md:ml-12"
        >
          <Link
            href="/get-started"
            className="bg-background text-foreground px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-accent hover:text-background transition-colors inline-flex items-center gap-3"
          >
            Initiate Setup
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
