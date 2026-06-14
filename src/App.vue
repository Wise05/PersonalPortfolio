<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import StarfieldBackground from './components/ui/StarfieldBackground.vue'
</script>

<template>
  <StarfieldBackground>
    <div class="flex min-h-screen flex-col bg-transparent text-zinc-900 antialiased dark:bg-transparent dark:text-zinc-50 transition-colors duration-300">
      <Navbar />
      <!-- Page view injection -->
      <div class="flex-1 flex flex-col">
        <RouterView />
      </div>
      <Footer />
    </div>
  </StarfieldBackground>
</template>
