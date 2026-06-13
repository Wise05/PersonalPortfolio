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
          Portfolio
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

        <!-- Social / Contact Quick Links -->
        <div class="flex items-center gap-4 border-l border-zinc-200 pl-6 dark:border-zinc-800">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="GitHub"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="LinkedIn"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:hello@example.com" 
            class="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="Contact Email"
          >
            Email
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>
