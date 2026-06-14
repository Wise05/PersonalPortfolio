<template>
  <footer class="mt-auto border-t border-zinc-800 py-8 light:border-zinc-200">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between">
      <p class="text-xs text-zinc-400 light:text-zinc-500">
        &copy; {{ new Date().getFullYear() }} Zephaniah Gustafson. All rights reserved.
      </p>
      <p class="mt-2 text-xs text-zinc-500 light:text-zinc-400 sm:mt-0">
        Built with Vue 3, Tailwind CSS, &amp; a serverless Vercel backend
      </p>
    </div>
  </footer>
</template>
