<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { useBlog } from '../composables/useBlog'
import { useProfessionalWork } from '../composables/useProfessionalWork'
import { Search as SearchIcon, Calendar, Tag, X, BookOpen, Briefcase, Folder, SlidersHorizontal } from '@lucide/vue'

const { getProjects } = useProjects()
const { getBlogPosts } = useBlog()
const { getWorkItems } = useProfessionalWork()

// Combine all resources
const allItems = computed(() => {
  const projects = getProjects().map(item => ({
    ...item,
    section: 'Project',
    route: { name: 'project-detail', params: { slug: item.slug } },
    icon: Folder,
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-850'
  }))
  const blog = getBlogPosts().map(item => ({
    ...item,
    section: 'Blog',
    route: { name: 'blog-detail', params: { slug: item.slug } },
    icon: BookOpen,
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-850'
  }))
  const work = getWorkItems().map(item => ({
    ...item,
    section: 'Professional Work',
    route: { name: 'work-detail', params: { slug: item.slug } },
    icon: Briefcase,
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-850'
  }))

  return [...projects, ...blog, ...work]
})

// Query & Filter States
const searchQuery = ref('')
const selectedSections = ref([]) // empty = all
const selectedTags = ref([]) // empty = all
const showFiltersPanel = ref(false)

// Get all unique tags across all items
const allTags = computed(() => {
  const tagsSet = new Set()
  allItems.value.forEach(item => {
    if (item.meta.tags && Array.isArray(item.meta.tags)) {
      item.meta.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  return Array.from(tagsSet).sort()
})

// Sections available
const sections = ['Project', 'Blog', 'Professional Work']

// Filter logic
const filteredItems = computed(() => {
  return allItems.value.filter(item => {
    // 1. Search Query Filter
    const query = searchQuery.value.trim().toLowerCase()
    if (query) {
      const matchTitle = item.meta.title?.toLowerCase().includes(query)
      const matchDesc = item.meta.description?.toLowerCase().includes(query)
      const matchContent = item.content?.toLowerCase().includes(query)
      const matchTags = item.meta.tags?.some(tag => tag.toLowerCase().includes(query))
      if (!matchTitle && !matchDesc && !matchContent && !matchTags) {
        return false
      }
    }

    // 2. Section Filter
    if (selectedSections.value.length > 0) {
      if (!selectedSections.value.includes(item.section)) {
        return false
      }
    }

    // 3. Tag Filter
    if (selectedTags.value.length > 0) {
      const hasAllSelectedTags = selectedTags.value.every(tag => 
        item.meta.tags?.includes(tag)
      )
      if (!hasAllSelectedTags) {
        return false
      }
    }

    return true
  }).sort((a, b) => {
    // Sort by date (latest first)
    const dateA = new Date(a.meta.date || 0)
    const dateB = new Date(b.meta.date || 0)
    return dateB - dateA
  })
})

const toggleSection = (section) => {
  if (selectedSections.value.includes(section)) {
    selectedSections.value = selectedSections.value.filter(s => s !== section)
  } else {
    selectedSections.value.push(section)
  }
}

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedSections.value = []
  selectedTags.value = []
}

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || selectedSections.value.length > 0 || selectedTags.value.length > 0
})
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 bg-black flex-1 w-full shadow-2xl">
    
    <!-- Header -->
    <header class="space-y-4 pb-8 border-b border-zinc-900">
      <h1 class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
        Search Portfolio
      </h1>
      <p class="max-w-3xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
        Search and filter through all projects, blog posts, and professional work entries.
      </p>
    </header>

    <!-- Search Input & Filters Toggle -->
    <div class="mt-8 space-y-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <SearchIcon class="absolute left-4 top-3.5 h-5 w-5 text-zinc-550 dark:text-zinc-500" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search keywords, title, description, or content..." 
            class="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-12 pr-10 text-sm placeholder-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-500 dark:focus:border-zinc-700 dark:focus:ring-zinc-700 transition-all"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            class="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <button 
          @click="showFiltersPanel = !showFiltersPanel"
          class="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white transition-all cursor-pointer"
        >
          <SlidersHorizontal class="h-4 w-4" />
          {{ showFiltersPanel ? 'Hide Filters' : 'Show Filters' }}
        </button>
      </div>

      <!-- Filters Panel -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div 
          v-if="showFiltersPanel" 
          class="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-850 dark:bg-zinc-950/80 backdrop-blur space-y-6"
        >
          <!-- Section Filter -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Filter by Section
            </h3>
            <div class="flex flex-wrap gap-2.5">
              <button 
                v-for="section in sections" 
                :key="section"
                @click="toggleSection(section)"
                class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                :class="[
                  selectedSections.includes(section)
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200'
                ]"
              >
                {{ section }}
              </button>
            </div>
          </div>

          <!-- Tag Filter -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Filter by Tags
            </h3>
            <div class="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
              <button 
                v-for="tag in allTags" 
                :key="tag"
                @click="toggleTag(tag)"
                class="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer"
                :class="[
                  selectedTags.includes(tag)
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950 shadow-sm'
                    : 'border-zinc-100 bg-zinc-50 text-zinc-550 hover:bg-zinc-100 dark:border-zinc-900/60 dark:bg-zinc-900/30 dark:text-zinc-400 dark:hover:bg-zinc-900'
                ]"
              >
                <Tag class="h-3 w-3 mr-0.5" />
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- Active Filter Summary & Clear -->
          <div v-if="hasActiveFilters" class="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900">
            <div class="text-xs text-zinc-550 dark:text-zinc-400">
              Active filters: 
              <span v-if="searchQuery" class="font-semibold text-zinc-900 dark:text-white">Query</span>
              <span v-if="selectedSections.length > 0" class="before:content-['•'] before:mx-1 font-semibold text-zinc-900 dark:text-white">
                {{ selectedSections.join(', ') }}
              </span>
              <span v-if="selectedTags.length > 0" class="before:content-['•'] before:mx-1 font-semibold text-zinc-900 dark:text-white">
                {{ selectedTags.length }} tag{{ selectedTags.length === 1 ? '' : 's' }}
              </span>
            </div>
            <button 
              @click="clearFilters"
              class="text-xs font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Search Results -->
    <section class="mt-12 space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
        <h2 class="text-lg font-bold text-zinc-900 dark:text-white">
          Results ({{ filteredItems.length }})
        </h2>
      </div>

      <!-- Results Grid/List -->
      <div class="grid gap-6">
        <RouterLink 
          v-for="item in filteredItems" 
          :key="item.slug"
          :to="item.route"
          class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:shadow-none"
        >
          <div class="space-y-4">
            <!-- Header: Type Badge & Date -->
            <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
              <span 
                class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium"
                :class="item.badgeColor"
              >
                <component :is="item.icon" class="h-3.5 w-3.5" />
                {{ item.section }}
              </span>
              <span v-if="item.meta.date" class="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <Calendar class="h-3.5 w-3.5" />
                {{ new Date(item.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </span>
            </div>

            <!-- Title & Description -->
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white transition-colors">
                {{ item.meta.title }}
              </h3>
              <p class="text-sm text-zinc-650 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {{ item.meta.description }}
              </p>
            </div>
          </div>

          <!-- Tags Footer -->
          <div v-if="item.meta.tags && item.meta.tags.length > 0" class="mt-6 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-900">
            <span 
              v-for="tag in item.meta.tags" 
              :key="tag"
              class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors"
              :class="[
                selectedTags.includes(tag)
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                  : 'text-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 dark:text-zinc-400'
              ]"
            >
              {{ tag }}
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-800">
        <h3 class="text-lg font-medium text-zinc-900 dark:text-white">No results found</h3>
        <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Try adjusting your search keywords or clearing active filters.
        </p>
        <button 
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    </section>

  </main>
</template>
