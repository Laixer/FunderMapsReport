import { type Ref, ref, watch } from 'vue';
import { defineStore } from 'pinia'

import { type IGeoLocationData } from "@/datastructures/interfaces"
import api from '@/services/api';
import { useSessionStore } from '../session';
import { GeoLocationData } from '@/datastructures/classes/Location/LocationData';


/**
 * Location data by Building Id
 */
const locationDataByBuildingId: Ref<Record<string, IGeoLocationData | null>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})

/**
 * List of buildingIds that failed to load, along with info about the reason
 */
const failedToLoadByBuildingId: Ref<Record<string, Record<string, any>>> = ref({})

/**
 * Whether the location data for a building have been retrieved previously
 */
const buildingLocationDataHasBeenRetrieved = function buildingLocationDataHasBeenRetrieved(buildingId: string): boolean {
  return locationDataByBuildingId.value.hasOwnProperty(buildingId)
}

/**
 * Whether the location data failed to load (for whatever reason)
 */
const buildingLocationDataFailedToLoad = function buildingLocationDataFailedToLoad(buildingId: string): boolean {
  return failedToLoadByBuildingId.value.hasOwnProperty(buildingId)
}

/**
 * Whether there is currently any location data available for a building
 *  Note: the data may still be loading
 */
const buildingHasLocationData = function buildingHasLocationData(buildingId: string): boolean {
  return buildingLocationDataHasBeenRetrieved(buildingId) && !!locationDataByBuildingId.value[buildingId]
}

/**
 * Get all location data by building id
 *  Note: returns null if the location data has not yet been retrieved
 */
const getLocationDataByBuildingId = function getLocationDataByBuildingId(buildingId: string): IGeoLocationData | null {
  if (!buildingHasLocationData(buildingId)) return null

  return locationDataByBuildingId.value[buildingId]
}

/**
 * Get the full address of a building
 */
const getFullAddressByBuildingId = function getFullAddressByBuildingId(buildingId: string): string | null {
  const location = getLocationDataByBuildingId(buildingId)
  return location?.address?.fullAddress || null
}

/**
 * Get the street name and building number of a building
 */
const getAddressByBuildingId = function getAddressByBuildingId(buildingId: string): string | null {
  const location = getLocationDataByBuildingId(buildingId)
  if (location?.address?.street) {
    return `${location?.address?.street} ${location?.address?.buildingNumber}`.trim()
  }
  return null
}

const loadLocationDataByBuildingId = async (buildingId: string, cache: boolean = true) => {
  try {
    // TODO: HARDCODED FOR DEBUG
    // buildingId = 'NL.IMBAG.PAND.0599100000610651'
    // buildingId = 'NL.IMBAG.PAND.0606100000000733' => 404 on geolocation

    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) {
      return
    }
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use 'cache', and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingLocationDataHasBeenRetrieved(buildingId)) {
      return
    }

    /**
     * Otherwise we start by retrieving the location data associated with the building
     */
    const response: IGeoLocationData = await api.building.getLocationInformationByBuildingId(buildingId)

    // Store data
    locationDataByBuildingId.value[buildingId] = response
      ? new GeoLocationData(response)
      : null

  } catch (e) {
    console.log("Error loading location data by building id", e)

    // TODO: Catch-em all... and maybe do something more with them?
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
const clearGeoLocationInformation = function clearGeoLocationInformation() {
  // Keep appropriate order of clearing data
  locationDataByBuildingId.value = {}
  isLoadingBuildingDataById.value = {}

  // TODO: Cancel fetches that are in progress... 
}


function useGeoLocations() {
  /**
   * Clean up geo location data on logout
   */
  const { isAuthenticated } = useSessionStore()
  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearGeoLocationInformation()
      }
    }
  )

  return {
    buildingLocationDataHasBeenRetrieved,
    buildingHasLocationData,
    buildingLocationDataFailedToLoad,
    getLocationDataByBuildingId,
    getFullAddressByBuildingId,
    getAddressByBuildingId,

    loadLocationDataByBuildingId
  }
}


export const useGeoLocationsStore = defineStore(
  'geolocations',
  useGeoLocations
)


