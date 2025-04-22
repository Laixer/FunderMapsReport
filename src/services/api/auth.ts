import { get, post } from "../apiClient"

export const login = async function login(email: string, password: string) {
  return await post({
    endpoint: '/auth/signin',
    body: {
      email, password
    },
    requireAuth: false
  })
}

export const refresh = async function refresh() {
  return await get({
    endpoint: 'auth/token-refresh',
    requireAuth: true
  })
}

/**
 * Send a request for a password reset mail
 */
export const requestPasswordReset = async function requestPasswordReset(email: string) {
  return await post({
    endpoint: '/auth/reset-password',
    body: {
      email
    },
    requireAuth: false
  })
}

/**
 * Send a request for a password reset mail
 */
export const resetPassword = async function resetPassword(email: string, token: string, password: string) {
  return await post({
    endpoint: '/auth/reset-new-password',
    body: {
      email,
      resetKey: token,
      newPassword: password
    },
    requireAuth: false
  })
}

/**
 * Send a request to change a password
 *  Note: this is only for users who are logged in
 */
export const changePassword = async function changePassword(oldPassword: string, newPassword: string) {
  return await post({
    endpoint: '/auth/change-password',
    body: {
      oldPassword: oldPassword,
      newPassword: newPassword
    },
    requireAuth: true
  })
}

export default {
  login,
  refresh,
  requestPasswordReset,
  resetPassword,
  changePassword
}
