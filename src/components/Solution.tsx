"use client";

import AnimateIn from "./AnimateIn";

const cards = [
  {
    label: "Capture",
    headline: "Pages engineered to convert.",
    description:
      "Bespoke architectures built around lead psychology. Native forms, sub-millisecond loads, and direct CRM injection. No leaks.",
    highlight: false,
  },
  {
    label: "Target",
    headline: "Ads that find the right buyer.",
    description:
      "Precision algorithms targeting Google search intent and Meta behavioral signals. We don't buy clicks, we buy conversations.",
    highlight: false,
  },
  {
    label: "Convert",
    headline: "Connected from click to close.",
    description:
      "The ads drive to the page. The page captures the lead. The lead hits your CRM instantly. A closed logic loop.",
    highlight: true,
  },
];

export default function Solution() {
  return (
    <section className="bg-background border-b border-border text-foreground">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="px-6 md:px-12 py-20 border-b border-border">
          <AnimateIn>
            <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-4 block">
              The Solution
            </span>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight">
              Two systems. One engine.
              <br />
              Zero wasted spend.
            </h3>
          </AnimateIn>
        </div>

        {/* 3 Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-border gap-[1px]">
          {cards.map((card, i) => (
            <AnimateIn key={card.label} delay={0.1 * i}>
              <div className="bg-background p-10 md:p-14 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
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
