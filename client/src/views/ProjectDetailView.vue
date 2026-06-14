<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { marked } from 'marked'
import { ArrowLeft, Calendar, Tag } from '@lucide/vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { getProjectBySlug } = useProjects()

// Retrieve project content
const project = computed(() => getProjectBySlug(props.slug))

// If the project doesn't exist, redirect back to home or show 404
const parsedHtml = computed(() => {
  if (!project.value) return ''
  return marked.parse(project.value.content || '')
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 bg-black flex-1 w-full shadow-2xl">
    <!-- Back Button -->
    <button 
      @click="goBack" 
      class="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
    >
      <ArrowLeft class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
      Back to projects
    </button>

    <!-- Found State -->
    <article v-if="project" class="space-y-8">
      
      <!-- Header Meta -->
      <header class="space-y-4">
        <!-- Date & Featured Tag -->
        <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span v-if="project.meta.date" class="flex items-center gap-1">
            <Calendar class="h-3.5 w-3.5" />
            {{ new Date(project.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>
          <span v-if="project.meta.featured" class="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium dark:bg-zinc-900 dark:text-zinc-200">
            Featured
          </span>
        </div>

        <!-- Project Title -->
        <h1 class="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
          {{ project.meta.title }}
        </h1>

        <!-- Project Description -->
        <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
          {{ project.meta.description }}
        </p>

        <!-- Project Tags -->
        <div class="flex flex-wrap gap-2 pt-2">
          <span 
            v-for="tag in project.meta.tags" 
            :key="tag"
            class="inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold text-zinc-700 bg-zinc-150 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <Tag class="h-3 w-3 mr-0.5" />
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Main HTML Body Content rendered dynamically with Tailwind Typography -->
      <section 
        class="prose prose-zinc max-w-none pt-8 border-t border-zinc-200 dark:border-zinc-800 dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-zinc-900 dark:prose-a:text-white prose-pre:bg-zinc-50 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-800"
        v-html="parsedHtml"
      ></section>

    </article>

    <!-- Not Found State -->
    <div v-else class="text-center py-20 border border-dashed border-zinc-300 rounded-2xl dark:border-zinc-800">
      <h2 class="text-xl font-bold text-zinc-900 dark:text-white">Project Not Found</h2>
      <p class="mt-2 text-zinc-650 dark:text-zinc-400">The project you are looking for does not exist or has been moved.</p>
      <button 
        @click="goBack" 
        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors"
      >
        Go Home
      </button>
    </div>
  </main>
</template>
