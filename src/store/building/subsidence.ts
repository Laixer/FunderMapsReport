import { type Ref, ref, watch } from 'vue';
import { defineStore } from 'pinia'

import { type ISubsidence } from "@/datastructures/interfaces"
import api from '@/services/api';
import { useSessionStore } from '../session';

/**
 * Subsidence data by Building Id
 */
const subsidenceDataByBuildingId: Ref<Record<string, ISubsidence[]>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})


/**
 * List of buildingIds that failed to load, along with info about the reason
 */
const failedToLoadByBuildingId: Ref<Record<string, Record<string, any>>> = ref({})


/**
 * Whether the subsidence data for a building have been retrieved previously
 */
const buildingSubsidenceDataHasBeenRetrieved = function buildingSubsidenceDataHasBeenRetrieved(buildingId: string): boolean {
  return subsidenceDataByBuildingId.value.hasOwnProperty(buildingId)
}

/**
 * Whether the data failed to load (for whatever reason)
 */
const buildingSubsidenceDataFailedToLoad = function buildingSubsidenceDataFailedToLoad(buildingId: string): boolean {
  return failedToLoadByBuildingId.value.hasOwnProperty(buildingId)
}
/**
 * Whether there is currently any subsidence data available for a building
 *  Note: the data may still be loading
 */
const buildingHasSubsidenceData = function buildingHasSubsidenceData(buildingId: string): boolean {
  return buildingSubsidenceDataHasBeenRetrieved(buildingId) && !! subsidenceDataByBuildingId.value[buildingId]
}

/**
 * Get all subsidence data by building id
 *  Note: returns null if the data has not yet been retrieved
 */
const getSubsidenceDataByBuildingId = function getSubsidenceDataByBuildingId(buildingId: string): ISubsidence[]|null {
  if (! buildingHasSubsidenceData(buildingId)) return null

  return subsidenceDataByBuildingId.value[buildingId]
}


const loadSubsidenceDataByBuildingId = async function loadSubsidenceDataByBuildingId(buildingId: string, cache: boolean = true) {
  try {

    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) return 
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use 'cache', and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingSubsidenceDataHasBeenRetrieved(buildingId)) return

    /**
     * Otherwise we start by retrieving the subsidence associated with the building
     */
    const response: ISubsidence[] = await api.building.getSubsidenceByBuildingId(buildingId)
    
    // Store data
    subsidenceDataByBuildingId.value[buildingId] = response || null

  } catch(e) {
    console.log("Error loading subsidence data by building id", e)

    // TODO: Catch-em all... and maybe do something with them?
    // TODO: Create structure for failures
    failedToLoadByBuildingId.value[buildingId] = {
      'reason': 404
    }
  }

  // Success or fail, we're no longer retrieving the data for this building
  isLoadingBuildingDataById.value[buildingId] = false
}


/**
 * Reset store to empty state
 */
const clearSubsidenceData = function clearSubsidenceData() {
  // Keep appropriate order of clearing data
  subsidenceDataByBuildingId.value = {}
  isLoadingBuildingDataById.value = {}

  // TODO: Cancel fetches that are in progress... 
}


function useSubsidence() {
  /**
   * Clean up geo location data on logout
   */
  const { isAuthenticated } = useSessionStore()
  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearSubsidenceData()
      }
    }
  )

  return {
    buildingSubsidenceDataHasBeenRetrieved,
    buildingSubsidenceDataFailedToLoad,
    buildingHasSubsidenceData,
    getSubsidenceDataByBuildingId,

    loadSubsidenceDataByBuildingId    
  }
}


export const useSubsidenceStore = defineStore(
  'subsidence',
  useSubsidence
)


