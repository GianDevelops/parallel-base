"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimateIn from "./AnimateIn";

const reviews = [
  {
    name: "Michael Torres",
    title: "Team Lead, Coldwell Banker Scottsdale",
    text: "I used to spend hours trying to set up Facebook ads that never worked. Now I just submit my listing details and Parallel Base handles everything. The leads actually show up to appointments. Game changer.",
    date: "02/2026",
    image: "/images/reviews/michael-torres.jpg",
  },
  {
    name: "Sarah Kim",
    title: "Broker Associate, Sotheby's Seattle",
    text: "The integration between the landing page and my CRM is seamless. Leads come in and I get a notification instantly. No more copying emails from spreadsheets. Worth every penny.",
    date: "03/2026",
    image: "/images/reviews/sarah-kim.jpg",
  },
  {
    name: "Amanda Chen",
    title: "Luxury Specialist, Douglas Elliman NYC",
    text: "What I love most is that I don't have to think about it. I place the order, they build the page and launch the ads, and leads start flowing into my CRM. It's the system I always wanted but could never build myself.",
    date: "02/2026",
    image: "/images/reviews/amanda-chen.jpg",
  },
  {
    name: "Nicole Alvarez",
    title: "Team Lead, Keller Williams Coral Gables",
    text: "We switched our entire team's marketing to Parallel Base. The building pages for our pre-construction projects are professional and convert incredibly well. Our developers are impressed too.",
    date: "01/2026",
    image: "/images/reviews/nicole-alvarez.jpg",
  },
  {
    name: "James Park",
    title: "Broker, Park Group Real Estate",
    text: "Fast, clean, and effective. I submitted my listing on Monday, the campaign was live by Wednesday, and I had 12 leads by Friday. The ad creative they produce is better than what my last marketing agency delivered.",
    date: "03/2026",
    image: "/images/reviews/james-park.jpg",
  },
  {
    name: "Lauren Mitchell",
    title: "Realtor, Berkshire Hathaway Newport Beach",
    text: "I've tried every landing page tool out there and nothing comes close. The load speed alone makes a huge difference. Buyers actually stay on the page. And the MLS integration keeps them browsing my other listings.",
    date: "02/2026",
    image: "/images/reviews/lauren-mitchell.jpg",
  },
];

// Split into 2 columns for masonry
const col1 = reviews.filter((_, i) => i % 2 === 0);
const col2 = reviews.filter((_, i) => i % 2 === 1);

function ReviewCard({ review, index }: { review: (typeof reviews)[0]; index: number }) {
  return (
    <AnimateIn delay={0.05 * index}>
      <div className="bg-white p-6 border border-light-border group hover:border-light-text/20 transition-colors duration-300">
        {/* Quote mark */}
        <div className="text-3xl text-light-border font-serif leading-none mb-3">&ldquo;</div>

        {/* Review text */}
        <p className="text-sm text-light-muted leading-relaxed mb-5">
          {review.text}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 border-t border-light-border pt-4">
          <Image
            src={review.image}
            alt={review.name}
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-light-text">{review.name}</p>
            <p className="text-xs text-light-muted mt-0.5 truncate">{review.title}</p>
          </div>
          <span className="text-[10px] text-light-muted tracking-wider flex-shrink-0">{review.date}</span>
        </div>
      </div>
    </AnimateIn>
  );
}

export default function Reviews() {
  return (
    <section className="py-24 md:py-32 border-b border-light-border bg-light-bg">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimateIn>
          <span className="text-xs font-semibold tracking-[0.2em] text-background uppercase block mb-4">
            What Agents Are Saying
          </span>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h3 className="text-3xl md:text-5xl font-medium text-light-text tracking-tight mb-16">
            Results speak louder than promises.
          </h3>
        </AnimateIn>

        {/* Masonry 2-column layout */}
        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {reviews.map((review, i) => (
            <div key={review.name} className="break-inside-avoid">
              <ReviewCard review={review} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
