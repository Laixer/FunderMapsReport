import { type Ref, ref, watch } from 'vue';
import { defineStore } from 'pinia'

import { type IAnalysis } from "@/datastructures/interfaces"
import api from '@/services/api';
import { useSessionStore } from '../session';


/**
 * Analysis data by Building Id
 */
const analysisDataByBuildingId: Ref<Record<string, IAnalysis>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})

/**
 * List of buildingIds that failed to load, along with info about the reason
 */
const failedToLoadByBuildingId: Ref<Record<string, Record<string, any>>> = ref({})

/**
 * Whether the analysis data for a building have been retrieved previously
 */
const buildingAnalysisDataHasBeenRetrieved = function buildingAnalysisDataHasBeenRetrieved(buildingId: string): boolean {
  return analysisDataByBuildingId.value.hasOwnProperty(buildingId)
}

/**
 * Whether the data failed to load (for whatever reason)
 */
const buildingAnalysisDataFailedToLoad = function buildingAnalysisDataFailedToLoad(buildingId: string): boolean {
  return failedToLoadByBuildingId.value.hasOwnProperty(buildingId)
}

/**
 * Whether there is currently any analysis data available for a building
 *  Note: the data may still be loading
 */
const buildingHasAnalysisData = function buildingHasAnalysisData(buildingId: string): boolean {
  return buildingAnalysisDataHasBeenRetrieved(buildingId) && !!analysisDataByBuildingId.value[buildingId]
}

/**
 * Get all analysis data by building id
 *  Note: returns null if the data has not yet been retrieved
 */
const getAnalysisDataByBuildingId = function getAnalysisDataByBuildingId(buildingId: string): IAnalysis | null {
  if (!buildingHasAnalysisData(buildingId)) return null

  return analysisDataByBuildingId.value[buildingId]
}


const loadAnalysisDataByBuildingId = async function loadAnalysisDataByBuildingId(buildingId: string, cache: boolean = true) {
  try {

    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) return
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use 'cache', and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingAnalysisDataHasBeenRetrieved(buildingId)) return

    /**
     * Otherwise we start by retrieving the analysis data associated with the building
     */
    const response: IAnalysis = await api.building.getAnalysisByBuildingId(buildingId)

    // Store data
    analysisDataByBuildingId.value[buildingId] = response || null

  } catch (e) {
    console.log("Error loading analysis data by building id", e)

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
const clearAnalysisData = function clearAnalysisData() {
  // Keep appropriate order of clearing data
  analysisDataByBuildingId.value = {}
  isLoadingBuildingDataById.value = {}

  // TODO: Cancel fetches that are in progress... 
}


function useAnalysis() {
  /**
   * Clean up geo location data on logout
   */
  const { isAuthenticated } = useSessionStore()
  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearAnalysisData()
      }
    }
  )

  return {
    buildingAnalysisDataHasBeenRetrieved,
    buildingAnalysisDataFailedToLoad,
    buildingHasAnalysisData,
    getAnalysisDataByBuildingId,

    loadAnalysisDataByBuildingId
  }
}


export const useAnalysisStore = defineStore(
  'analysis',
  useAnalysis
)


