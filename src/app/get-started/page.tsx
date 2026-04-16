import type { Metadata } from "next";
import Link from "next/link";
import OrderBot from "@/components/OrderBot";

export const metadata: Metadata = {
  title: "Get Started — Parallel Base",
  description:
    "Launch your first campaign. Select what you need, add your property details, and we handle the rest.",
};

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

      <main className="pt-24 pb-6 px-4 bg-light-bg h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden max-w-[500px] mx-auto w-full">
          <OrderBot />
        </div>
      </main>
    </>
  );
}
