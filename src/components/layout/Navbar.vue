<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70">
    <div class="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
      
      <!-- Brand Logo / Name -->
      <RouterLink 
        to="/" 
        class="group flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 transition-colors dark:text-white"
      >
        <span class="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
          Zephaniah Gustafson
        </span>
      </RouterLink>

      <!-- Navigation Links -->
      <nav class="flex items-center gap-6">
        <RouterLink 
          to="/" 
          class="text-sm font-medium text-zinc-650 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          active-class="text-zinc-900 font-semibold dark:text-white"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/search" 
          class="text-sm font-medium text-zinc-650 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          active-class="text-zinc-900 font-semibold dark:text-white"
        >
          Search
        </RouterLink>

        <!-- Social / Contact Quick Links -->
        <div class="flex items-center gap-4 border-l border-zinc-200 pl-6 dark:border-zinc-800">
          <a 
            href="https://github.com/Wise05" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <!-- GitHub SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[18px] w-[18px]">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/zephaniah-gustafson-13a36b1aa/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <!-- LinkedIn SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[18px] w-[18px]">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a 
            href="../../assets/Resume_Spring_2026_Zephaniah_Gustafson.pdf" 
            download="Zephaniah_Gustafson_Resume.pdf"
            class="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="Download CV"
            aria-label="Download CV"
          >
            <!-- Custom SVG representing a CV / Resume -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[18px] w-[18px]">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <circle cx="9" cy="13" r="2" />
              <path d="M6 18c0-1.5 1.5-2 3-2s3 .5 3 2" />
              <line x1="14" y1="13" x2="18" y2="13" />
              <line x1="14" y1="17" x2="18" y2="17" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>
