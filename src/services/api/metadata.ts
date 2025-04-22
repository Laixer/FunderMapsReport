
import { get, put } from "../apiClient"

/**
 * Retrieve user meta data
 */
export const getMetadata = async function getMetadata() {
  try {
    const response = await get({ endpoint: '/metadata' })
    // The actual metadata object is a stringified json object within the json response
    return JSON.parse(response?.metadata)
  } catch (err) {
    return new Promise((_, reject) => reject())
  }
}

/**
 * Store user meta data
 */
export const setMetadata = async function setMetadata(body: object) {
  return await put({ endpoint: '/metadata', body: { metadata: body } })
}

export default {
  getMetadata,
  setMetadata
}
