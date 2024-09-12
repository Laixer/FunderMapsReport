import type { 
  IGeoLocationData, 
  IIncidentReport, 
  IInquiryReport, 
  IRecoveryReport,
  IAnalysis,
  IStatistics,
  IRecoverySample,
  IDownloadLink,
  IInquirySample,
  ICombinedReportData,
  ISubsidence
} from "@/datastructures/interfaces"
import { get } from "../apiClient"
import { Analysis } from "@/datastructures/classes/Analysis"



/****************************************************************************** 
 * This includes all endpoints from Excel v6
 *
 *
 * Note: The API supports various formats for buildingId. For example:
 *  - NL.IMBAG.PAND.0018100000044244
 *  - NL.IMBAG.NUMMERAANDUIDING.0202200000386344
 *  - gfm-ee8e9a3ccc954296a84b247eda947045
 */ 

/******************************************************************************
 *    Location
 *****************************************************************************/

/**
 * Location information from the geocoder, based on buildingId
 */
export const getLocationInformationByBuildingId = async function getLocationInformationByBuildingId(buildingId: string): Promise<IGeoLocationData> {
  return await get({ endpoint: `/geocoder/${buildingId}` })
}

/******************************************************************************
 *    Building & Foundation information
 *****************************************************************************/

/**
 * Get basic information about the building and foundation.
 */
export const getAnalysisByBuildingId = async function getAnalysisByBuildingId(buildingId: string): Promise<IAnalysis> {
  const response = await get({ endpoint: `/product/analysis/${buildingId}` })
  return new Analysis(response)
}

/******************************************************************************
 *    Recovery
 *****************************************************************************/

/**
 * Get recovery reports about a building, if there are any
 */
export const getRecoveryReportsByBuildingId = async function getRecoveryReportsByBuildingId(buildingId: string): Promise<IRecoveryReport[]> {
  return await get({ endpoint: `/recovery/building/${buildingId}` })
}

/**
 * Get all recovery samples of a recovery report
 */
export const getRecoverySamplesByRecoveryId = async function getRecoverySamplesByRecoveryId(recoveryId: string|number): Promise<IRecoverySample[]> {
  return await get({ endpoint: `/recovery/${recoveryId}/sample` })
}

/**
 * Retrieve an S3 download link, which can then be used to download the file (expires in 1 hour)
 */
export const getRecoveryReportDownloadLink = async function getInquiryReportDownloadLink(recoveryId: string): Promise<IDownloadLink> {
  return await get({ endpoint: `/recovery/${recoveryId}/download` })
}

/******************************************************************************
 *    Inquiry
 *****************************************************************************/

/**
 * Get inquiry reports about a building, if there are any
 */
export const getInquiriesByBuildingId = async function getInquiriesByBuildingId(buildingId: string): Promise<IInquiryReport[]> {
  return await get({ endpoint: `/inquiry/building/${buildingId}` })
}

/**
 * Get all inquiry samples of a inquiry report
 */
export const getInquirySamplesByInquiryId = async function getInquirySamplesByInquiryId(inquiryId: string|number): Promise<IInquirySample[]> {
  return await get({ endpoint: `/inquiry/${inquiryId}/sample` })
}

/**
 * Retrieve an S3 download link, which can then be used to download the file (expires in 1 hour)
 */
export const getInquiryReportDownloadLink = async function getInquiryReportDownloadLink(inquiryId: string): Promise<IDownloadLink> {
  return await get({ endpoint: `/inquiry/${inquiryId}/download` })
}

/******************************************************************************
 *    Statistics
 *****************************************************************************/

/**
 * Get statistics about a building by building id
 */
export const getStatisticsByBuildingId = async function getStatisticsByBuildingId(buildingId: string): Promise<IStatistics> {
  return await get({ endpoint: `/product/statistics/building/${buildingId}` })
}

/******************************************************************************
 *    Incidents
 *****************************************************************************/

/**
 * Get all indicents by building id
 */
export const getIncidentReportsByBuildingId = async function getIncidentReportsByBuildingId(buildingId: string): Promise<IIncidentReport[]> {
  return await get({ endpoint: `/incident/building/${buildingId}` })
}

/******************************************************************************
 *    ALL Report data (inquiry, recovery & incidents)
 *****************************************************************************/

export const getAllReportDataByBuildingId = async function getAllReportDataByBuildingId(buildingId: string): Promise<ICombinedReportData> {
  return await get({ endpoint: `/report/${buildingId}` })
}

/******************************************************************************
 *    Subsidence data
 *****************************************************************************/


export const getSubsidenceByBuildingId = async function getSubsidenceByBuildingId(buildingId: string): Promise<ISubsidence[]> {
  return await get({ endpoint: `/subsidence/${buildingId}` })
}


export default {
  getLocationInformationByBuildingId,
  getAnalysisByBuildingId,
  getRecoveryReportsByBuildingId,
  getRecoverySamplesByRecoveryId,
  getRecoveryReportDownloadLink,
  getInquiriesByBuildingId,
  getInquirySamplesByInquiryId,
  getInquiryReportDownloadLink,
  getStatisticsByBuildingId,
  getIncidentReportsByBuildingId,
  getAllReportDataByBuildingId,
  getSubsidenceByBuildingId
}