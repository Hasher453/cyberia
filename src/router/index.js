import { createRouter, createWebHistory } from 'vue-router'
import Cases from '../pages/Cases.vue'
import Agency from '../pages/Agency.vue'
import Services from '../pages/Services.vue'
import Contacts from '../pages/Contacts.vue'
import Blog from '../pages/Blog.vue'

const routes = [
  { path: '/', name: 'Home', component: Cases },
  { path: '/cases', name: 'Cases', component: Cases },
  { path: '/agency', name: 'Agency', component: Agency },
  { path: '/services', name: 'Services', component: Services },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/blog', name: 'Blog', component: Blog },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
