import { type IUserProfile } from "@/datastructures/interfaces"
import { get, put } from "../apiClient"

/******************************************************************************
 * User Profile Endpoints
 */
export const getUserProfile = async function getUserProfile() {
  return await get({ endpoint: '/user' })
}

export const putUserProfile = async function postUserProfile(data: IUserProfile) {
  return await put({ endpoint: '/user', body: data })
}

export default {
  getUserProfile,
  putUserProfile
}