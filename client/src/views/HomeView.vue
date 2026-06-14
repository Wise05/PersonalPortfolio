<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { useBlog } from '../composables/useBlog'
import { useProfessionalWork } from '../composables/useProfessionalWork'
import { ArrowRight, Calendar, Tag } from '@lucide/vue'
import TypingEffect from '../components/ui/TypingEffect.vue'

const { getProjects } = useProjects()
const projects = computed(() => getProjects())

const { getBlogPosts } = useBlog()
const blogPosts = computed(() => getBlogPosts())

const { getWorkItems } = useProfessionalWork()
const workItems = computed(() => getWorkItems())
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 bg-black flex-1 w-full shadow-2xl">
    
    <!-- Hero / Intro Section -->
    <section class="space-y-6 pb-16 border-b border-zinc-100 dark:border-zinc-900">
      <TypingEffect />
      <p class="max-w-3xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Welcome to my portfolio! I am a studentent, currently attending Iowa State University for a BE in Software Engineering, planning to graduate in May 2027. My current work is at Berry Consultants LLC as an intern (summer of 2026) on the Software Team.
      </p>
    </section>
    
    <!-- Professional Work Section -->
    <section class="space-y-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Professional Work
        </h2>
        <span v-if="workItems.length > 0" class="text-sm text-zinc-500 dark:text-zinc-400">
          Showing {{ workItems.length }} item{{ workItems.length === 1 ? '' : 's' }}
        </span>
      </div>
      
      <div v-if="workItems.length > 0" class="grid gap-6 sm:grid-cols-2">
        <RouterLink 
          v-for="item in workItems" 
          :key="item.slug"
          :to="{ name: 'work-detail', params: { slug: item.slug } }"
          class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-none"
        >
          <div class="space-y-4">
            <!-- Work Meta (Date & Tags) -->
            <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span v-if="item.meta.date" class="flex items-center gap-1">
                <Calendar class="h-3.5 w-3.5" />
                {{ new Date(item.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }}
              </span>
              <span v-if="item.meta.featured" class="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium dark:bg-zinc-900 dark:text-zinc-200">
                Featured
              </span>
            </div>

            <!-- Work Title & Description -->
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white transition-colors">
                {{ item.meta.title }}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {{ item.meta.description }}
              </p>
            </div>
          </div>

          <!-- Footer of the Card: Tags & Read Link -->
          <div class="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="tag in item.meta.tags" 
                :key="tag"
                class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 dark:text-zinc-400"
              >
                {{ tag }}
              </span>
            </div>
            <span class="flex items-center gap-1 text-xs font-semibold text-zinc-850 dark:text-zinc-200 group-hover:translate-x-0.5 transition-transform">
              View
              <ArrowRight class="h-3.5 w-3.5" />
            </span>
          </div>
        </RouterLink>
      </div>

      <p v-else class="max-w-3xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Coming soon
      </p>
    </section>

    <!-- Projects Section -->
    <section class="pt-16 space-y-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Projects
        </h2>
        <span class="text-sm text-zinc-500 dark:text-zinc-400">
          Showing {{ projects.length }} project{{ projects.length === 1 ? '' : 's' }}
        </span>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <RouterLink 
          v-for="project in projects" 
          :key="project.slug"
          :to="{ name: 'project-detail', params: { slug: project.slug } }"
          class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-none"
        >
          <div class="space-y-4">
            <!-- Project Meta (Date & Tags) -->
            <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span v-if="project.meta.date" class="flex items-center gap-1">
                <Calendar class="h-3.5 w-3.5" />
                {{ new Date(project.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }}
              </span>
              <span v-if="project.meta.featured" class="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium dark:bg-zinc-900 dark:text-zinc-200">
                Featured
              </span>
            </div>

            <!-- Project Title & Description -->
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white transition-colors">
                {{ project.meta.title }}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {{ project.meta.description }}
              </p>
            </div>
          </div>

          <!-- Footer of the Card: Tags & Read Link -->
          <div class="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="tag in project.meta.tags" 
                :key="tag"
                class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 dark:text-zinc-400"
              >
                {{ tag }}
              </span>
            </div>
            <span class="flex items-center gap-1 text-xs font-semibold text-zinc-850 dark:text-zinc-200 group-hover:translate-x-0.5 transition-transform">
              View
              <ArrowRight class="h-3.5 w-3.5" />
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- Empty State -->
      <div v-if="projects.length === 0" class="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
        <h3 class="text-lg font-medium text-zinc-900 dark:text-white">No projects found</h3>
        <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Add markdown files to <code class="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">src/content/projects/</code> to see them listed here.
        </p>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="pt-16 space-y-8">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Blog
        </h2>
        <span class="text-sm text-zinc-500 dark:text-zinc-400">
          Showing {{ blogPosts.length }} post{{ blogPosts.length === 1 ? '' : 's' }}
        </span>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <RouterLink 
          v-for="post in blogPosts" 
          :key="post.slug"
          :to="{ name: 'blog-detail', params: { slug: post.slug } }"
          class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-none"
        >
          <div class="space-y-4">
            <!-- Post Meta (Date & Tags) -->
            <div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span v-if="post.meta.date" class="flex items-center gap-1">
                <Calendar class="h-3.5 w-3.5" />
                {{ new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }}
              </span>
              <span v-if="post.meta.featured" class="px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 font-medium dark:bg-zinc-900 dark:text-zinc-200">
                Featured
              </span>
            </div>

            <!-- Post Title & Description -->
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white transition-colors">
                {{ post.meta.title }}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {{ post.meta.description }}
              </p>
            </div>
          </div>

          <!-- Footer of the Card: Tags & Read Link -->
          <div class="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-900">
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="tag in post.meta.tags" 
                :key="tag"
                class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 dark:text-zinc-400"
              >
                {{ tag }}
              </span>
            </div>
            <span class="flex items-center gap-1 text-xs font-semibold text-zinc-850 dark:text-zinc-200 group-hover:translate-x-0.5 transition-transform">
              Read
              <ArrowRight class="h-3.5 w-3.5" />
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- Empty State -->
      <div v-if="blogPosts.length === 0" class="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
        <h3 class="text-lg font-medium text-zinc-900 dark:text-white">No posts found</h3>
        <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Add markdown files to <code class="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-900">src/content/blog/</code> to see them listed here.
        </p>
      </div>
    </section>

  </main>
</template>
