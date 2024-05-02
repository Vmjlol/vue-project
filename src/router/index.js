import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
  },
  {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue')
  },
  {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
  },
  {
  path: '/test',
  name: 'test',
  component: () => import('@/views/Test.vue')
  }
  ]
})

export default router
