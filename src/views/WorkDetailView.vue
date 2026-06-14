<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProfessionalWork } from '../composables/useProfessionalWork'
import { marked } from 'marked'
import { ArrowLeft, Calendar, Tag, Briefcase } from '@lucide/vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { getWorkItemBySlug } = useProfessionalWork()

// Retrieve work content
const workItem = computed(() => getWorkItemBySlug(props.slug))

// Parse markdown to HTML
const parsedHtml = computed(() => {
  if (!workItem.value) return ''
  return marked.parse(workItem.value.content || '')
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
      class="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white light:text-zinc-650 light:hover:text-zinc-950 transition-colors cursor-pointer"
    >
      <ArrowLeft class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
      Back to home
    </button>

    <!-- Found State -->
    <article v-if="workItem" class="space-y-8">
      
      <!-- Header Meta -->
      <header class="space-y-4">
        <!-- Date & Featured Tag -->
        <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-400 light:text-zinc-500">
          <span v-if="workItem.meta.company" class="flex items-center gap-1 font-medium text-zinc-300 light:text-zinc-700">
            <Briefcase class="h-3.5 w-3.5" />
            {{ workItem.meta.company }}
          </span>
          <span v-if="workItem.meta.date" class="flex items-center gap-1">
            <Calendar class="h-3.5 w-3.5" />
            {{ new Date(workItem.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>
          <span v-if="workItem.meta.featured" class="px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 font-medium light:bg-zinc-100 light:text-zinc-800">
            Featured
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl light:text-zinc-955">
          {{ workItem.meta.title }}
        </h1>

        <!-- Description -->
        <p class="text-lg text-zinc-400 light:text-zinc-600 leading-relaxed italic">
          {{ workItem.meta.description }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 pt-2">
          <span 
            v-for="tag in workItem.meta.tags" 
            :key="tag"
            class="inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold text-zinc-300 bg-zinc-900/50 light:bg-zinc-150 light:text-zinc-700"
          >
            <Tag class="h-3 w-3 mr-0.5" />
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Main HTML Body Content rendered dynamically with Tailwind Typography -->
      <section 
        class="prose prose-zinc prose-invert max-w-none pt-8 border-t border-zinc-800 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-white prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 light:prose-normal light:border-zinc-200 light:prose-a:text-zinc-900 light:prose-pre:bg-zinc-50 light:prose-pre:border-zinc-200"
        v-html="parsedHtml"
      ></section>

    </article>

    <!-- Not Found State -->
    <div v-else class="text-center py-20 border border-dashed border-zinc-800 rounded-2xl light:border-zinc-300">
      <h2 class="text-xl font-bold text-white light:text-zinc-900">Work Entry Not Found</h2>
      <p class="mt-2 text-zinc-400 light:text-zinc-650">The work entry you are looking for does not exist or has been moved.</p>
      <button 
        @click="goBack" 
        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-955 shadow-sm hover:bg-zinc-100 light:bg-zinc-900 light:text-white light:hover:bg-zinc-800 transition-colors"
      >
        Go Home
      </button>
    </div>
  </main>
</template>
