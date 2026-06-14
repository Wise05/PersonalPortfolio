<script setup>
import { ref, onMounted } from 'vue'
import { 
  GraduationCap, 
  Briefcase, 
  Mail, 
  MapPin, 
  Calendar, 
  Code2, 
  Cpu, 
  Wrench,
  ExternalLink
} from '@lucide/vue'
import mugShot from '../assets/mug_shot.webp'

const tracks = ref([])
const isLoading = ref(true)
const isError = ref(false)

onMounted(async () => {
  try {
    const response = await fetch('/api/songs')
    if (!response.ok) {
      throw new Error('Failed to fetch songs')
    }
    const data = await response.json()
    tracks.value = Array.isArray(data) ? data.slice(0, 5) : []
  } catch (error) {
    console.error('Error fetching recently liked tracks:', error)
    isError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 bg-black flex-1 w-full shadow-2xl">
    
    <!-- Page Header -->
    <header class="space-y-4 pb-10 border-b border-zinc-900">
      <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl light:text-zinc-900">
        About Me
      </h1>
      <p class="max-w-3xl text-lg text-zinc-400 leading-relaxed light:text-zinc-650">
        Get to know my background, studies, skills, and professional journey.
      </p>
    </header>

    <div class="mt-12 grid gap-10 md:grid-cols-3">
      
      <!-- Profile Card (Left Column) -->
      <div class="md:col-span-1 space-y-8">
        <div class="group relative overflow-hidden rounded-2xl bg-zinc-950 p-4 transition-all duration-300 hover:shadow-xl hover:border-zinc-800 light:border-transparent light:bg-white">
          
          <!-- Image Wrapper with Glow and Zoom -->
          <div class="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-900 light:bg-zinc-100">
            <img 
              :src="mugShot" 
              alt="Zephaniah Gustafson" 
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <!-- Name & Short Title -->
          <div class="mt-5 text-center">
            <h2 class="text-xl font-bold text-white light:text-zinc-900">
              Zephaniah Gustafson
            </h2>
            <p class="mt-1 text-sm font-medium bg-gradient-to-r from-zinc-400 to-zinc-300 bg-clip-text text-transparent light:from-zinc-500 light:to-zinc-600">
              Software Engineering Student
            </p>
          </div>

          <!-- Quick Metadata List -->
          <div class="space-y-4 border-t border-zinc-900 pt-5 light:border-zinc-100 text-sm">
            <div class="flex items-center gap-3 text-zinc-400 light:text-zinc-650">
              <MapPin class="h-4.5 w-4.5 text-zinc-500 light:text-zinc-450 shrink-0" />
              <span>Ames, IA (Iowa State Univ.)</span>
            </div>
            <div class="flex items-center gap-3 text-zinc-400 light:text-zinc-650">
              <GraduationCap class="h-4.5 w-4.5 text-zinc-500 light:text-zinc-450 shrink-0" />
              <span>Software Engineering, May 2027</span>
            </div>
            <div class="flex items-center gap-3 text-zinc-400 light:text-zinc-650">
              <Briefcase class="h-4.5 w-4.5 text-zinc-500 light:text-zinc-450 shrink-0" />
              <span>Software Intern @ Berry Consultants</span>
            </div>
          </div>

          <!-- Social Quick Links -->
          <div class="mt-6 flex gap-3 border-t border-zinc-900 pt-5 light:border-zinc-100">
            <a 
              href="mailto:zevangus@gmail.com" 
              class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/40 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white light:border-zinc-200 light:bg-white light:text-zinc-700 light:hover:bg-zinc-50 light:hover:text-zinc-900 transition-all cursor-pointer"
            >
              <Mail class="h-4 w-4" />
              Email
            </a>
            <a 
              href="https://www.linkedin.com/in/zephaniah-gustafson-13a36b1aa/" 
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center rounded-xl border border-zinc-850 bg-zinc-900/40 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white light:border-zinc-200 light:bg-white light:text-zinc-700 light:hover:bg-zinc-50 light:hover:text-zinc-900 transition-all cursor-pointer"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a 
              href="https://github.com/Wise05" 
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center rounded-xl border border-zinc-850 bg-zinc-900/40 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white light:border-zinc-200 light:bg-white light:text-zinc-700 light:hover:bg-zinc-50 light:hover:text-zinc-900 transition-all cursor-pointer"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Narrative & Experience (Right Columns) -->
      <div class="md:col-span-2 space-y-10">
        
        <!-- Biography Section -->
        <section class="space-y-4">
          <h3 class="text-xl font-bold tracking-tight text-white light:text-zinc-900">
            Biography
          </h3>
          <div class="text-base text-zinc-400 light:text-zinc-650 space-y-4 leading-relaxed">
            <p>
              I am a Software Engineering student attending <strong>Iowa State University</strong>, pursuing my Bachelor of Engineering degree with a target graduation date of May 2027. I have a deep passion for building polished, interactive digital experiences, balancing clean backend architectures with lively, dynamic frontend interactions.
            </p>
            <p>
              For the summer of 2026, I am interning at <strong>Berry Consultants LLC</strong> on the Software Team. This experience has allowed me to apply my skills to real-world software engineering pipelines, collaborating closely with experienced engineers to build impactful solutions.
            </p>
          </div>
        </section>

        <!-- Technical Skills Section -->
        <section class="space-y-6">
          <h3 class="text-xl font-bold tracking-tight text-white light:text-zinc-900">
            Technical Skills
          </h3>
          
          <div class="grid gap-4 sm:grid-cols-2">
            
            <!-- Langs & Frameworks -->
            <div class="rounded-xl bg-zinc-950 p-5 light:bg-white light:border-zinc-200">
              <div class="flex items-center gap-2 font-bold text-white light:text-zinc-900 mb-4">
                <Code2 class="h-4.5 w-4.5 text-zinc-500" />
                <span>Languages &amp; Core</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">JavaScript</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">TypeScript</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Python</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">C++</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">HTML5 / CSS3</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">SQL</span>
              </div>
            </div>

            <!-- Libraries & Web Tech -->
            <div class="rounded-xl bg-zinc-950 p-5 light:bg-white light:border-zinc-200">
              <div class="flex items-center gap-2 font-bold text-white light:text-zinc-900 mb-4">
                <Cpu class="h-4.5 w-4.5 text-zinc-500" />
                <span>Frameworks &amp; Runtimes</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Vue 3 / Vue Router</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Node.js</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Express</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Tailwind CSS (v4)</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">React</span>
              </div>
            </div>

            <!-- Tools & Workflows -->
            <div class="sm:col-span-2 rounded-xl bg-zinc-950 p-5 light:bg-white light:border-zinc-200">
              <div class="flex items-center gap-2 font-bold text-white light:text-zinc-900 mb-4">
                <Wrench class="h-4.5 w-4.5 text-zinc-500" />
                <span>Developer Tools &amp; Ecosystem</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Git / GitHub</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Vite</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">REST APIs</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Markdown Parsing</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">Docker</span>
                <span class="rounded bg-zinc-900/40 border border-zinc-850 px-2 py-1 text-xs font-semibold text-zinc-300 light:bg-zinc-50 light:border-zinc-150 light:text-zinc-700">UX / UI Responsive Design</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Experience & Education Timeline -->
        <section class="space-y-6">
          <h3 class="text-xl font-bold tracking-tight text-white light:text-zinc-900">
            Experience &amp; Education
          </h3>
          
          <div class="relative border-l border-zinc-00 light:border-zinc-200 ml-3.5 space-y-8">
            
            <!-- Timeline Item 1 -->
            <div class="relative pl-7">
              <!-- Timeline Dot -->
              <div class="absolute -left-2 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-zinc-850 bg-zinc-950 light:border-zinc-200 light:bg-white">
                <div class="h-2 w-2 rounded-full bg-white light:bg-zinc-900"></div>
              </div>
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 class="text-lg font-bold text-white light:text-zinc-900">
                  Software Engineering Intern
                </h4>
                <span class="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 light:text-zinc-500">
                  <Calendar class="h-3.5 w-3.5" />
                  Summer 2026
                </span>
              </div>
              <p class="text-sm font-medium text-zinc-455 light:text-zinc-550">
                Berry Consultants LLC
              </p>
              <p class="mt-2 text-sm text-zinc-450 light:text-zinc-600 leading-relaxed">
                Working as an intern on the software team. Collaborating on system development, implementation of modern web-based applications, and agile developer workflows.
              </p>
            </div>

            <!-- Timeline Item 2 -->
            <div class="relative pl-7">
              <!-- Timeline Dot -->
              <div class="absolute -left-2 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-zinc-850 bg-zinc-950 light:border-zinc-200 light:bg-white">
                <div class="h-2 w-2 rounded-full bg-zinc-450 light:bg-zinc-550"></div>
              </div>
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 class="text-lg font-bold text-white light:text-zinc-900">
                  BE in Software Engineering
                </h4>
                <span class="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 light:text-zinc-500">
                  <Calendar class="h-3.5 w-3.5" />
                  Aug 2023 - May 2027
                </span>
              </div>
              <p class="text-sm font-medium text-zinc-455 light:text-zinc-550">
                Iowa State University
              </p>
              <p class="mt-2 text-sm text-zinc-455 light:text-zinc-600 leading-relaxed">
                Acquiring a solid foundation in computer science and engineering principles. Actively involved in building side projects and mastering frontend &amp; backend modern software stacks.
              </p>
            </div>
            
          </div>
        </section>

        <!-- Recently Liked Tracks Section -->
        <section v-if="!isError && (isLoading || tracks.length > 0)" class="space-y-6 pt-10 border-t border-zinc-900 light:border-zinc-200">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold tracking-tight text-white light:text-zinc-900 flex items-center gap-2">
              Recently Liked Music
            </h3>
          </div>

          <!-- Loading Skeleton -->
          <div v-if="isLoading" class="space-y-3">
            <div 
              v-for="i in 5" 
              :key="i"
              class="flex items-center gap-4 p-3 rounded-xl border border-zinc-850/50 bg-zinc-950/50 light:border-zinc-150 light:bg-white/50 animate-pulse"
            >
              <div class="w-14 h-14 bg-zinc-600 light:bg-zinc-200 rounded-lg shrink-0"></div>
              <div class="flex-1 space-y-2.5">
                <div class="h-4 bg-zinc-600 light:bg-zinc-200 rounded w-2/3"></div>
                <div class="h-3 bg-zinc-600 light:bg-zinc-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          <!-- Tracks List -->
          <div v-else class="space-y-3">
            <a 
              v-for="(track, index) in tracks" 
              :key="index"
              :href="track.link"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center justify-between gap-4 p-3 rounded-xl border border-zinc-850 bg-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-800 hover:bg-zinc-900/50 light:border-zinc-200 light:bg-white light:hover:shadow-md light:hover:border-zinc-300 light:hover:bg-zinc-50"
            >
              <div class="flex items-center gap-4 min-w-0 flex-1">
                <!-- Thumbnail -->
                <div class="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-sm">
                  <img 
                    :src="track.thumbnail" 
                    :alt="track.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <!-- Text Container -->
                <div class="min-w-0 flex-1">
                  <h4 class="text-sm font-bold text-zinc-200 truncate group-hover:text-white transition-colors light:text-zinc-900 light:group-hover:text-zinc-950">
                    {{ track.title }}
                  </h4>
                  <p class="text-xs text-zinc-450 light:text-zinc-550 truncate mt-1">
                    {{ track.artist.replace(/ - Topic$/, '') }}
                  </p>
                </div>
              </div>

              <!-- Action Indicator -->
              <div class="text-zinc-600 group-hover:text-white transition-colors pl-2 light:text-zinc-400 light:group-hover:text-zinc-900">
                <ExternalLink class="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>
