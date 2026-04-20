"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Lightning } from "@phosphor-icons/react";

const navLinks = [
  { label: "Core", href: "#why" },
  { label: "Pages", href: "#pages" },
  { label: "Ads", href: "#ads" },
  { label: "Engine", href: "#pipeline", icon: true },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b py-4 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="group transition-transform hover:scale-[1.02]"
          >
            <Image
              src="/logo.png"
              alt="Parallel Base"
              width={590}
              height={100}
              priority
              className="h-7 md:h-8 w-auto"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-accent transition-colors uppercase text-xs tracking-[0.15em] text-muted font-medium flex items-center gap-1"
              >
                {link.icon && <Lightning weight="fill" className="text-accent w-3 h-3" />}
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href="/get-started"
              className="hidden sm:inline-block border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] hover:border-accent hover:text-accent transition-all text-foreground bg-background/50 backdrop-blur-sm"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="bg-accent text-background px-6 py-2 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden flex flex-col pt-24"
          >
            <div className="flex flex-col items-start px-8 gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="text-2xl font-medium text-foreground tracking-tight uppercase"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/get-started"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center h-12 px-8 bg-accent text-background text-sm font-bold tracking-[0.15em] uppercase mt-4"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
