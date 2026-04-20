"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stages = [
  {
    number: "01",
    gerund: "Writing",
    frequency: "Every listing.",
    title: "Adaptive Pages",
    desc: "Our models study your listings and generate pages built to convert each one \u2014 not a template with the address swapped in.",
  },
  {
    number: "02",
    gerund: "Bidding",
    frequency: "Every hour.",
    title: "Live Ad Optimization",
    desc: "Algorithms adjust your Google and Meta spend continuously, chasing the clicks most likely to become clients.",
  },
  {
    number: "03",
    gerund: "Routing",
    frequency: "Every lead.",
    title: "Instant Handoff",
    desc: "Scored, ranked, and in your CRM in under 60 seconds \u2014 with the hottest ones flagged first.",
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
        {/* Header: two-clause narrative headline */}
        <div className="mb-16 md:mb-24 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-[3.75rem] font-medium tracking-[-0.03em] leading-[1.05]"
          >
            <span className="block text-light-muted">
              While you&apos;re showing homes,
            </span>
            <span className="block mt-2 md:mt-3 md:ml-[8%] text-light-text relative w-fit">
              we&apos;re building your pipeline.
              <span className="absolute -right-5 top-1 md:top-2 md:-right-7 flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full bg-accent opacity-50 animate-ping" />
                <span className="relative inline-flex h-[5px] w-[5px] bg-accent" />
              </span>
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 md:mt-12 md:ml-[8%] flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10 border-l border-accent/40 pl-5 md:pl-7"
          >
            <p className="text-base md:text-lg text-light-muted leading-relaxed font-light max-w-md">
              A self-operating lead engine trained on what actually converts in
              your market.
            </p>
            <a
              href="#pipeline"
              className="shrink-0 inline-flex items-center justify-center px-7 py-3.5 bg-light-text text-light-bg text-[10px] font-semibold tracking-[0.2em] uppercase border border-light-text hover:bg-transparent hover:text-light-text transition-colors"
            >
              See It Run
            </a>
          </motion.div>
        </div>

        {/* Stages as cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {stages.map((s, i) => (
            <motion.article
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="group relative bg-white border border-light-border hover:border-light-text transition-colors duration-300 flex flex-col"
            >
              {/* Top meta bar: ordinal + live status */}
              <div className="flex items-center justify-between px-6 md:px-7 pt-6 md:pt-7 pb-5 border-b border-light-border">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center bg-light-text text-light-bg text-[10px] font-semibold tracking-[0.15em] px-1.5 py-0.5">
                    {s.number}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-light-muted">
                    {s.gerund} · {s.frequency.replace(".", "")}
                  </span>
                </div>
                <span className="relative flex h-2 w-2 items-center justify-center" aria-label="Live">
                  <span className="absolute inline-flex h-full w-full bg-accent opacity-50 animate-ping" />
                  <span className="relative inline-flex h-[4px] w-[4px] bg-accent" />
                </span>
              </div>

              {/* Title — hero, with running counter indicator */}
              <div className="px-6 md:px-7 pt-8 md:pt-10 flex-1 flex flex-col">
                <h3 className="font-medium tracking-[-0.02em] leading-[1.05] text-light-text text-3xl md:text-[2rem] lg:text-[2.25rem] xl:text-4xl max-w-[14ch]">
                  {s.title}
                </h3>

                <p className="mt-5 md:mt-6 text-[14px] md:text-[15px] font-light text-light-muted leading-relaxed">
                  {s.desc}
                </p>

                {/* Bottom rule with teal tick */}
                <div className="mt-auto pt-8 md:pt-10 pb-6 md:pb-7 flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-light-muted">
                    Running
                  </span>
                </div>
              </div>

              {/* Accent corner bracket on hover */}
              <span className="absolute top-0 right-0 w-3 h-[1px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-0 right-0 w-[1px] h-3 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
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
