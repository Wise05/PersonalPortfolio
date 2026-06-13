<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
    <Navbar />
    <!-- Page view injection -->
    <div class="flex-1">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
