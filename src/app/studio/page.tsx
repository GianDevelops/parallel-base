import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import StudioWaitlist from "@/components/StudioWaitlist";

export const metadata: Metadata = {
  title: "Parallel Studio — Coming Soon",
  description:
    "Parallel Studio: the same engine behind Parallel Base, now self-serve. AI landing pages, ad campaigns, lead capture, lead scoring, analytics, and a built-in CRM.",
};

const capabilities = [
  {
    num: "01",
    name: "AI Landing Pages",
    blurb: "Generate high-converting pages tailored to each property in seconds.",
  },
  {
    num: "02",
    name: "AI Ad Campaigns",
    blurb: "Launch and optimize Google + Meta ads with creative built for your market.",
  },
  {
    num: "03",
    name: "Lead Capture",
    blurb: "Frictionless intake forms wired straight into your data.",
  },
  {
    num: "04",
    name: "Lead Scoring",
    blurb: "Algorithmic prioritization so you work the hottest leads first.",
  },
  {
    num: "05",
    name: "Analytics Dashboard",
    blurb: "Real-time campaign and pipeline telemetry — at a glance.",
  },
  {
    num: "06",
    name: "Built-in CRM",
    blurb: "A central command center for your entire client roster.",
  },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* DARK TOP — header, hero, mockup */}
      <div className="bg-background text-foreground relative overflow-hidden">
        {/* Faint accent glow */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[60px] md:blur-[120px] pointer-events-none z-0" />

        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 py-6 md:py-8 relative z-10">
          {/* Header bar */}
          <header className="flex justify-between items-center pb-6 border-b border-border w-full mb-12 md:mb-16">
            <Link
              href="/"
              className="group flex items-center gap-3 text-muted hover:text-foreground transition-colors"
            >
              <span className="font-mono text-xs transform group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <Image
                src="/logo.png"
                alt="Parallel Base"
                width={590}
                height={100}
                priority
                className="h-6 md:h-7 w-auto"
              />
            </Link>

            <div className="flex items-center gap-2.5 border border-border px-3 py-1.5">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full bg-accent opacity-50 animate-ping" />
                <span className="relative inline-flex h-[5px] w-[5px] bg-accent" />
              </span>
              <span className="text-[10px] text-accent tracking-[0.2em] font-mono uppercase">
                System: Standby
              </span>
            </div>
          </header>

          {/* Hero pitch */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14 md:mb-20">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <span className="w-1.5 h-1.5 bg-accent block" />
                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.25em]">
                  Coming Soon
                </span>
              </div>

              <h1 className="text-[15vw] sm:text-[10vw] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem] font-medium leading-[0.85] tracking-[-0.04em] text-foreground">
                Parallel
                <br />
                <span className="text-muted/80 block">Studio.</span>
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pt-12 flex flex-col justify-end">
              <h2 className="text-2xl md:text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground mb-5">
                The same engine.
                <br />
                Now in your hands.
              </h2>
              <p className="text-base md:text-lg text-muted leading-relaxed font-light max-w-xl">
                Everything Parallel Base does for you — landing pages, ad
                campaigns, lead capture, lead scoring, an analytics dashboard,
                and a built-in CRM — all in a single self-serve studio. AI
                inside every step.
              </p>
            </div>
          </section>

          {/* Product mockup */}
          <section className="pb-12 md:pb-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.25em]">
                  Preview
                </span>
                <span className="h-[1px] w-12 bg-border" />
                <span className="font-mono text-[10px] text-muted/60 uppercase tracking-[0.2em]">
                  Studio Console
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted/60 uppercase tracking-[0.2em] hidden sm:block">
                Fig. 01 / In Development
              </span>
            </div>

            <div className="relative">
              <Image
                src="/images/studio/dashboard.png"
                alt="Parallel Studio dashboard shown on a laptop"
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="w-full h-auto block"
              />

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
                <span>Concept render — final UI may vary</span>
                <span className="hidden sm:inline">v.1.0 / Beta</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* LIGHT BOTTOM — capability index, waitlist, footer */}
      <div className="bg-light-bg text-light-text flex-grow">
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {/* Capability Index */}
          <section className="mb-16 md:mb-24">
            <div className="flex items-center justify-between border-b border-light-border pb-4 mb-0">
              <span className="font-mono text-[10px] text-light-muted uppercase tracking-[0.25em]">
                Capability Index
              </span>
              <span className="font-mono text-[10px] text-light-muted/70 uppercase tracking-[0.2em]">
                06 modules
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-light-border border-l border-r border-b border-light-border">
              {capabilities.map((c) => (
                <div
                  key={c.num}
                  className="group relative bg-light-bg p-6 md:p-8 transition-colors hover:bg-white"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" />
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-xs tracking-widest text-light-muted/60 group-hover:text-accent transition-colors pt-1 flex-shrink-0">
                      {c.num}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="text-lg md:text-xl font-medium tracking-[-0.01em] text-light-text mb-1.5 leading-tight">
                        {c.name}
                      </h3>
                      <p className="text-[13.5px] text-light-muted leading-relaxed">
                        {c.blurb}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Waitlist */}
          <section className="mb-12 max-w-3xl">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-light-border overflow-hidden">
                <div
                  className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-accent to-transparent"
                  style={{ animation: "marqueeScroll 6s linear infinite" }}
                />
              </div>

              <div className="pt-10 md:pt-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-1.5 bg-accent block" />
                  <span className="font-mono text-[10px] text-light-muted uppercase tracking-[0.25em]">
                    Early Access
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-light-text mb-4">
                  Get on the waitlist.
                </h3>
                <p className="text-light-muted text-base mb-6 max-w-md font-light">
                  Drop your email and we&apos;ll let you know the moment
                  Parallel Studio is ready.
                </p>

                <StudioWaitlist theme="light" />

                <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-[11px] text-light-muted/80 font-mono uppercase tracking-[0.15em]">
                  <span className="w-[3px] h-[3px] bg-light-muted/80 inline-block" />
                  Early access first. No spam. Unsubscribe anytime.
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full mt-auto pt-6 border-t border-light-border flex justify-between items-center text-[10px] font-mono uppercase text-light-muted/70 tracking-[0.2em]">
            <span>© 2026 Parallel Base</span>
            <span>parallelbase.io / studio</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
