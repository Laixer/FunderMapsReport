
import { EFoundationType } from "@/datastructures/enums"
import { IEnumMethods } from "./util"

export interface IStatistics {
  foundationTypeDistribution: IFoundationTypeDistribution,
  constructionYearDistribution: IConstructionYearDistribution,
  foundationRiskDistribution: IFoundationRiskDistribution,
  dataCollectedPercentage: number,
  totalBuildingRestoredCount: number,
  totalIncidentCount: IIncidentYearPair[],
  municipalityIncidentCount: IIncidentYearPair[], 
  totalReportCount: IInquiryYearPair[],
  municipalityReportCount: IInquiryYearPair[]
}

export interface IYears {
  yearFrom: string, // DateTimeOffset (e.g. "1870-01-01T00:00:00+00:00")
  yearTo: string
}

export interface IConstructionYearPair {
  decade: IYears,
  totalCount: number
}

export interface IConstructionYearDistribution {
  decades: IConstructionYearPair[]
}

export interface IFoundationTypePair extends IEnumMethods {
  foundationType: EFoundationType,
  percentage: number

  // Getter methods for enums
  get foundationTypeLabel(): string
}

export interface IFoundationTypeDistribution {
  foundationTypes: IFoundationTypePair[]
}

export interface IFoundationRiskDistribution {
  percentageA: number,
  percentageB: number,
  percentageC: number,
  percentageD: number,
  percentageE: number
}

export interface IIncidentYearPair {
  year: number,
  totalCount: number  
}

export interface IInquiryYearPair {
  year: number,
  totalCount: number
}
