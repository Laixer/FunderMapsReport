import { createRouter, createWebHistory } from 'vue-router'

import PDF from '@/views/PDF.vue'
import NoAccess from '@/views/NoAccess.vue'
import NotFound from '@/views/NotFound.vue'
import { hasAPIKey } from '@/services/apiClient'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:buildingId',
      name: 'PDF',
      component: PDF,
    },
    {
      path: '/403',
      name: 'NoAccess',
      component: NoAccess,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

router.beforeEach((to) => {
  if (!hasAPIKey() && to.name !== 'NoAccess') {
    return { name: 'NoAccess' }
  }
})

export default router
