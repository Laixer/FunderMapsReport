import { type Ref, ref, watch, toValue } from 'vue';
import { defineStore } from 'pinia'

import { type ICombinedInquiryData, type IInquirySample, type IInquiryReport } from "@/datastructures/interfaces"
import api from '@/services/api';
import { useSessionStore } from '../session';
import { InquirySample } from '@/datastructures/classes/InquirySample';
import { Inquiry } from '@/datastructures/classes/Inquiry';

/**
 * Inquiries by Id
 */
const inquiriesById: Ref<Record<number, IInquiryReport>> = ref({})

/**
 * Inquiry Samples by Id
 */
const inquirySamplesByInquiryId: Ref<Record<number, IInquirySample[]>> = ref({})

/**
 * Inquiry samp;e by building id
 *  Determining factor
 */
const inquirySamplesByBuildingId: Ref<Record<string, IInquirySample[]>> = ref({})

/**
 * The inquiry samples ids by building id
 */
const inquirySampleIdsByBuildingId: Ref<Record<string, number[]>> = ref({})

/**
 * Inquiry Ids by Building Id
 */
const inquiryIdsByBuildingId: Ref<Record<string, number[]>> = ref({})

/**
 * Whether currently data for a building is being loaded
 */
const isLoadingBuildingDataById: Ref<Record<string, boolean>> = ref({})


/**
 * Whether the inquiry sample panel is open
 */
const isSamplePanelOpen = ref(false)

/**
 * The list index of the inquiry report currently being shown
 *  This needs to match between sidebar and modal
 */
const shownReportIndex: Ref<number> = ref(0)


/**
 * Whether the inquiries for a building have been retrieved previously
 */
const buildingInquiryDataHasBeenRetrieved = function buildingInquiryDataHasBeenRetrieved(buildingId: string): boolean {
  return Array.isArray(inquiryIdsByBuildingId.value[buildingId])
}

/**
 * Whether there is currently any inquiry data available for a building
 *  Note: the data may still be loading
 */
const buildingHasInquiries = function buildingHasInquiries(buildingId: string): boolean {
  return buildingInquiryDataHasBeenRetrieved(buildingId) && inquiryIdsByBuildingId.value[buildingId].length !== 0
}

/**
 * Get all inquiries by building id
 *  Note: returns an empty array if the inquiry data has not yet been retrieved
 */
const getInquiryByBuildingId = function getInquiryByBuildingId(buildingId: string): IInquiryReport[] {
  if (! buildingHasInquiries(buildingId)) return []

  return inquiryIdsByBuildingId.value[buildingId]
    .filter(( inquiryId: number ) => !! inquiriesById.value[inquiryId])
    .map(( inquiryId: number ) => inquiriesById.value[inquiryId])
}

// TODO: Add variations on functions above & incl building id => inquiry id => samples
const getInquirySamplesByInquiryId = function getInquirySamplesByInquiryId(inquiryId: number) {
  return inquirySamplesByInquiryId.value[inquiryId]
}

/**
 * Get the inquiry data associated to the building id
 * 
 * Usually 
 *  - 1 sample <=> 1 inquiry & 
 *  - multiple samples & inquiry combinations per buildingId
 * 
 * Exceptions
 *  - Multiple samples for 1 inquiry
 *  - No samples for 1 inquiry
 */
const getCombinedInquiryDataByBuildingId = function getCombinedInquiryDataByBuildingId(buildingId: string): ICombinedInquiryData[] {
  // Used to filter samples related to inquires
  const sampleIdsForBuilding = inquirySampleIdsByBuildingId.value[buildingId] || []

  // Match reports & samples for every entry
  const combinedData: ICombinedInquiryData[] = []

  console.log("Get Combined inquiry data", getInquiryByBuildingId(buildingId))

  // Go over all inquires related to the building
  getInquiryByBuildingId(buildingId)
    .forEach((report: IInquiryReport) => {

      console.log("report", report.id)

      // Get all samples related to the inquiry & building combination
      const samples = getInquirySamplesByInquiryId(report.id)
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
      
      // Otherwise add an entry for every inquiry + sample combination
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
const setInquiryDataByBuildingId = function setInquiryDataByBuildingId(buildingId: string, reports: IInquiryReport[], samples: IInquirySample[]) {

  console.log('setInquiryDataByBuildingId', buildingId, reports, samples)

  reports.forEach((inquiry: IInquiryReport) => {
    inquiriesById.value[inquiry.id] = new Inquiry(inquiry)
  })

  // Connect the inquiryIds to the buildingId
  inquiryIdsByBuildingId.value[buildingId] = reports.map((inquery: IInquiryReport) => inquery.id)

  samples.forEach((sample: IInquirySample) => {
    sample = new InquirySample(sample)
    const reportId = sample.inquiry
    inquirySamplesByInquiryId.value[reportId] = inquirySamplesByInquiryId.value[reportId] || []

    // Only add unknown samples
    if (! inquirySamplesByInquiryId.value[reportId].map(sample => sample.id).includes(sample.id)) {
      inquirySamplesByInquiryId.value[reportId].push(sample)
    }

    inquirySamplesByBuildingId.value[buildingId] = inquirySamplesByBuildingId.value[buildingId] || []
    inquirySamplesByBuildingId.value[buildingId].push(sample)

    inquirySampleIdsByBuildingId.value[buildingId] = inquirySampleIdsByBuildingId.value[buildingId] || []
    inquirySampleIdsByBuildingId.value[buildingId].push(sample.id)
  
  })


}

const loadInquiryDataByBuildingId = async function loadInquiryDataByBuildingId(buildingId: string, cache: boolean = true) {
  try {
    // Data for this building is currently already being retrieved
    if (isLoadingBuildingDataById.value[buildingId] === true) return 
    isLoadingBuildingDataById.value[buildingId] = true

    /**
     * If we use cache, and the building data has already been loaded, we got nothing to do.
     */
    if (cache === true && buildingInquiryDataHasBeenRetrieved(buildingId)) {
      return 
    }

    /**
     * Otherwise we start by retrieving the inqueries associated with the building
     */
    const reports: IInquiryReport[] = await api.building.getInquiriesByBuildingId(buildingId)
    
    // Get all samples
    let samples: IInquirySample[] = []
    for(let report in reports) {
      const sampleResponse = await api.building.getInquirySamplesByInquiryId(reports[report].id)
      samples = samples.concat(sampleResponse)
    }

    setInquiryDataByBuildingId(buildingId, reports, samples)
  } catch(e) {
    console.log("Error loading inquiry data by building id", e)

    // TODO: Catch-em all... and maybe do something with them?
  }

  // Success or fail, we're no longer retrieving the data for this building
  isLoadingBuildingDataById.value[buildingId] = false
}



/**
 * Reset store to empty state
 */
const clearInquiryData = function clearInquiryData() {
  // Keep appropriate order of clearing data
  inquiryIdsByBuildingId.value = {}
  inquiriesById.value = {}
  inquirySamplesByInquiryId.value = {}
  isLoadingBuildingDataById.value = {}

  // TODO: Cancel fetches that are in progress... 
}


function useInquiries() {
  /**
   * Clean up inquiry data on logout
   */
  const { isAuthenticated } = useSessionStore()
  watch(
    () => isAuthenticated,
    (value) => {
      if (value !== true) {
        clearInquiryData()
      }
    }
  )

  return {
    // Inquiries by Building Id
    buildingInquiryDataHasBeenRetrieved,
    buildingHasInquiries,
    getInquiryByBuildingId,

    // Samples
    getInquirySamplesByInquiryId,

    loadInquiryDataByBuildingId,
    setInquiryDataByBuildingId,

    // Get combined data
    getCombinedInquiryDataByBuildingId,

    // Sample modal
    isSamplePanelOpen,
    shownReportIndex
  }
}


export const useInquiriesStore = defineStore(
  'inquiries',
  useInquiries
)


