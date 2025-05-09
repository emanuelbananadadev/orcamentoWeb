import { createRouter, createWebHistory } from 'vue-router'
import BudgetList from '../views/BudgetList.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/orcamentos'
    },
    {
      path: '/orcamentos',
      name: 'budget-list',
      component: BudgetList,
      meta: { requiresAuth: true }
    },


    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/orcamentos')
  } else {
    next()
  }
})

export default router
