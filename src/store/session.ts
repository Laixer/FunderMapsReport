
import { type ShallowRef, shallowRef } from 'vue';
import { defineStore } from 'pinia'

import { hasNonExpiredToken } from '@/services/jwt';

/**
 * Whether the user is authenticated
 */
const isAuthenticated: ShallowRef<Boolean> = shallowRef(false)

/**
 * 
 */
function useSession() {
  // Try to continue from the access token in the localstorage
  // Note: this is called from App.vue setup, so no async available
  function authenticateFromAccessToken() {
    isAuthenticated.value = hasNonExpiredToken()
    return isAuthenticated.value
  }

  return {
    authenticateFromAccessToken,
    isAuthenticated
  }
}

export const useSessionStore = defineStore(
  'session',
  useSession,
)
