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
  { number: "01", label: "Place your order" },
  { number: "02", label: "We build it" },
  { number: "03", label: "We launch it" },
];

export default function GetStarted() {
  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-accent/3 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-50 border-b border-border/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="group transition-transform hover:scale-[1.02]">
            <Image
              src="/logo.png"
              alt="Parallel Base"
              width={590}
              height={100}
              priority
              className="h-7 md:h-8 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero area */}
      <div className="relative z-10 text-center pt-8 md:pt-10 pb-6 px-6">
        <h1 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
          Build your campaign
        </h1>
        <p className="text-muted text-base md:text-lg max-w-md mx-auto mb-8">
          Select your services, add your property details, and we handle the rest. Takes about 2 minutes.
        </p>

        {/* Steps as horizontal pills */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                  {step.number}
                </span>
                <span className="text-xs md:text-sm text-muted font-medium hidden sm:block">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-12 h-[1px] bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bot + flanking images */}
      <div className="relative z-10 flex-1 px-4 md:px-10 pb-8 flex items-start justify-center">
        <div className="w-full relative flex items-start justify-center">
          {/* Order bot */}
          <div className="w-full max-w-[800px] overflow-hidden" style={{ height: "calc(100vh - 260px)", minHeight: "400px", maxHeight: "580px" }}>
            <OrderBot />
          </div>

        </div>
      </div>
    </div>
  );
}
