"use client";

import AnimateIn from "./AnimateIn";
import { WarningOctagon } from "@phosphor-icons/react";

export default function StatusQuo() {
  return (
    <section id="why" className="py-24 md:py-32 border-b border-light-border bg-light-bg">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          {/* Left: Label */}
          <div>
            <AnimateIn direction="left">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-background uppercase flex items-center gap-3">
                <WarningOctagon weight="fill" className="w-4 h-4" />
                The Status Quo
              </h2>
            </AnimateIn>
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
                  Instagram. You wait. Nothing happens — or worse, you get leads
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
