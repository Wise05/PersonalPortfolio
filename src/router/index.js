import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import BlogDetailView from '../views/BlogDetailView.vue'
import WorkDetailView from '../views/WorkDetailView.vue'
import CourseworkDetailView from '../views/CourseworkDetailView.vue'
import Search from '../views/Search.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: ProjectDetailView,
    props: true
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: BlogDetailView,
    props: true
  },
  {
    path: '/coursework/:slug',
    name: 'coursework-detail',
    component: CourseworkDetailView,
    props: true
  },
  {
    path: '/work/:slug',
    name: 'work-detail',
    component: WorkDetailView,
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  // Catch-all route to redirect to Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
