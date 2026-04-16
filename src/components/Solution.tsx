"use client";

import AnimateIn from "./AnimateIn";

const cards = [
  {
    label: "Capture",
    headline: "Pages engineered to convert.",
    description:
      "Custom-built landing pages with strategic lead forms, high-impact visuals, lightning-fast load times, and direct CRM integration. Not a template. A system.",
    highlight: false,
  },
  {
    label: "Target",
    headline: "Ads that find the right buyer.",
    description:
      "Google and Meta campaigns built on a targeting algorithm that analyzes property characteristics — price, location, lifestyle, amenities — to put your listing in front of the people most likely to act.",
    highlight: false,
  },
  {
    label: "Convert",
    headline: "Connected from click to close.",
    description:
      "Your ads drive traffic to your pages. Your pages capture leads. Your leads land directly in your CRM. One pipeline, no gaps, no manual work.",
    highlight: true,
  },
];

export default function Solution() {
  return (
    <section className="bg-background border-b border-border text-foreground">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="px-6 md:px-12 py-14 border-b border-border">
          <AnimateIn>
            <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-4 block">
              The Solution
            </span>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">
              Two systems. One engine.
            </h3>
          </AnimateIn>
        </div>

        {/* 3 Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-border gap-[1px]">
          {cards.map((card, i) => (
            <AnimateIn key={card.label} delay={0.1 * i}>
              <div className="bg-background p-10 md:p-14 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[240px]">
                  <div>
                    {card.highlight ? (
                      <span className="text-[10px] border border-border px-3 py-1 font-semibold tracking-[0.2em] text-foreground bg-border uppercase group-hover:bg-accent group-hover:text-black transition-colors inline-block -skew-x-12">
                        <span className="skew-x-12 block">{card.label}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] border border-border px-3 py-1 font-semibold tracking-[0.2em] text-muted uppercase group-hover:border-accent group-hover:text-accent transition-colors">
                        {card.label}
                      </span>
                    )}
                    <h4 className="text-2xl font-medium mt-8 mb-4 text-foreground">
                      {card.headline}
                    </h4>
                  </div>
                  <p className="text-muted text-sm leading-relaxed font-light mt-auto">
                    {card.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
