import { type Ref, ref, watch } from 'vue';
import { defineStore } from 'pinia'

import { type IIncidentReport } from "@/datastructures/interfaces"
import api from '@/services/api';
import { useSessionStore } from '../session';
import { IncidentReport } from '@/datastructures/classes/IncidentReport';

/**
 * IncidentReports by Id
 */
const incidentReportsById: Ref<Record<string, IIncidentReport>> = ref({})


/**
 * IncidentReport Ids by Building Id
 */
const incidentReportIdsByBuildingId: Ref<Record<string, string[]>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})

/**
 * Whether the incidentReports for a building have been retrieved previously
 */
const buildingIncidentReportDataHasBeenRetrieved = function buildingIncidentReportDataHasBeenRetrieved(buildingId: string): boolean {
  return Array.isArray(incidentReportIdsByBuildingId.value[buildingId])
}

/**
 * Whether there is currently any incidentReport data available for a building
 *  Note: the data may still be loading
 */
const buildingHasIncidentReports = function buildingHasIncidentReports(buildingId: string): boolean {
  return buildingIncidentReportDataHasBeenRetrieved(buildingId) && incidentReportIdsByBuildingId.value[buildingId].length !== 0
}

/**
 * Get all incidentReports by building id
 *  Note: returns an empty array if the incidentReport data has not yet been retrieved
 */
const getIncidentReportsByBuildingId = function getIncidentReportsByBuildingId(buildingId: string): IIncidentReport[] {
  if (! buildingHasIncidentReports(buildingId)) return []

  return incidentReportIdsByBuildingId.value[buildingId]
    .filter(( incidentReportId: string ) => !! incidentReportsById.value[incidentReportId])
    .map(( incidentReportId: string ) => incidentReportsById.value[incidentReportId])
}



/**
 * Set the retrieved report data
 */
const setIncidentDataByBuildingId = function setIncidentDataByBuildingId(buildingId: string, reports: IIncidentReport[]) {
  // Store reports by their id
  reports.forEach((incidentReport: IIncidentReport) => {
    incidentReportsById.value[incidentReport.id] = new IncidentReport(incidentReport)
  })

  // Connect the incidentReportIds to the buildingId
  incidentReportIdsByBuildingId.value[buildingId] = reports.map((incident: IIncidentReport) => incident.id)
}

const loadIncidentReportDataByBuildingId = async function loadIncidentReportDataByBuildingId(buildingId: string, cache: boolean = true) {
  try {

    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) return 
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use cache, and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingIncidentReportDataHasBeenRetrieved(buildingId)) {
      return 
    }

    /**
     * Otherwise we start by retrieving the inqueries associated with the building
     */
    const response: IIncidentReport[] = await api.building.getIncidentReportsByBuildingId(buildingId)
    
    setIncidentDataByBuildingId(buildingId, response)

  } catch(e) {
    console.log("Error loading incidentReport data by building id", e)

    // TODO: Catch-em all... and maybe do something with them?
  }

  // Success or fail, we're no longer retrieving the data for this building
  isLoadingBuildingDataById.value[buildingId] = false

  return
}



/**
 * Reset store to empty state
 */
const clearIncidentReportData = function clearIncidentReportData() {
  // Keep appropriate order of clearing data
  incidentReportIdsByBuildingId.value = {}
  incidentReportsById.value = {}
  isLoadingBuildingDataById.value = {}

  // TODO: Cancel fetches that are in progress... 
}


function useIncidentReports() {
  /**
   * Clean up incidentReport data on logout
   */
  const { isAuthenticated } = useSessionStore()
  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearIncidentReportData()
      }
    }
  )

  return {
    // IncidentReports by Building Id
    buildingIncidentReportDataHasBeenRetrieved,
    buildingHasIncidentReports,
    getIncidentReportsByBuildingId,

    loadIncidentReportDataByBuildingId,
    setIncidentDataByBuildingId
  }
}



export const useIncidentReportsStore = defineStore(
  'incidentReports',
  useIncidentReports
)


