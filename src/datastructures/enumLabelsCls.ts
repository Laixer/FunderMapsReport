import { EAccessPolicy, 
  EAccessPolicyLabels, 
  EAuditStatus, 
  EAuditStatusLabels, 
  EConstructionPile, 
  EConstructionPileLabels, 
  ECrackType, 
  ECrackTypeLabels, 
  EEnforcementTerm, 
  EEnforcementTermLabels, 
  EEnvironmentDamageCharacteristicsLabels, 
  EEnvironmentDamageCharacteristics, 
  EFacade, 
  EFacadeLabels, 
  EFoundationDamageCause, 
  EFoundationDamageCauseLabels, 
  EFoundationDamageCharacteristicsLabels, 
  EFoundationDamageCharacteristics, 
  EFoundationQuality, 
  EFoundationQualityLabels, 
  EFoundationRisk, 
  EFoundationRiskLabels, 
  EFoundationType, 
  EFoundationTypeLabels, 
  EIncidentQuestionType, 
  EIncidentQuestionTypeLabels, 
  EInquiryType, 
  EInquiryTypeLabels, 
  EPileType, 
  EPileTypeLabels, 
  EQuality, 
  EQualityLabels, 
  ERecoveryDocumentType, 
  ERecoveryDocumentTypeLabels, 
  ERecoveryStatus, 
  ERecoveryStatusLabels, 
  ERecoveryType, 
  ERecoveryTypeLabels, 
  EReliability, 
  EReliabilityLabels, 
  ERotationType, 
  ERotationTypeLabels, 
  ESubstructure, 
  ESubstructureLabels, 
  EWoodEncroachement, 
  EWoodEncroachementLabels, 
  EWoodQuality, 
  EWoodQualityLabels, 
  EWoodType, 
  EWoodTypeLabels 
} from "./enums";

/**
 * ChatGTP figured this was what I wanted when generating classes from interfaces and enums... Not really, but may as well add it.
 */
export class EnumLabels {
  static getEAccessPolicyLabel(value: EAccessPolicy): string {
    return EAccessPolicyLabels.get(value) || '';
  }

  static getEAuditStatusLabel(value: EAuditStatus): string {
    return EAuditStatusLabels.get(value) || '';
  }

  static getEConstructionPileLabel(value: EConstructionPile): string {
    return EConstructionPileLabels.get(value) || '';
  }

  static getECrackTypeLabel(value: ECrackType): string {
    return ECrackTypeLabels.get(value) || '';
  }

  static getEEnforcementTermLabel(value: EEnforcementTerm): string {
    return EEnforcementTermLabels.get(value) || '';
  }

  static getEEnvironmentDamageCharacteristicLabel(value: EEnvironmentDamageCharacteristics): string {
    return EEnvironmentDamageCharacteristicsLabels.get(value) || '';
  }

  static getEFacadeLabel(value: EFacade): string {
    return EFacadeLabels.get(value) || '';
  }

  static getEFoundationDamageCauseLabel(value: EFoundationDamageCause): string {
    return EFoundationDamageCauseLabels.get(value) || '';
  }

  static getEFoundationDamageCharacteristicLabel(value: EFoundationDamageCharacteristics): string {
    return EFoundationDamageCharacteristicsLabels.get(value) || '';
  }

  static getEFoundationQualityLabel(value: EFoundationQuality): string {
    return EFoundationQualityLabels.get(value) || '';
  }

  static getEFoundationRiskLabel(value: EFoundationRisk): string {
    return EFoundationRiskLabels.get(value) || '';
  }

  static getEFoundationTypeLabel(value: EFoundationType): string {
    return EFoundationTypeLabels.get(value) || '';
  }

  static getEIncidentQuestionTypeLabel(value: EIncidentQuestionType): string {
    return EIncidentQuestionTypeLabels.get(value) || '';
  }

  static getEInquiryTypeLabel(value: EInquiryType): string {
    return EInquiryTypeLabels.get(value) || '';
  }

  static getEPileTypeLabel(value: EPileType): string {
    return EPileTypeLabels.get(value) || '';
  }

  static getEQualityLabel(value: EQuality): string {
    return EQualityLabels.get(value) || '';
  }

  static getERecoveryDocumentTypeLabel(value: ERecoveryDocumentType): string {
    return ERecoveryDocumentTypeLabels.get(value) || '';
  }

  static getERecoveryStatusLabel(value: ERecoveryStatus): string {
    return ERecoveryStatusLabels.get(value) || '';
  }

  static getERecoveryTypeLabel(value: ERecoveryType): string {
    return ERecoveryTypeLabels.get(value) || '';
  }

  static getEReliabilityLabel(value: EReliability): string {
    return EReliabilityLabels.get(value) || '';
  }

  static getERotationTypeLabel(value: ERotationType): string {
    return ERotationTypeLabels.get(value) || '';
  }

  static getESubstructureLabel(value: ESubstructure): string {
    return ESubstructureLabels.get(value) || '';
  }

  static getEWoodEncroachementLabel(value: EWoodEncroachement): string {
    return EWoodEncroachementLabels.get(value) || '';
  }

  static getEWoodQualityLabel(value: EWoodQuality): string {
    return EWoodQualityLabels.get(value) || '';
  }

  static getEWoodTypeLabel(value: EWoodType): string {
    return EWoodTypeLabels.get(value) || '';
  }
}