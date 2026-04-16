import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OrderBot from "@/components/OrderBot";

export const metadata: Metadata = {
  title: "Get Started — Parallel Base",
  description:
    "Launch your first campaign. Select what you need, add your property details, and we handle the rest.",
};

const steps = [
  {
    number: "01",
    headline: "Place your order.",
    body: "Select what you need — landing page, ad campaign, or both — plus any add-ons. Add your property or market details and check out.",
  },
  {
    number: "02",
    headline: "We build it.",
    body: "Our team builds your campaign using your property data, our targeting algorithm, and conversion-tested page architecture.",
  },
  {
    number: "03",
    headline: "We launch it.",
    body: "Your campaign goes live. Leads start flowing directly into your CRM. You focus on closing.",
  },
];

export default function GetStarted() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-light-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="text-background font-black text-xs tracking-tighter leading-none">
                PB
              </span>
            </div>
            <span className="text-light-text font-bold text-lg tracking-tight">
              Parallel Base
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-light-muted hover:text-light-text transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-6 px-4 md:px-10 bg-light-bg h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden w-full relative flex items-stretch justify-center">
          {/* Left: Process steps — centered between left window edge and bot */}
          <div
            className="hidden lg:flex flex-col justify-center w-[300px] absolute top-0 bottom-0 left-[calc((50%-250px)/2)] -translate-x-1/2"
          >
            <h2 className="text-2xl font-medium text-light-text tracking-tight mb-2">
              How it works
            </h2>
            <p className="text-sm text-light-muted mb-10">
              From order to live in days, not weeks.
            </p>

            <div className="relative border-l border-light-border pl-8 space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  {/* Diamond node */}
                  <div className="absolute -left-[37px] top-1 w-2.5 h-2.5 bg-light-bg border border-light-border transform rotate-45" />

                  <span className="text-xs font-bold tracking-[0.15em] text-light-muted block mb-1">
                    Step {step.number}
                  </span>
                  <h3 className="text-base font-medium text-light-text mb-1.5">
                    {step.headline}
                  </h3>
                  <p className="text-sm text-light-muted font-light leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order bot — always centered */}
          <div className="overflow-hidden max-w-[500px] w-full">
            <OrderBot />
          </div>

          {/* Right: Example sites — centered between bot and right window edge */}
          <div
            className="hidden lg:flex flex-col justify-center items-center w-[320px] absolute top-0 bottom-0 right-[calc((50%-250px)/2)] translate-x-1/2"
          >
            <div className="flex flex-col gap-3 w-full">
              <div className="border border-light-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="/images/examples/miami-beach.jpg"
                  alt="Oceanfront Living in Miami Beach — example landing page"
                  width={320}
                  height={180}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="border border-light-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="/images/examples/brickell.jpg"
                  alt="Luxury Urban Living in Brickell — example landing page"
                  width={320}
                  height={180}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="border border-light-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src="/images/examples/family-home.jpg"
                  alt="Charming Family Home in Miami — example landing page"
                  width={320}
                  height={180}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
