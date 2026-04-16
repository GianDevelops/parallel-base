# Parallel Base — Project Context

## What This Is
Parallel Base (parallelbase.io) is a proptech company site. It sells high-performance landing pages and precision-targeted ad campaigns to real estate agents. Single-page marketing site + a /get-started placeholder page.

## Tech Stack
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 with `@theme inline` tokens in globals.css
- **Animations**: framer-motion (scroll-triggered reveals, pipeline animation)
- **Icons**: @phosphor-icons/react
- **Font**: Satoshi (variable, self-hosted in /public/fonts/ via Fontshare)
- **Deploy**: Netlify (netlify.toml config, `npx netlify-cli deploy --prod --dir=.next`)
- **Repo**: https://github.com/GianDevelops/parallel-base
- **Live URL**: https://parallel-base.netlify.app

## Design System

### Colors
- **Background (dark)**: #0C0C0C
- **Surface**: #121212, #1C1C1C
- **Foreground**: #EDEDED
- **Muted text**: #A3A3A3
- **Accent**: #00E5CC (electric teal) — used sparingly on CTAs, labels, stats, animations
- **Light sections**: bg #F5F5F0, text #1A1A1A, muted #6B6B6B, border #D4D4CF
- **NO purple, NO gradient blobs, NO rounded bubbly elements**

### Typography
- Satoshi for everything (headlines and body)
- Headlines: font-medium, tight tracking, large sizes (clamp-based responsive)
- Body: font-light, relaxed leading
- Labels: uppercase, tracking-[0.2em], text-xs, font-semibold
- `text-wrap: balance` on all headings, `text-wrap: pretty` on paragraphs (prevents orphan words)

### Layout Philosophy
- Editorial-inspired, asymmetric grids
- Sharp square corners everywhere (NO border-radius on cards/buttons)
- 1px gap grids for card sections (bg-border gap-[1px] trick)
- max-w-screen-2xl container with px-6 md:px-12 padding
- Alternating dark/light sections for contrast

### Motion
- AnimateIn component: scroll-triggered fade-ins via framer-motion whileInView
- Pipeline section: CSS keyframe animations (flowHorizontal/flowVertical) for traveling dot
- Tab transitions: CSS fadeInTab animation
- Hover effects: border accent reveals, gradient overlays, scale transforms

## Site Structure (section order on page)

1. **Navigation** — Sticky, transparent→solid on scroll. PB logo left, section links center, Sign In + Get Started right. Mobile hamburger.
2. **Hero** — "The lead engine real estate was missing." Accent on "was missing." Grid mesh bg, accent glows, two CTAs.
3. **Ad Showcase** — Auto-scrolling infinite marquee of 6 Google Display ad image assets (in /public/images/ads/). Fade edges on sides.
4. **Status Quo** — Light bg (#F5F5F0). Left column: section label + 3 dark "system diagnostic" cards with red FAIL badges and metrics (ERR_01 Generic Templates, ERR_02 Wasted Ad Spend, ERR_03 Lost Leads). Right column: problem copy.
5. **Solution** — Dark bg. 3-card bento grid (Capture/Target/Convert) with 1px gaps, hover gradients, skewed Convert badge.
6. **Landing Pages** — Light bg. 6-feature grid with hover border accents + tabbed interface (Listing/Brand/Buildings). Each tab shows real screenshot on right side (/public/images/listing|brand|buildings/example.jpg).
7. **Ad Campaigns** — Dark bg (#0A0A0A). Split layout: copy left, Google Engine + Meta Engine cards right with colored left borders and tag badges.
8. **Integration (Full Stack)** — Dark bg, centerpiece section. Centered headline with pill badge. Animated horizontal pipeline (4 nodes: Ad Impression→Page Visit→Lead Captured→CRM Delivery) with traveling glowing dot. Vertical on mobile. Stats: 3-5× and <60s.
9. **Process** — Light bg. Vertical timeline with diamond nodes. 3 steps: Place your order / We build it / We launch it. Get Started CTA.
10. **Reviews** — Light bg. 10 fake testimonials in masonry 2-column layout. White cards with quote marks, headshot photos (from pravatar.cc placeholders in /public/images/reviews/), author info, dates.
11. **Footer** — Light tagline band ("Built for agents who'd rather close deals than configure pixels") then dark footer with logo, Engine links, System links, bottom bar with copyright.

## Pages
- `/` — Main single-page site (all sections above)
- `/get-started` — Placeholder page with "Your campaign starts here" and Contact Us CTA (mailto:gian@corexrealestate.com). Will eventually have an AI-powered ordering experience.

## Key Decisions
- All "Get Started" buttons link to /get-started (NOT "Order Now")
- No packages or pricing tiers shown on site
- No mention of "bot" anywhere in UI
- Reviews are placeholder/fake — will be replaced with real ones later
- The ad showcase images are real examples of Google Display ad creative
- The landing page tab screenshots are real examples of built pages
- Local dev server has issues with Turbopack on this machine — use `npm run build && npx next start -p 4000` for local preview at http://127.0.0.1:4000
- AIDesigner MCP was used to generate the initial design (run_id: 9e4ec379-cd2c-4add-ab2f-6d220c1192da), then converted to React/Next.js components

## Deploy Process
```bash
# Local preview
npm run build && npx next start -p 4000
# then visit http://127.0.0.1:4000

# Deploy to production
git add -A && git commit -m "message" && git push origin main
npm run build && npx netlify-cli deploy --prod --dir=.next
```
