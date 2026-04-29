import { type Ref, ref } from 'vue';
import { defineStore } from 'pinia'

import { type IStatistics } from "@/datastructures/interfaces"
import api from '@/services/api';


/**
 * Whether to show the statistics modal
 */
const showStatisticsModal = ref(false)

/**
 * 
 */
const statisticsGraph: Ref<string | null> = ref(null)

/**
 * Statistics data by Building Id
 */
const statisticsDataByBuildingId: Ref<Record<string, IStatistics>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})


/**
 * List of buildingIds that failed to load, along with info about the reason
 */
const failedToLoadByBuildingId: Ref<Record<string, Record<string, unknown>>> = ref({})


/**
 * Whether the statistics data for a building have been retrieved previously
 */
const buildingStatisticsDataHasBeenRetrieved = function buildingStatisticsDataHasBeenRetrieved(buildingId: string): boolean {
  return Object.prototype.hasOwnProperty.call(statisticsDataByBuildingId.value, buildingId)
}

/**
 * Whether the data failed to load (for whatever reason)
 */
const buildingStatisticsDataFailedToLoad = function buildingStatisticsDataFailedToLoad(buildingId: string): boolean {
  return Object.prototype.hasOwnProperty.call(failedToLoadByBuildingId.value, buildingId)
}
/**
 * Whether there is currently any statistics data available for a building
 *  Note: the data may still be loading
 */
const buildingHasStatisticsData = function buildingHasStatisticsData(buildingId: string): boolean {
  return buildingStatisticsDataHasBeenRetrieved(buildingId) && !!statisticsDataByBuildingId.value[buildingId]
}

/**
 * Get all statistics data by building id
 *  Note: returns null if the data has not yet been retrieved
 */
const getStatisticsDataByBuildingId = function getStatisticsDataByBuildingId(buildingId: string): IStatistics | null {
  if (!buildingHasStatisticsData(buildingId)) return null

  return statisticsDataByBuildingId.value[buildingId]
}


const loadStatisticsDataByBuildingId = async function loadStatisticsDataByBuildingId(buildingId: string, cache: boolean = true) {
  try {

    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) return
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use 'cache', and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingStatisticsDataHasBeenRetrieved(buildingId)) return

    /**
     * Otherwise we start by retrieving the statistics associated with the building
     */
    const response: IStatistics = await api.building.getStatisticsByBuildingId(buildingId)

    // Store data
    statisticsDataByBuildingId.value[buildingId] = response || null

  } catch (e) {
    console.log("Error loading statistics data by building id", e)

    // TODO: Catch-em all... and maybe do something with them?
    // TODO: Create structure for failures
    failedToLoadByBuildingId.value[buildingId] = {
      'reason': 404
    }
  }

  // Success or fail, we're no longer retrieving the data for this building
  isLoadingBuildingDataById.value[buildingId] = false
}


function useStatistics() {
  return {
    buildingStatisticsDataHasBeenRetrieved,
    buildingStatisticsDataFailedToLoad,
    buildingHasStatisticsData,
    getStatisticsDataByBuildingId,

    loadStatisticsDataByBuildingId,

    // Statistics modal
    showStatisticsModal,
    statisticsGraph

  }
}


export const useStatisticsStore = defineStore(
  'statistics',
  useStatistics
)


