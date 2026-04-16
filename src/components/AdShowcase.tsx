"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ads = [
  { src: "/images/ads/ad-seattle-luxury.jpg", alt: "Luxury Living in Seattle — Google Display Ad" },
  { src: "/images/ads/ad-scottsdale-desert.jpg", alt: "Desert Oasis in Scottsdale — Google Display Ad" },
  { src: "/images/ads/ad-santa-monica-ocean.jpg", alt: "225 Ocean Ave Santa Monica — Google Display Ad" },
  { src: "/images/ads/ad-miami-dream.jpg", alt: "Your Dream Home in Miami — Google Display Ad" },
  { src: "/images/ads/ad-malibu-luxury.jpg", alt: "Luxury Living in Malibu — Google Display Ad" },
  { src: "/images/ads/ad-newport-coastal.jpg", alt: "123 Ocean View Drive Newport Beach — Google Display Ad" },
];

// Duplicate for seamless infinite scroll
const allAds = [...ads, ...ads];

export default function AdShowcase() {
  return (
    <section className="relative py-16 md:py-20 border-b border-border bg-background overflow-hidden">
      {/* Label */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="h-[1px] w-8 bg-accent" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Ad Creative Examples
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-sm mt-3 max-w-md"
        >
          Google Display ad image assets we build for our clients. Every campaign gets custom creative tailored to the property and market.
        </motion.p>
      </div>

      {/* Scrolling marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {allAds.map((ad, i) => (
            <div
              key={`${ad.src}-${i}`}
              className="relative flex-shrink-0 w-[320px] md:w-[400px] group"
            >
              <div className="relative overflow-hidden border border-border bg-surface">
                <Image
                  src={ad.src}
                  alt={ad.alt}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
