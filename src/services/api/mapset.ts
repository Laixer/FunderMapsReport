import { type IMapsetFE, type IMapset } from "@/datastructures/interfaces"
import { get } from "../apiClient"

const mapMapset = (rawmapset: IMapset): IMapsetFE => {

  let metadata = {}
  let layerSet = []

  try {
    layerSet = rawmapset.layerSet ? JSON.parse(rawmapset.layerSet) : []
  } catch (e) {
    console.log(`Failed to process layerSet information. ${rawmapset?.name || rawmapset.id} will have no interactive layers.`)
  }
  try {
    metadata = rawmapset?.metadata ? JSON.parse(rawmapset.metadata) : {}
  } catch (e) {
    console.log("Failed to process mapset metadata. Loading without metadata.")
  }

  return {
    id: rawmapset.id,
    slug: rawmapset.slug,
    name: rawmapset?.name || 'Onbekende laag',
    style: rawmapset.style,
    metadata,
    public: (!!rawmapset?.public) || false,
    consent: rawmapset?.consent || null,
    note: rawmapset?.note || null,
    icon: rawmapset?.icon || 'home-info',
    fenceNeighborhood: rawmapset?.fenceNeighborhood || [],
    fenceDistrict: rawmapset?.fenceDistrict || [],
    fenceMunicipality: rawmapset?.fenceMunicipality || [],
    layerSet,
    loadedAt: Date.now()
  }
}


/******************************************************************************
 * Map Groups endpoints
 */
export const getAvailableMapsets = async (): Promise<IMapsetFE[] | null> => {
  const response = await get({ endpoint: '/mapset' })
  if (response) {
    return response.map(mapMapset)
  }
  // TODO: Error...
  return null
}

export const getPublicAndAvailableMapsetsById = async (id: string): Promise<IMapsetFE[] | null> => {
  console.log(id)
  const response = await get({ endpoint: `/mapset/${id}`, requireAuth: false }) // TODO: Change endpoint
  if (response) {
    return response.map(mapMapset)
  }
  // TODO: Error...
  return null
}

export default {
  getAvailableMapsets,
  getPublicAndAvailableMapsetsById
}