---
title: "Colloney"
description: "A mobile finance app for students, with an alien colonizer twist."
date: "2025-12-20"
tags: ["Java", "Android", "UX/UI"]
featured: true
---

# Colloney: A Gamified Student Financial Platform

> **Award**: Placed **2nd out of ~13 teams** in Computer Science 3090 at Iowa State University.

**Colloney** is a mobile fintech application designed to help college students build savings habits, manage budgets, and develop financial literacy. Built over the course of a semester by a team of four (two frontend, two backend), I served as a primary engineer on the frontend team.

The original vision for Colloney was a fully gamified savings experience where a digital town or "colony" would physically expand and thrive as the user made real-world progress toward their tuition savings goals. While strict academic milestones forced us to backlog some of our deeper gamification aesthetics, the core engine we shipped was robust enough to earn a top spot in the department.

* **Frontend**: Java, Android Studio, XML
* **Backend**: Spring Boot, WebSockets

🎬 [Watch the Video Demo on YouTube](https://www.youtube.com/watch?v=CKpuQ5GOM_Q)

---

## Key Features

### 1. Onboarding & Dynamic Budgeting
Upon registration, users are seamlessly guided into a targeted budgeting form. The app was designed to cross-reference data with the federal *College Scorecard API* to help students project realistic tuition milestones and timeline goals based on their institution.

### 2. The Colloney Hub (Home Page)
The dashboard consolidates the user's aggregate assets, active goals, and progress bars into a single view. Architecturally, the home page serves as a visual navigation hub where different financial modules are represented as interactive "buildings."

### 3. Real-Time Stocks & Mock Trading
We built a simulated market environment allowing users to create watchlists, study historical performance data, and execute mock trades. 
* **Under the Hood**: The Spring Boot backend managed automated background tasks to poll external financial APIs, which it cached locally. It then pushed real-time ticker updates to the Android frontend using a **WebSocket** connection for instant data-binding.

### 4. Core Banking & Micro-Transactions
A streamlined ledger system where users can spin up multiple virtual accounts (checking, savings, etc.) to simulate deposits, withdrawals, and internal transfers, backed by a comprehensive transaction history log.

### 5. Curated Financial News Feed
To build financial literacy, the backend periodically scraped and sorted relevant economic articles. The frontend featured built-in filtering mechanisms, letting users isolate news by specific companies or macroeconomic topics.

### 6. AI Financial Advisor ("Robot Financial Advice")
We integrated a localized AI agent prompted to act specifically as a conservative financial advisor. The large language model interface was hosted on our server-side infrastructure, which the frontend consumed via a clean API layer.

### 7. Social Posts & Community Feed
To keep users engaged, we implemented a real-time social feed utilizing **WebSockets**. Students could post tips, discuss strategies, and filter global posts using keyword searches.

### 8. Budgetary Planning
An agile, last-mile implementation module focused on setting strict spending limits across distinct categories, designed to maximize our rubric coverage before final submission.

---

## My Contributions

As one of the two frontend developers, I was responsible for roughly half of the user-facing codebase:
* **Feature Development**: Engineered the complete frontend architecture for the Login/Sign-Up flow, Budgeting Setup, Core Banking, AI Advisor interface, and the WebSocket-driven Social Feed.
* **UI/UX Polishing**: Refactored and polished the XML layouts for the Stocks and News feeds to ensure visual continuity.
* **Core Infrastructure**: Wrote the centralized `Volley` utility layer to standardize asynchronous HTTP networking. 
* **Code Architecture**: Led a mid-semester codebase refactor to eliminate technical debt, enforce consistent styling rules, and decouple UI components from data parsing.

---

## Technical & Professional Reflection

This project was a profound lesson in software engineering team dynamics. From architecture choices to design philosophies, our group experienced friction and communication barriers at almost every milestone. Navigating those moments required me to continually adapt my communication style, practice active listening, and find compromise under tight academic deadlines.

Ironically, solving the technical challenges—like handling concurrent WebSocket streams in Android—felt straightforward compared to managing team alignment. Ultimately, I am incredibly grateful for the friction. It served as a low-stakes sandbox that prepared me for complex, multi-developer engineering teams in the real world.
