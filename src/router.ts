import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from '@/store'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    {
      path: '/training',
      component: () => import('./views/TrainingOverview.vue'),
    },
    {
      path: '/training/:trainingId',
      component: () => import('./views/TrainingDetail.vue'),
      props: true,
    },
  ],
})

router.beforeEach((to) => {
  const store = useStore()
  if (to.name === 'home' && store.userInfo.email !== '') {
    return {
      name: 'trainingoverview',
    }
  }
})
