import { useStore } from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: { name: 'trainingOverview' } },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/training',
      name: 'trainingOverview',
      component: () => import('./views/TrainingOverview.vue'),
    },
    {
      path: '/training/:trainingId/:subtitle',
      name: 'trainingDetails',
      component: () => import('./views/TrainingDetail.vue'),
      props: true,
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('./views/Reset.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const store = useStore()
  if (to.name !== 'home' && store.localUserData.email === '') {
    return {
      name: 'home',
    }
  }
})
