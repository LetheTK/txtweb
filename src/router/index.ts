import { createRouter, createWebHistory } from 'vue-router'
import SplitPage from '../pages/SplitPage.vue'
import MergePage from '../pages/MergePage.vue'
import DedupPage from '../pages/DedupPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/split'
    },
    {
      path: '/split',
      component: SplitPage
    },
    {
      path: '/merge',
      component: MergePage
    },
    {
      path: '/dedup',
      component: DedupPage
    }
  ]
})

export default router 