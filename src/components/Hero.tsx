"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden border-b border-border">
      {/* Abstract BG */}
      <div className="absolute inset-0 bg-grid-mesh pointer-events-none opacity-40 z-0" />

      {/* Accent glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[40px] pointer-events-none opacity-50 z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[40px] pointer-events-none opacity-30 z-0" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-start pt-10">
        <div className="max-w-5xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[1px] w-12 bg-accent" />
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">
              Built for Real Estate
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-[-0.03em] text-foreground mb-8"
          >
            Your listings
            <br className="hidden md:block" /> deserve better than
            <br className="hidden md:block" /> a{" "}
            <span className="text-accent relative inline-block">
              templated page.
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent/50 hidden md:block" />
              <span className="absolute -right-3 top-0 h-full w-[1px] bg-accent/50 hidden md:block" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-muted max-w-2xl font-light mb-12 leading-relaxed border-l border-border pl-6"
          >
            Parallel Base builds high-performance landing pages and
            precision-targeted ad campaigns for real estate agents. Fully
            integrated. Fully managed. Built to convert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a
              href="#why"
              className="bg-accent text-background px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors inline-flex items-center"
            >
              See How It Works
            </a>
            <Link
              href="/get-started"
              className="text-foreground text-sm font-medium uppercase tracking-[0.15em] hover:text-accent transition-colors flex items-center gap-2 group"
            >
              Launch Your First Campaign{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4 hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted rotate-[-90deg] origin-left whitespace-nowrap mb-8">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-border relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
