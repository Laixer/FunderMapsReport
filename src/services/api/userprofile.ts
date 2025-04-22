import { type IUserProfile } from "@/datastructures/interfaces"
import { get, put } from "../apiClient"

/******************************************************************************
 * User Profile Endpoints
 */
export const getUserProfile = async () => {
  return await get({ endpoint: '/user' })
}

export const putUserProfile = async (data: IUserProfile) => {
  return await put({ endpoint: '/user', body: data })
}

export default {
  getUserProfile,
  putUserProfile
}