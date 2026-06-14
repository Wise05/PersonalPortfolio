---
title: "Portfolio Website Scaffolding"
description: "Creating a minimalistic, dark-mode first portfolio with Vue 3, Vite, and Tailwind CSS v4."
date: "2026-06-13"
tags: ["Vue", "TailwindCSS", "Vite"]
featured: true
---

# Portfolio Website Scaffolding

This is a sample project page. We use **Vue 3** alongside the new **Tailwind CSS v4** to build a lightweight, aesthetic personal website.

## Project Objectives

1. **Clean Architecture:** Keeping components modular and separating markdown content from presentation.
2. **Minimalistic Design:** High contrast, beautiful spacing, and automated dark mode.
3. **Dynamic Loading:** Fetching and compiling markdown content client-side at runtime using `marked` and `gray-matter`.

## Code Highlight Example

Here is a snippet showing how we import raw markdown in Vite:

```javascript
const files = import.meta.glob('/src/content/projects/*.md', { query: '?raw', import: 'default' });
```

Feel free to customize this file or add new project markdown files in `src/content/projects/` directory!
