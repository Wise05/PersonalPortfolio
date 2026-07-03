---
title: "Portfolio Website"
description: "This website here! Creating a minimalistic, dark-mode first portfolio with Vue 3, Vite, Tailwind, and Vercel."
date: "2026-06-13"
tags: ["Vue", "TailwindCSS", "Vite", "Vercel"]
featured: true
---

# Portfolio Website

This is what you are viewing right now! Right here in this exact moment, with those two fleshy, photon-grabbing orbs. You are staring into your rectangular, electronic portal to any virtual reality you could ever dream of. 

This site was built as a intensive weekend project (plus a bit extra time for all this written content) during the summer of 2026. Because my goal was to see exactly what I could ship in a single weekend, I relied heavily on Google's Antigravity CLI to get the scaffolding up fast. All things considered, I think it turned out pretty great.

## Project Objectives

1. **Clean Architecture:** Keeping components strictly modular and separating raw Markdown content from the presentation layer.
2. **Minimalist Design:** High contrast, intentional spacing, a dynamic background, and snappy micro-interactions—all wrapped in a clean, dark-mode aesthetic.
3. **Dynamic Loading:** Fetching and compiling Markdown content client-side at runtime using `marked` and `gray-matter`.
4. **Serverless Integration:** Fetching and caching tracks from a public YouTube Music playlist to showcase my current rotation while keeping API keys completely secure.

---

## Highlights

Just a few specific details about the site that I really enjoyed building:

### The Animated Background
The starry backdrop uses the `tsparticles` plugin to mimic a faint, blinking night sky. The inspiration came straight from my Firefox browser theme; I loved the look so much I wanted to bring it to my own corner of the web. 

*Note: Depending on your screen size, this effect might be automatically disabled on mobile to save your battery and CPU.*

To keep the weekend timeline intact, I had AI generate the base particle configuration, dropped the component into the layout wrapper, and *voilà*. I used a similar accelerated workflow for the typing animation on the home page, though I hand-picked the string values to keep it personal.

### Real-Time Music Feed
I wanted to inject something alive and dynamic into the site. To do this, I curated a public YouTube playlist and wired it up to a Google Cloud project. 

To keep the API key safe and prevent hitting rate limits, I built a serverless backend using Vercel functions equipped with a 1-hour stale-while-revalidate cache. The playlist updates every hour on the dot, ensuring that even if this site somehow gets hit with unexpected traffic, I won’t get a surprise bill from Google or Vercel.

---

## Challenges & Reflection

From a pure engineering standpoint, the technical hurdle was low due to the modern tooling. Instead, the real challenge was a classic developer trap: **writer's block and scope creep.** 

I found myself staring down a blank editor wondering exactly how much content to write. The odds of a visitor reading every single word on a portfolio are low, but having a robust library of case studies looks undeniably professional. In the end, I found a happy medium: documenting the projects that genuinely taught me something, rather than writing fluff.

---

## Source Code

Want to see how the sausage is made? Check out the full repository on my GitHub: 
👉 [Wise05/PersonalPortfolio](https://github.com/Wise05/PersonalPortfolio)
