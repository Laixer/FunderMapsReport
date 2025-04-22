<script setup lang="ts">
import { watch } from 'vue';
import { refreshAccessToken } from '@/services/jwt.ts'
import { useSessionStore } from '@/store/session';
import { storeToRefs } from 'pinia';
import { hasAPIKey } from '@/services/apiClient.ts';

const sessionStore = useSessionStore()
const { authenticateFromAccessToken } = sessionStore
const { isAuthenticated } = storeToRefs(sessionStore)
let accessTokenRefreshInterval: ReturnType<typeof setTimeout> | null = null

/**
 * Try to continue from the access token if there is one
 */
try {
  if (!hasAPIKey()) {
    authenticateFromAccessToken()
    refreshAccessToken()
  }
} catch (e) {
  // no luck, no harm
}

/**
 * When logged in, start refreshing the token.
 *  Stop this when logging out
 */
watch(
  () => isAuthenticated.value,
  (isAuthenticated) => {
    if (isAuthenticated && !hasAPIKey()) {
      /**
       * Refresh the jwt access token every 10 minutes
       *  The refresh fn checks for the existance of a token
       */
      accessTokenRefreshInterval = setInterval(() => {
        refreshAccessToken()
      }, 60 * 1000 * 10)
    } else if (accessTokenRefreshInterval !== null) {
      clearInterval(accessTokenRefreshInterval)
      accessTokenRefreshInterval = null
    }
  },
  { immediate: true }
)

</script>

<template>
  <router-view />
</template>
