# Zephaniah Gustafson's Personal Portfolio 🚀

A modern, minimalist, dark-mode first portfolio website built with **Vue 3**, **Vite**, and **Tailwind CSS v4**. This site serves as a digital hub showcasing professional work experience, academic coursework, technical projects, and writing.

👉 **Live Site:** [personal-portfolio-wise05.vercel.app](https://personal-portfolio-wise05.vercel.app/) (or your Vercel deployment link)

---

## 🌟 Key Features

- **⚡ Vue 3 & Vite:** Built on the Vue 3 Composition API and Vite for an ultra-fast developer experience and snappy client-side navigation.
- **🎨 Tailwind CSS v4:** Leverages the latest Tailwind CSS v4 framework (utilizing `@tailwindcss/vite` and `@tailwindcss/typography` plugins) for clean, high-performance styling and responsive grid layouts.
- **🌌 Particle Starfield:** A sleek, animated starry background built with `tsparticles` (`@tsparticles/vue3`) that dynamically renders a blinking night sky (auto-disabled on mobile to save CPU/battery).
- **📝 Runtime Markdown Engine:** Parses static Markdown files under `src/content/` at runtime using a lightweight client-safe frontmatter parser combined with `marked` for HTML rendering, avoiding Node.js dependencies in the browser.
- **🎶 YouTube Music Integration:** A serverless backend function (`/api/songs.js`) configured on Vercel that proxies the YouTube Data API v3 to fetch a public music playlist. It secures API keys and features a 1-hour `stale-while-revalidate` cache header to optimize performance and prevent API rate-limiting bills.
- **🔍 Global Search:** Real-time client-side search indexing coursework, blog posts, projects, and work history.

---

## 📂 Project Architecture

```text
src/
├── assets/          # Static assets (fonts, images, e.g. mug_shot.webp)
├── components/      # Reusable Vue components
│   ├── layout/      # Core layout wrapper components (Navbar, Footer)
│   └── ui/          # Low-level visual elements (StarfieldBackground, TypingEffect)
├── composables/     # Shared reactive logic for parsing & fetching content
│   ├── useBlog.js
│   ├── useCoursework.js
│   ├── useProfessionalWork.js
│   └── useProjects.js
├── content/         # Static markdown content files
│   ├── blog/        # Blog articles
│   ├── coursework/  # Academic coursework details
│   ├── projects/    # Detailed project write-ups
│   └── work/        # Professional experience posts
├── router/          # Vue Router configurations (index.js)
├── views/           # Page-level components
│   ├── AboutView.vue
│   ├── BlogDetailView.vue
│   ├── CourseworkDetailView.vue
│   ├── HomeView.vue
│   ├── ProjectDetailView.vue
│   ├── Search.vue
│   └── WorkDetailView.vue
├── App.vue          # Root component layout wrapper
├── main.js          # App initialization and tsparticles registration
└── style.css        # Main stylesheet importing Tailwind v4 & typography plugins
```

---

## 🛠️ Tech Stack & Dependencies

### Core Frameworks
- **Vue 3:** Component-based UI framework
- **Vue Router:** Client-side routing with smooth scroll-to-top behavior
- **Vite:** Production builder & hot-module-reload development server

### Styling & Animation
- **Tailwind CSS v4:** Modern utility-first CSS engine
- **Lucide Vue:** Clean, consistent SVG icon set
- **tsParticles / @tsparticles/vue3:** Particle systems engine for the interactive starfield

### Content & APIs
- **Marked:** Markdown parser and compiler
- **Gray-Matter:** Frontmatter parser (lightweight custom parsing in browser)
- **Vercel Serverless Functions:** Serverless handler for YouTube Music proxying

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js installed (LTS recommended).
- **npm:** Package manager (configured with `npm@10.8.2` or later).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Wise05/PersonalPortfolio.git
   cd PersonalPortfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` or `.env.local` file in the root directory and add your YouTube API Key:
   ```env
   YOUTUBE_API_KEY="your_youtube_api_key_here"
   ```

### Development Scripts

- **Run locally (Development Server):**
   ```bash
   npm run dev
   ```
   *Runs by default at [http://127.0.0.1:5173/](http://127.0.0.1:5173/).*

- **Build for production:**
   ```bash
   npm run build
   ```
   *Compiles static assets into the `dist/` directory.*

- **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

The project is configured for seamless deployment on **Vercel** via `vercel.json`:
- **Serverless API Routing:** Requests to `/api/songs` route to `/api/songs.js` to fetch recent tracks.
- **Routing Fallbacks:** Vite Router handles all single-page application paths smoothly.

To deploy using Vercel CLI:
```bash
npm install -g vercel
vercel
```

Make sure to set your `YOUTUBE_API_KEY` environment variable in your Vercel Dashboard under **Project Settings > Environment Variables**.

---

## 🧑‍💻 Author

**Zephaniah Gustafson**
- **Education:** Software Engineering Student @ Iowa State University (Class of 2027)
- **Email:** zevangus@gmail.com
- **LinkedIn:** [Zephaniah Gustafson](https://www.linkedin.com/in/zephaniah-gustafson-13a36b1aa/)
- **GitHub:** [@Wise05](https://github.com/Wise05)

