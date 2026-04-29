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
  ISubsidence,
} from "@/datastructures/interfaces"
import { get } from "../apiClient"
import { Analysis } from "@/datastructures/classes/Analysis"
import {
  adaptAnalysis,
  adaptStatistics,
  adaptGeoLocationData,
  adaptCombinedReport,
  adaptSubsidence,
  adaptInquiry,
  adaptInquirySample,
  adaptRecovery,
  adaptRecoverySample,
  adaptIncident,
} from "./_adapters"

// The TS API returns flat snake_case rows + string-valued enums; the legacy
// frontend types (shared with the Vue 2 era) are nested camelCase + integer
// enums. Every call passes through an adapt*() function (see _adapters.ts).
// Mirrors the same pattern in ~/Projects/FunderMapsWebFront/src/services/api/building.ts.

export const getLocationInformationByBuildingId = async (buildingId: string): Promise<IGeoLocationData> => {
  const raw = await get({ endpoint: `/geocoder/building-info/${buildingId}` })
  return adaptGeoLocationData(raw)
}

export const getAnalysisByBuildingId = async (buildingId: string): Promise<IAnalysis> => {
  const raw = await get({ endpoint: `/product/${buildingId}/analysis` })
  return new Analysis(adaptAnalysis(raw))
}

export const getStatisticsByBuildingId = async (buildingId: string): Promise<IStatistics> => {
  const raw = await get({ endpoint: `/product/${buildingId}/statistics` })
  return adaptStatistics(raw)
}

export const getAllReportDataByBuildingId = async (buildingId: string): Promise<ICombinedReportData> => {
  const raw = await get({ endpoint: `/report/${buildingId}` })
  return adaptCombinedReport(raw)
}

export const getSubsidenceByBuildingId = async (buildingId: string): Promise<ISubsidence[]> => {
  const raw = await get({ endpoint: `/product/${buildingId}/subsidence/historic` })
  return adaptSubsidence(raw)
}

export const getRecoveryReportsByBuildingId = async (buildingId: string): Promise<IRecoveryReport[]> => {
  const raw = await get<unknown[]>({ endpoint: `/recovery/building/${buildingId}` })
  return (raw ?? []).map(adaptRecovery)
}

export const getRecoverySamplesByRecoveryId = async (recoveryId: string | number): Promise<IRecoverySample[]> => {
  const raw = await get<unknown[]>({ endpoint: `/recovery/${recoveryId}/sample` })
  return (raw ?? []).map(adaptRecoverySample)
}

export const getRecoveryReportDownloadLink = async (recoveryId: string): Promise<IDownloadLink> =>
  await get<IDownloadLink>({ endpoint: `/recovery/${recoveryId}/download` })

export const getInquiriesByBuildingId = async (buildingId: string): Promise<IInquiryReport[]> => {
  const raw = await get<unknown[]>({ endpoint: `/inquiry/building/${buildingId}` })
  return (raw ?? []).map(adaptInquiry)
}

export const getInquirySamplesByInquiryId = async (inquiryId: string | number): Promise<IInquirySample[]> => {
  const raw = await get<unknown[]>({ endpoint: `/inquiry/${inquiryId}/sample` })
  return (raw ?? []).map(adaptInquirySample)
}

export const getInquiryReportDownloadLink = async (inquiryId: string): Promise<IDownloadLink> =>
  await get<IDownloadLink>({ endpoint: `/inquiry/${inquiryId}/download` })

export const getIncidentReportsByBuildingId = async (buildingId: string): Promise<IIncidentReport[]> => {
  const raw = await get<unknown[]>({ endpoint: `/incident/building/${buildingId}` })
  return (raw ?? []).map(adaptIncident)
}

export default {
  getLocationInformationByBuildingId,
  getAnalysisByBuildingId,
  getStatisticsByBuildingId,
  getAllReportDataByBuildingId,
  getSubsidenceByBuildingId,
  getRecoveryReportsByBuildingId,
  getRecoverySamplesByRecoveryId,
  getRecoveryReportDownloadLink,
  getInquiriesByBuildingId,
  getInquirySamplesByInquiryId,
  getInquiryReportDownloadLink,
  getIncidentReportsByBuildingId,
}
