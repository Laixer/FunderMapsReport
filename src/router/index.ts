
import { createRouter, createWebHistory } from 'vue-router'
// import { useSessionStore } from '@/store/session';

import PDF from '@/views/PDF.vue'

// 403 
import NoAccess from '@/views/NoAccess.vue'

// 404
import NotFound from '@/views/NotFound.vue' 
// import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:buildingId',
      name: 'PDF',
      component: PDF
    },
    {
      path: '/403',
      name: 'NoAccess',
      component: NoAccess
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound 
    },
  ],
})

/**
 * Only allow access to authenticated users 
 */
// router.beforeEach((to, _) => {

//   const sessionStore = useSessionStore()
//   const { isAuthenticated } = storeToRefs(sessionStore)
//   console.log("authenticated", isAuthenticated.value)

//   if (
//     ! isAuthenticated.value &&
//     to.name !== 'NoAccess'
//   ) {
//     return { name: 'NoAccess' }
//   }
// })

export default router