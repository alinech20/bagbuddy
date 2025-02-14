import type { RouteRecordRaw } from 'vue-router'

export const onboardingRoutes = [
  {
    path: '/onboarding',
    name: 'Onboarding',
    redirect: '/onboarding/1',
    component: () => import('@/layouts/onboarding/OnboardingLayout.vue'),
    children: [
      {
        path: ':step',
        name: 'Onboarding Step',
        meta: {
          requiresAuth: true,
        },
        component: () => import('@/pages/onboarding/OnboardingPage.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
