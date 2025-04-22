import { type Ref, ref, watch, toValue } from 'vue';
import { defineStore } from 'pinia'

import { IRecoverySample, type IRecoveryReport } from "@/datastructures/interfaces"
import api from '@/services/api';
import { useSessionStore } from '../session';
import { RecoveryReport } from '@/datastructures/classes/RecoveryReport';
import { RecoverySample } from '@/datastructures/classes/RecoverySample';
import { ICombinedRecoveryData } from '@/datastructures/interfaces/front-end/ICombinedRecoveryData';

/**
 * RecoveryReports by Id
 */
const recoveryReportsById: Ref<Record<number, IRecoveryReport>> = ref({})

/**
 * RecoveryReport Samples by Id
 */
const recoverySamplesByRecoveryReportId: Ref<Record<number, IRecoverySample[]>> = ref({})

/**
 * Recovery Sample by building id
 *  Determining factor
 */
const recoverySamplesByBuildingId: Ref<Record<string, IRecoverySample[]>> = ref({})

/**
 * The recovery samples ids by building id
 */
const recoverySampleIdsByBuildingId: Ref<Record<string, number[]>> = ref({})

/**
 * RecoveryReport Ids by Building Id
 */
const recoveryReportIdsByBuildingId: Ref<Record<string, number[]>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})


/**
 * Whether the recovery sample panel is open
 */
const isSamplePanelOpen = ref(false)

/**
 * The list index of the recovery report currently being shown
 *  This needs to match between sidebar and modal
 */
const shownReportIndex: Ref<number> = ref(0)


/**
 * Whether the recoveryReports for a building have been retrieved previously
 */
const buildingRecoveryReportDataHasBeenRetrieved = function buildingRecoveryReportDataHasBeenRetrieved(buildingId: string): boolean {
  return Array.isArray(recoveryReportIdsByBuildingId.value[buildingId])
}

/**
 * Whether there is currently any recoveryReport data available for a building
 *  Note: the data may still be loading
 */
const buildingHasRecoveryReports = function buildingHasRecoveryReports(buildingId: string): boolean {
  return buildingRecoveryReportDataHasBeenRetrieved(buildingId) && recoveryReportIdsByBuildingId.value[buildingId].length !== 0
}

/**
 * Get all recoveryReports by building id
 *  Note: returns an empty array if the recoveryReport data has not yet been retrieved
 */
const getRecoveryReportByBuildingId = function getRecoveryReportByBuildingId(buildingId: string): IRecoveryReport[] {
  if (!buildingHasRecoveryReports(buildingId)) return []

  return recoveryReportIdsByBuildingId.value[buildingId]
    .filter((recoveryReportId: number) => !!recoveryReportsById.value[recoveryReportId])
    .map((recoveryReportId: number) => recoveryReportsById.value[recoveryReportId])
}

// TODO: Add variations on functions above & incl building id => recoveryReport id => samples
const getRecoverySamplesByRecoveryReportId = function getRecoverySamplesByRecoveryReportId(recoveryReportId: number): IRecoverySample[] {
  return recoverySamplesByRecoveryReportId.value[recoveryReportId]
}

/**
 * Get the recovery data associated to the building id
 * 
 * Usually 
 *  - 1 sample <=> 1 recovery & 
 *  - multiple samples & recovery combinations per buildingId
 * 
 * Exceptions
 *  - Multiple samples for 1 recovery
 *  - No samples for 1 recovery
 */
const getCombinedRecoveryDataByBuildingId = function getCombinedRecoveryDataByBuildingId(buildingId: string): ICombinedRecoveryData[] {
  // Used to filter samples related to inquires
  const sampleIdsForBuilding = recoverySampleIdsByBuildingId.value[buildingId] || []

  // Match reports & samples for every entry
  const combinedData: ICombinedRecoveryData[] = []

  console.log("Get Combined recovery data")

  // Go over all inquires related to the building
  getRecoveryReportByBuildingId(buildingId)
    .forEach((report: IRecoveryReport) => {

      console.log("report", report.id)

      // Get all samples related to the recovery & building combination
      const samples = getRecoverySamplesByRecoveryReportId(report.id)
        .filter(sample => {
          return sampleIdsForBuilding.includes(sample.id)
        })

      console.log("samples", samples)

      // If there are none, add the report without sample
      if (samples.length === 0) {
        combinedData.push({
          report: toValue(report),
          sample: undefined
        })

        // Otherwise add an entry for every recovery + sample combination
      } else {
        samples.forEach(sample => {
          combinedData.push({
            report: toValue(report),
            sample: toValue(sample)
          })
        })
      }
    })

  console.log(combinedData)

  return combinedData
}


/**
 * Set the retrieved report data
 */
const setRecoveryDataByBuildingId = function setRecoveryDataByBuildingId(buildingId: string, reports: IRecoveryReport[], samples: IRecoverySample[]) {

  console.log(buildingId, reports, samples)

  reports.forEach((report: IRecoveryReport) => {
    recoveryReportsById.value[report.id] = new RecoveryReport(report)
  })

  // Connect the recoveryIds to the buildingId
  recoveryReportIdsByBuildingId.value[buildingId] = reports.map((inquery: IRecoveryReport) => inquery.id)

  samples.forEach((sample: IRecoverySample) => {
    sample = new RecoverySample(sample)
    const reportId = sample.recovery
    recoverySamplesByRecoveryReportId.value[reportId] = recoverySamplesByRecoveryReportId.value[reportId] || []

    // Only add unknown samples
    if (!recoverySamplesByRecoveryReportId.value[reportId].map(sample => sample.id).includes(sample.id)) {
      recoverySamplesByRecoveryReportId.value[reportId].push(sample)
    }

    recoverySamplesByBuildingId.value[buildingId] = recoverySamplesByBuildingId.value[buildingId] || []
    recoverySamplesByBuildingId.value[buildingId].push(sample)

    recoverySampleIdsByBuildingId.value[buildingId] = recoverySampleIdsByBuildingId.value[buildingId] || []
    recoverySampleIdsByBuildingId.value[buildingId].push(sample.id)
  })
}


const loadRecoveryReportDataByBuildingId = async function loadRecoveryReportDataByBuildingId(buildingId: string, cache: boolean = true) {
  try {
    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) return
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use cache, and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingRecoveryReportDataHasBeenRetrieved(buildingId)) {
      return
    }

    /**
     * Otherwise we start by retrieving the inqueries associated with the building
     */
    const response: IRecoveryReport[] = await api.building.getRecoveryReportsByBuildingId(buildingId)

    response.forEach((recoveryReport: IRecoveryReport) => {
      recoveryReportsById.value[recoveryReport.id] = new RecoveryReport(recoveryReport)
    })

    // Connect the recoveryReportIds to the buildingId
    recoveryReportIdsByBuildingId.value[buildingId] = response.map((report: IRecoveryReport) => report.id)

    /**
     * Get connected samples by report id
     */
    for (let report in response) {
      const recoveryReportId = response[report].id
      const sampleResponse = await api.building.getRecoverySamplesByRecoveryId(recoveryReportId)

      recoverySamplesByRecoveryReportId.value[recoveryReportId] = []
      sampleResponse.forEach((recoverySample: IRecoverySample) => {
        recoverySamplesByRecoveryReportId.value[recoveryReportId].push(new RecoverySample(recoverySample))
      })
    }

  } catch (e) {
    console.log("Error loading recoveryReport data by building id", e)

    // TODO: Catch-em all... and maybe do something with them?
  }

  // Success or fail, we're no longer retrieving the data for this building
  isLoadingBuildingDataById.value[buildingId] = false
}


/**
 * Reset store to empty state
 */
const clearRecoveryReportData = function clearRecoveryReportData() {
  // Keep appropriate order of clearing data
  recoveryReportIdsByBuildingId.value = {}
  recoveryReportsById.value = {}
  recoverySamplesByRecoveryReportId.value = {}
  isLoadingBuildingDataById.value = {}

  // TODO: Cancel fetches that are in progress... 
}


function useRecoveryReports() {
  /**
   * Clean up recoveryReport data on logout
   */
  const { isAuthenticated } = useSessionStore()
  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearRecoveryReportData()
      }
    }
  )

  return {
    // RecoveryReports by Building Id
    buildingRecoveryReportDataHasBeenRetrieved,
    buildingHasRecoveryReports,
    getRecoveryReportByBuildingId,

    // Samples
    getRecoverySamplesByRecoveryReportId,

    loadRecoveryReportDataByBuildingId,
    setRecoveryDataByBuildingId,

    // Get combined data
    getCombinedRecoveryDataByBuildingId,

    // Sample modal
    isSamplePanelOpen,
    shownReportIndex
  }
}


export const useRecoveryReportsStore = defineStore(
  'recoveryReports',
  useRecoveryReports
)


