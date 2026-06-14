---
title: "AI Chatbot Interface"
description: "A gorgeous, conversational interface using Vue 3, dark mode glassmorphism, and stream rendering."
date: "2026-05-20"
tags: ["AI", "Vue", "UX/UI"]
featured: false
---

# AI Chatbot Interface

This project showcases a conversational interface designed to feel premium, lively, and highly interactive. 

## Key Design Specs

- **Glassmorphism:** Frosted borders, subtle backgrounds using backdrop-blur.
- **Micro-interactions:** Spring animations on button hovers, smooth chat bubble fade-ins.
- **Monochrome Theme:** Balanced slate gray values with crisp typography to avoid visual fatigue.

## Dynamic Stream Display

Using standard modern SSE (Server-Sent Events) to render markdown-based streaming responses directly:

```javascript
const reader = response.body.getReader();
// read chunks and append to chat bubbles
```

Explore this project and others by tweaking the markdown file.
