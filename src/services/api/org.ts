
import { IOrg } from "@/datastructures/interfaces"
import { get } from "../apiClient"

/**
 * returns a single org based on the active user session
 */
export const getOrgs = async function getOrgs() {
  return await get({ endpoint: '/organization' })
    .then(response => {
      
      // Currently only 1 org is returned as object
      response = Array.isArray(response) ? response : [ response ]

      // This mapper removes the datapoints that are either to be depreciated on the server side or not relevant to the UI
      return response.map((org: IOrg) => {
        return {
          id: org.id,
          name: org.name,
          active: true
        }
      })
    })
}

export default {
  getOrgs
}
