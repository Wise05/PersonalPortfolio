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
    component: HomeView,
    meta: { title: 'Zevan Gustafson' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About | Zevan Gustafson' }
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: ProjectDetailView,
    props: true,
    meta: { title: 'Projects | Zevan Gustafson' }
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: BlogDetailView,
    props: true,
    meta: { title: 'Blog | Zevan Gustafson' }
  },
  {
    path: '/coursework/:slug',
    name: 'coursework-detail',
    component: CourseworkDetailView,
    props: true,
    meta: { title: 'Coursework | Zevan Gustafson' }
  },
  {
    path: '/work/:slug',
    name: 'work-detail',
    component: WorkDetailView,
    props: true,
    meta: { title: 'Work | Zevan Gustafson' }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: { title: 'Search | Zevan Gustafson' }
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

router.afterEach((to) => {
  const defaultTitle = 'Zevan Gustafson'
  document.title = to.meta.title || defaultTitle
})

export default router
