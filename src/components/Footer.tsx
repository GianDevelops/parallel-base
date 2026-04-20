import Link from "next/link";
import Image from "next/image";

const engineLinks = [
  { label: "Listing Pages", href: "#pages" },
  { label: "Brand & Territory", href: "#pages" },
  { label: "Building Profiles", href: "#pages" },
  { label: "Google Ads", href: "#ads" },
  { label: "Meta Ads", href: "#ads" },
];

const systemLinks = [
  { label: "Get Started", href: "/get-started", accent: true },
  { label: "Contact", href: "mailto:gian@corexrealestate.com" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer>
      {/* Tagline band — light */}
      <div className="bg-light-bg border-t border-light-border">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <p className="text-xl md:text-2xl font-bold text-light-text tracking-tight max-w-xl leading-snug">
            Built for agents who&apos;d rather close deals than configure
            pixels.
          </p>
        </div>
      </div>

      {/* Footer links — dark */}
      <div className="bg-background border-t border-surface-light">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Col 1: Logo + description */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.png"
                  alt="Parallel Base"
                  width={590}
                  height={100}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-muted text-sm font-light max-w-sm mb-8 leading-relaxed">
                High-performance landing pages and precision-targeted ad
                campaigns for real estate agents. Fully integrated. Built to
                convert.
              </p>
            </div>

            {/* Col 2: Engine links */}
            <div>
              <h6 className="text-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-6">
                Engine
              </h6>
              <ul className="space-y-4">
                {engineLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors relative group block w-fit"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: System links */}
            <div>
              <h6 className="text-foreground text-xs uppercase tracking-[0.2em] font-semibold mb-6">
                System
              </h6>
              <ul className="space-y-4">
                {systemLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className={`text-sm transition-colors ${
                          link.accent
                            ? "text-accent hover:text-foreground font-medium"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {link.label}
                        {link.accent && " →"}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-light">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted/70 tracking-wider">
              &copy; 2026 Parallel Base. All rights reserved.
            </span>
            <span className="text-xs text-foreground/20 tracking-[0.2em] uppercase">
              parallelbase.io
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
