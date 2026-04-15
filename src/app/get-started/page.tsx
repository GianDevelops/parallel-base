import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started — Parallel Base",
  description:
    "Launch your first campaign. Select what you need, add your property details, and we handle the rest.",
};

export default function GetStarted() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="text-background font-black text-xs tracking-tighter leading-none">
                PB
              </span>
            </div>
            <span className="text-foreground font-bold text-lg tracking-tight">
              Parallel Base
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-20 text-center">
          {/* Decorative element */}
          <div className="w-16 h-16 mx-auto mb-8 border border-border bg-surface flex items-center justify-center">
            <div className="w-8 h-8 border border-accent/30 bg-accent/5 flex items-center justify-center">
              <div className="w-2 h-2 bg-accent" />
            </div>
          </div>

          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-foreground mb-6">
            Your campaign starts here.
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-4 max-w-lg mx-auto">
            Our ordering experience is being built. Soon you&apos;ll be able to
            select your products, add property details, choose add-ons, and
            check out — all in minutes.
          </p>

          <p className="text-base text-muted leading-relaxed mb-10 max-w-lg mx-auto">
            In the meantime, reach out directly and we&apos;ll get you started.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:gian@corexrealestate.com"
              className="group inline-flex items-center h-14 px-10 bg-accent text-background text-base font-semibold tracking-wide hover:bg-accent-hover transition-colors duration-200"
            >
              Contact Us
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <Link
              href="/"
              className="inline-flex items-center h-14 px-10 text-muted text-base font-medium tracking-wide border border-border hover:border-border-light hover:text-foreground transition-colors duration-200"
            >
              Explore the Product
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
