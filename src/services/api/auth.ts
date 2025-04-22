import { get, post } from "../apiClient"

export const login = async (email: string, password: string) => {
  return await post({
    endpoint: '/auth/signin',
    body: {
      email, password
    },
    requireAuth: false
  })
}

export const refresh = async () => {
  return await get({
    endpoint: 'auth/token-refresh',
    requireAuth: true
  })
}

/**
 * Send a request for a password reset mail
 */
export const requestPasswordReset = async (email: string) => {
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
export const resetPassword = async (email: string, token: string, password: string) => {
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
export const changePassword = async (oldPassword: string, newPassword: string) => {
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
