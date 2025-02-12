import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('@/layouts/auth/AuthLayout.vue'),
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/pages/auth/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/pages/auth/RegisterPage.vue'),
        },
      ],
    },
    // {
    //   // path: '/',
    //   // name: 'home',
    //   // component: HomeView,
    // },
    // {
    //   // path: '/about',
    //   // name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import('@/pages/AboutView.vue'),
    // },
  ],
})

export default router
