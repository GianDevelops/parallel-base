"use client";

import AnimateIn from "./AnimateIn";
import Link from "next/link";
import { ArrowRight, GoogleLogo, MetaLogo } from "@phosphor-icons/react";

export default function Ads() {
  return (
    <section id="ads" className="py-24 md:py-32 border-b border-border bg-[#0a0a0a]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left column */}
        <div>
          <AnimateIn>
            <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase block mb-4">
              Ad Campaigns
            </span>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h3 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-8">
              Your next buyer is already out there.
              <br />
              We put your listing in front of them.
            </h3>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-muted text-lg mb-8 font-light leading-relaxed">
              Every ad campaign we build starts with your property&apos;s DNA —
              its price, location, lifestyle, and surroundings. Our targeting
              algorithm turns those details into the audience most likely to
              convert.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.25}>
            <p className="text-muted text-base mb-8 font-light leading-relaxed">
              Our algorithm analyzes your listing&apos;s characteristics — price
              point, location, property type, nearby amenities, school districts,
              lifestyle markers — and uses that data to determine the right
              geographies, interest categories, placements, and audience segments.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <p className="text-foreground text-base mb-8 font-medium leading-relaxed">
              The result: your ad shows up in front of people who are already
              looking for exactly what you&apos;re selling. The right buyer, at
              the right time, on the right platform.
            </p>
          </AnimateIn>
        </div>

        {/* Right column — Platform cards */}
        <div className="space-y-6">
          <AnimateIn direction="right" delay={0.2}>
            <div className="border border-border p-8 bg-surface relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-accent/5 pointer-events-none group-hover:bg-accent/10 transition-colors" style={{ borderBottomLeftRadius: '100%' }} />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h4 className="text-2xl font-medium text-foreground">
                  Google Engine
                </h4>
                <GoogleLogo className="w-8 h-8 text-muted" />
              </div>
              <p className="text-muted text-sm font-light mb-6 border-l-2 border-[#4285F4] pl-4">
                Search, Display, and Performance Max campaigns built to intercept
                high-intent buyers the exact second they query a specific
                neighborhood or property type.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-background border border-border px-2 py-1 uppercase tracking-[0.15em] text-muted">
                  Active Search
                </span>
                <span className="text-[10px] bg-background border border-border px-2 py-1 uppercase tracking-[0.15em] text-muted">
                  High Intent
                </span>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={0.35}>
            <div className="border border-border p-8 bg-surface relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-accent/5 pointer-events-none group-hover:bg-accent/10 transition-colors" style={{ borderBottomLeftRadius: '100%' }} />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h4 className="text-2xl font-medium text-foreground">
                  Meta Engine
                </h4>
                <MetaLogo className="w-8 h-8 text-muted" />
              </div>
              <p className="text-muted text-sm font-light mb-6 border-l-2 border-[#0668E1] pl-4">
                Algorithmic disruption across Facebook and Instagram. We target
                life-event signals, financial behavior, and locational data to
                find passive buyers before they even know they&apos;re looking.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-background border border-border px-2 py-1 uppercase tracking-[0.15em] text-muted">
                  Passive Discovery
                </span>
                <span className="text-[10px] bg-background border border-border px-2 py-1 uppercase tracking-[0.15em] text-muted">
                  Visual Impact
                </span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
