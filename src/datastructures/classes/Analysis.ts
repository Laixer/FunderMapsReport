import { EReliability, 
  ERecoveryType, 
  EFoundationDamageCause, 
  EEnforcementTerm, 
  EFoundationQuality, 
  EInquiryType, 
  EFoundationType, 
  EFoundationRisk, 
  EReliabilityLabels, 
  ERecoveryTypeLabels, 
  EFoundationDamageCauseLabels, 
  EEnforcementTermLabels, 
  EFoundationQualityLabels, 
  EInquiryTypeLabels, 
  EFoundationTypeLabels, 
  EFoundationRiskLabels 
} from "../enums";
import { ESoil, ESoilLabels } from "../enums/ESoil";
import { IAnalysis } from "../interfaces";
import { EnumMethods } from "./EnumMethods";

export class Analysis extends EnumMethods implements IAnalysis {
  buildingId: string;
  externalBuildingId: string;
  addressId: string;
  externalAddressId: string;
  neighborhoodId: string;
  constructionYear?: number;
  constructionYearReliability: EReliability;
  recoveryType?: ERecoveryType;
  restorationCosts?: number;
  height?: number;
  velocity?: number;
  groundWaterLevel?: number;
  groundLevel?: number;
  soil?: ESoil;
  surfaceArea?: number;
  damageCause?: EFoundationDamageCause;
  enforcementTerm?: EEnforcementTerm;
  overallQuality?: EFoundationQuality;
  inquiryType?: EInquiryType;
  foundationType?: EFoundationType;
  foundationTypeReliability?: EReliability;
  drystand?: number;
  drystandReliability: EReliability;
  drystandRisk?: EFoundationRisk;
  dewateringDepth?: number;
  dewateringDepthReliability: EReliability;
  dewateringDepthRisk?: EFoundationRisk;
  bioInfectionReliability: EReliability;
  bioInfectionRisk?: EFoundationRisk;
  unclassifiedRisk?: EFoundationRisk;

  className = 'Analysis'

  // Properties that are enums
  enumProperties = [
    'constructionYearReliability',
    'recoveryType',
    'damageCause',
    'enforcementTerm',
    'overallQuality',
    'inquiryType',
    'foundationType',
    'foundationTypeReliability',
    'drystandReliability',
    'drystandRisk',
    'dewateringDepthReliability',
    'dewateringDepthRisk',
    'bioInfectionRisk',
    'bioInfectionReliability',
    'unclassifiedRisk',
    'soil'
  ]

  constructor(data: IAnalysis) {
    super()

    this.buildingId = data.buildingId;
    this.externalBuildingId = data.externalBuildingId;
    this.addressId = data.addressId;
    this.externalAddressId = data.externalAddressId;
    this.neighborhoodId = data.neighborhoodId;
    this.constructionYear = data.constructionYear;
    this.constructionYearReliability = data.constructionYearReliability;
    this.recoveryType = data.recoveryType;
    this.restorationCosts = data.restorationCosts;
    this.height = data.height;
    this.velocity = data.velocity;
    this.groundWaterLevel = data.groundWaterLevel;
    this.groundLevel = data.groundLevel;
    this.soil = data.soil;
    this.surfaceArea = data.surfaceArea;
    this.damageCause = data.damageCause;
    this.enforcementTerm = data.enforcementTerm;
    this.overallQuality = data.overallQuality;
    this.inquiryType = data.inquiryType;
    this.foundationType = data.foundationType;
    this.foundationTypeReliability = data.foundationTypeReliability;
    this.drystand = data.drystand;
    this.drystandReliability = data.drystandReliability;
    this.drystandRisk = data.drystandRisk;
    this.dewateringDepth = data.dewateringDepth;
    this.dewateringDepthReliability = data.dewateringDepthReliability;
    this.dewateringDepthRisk = data.dewateringDepthRisk;
    this.bioInfectionReliability = data.bioInfectionReliability;
    this.bioInfectionRisk = data.bioInfectionRisk;
    this.unclassifiedRisk = data.unclassifiedRisk;
  }

  // Getter for constructionYearReliability label
  get constructionYearReliabilityLabel(): string {
    return EReliabilityLabels.get(this.constructionYearReliability) || '';
  }

  // Getter for recoveryType label
  get recoveryTypeLabel(): string {
    return (this.recoveryType || this.recoveryType === 0) ? ERecoveryTypeLabels.get(this.recoveryType) || '' : '';
  }

  // Getter for damageCause label
  get damageCauseLabel(): string {
    return (this.damageCause || this.damageCause === 0) ? EFoundationDamageCauseLabels.get(this.damageCause) || '' : '';
  }

  // Getter for enforcementTerm label
  get enforcementTermLabel(): string {
    return (this.enforcementTerm || this.enforcementTerm === 0) ? EEnforcementTermLabels.get(this.enforcementTerm) || '' : '';
  }

  // Getter for overallQuality label
  get overallQualityLabel(): string {
    return (this.overallQuality || this.overallQuality === 0) ? EFoundationQualityLabels.get(this.overallQuality) || '' : '';
  }

  // Getter for inquiryType label
  get inquiryTypeLabel(): string {
    return (this.inquiryType || this.inquiryType === 0) ? EInquiryTypeLabels.get(this.inquiryType) || '' : '';
  }

  // Getter for foundationType label
  get foundationTypeLabel(): string {
    return (this.foundationType || this.foundationType === 0) ? EFoundationTypeLabels.get(this.foundationType) || '' : '';
  }

  // Getter for foundationTypeReliability label
  get foundationTypeReliabilityLabel(): string {
    return (this.foundationTypeReliability || this.foundationTypeReliability === 0) ? EReliabilityLabels.get(this.foundationTypeReliability) || '' : '';
  }

  // Getter for drystandReliability label
  get drystandReliabilityLabel(): string {
    return EReliabilityLabels.get(this.drystandReliability) || '';
  }

  // Getter for drystandRisk label
  get drystandRiskLabel(): string {
    return (this.drystandRisk || this.drystandRisk === 0) ? EFoundationRiskLabels.get(this.drystandRisk) || '' : '';
  }

  // Getter for dewateringDepthReliability label
  get dewateringDepthReliabilityLabel(): string {
    return EReliabilityLabels.get(this.dewateringDepthReliability) || '';
  }

  // Getter for dewateringDepthRisk label
  get dewateringDepthRiskLabel(): string {
    return (this.dewateringDepthRisk || this.dewateringDepthRisk === 0) ? EFoundationRiskLabels.get(this.dewateringDepthRisk) || '' : '';
  }

  // Getter for bioInfectionRisk label
  get bioInfectionRiskLabel(): string {
    return (this.bioInfectionRisk || this.bioInfectionRisk === 0) ? EFoundationRiskLabels.get(this.bioInfectionRisk) || '' : '';
  }

  // Getter for bioInfectionReliability label
  get bioInfectionReliabilityLabel(): string {
    return (this.bioInfectionReliability || this.bioInfectionReliability === 0) ? EReliabilityLabels.get(this.bioInfectionReliability) || '' : '';
  }

  // Getter for unclassifiedRisk label
  get unclassifiedRiskLabel(): string {
    return (this.unclassifiedRisk || this.unclassifiedRisk === 0) ? EFoundationRiskLabels.get(this.unclassifiedRisk) || '' : '';
  }

  // Getter for soil label
  get soilLabel(): string {
    return (this.soil || this.soil === 0) ? ESoilLabels.get(this.soil) || this.soil : '';
  }
}