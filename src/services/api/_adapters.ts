// Wire-format adapters for the TS API.
//
// The TS API returns flat snake_case rows with string-valued enums (PG types)
// and numeric/decimal columns serialized as strings (postgres.js). The
// frontend types use camelCase + integer enums (legacy C# wire format) and
// expect real numbers. This file maps between the two.
//
// Strategy: a single deep snake→camel transform handles the bulk; per-shape
// adapters then coerce the few fields that need enum-int / numeric / nested
// envelope handling. Enum integer positions mirror the C# enum, sourced from
// FunderMapsApi src/lib/inquiry-enums.ts.

import type {
  IAnalysis,
  ICombinedReportData,
  IGeoLocationData,
  IIncidentReport,
  IInquiryReport,
  IInquirySample,
  IRecoveryReport,
  IRecoverySample,
  IStatistics,
  ISubsidence,
} from "@/datastructures/interfaces"
import {
  EAccessPolicy,
  EAuditStatus,
  EEnforcementTerm,
  EEnvironmentDamageCharacteristics,
  EFoundationDamageCause,
  EFoundationDamageCharacteristics,
  EFoundationQuality,
  EFoundationRisk,
  EFoundationType,
  EIncidentQuestionType,
  EInquiryType,
  ERecoveryDocumentType,
  ERecoveryType,
  EReliability,
} from "@/datastructures/enums"

// ---------------------------------------------------------------------------
// Generic helpers
// ---------------------------------------------------------------------------

const snakeToCamel = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map(snakeToCamel)
  if (input && typeof input === 'object' && input.constructor === Object) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(input)) {
      const camel = k.replace(/_([a-z])/g, (_, c) => (c as string).toUpperCase())
      out[camel] = snakeToCamel(v)
    }
    return out
  }
  return input
}

const toNumber = (v: unknown): number | undefined => {
  if (v === null || v === undefined || v === '') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

// Coerce a list of fields on a record to numbers (postgres returns decimals
// as strings). Mutates in place.
const coerceNumeric = (obj: Record<string, unknown>, fields: readonly string[]): void => {
  for (const f of fields) {
    if (f in obj) obj[f] = toNumber(obj[f])
  }
}

// ---------------------------------------------------------------------------
// Enum string → int (C# wire-format positions)
//
// The TS enums in src/datastructures/enums/E*.ts are the source of truth
// for integer positions (mirroring C#). The wire format from postgres.js is
// the snake_case key, so we derive a position-indexed array of snake keys
// from each enum at module load time. Sparse positions (e.g.
// EFoundationDamageCause skips 7) become sparse array slots — indexOf still
// returns -1 for them, which toEnumInt translates to undefined.
// ---------------------------------------------------------------------------

// PascalCase identifier → snake_case wire key. Inserts an underscore at
// every lower→upper boundary; digits stay attached to whatever precedes
// them (so Term05 → term05, not term_05).
const pascalToSnake = (s: string): string =>
  s.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

const enumToWireKeys = (e: Record<string, string | number>): string[] => {
  const out: string[] = []
  for (const key of Object.keys(e)) {
    const value = e[key]
    if (typeof value === 'number') out[value] = pascalToSnake(key)
  }
  return out
}

const ENUM = {
  inquiryType: enumToWireKeys(EInquiryType),
  auditStatus: enumToWireKeys(EAuditStatus),
  accessPolicy: enumToWireKeys(EAccessPolicy),
  foundationType: enumToWireKeys(EFoundationType),
  enforcementTerm: enumToWireKeys(EEnforcementTerm),
  foundationDamageCause: enumToWireKeys(EFoundationDamageCause),
  foundationDamageCharacteristics: enumToWireKeys(EFoundationDamageCharacteristics),
  environmentDamageCharacteristics: enumToWireKeys(EEnvironmentDamageCharacteristics),
  foundationQuality: enumToWireKeys(EFoundationQuality),
  reliability: enumToWireKeys(EReliability),
  recoveryType: enumToWireKeys(ERecoveryType),
  recoveryDocumentType: enumToWireKeys(ERecoveryDocumentType),
  foundationRisk: enumToWireKeys(EFoundationRisk),
  incidentQuestionType: enumToWireKeys(EIncidentQuestionType),
} as const

type EnumName = keyof typeof ENUM

const toEnumInt = (name: EnumName, value: unknown): number | undefined => {
  if (typeof value !== 'string') return undefined
  const i = (ENUM[name] as readonly string[]).indexOf(value)
  return i >= 0 ? i : undefined
}

const toEnumIntArray = (name: EnumName, values: unknown): number[] => {
  if (!Array.isArray(values)) return []
  return values
    .map(v => toEnumInt(name, v))
    .filter((i): i is number => i !== undefined)
}

// Coerce a list of fields on a record to enum ints. Mutates in place.
const coerceEnums = (obj: Record<string, unknown>, fields: readonly [string, EnumName][]): void => {
  for (const [field, name] of fields) {
    if (field in obj) obj[field] = toEnumInt(name, obj[field])
  }
}

// ---------------------------------------------------------------------------
// IAnalysis
// ---------------------------------------------------------------------------

const ANALYSIS_NUMERIC = ['constructionYear', 'restorationCosts', 'height', 'velocity',
  'groundWaterLevel', 'groundLevel', 'surfaceArea', 'drystand', 'dewateringDepth'] as const

const ANALYSIS_ENUMS: readonly [string, EnumName][] = [
  ['constructionYearReliability', 'reliability'],
  ['recoveryType', 'recoveryType'],
  ['damageCause', 'foundationDamageCause'],
  ['enforcementTerm', 'enforcementTerm'],
  ['overallQuality', 'foundationQuality'],
  ['inquiryType', 'inquiryType'],
  ['foundationType', 'foundationType'],
  ['foundationTypeReliability', 'reliability'],
  ['drystandRisk', 'foundationRisk'],
  ['dewateringDepthRisk', 'foundationRisk'],
  ['bioInfectionRisk', 'foundationRisk'],
  ['unclassifiedRisk', 'foundationRisk'],
]

export const adaptAnalysis = (raw: unknown): IAnalysis => {
  const o = snakeToCamel(raw) as Record<string, unknown>
  // The API has *RiskReliability fields; the frontend type drops "Risk".
  o.drystandReliability = toEnumInt('reliability', o.drystandRiskReliability)
  o.dewateringDepthReliability = toEnumInt('reliability', o.dewateringDepthRiskReliability)
  o.bioInfectionReliability = toEnumInt('reliability', o.bioInfectionRiskReliability)
  delete o.drystandRiskReliability
  delete o.dewateringDepthRiskReliability
  delete o.bioInfectionRiskReliability

  coerceNumeric(o, ANALYSIS_NUMERIC)
  coerceEnums(o, ANALYSIS_ENUMS)

  // The new endpoint is keyed on building_id only; address fields don't exist.
  o.externalBuildingId = o.buildingId ?? ''
  o.addressId = ''
  o.externalAddressId = ''

  return o as unknown as IAnalysis
}

// ---------------------------------------------------------------------------
// IStatistics — shape rebuild (risk distribution, decade synthesis)
// ---------------------------------------------------------------------------

interface RawStatistics {
  foundation_type_distribution?: { foundation_type: string; percentage: string | number }[]
  construction_year_distribution?: { year_from: number; count: string | number }[]
  foundation_risk_distribution?: { foundation_risk: string; percentage: string | number }[]
  data_collected_percentage?: string | number | null
  total_building_restored_count?: string | number | null
  total_incident_count?: { year: number; count: string | number }[]
  municipality_incident_count?: { year: number; count: string | number }[]
  total_report_count?: { year: number; count: string | number }[]
  municipality_report_count?: { year: number; count: string | number }[]
}

export const adaptStatistics = (raw: unknown): IStatistics => {
  const r = (raw ?? {}) as RawStatistics

  const riskByLetter: Record<string, number> = { a: 0, b: 0, c: 0, d: 0, e: 0 }
  for (const row of r.foundation_risk_distribution ?? []) {
    riskByLetter[row.foundation_risk] = toNumber(row.percentage) ?? 0
  }

  const yearPairs = (rows: { year: number; count: string | number }[] | undefined) =>
    (rows ?? []).map(x => ({ year: x.year, totalCount: toNumber(x.count) ?? 0 }))

  return {
    foundationTypeDistribution: {
      foundationTypes: (r.foundation_type_distribution ?? []).map(x => ({
        foundationType: toEnumInt('foundationType', x.foundation_type),
        percentage: toNumber(x.percentage) ?? 0,
      })) as IStatistics['foundationTypeDistribution']['foundationTypes'],
    },
    constructionYearDistribution: {
      decades: (r.construction_year_distribution ?? []).map(x => ({
        decade: {
          yearFrom: `${x.year_from}-01-01T00:00:00+00:00`,
          yearTo: `${x.year_from + 9}-12-31T00:00:00+00:00`,
        },
        totalCount: toNumber(x.count) ?? 0,
      })),
    },
    foundationRiskDistribution: {
      percentageA: riskByLetter.a,
      percentageB: riskByLetter.b,
      percentageC: riskByLetter.c,
      percentageD: riskByLetter.d,
      percentageE: riskByLetter.e,
    },
    dataCollectedPercentage: toNumber(r.data_collected_percentage) ?? 0,
    totalBuildingRestoredCount: toNumber(r.total_building_restored_count) ?? 0,
    totalIncidentCount: yearPairs(r.total_incident_count),
    municipalityIncidentCount: yearPairs(r.municipality_incident_count),
    totalReportCount: yearPairs(r.total_report_count),
    municipalityReportCount: yearPairs(r.municipality_report_count),
  }
}

// ---------------------------------------------------------------------------
// IGeoLocationData — composite address synthesis
// ---------------------------------------------------------------------------

export const adaptGeoLocationData = (raw: unknown): IGeoLocationData => {
  const r = (raw ?? {}) as Record<string, unknown>
  const street = (r.street as string) ?? ''
  const number = (r.building_number as string) ?? ''
  const postal = (r.postal_code as string) ?? ''
  const city = (r.city as string) ?? ''

  const opt = <T>(idField: string, build: () => T): T | null =>
    r[idField] ? build() : null

  return {
    building: {
      id: (r.building_id as string) ?? '',
      externalId: (r.building_id as string) ?? '',
      neighborhoodId: (r.neighborhood_id as string) ?? null,
    },
    address: {
      id: (r.address_id as string) ?? '',
      externalId: (r.address_external_id as string) ?? '',
      buildingId: (r.building_id as string) ?? '',
      buildingNumber: number,
      postalCode: postal,
      street,
      city,
      fullAddress: `${street} ${number}, ${postal} ${city}`.trim(),
    },
    residence: null,
    neighborhood: opt('neighborhood_id', () => ({
      id: r.neighborhood_id as string,
      externalId: r.neighborhood_external_id as string,
      name: r.neighborhood_name as string,
    })),
    district: opt('district_id', () => ({
      id: r.district_id as string,
      externalId: r.district_external_id as string,
      name: r.district_name as string,
    })),
    municipality: opt('municipality_id', () => ({
      id: r.municipality_id as string,
      externalId: r.municipality_external_id as string,
      name: r.municipality_name as string,
    })),
    state: opt('state_id', () => ({
      id: r.state_id as string,
      externalId: r.state_external_id as string,
      name: r.state_name as string,
    })),
  } as IGeoLocationData
}

// ---------------------------------------------------------------------------
// Inquiry / Recovery — wrap flat snake_case row into nested envelope shape
// ---------------------------------------------------------------------------

interface RawAttributedRow extends Record<string, unknown> {
  attribution_reviewer?: string | null
  attribution_reviewer_name?: string | null
  attribution_creator?: string | null
  attribution_creator_name?: string | null
  attribution_owner?: string | null
  attribution_owner_name?: string | null
  attribution_contractor?: number | null
  attribution_contractor_name?: string | null
  audit_status?: string
  access_policy?: string
  create_date?: string | null
  update_date?: string | null
  delete_date?: string | null
}

const envelopes = (r: RawAttributedRow) => ({
  attribution: {
    reviewer: r.attribution_reviewer ?? null,
    reviewerName: r.attribution_reviewer_name ?? null,
    creator: r.attribution_creator ?? null,
    creatorName: r.attribution_creator_name ?? null,
    owner: r.attribution_owner ?? null,
    ownerName: r.attribution_owner_name ?? null,
    contractor: r.attribution_contractor ?? null,
    contractorName: r.attribution_contractor_name ?? null,
  },
  state: { auditStatus: toEnumInt('auditStatus', r.audit_status) },
  access: { accessPolicy: toEnumInt('accessPolicy', r.access_policy) },
  record: {
    createDate: r.create_date ?? null,
    updateDate: r.update_date ?? null,
    deleteDate: r.delete_date ?? null,
  },
})

export const adaptInquiry = (raw: unknown): IInquiryReport => {
  const r = (raw ?? {}) as RawAttributedRow
  return {
    id: r.id,
    identifier: r.id,
    documentName: r.document_name ?? '',
    inspection: !!r.inspection,
    jointMeasurement: !!r.joint_measurement,
    floorMeasurement: !!r.floor_measurement,
    note: r.note ?? null,
    documentDate: r.document_date ?? '',
    documentFile: r.document_file ?? '',
    type: toEnumInt('inquiryType', r.type),
    standardF3o: !!r.standard_f3o,
    ...envelopes(r),
  } as unknown as IInquiryReport
}

export const adaptRecovery = (raw: unknown): IRecoveryReport => {
  const r = (raw ?? {}) as RawAttributedRow
  return {
    id: r.id,
    identifier: r.id,
    documentName: r.document_name ?? '',
    type: toEnumInt('recoveryDocumentType', r.type),
    documentFile: r.document_file ?? '',
    documentDate: r.document_date ?? '',
    note: r.note ?? null,
    ...envelopes(r),
  } as unknown as IRecoveryReport
}

// ---------------------------------------------------------------------------
// Inquiry / Recovery samples — snake→camel + parent FK rename
// ---------------------------------------------------------------------------

export const adaptInquirySample = (raw: unknown): IInquirySample => {
  const o = snakeToCamel(raw) as Record<string, unknown>
  // Frontend type names the parent FK `inquiry`, not `inquiryId`.
  if ('inquiryId' in o) { o.inquiry = o.inquiryId; delete o.inquiryId }
  if ('buildingId' in o) { o.building = o.buildingId; delete o.buildingId }
  return o as unknown as IInquirySample
}

export const adaptRecoverySample = (raw: unknown): IRecoverySample => {
  const o = snakeToCamel(raw) as Record<string, unknown>
  if ('recoveryId' in o) { o.recovery = o.recoveryId; delete o.recoveryId }
  if ('buildingId' in o) { o.building = o.buildingId; delete o.buildingId }
  if ('contractorId' in o) { o.contractor = o.contractorId; delete o.contractorId }
  return o as unknown as IRecoverySample
}

// ---------------------------------------------------------------------------
// IIncidentReport — flat snake_case + boolean coercion + a few renames
// ---------------------------------------------------------------------------

const INCIDENT_ENUMS: readonly [string, EnumName][] = [
  ['foundationType', 'foundationType'],
  ['foundationDamageCause', 'foundationDamageCause'],
  ['auditStatus', 'auditStatus'],
]

export const adaptIncident = (raw: unknown): IIncidentReport => {
  const o = snakeToCamel(raw) as Record<string, unknown>

  for (const f of ['chainedBuilding', 'owner', 'foundationRecovery', 'neighborRecovery']) {
    o[f] = !!o[f]
  }
  o.foundationDamageCharacteristics = toEnumIntArray('foundationDamageCharacteristics',
    o.foundationDamageCharacteristics)
  o.environmentDamageCharacteristics = toEnumIntArray('environmentDamageCharacteristics',
    o.environmentDamageCharacteristics)
  o.incidentQuestionType = toEnumInt('incidentQuestionType', o.questionType)
  delete o.questionType
  coerceEnums(o, INCIDENT_ENUMS)

  o.documentFile = o.documentFile ?? []
  o.note = o.note ?? null
  o.internalNote = o.internalNote ?? null
  o.email = (o.contact as string) ?? ''
  o.name = (o.contactName as string) ?? null
  o.phoneNumber = (o.contactPhoneNumber as string) ?? null
  delete o.contact; delete o.contactName; delete o.contactPhoneNumber
  o.address = ''
  o.building = (o.buildingId as string) ?? ''
  delete o.buildingId
  o.meta = (o.metadata as object) ?? {}
  delete o.metadata
  o.clientId = undefined
  o.clientName = 'FunderMaps'

  return o as unknown as IIncidentReport
}

// ---------------------------------------------------------------------------
// ICombinedReportData — the /report/:id 5-array endpoint
// ---------------------------------------------------------------------------

interface RawReport {
  incidents?: unknown[]
  inquiries?: unknown[]
  inquiry_samples?: unknown[]
  recoveries?: unknown[]
  recovery_samples?: unknown[]
}

export const adaptCombinedReport = (raw: unknown): ICombinedReportData => {
  const r = (raw ?? {}) as RawReport
  return {
    incidents: (r.incidents ?? []).map(adaptIncident),
    inquiries: (r.inquiries ?? []).map(adaptInquiry),
    inquirySamples: (r.inquiry_samples ?? []).map(adaptInquirySample),
    recoveries: (r.recoveries ?? []).map(adaptRecovery),
    recoverySamples: (r.recovery_samples ?? []).map(adaptRecoverySample),
  }
}

// ---------------------------------------------------------------------------
// ISubsidence — snake→camel + numeric coercion
// ---------------------------------------------------------------------------

export const adaptSubsidence = (raw: unknown): ISubsidence[] => {
  if (!Array.isArray(raw)) return []
  return raw.map(row => {
    const r = row as { velocity: number | string; mark_at: string }
    return { velocity: Number(r.velocity), markAt: r.mark_at }
  })
}
