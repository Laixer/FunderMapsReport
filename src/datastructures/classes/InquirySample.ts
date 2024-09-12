
import { ESubstructure, EFoundationType, EEnforcementTerm, EFoundationDamageCause, EFoundationDamageCharacteristics, EConstructionPile, EWoodType, EWoodEncroachement, EFoundationQuality, EWoodQuality, EQuality, ECrackType, ERotationType, EFoundationQualityLabels, EWoodQualityLabels, EQualityLabels, ECrackTypeLabels, ERotationTypeLabels, ESubstructureLabels, EFoundationTypeLabels, EConstructionPileLabels, EEnforcementTermLabels, EFoundationDamageCauseLabels, EFoundationDamageCharacteristicsLabels, EWoodEncroachementLabels, EWoodTypeLabels } from "../enums";
import { IInquirySample } from "../interfaces";
import { EnumMethods } from "./EnumMethods";

export class InquirySample extends EnumMethods implements IInquirySample {

  // Properties from the interface
  identifier!: number;
  id!: number;
  inquiry: number;
  address!: string;
  building: string;
  note?: string;
  builtYear?: string;
  substructure?: ESubstructure;
  cpt?: string;
  monitoringWell?: string;
  groundwaterLevelTemp?: number;
  groundLevel?: number;
  groundwaterLevelNet?: number;
  foundationType?: EFoundationType;
  enforcementTerm?: EEnforcementTerm;
  recoveryAdvised?: boolean;
  damageCause?: EFoundationDamageCause;
  damageCharacteristics?: EFoundationDamageCharacteristics;
  constructionPile?: EConstructionPile;
  woodType?: EWoodType;
  woodEncroachement?: EWoodEncroachement;
  constructionLevel?: number;
  woodLevel?: number;
  pileDiameterTop?: number;
  pileDiameterBottom?: number;
  pileHeadLevel?: number;
  pileTipLevel?: number;
  foundationDepth?: number;
  masonLevel?: number;
  concreteChargerLength?: number;
  pileDistanceLength?: number;
  woodPenetrationDepth?: number;
  overallQuality?: EFoundationQuality;
  woodQuality?: EWoodQuality;
  constructionQuality?: EQuality;
  woodCapacityHorizontalQuality?: EQuality;
  pileWoodCapacityVerticalQuality?: EQuality;
  carryingCapacityQuality?: EQuality;
  masonQuality?: EQuality;
  woodQualityNecessity?: boolean;
  crackIndoorRestored?: boolean;
  crackIndoorType?: ECrackType;
  crackIndoorSize?: number;
  crackFacadeFrontRestored?: boolean;
  crackFacadeFrontType?: ECrackType;
  crackFacadeFrontSize?: number;
  crackFacadeBackRestored?: boolean;
  crackFacadeBackType?: ECrackType;
  crackFacadeBackSize?: number;
  crackFacadeLeftRestored?: boolean;
  crackFacadeLeftType?: ECrackType;
  crackFacadeLeftSize?: number;
  crackFacadeRightRestored?: boolean;
  crackFacadeRightType?: ECrackType;
  crackFacadeRightSize?: number;
  deformedFacade?: boolean;
  thresholdUpdownSkewed?: boolean;
  thresholdFrontLevel?: number;
  thresholdBackLevel?: number;
  skewedParallel?: number;
  skewedParallelFacade?: ERotationType;
  skewedPerpendicular?: number;
  skewedPerpendicularFacade?: ERotationType;
  settlementSpeed?: number;
  skewedWindowFrame?: boolean;

  className = 'InquirySample'

  constructor(data: IInquirySample) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.inquiry = data.inquiry;
    this.address = data.address;
    this.building = data.building;
    this.note = data.note;
    this.builtYear = data.builtYear;
    this.substructure = data.substructure;
    this.cpt = data.cpt;
    this.monitoringWell = data.monitoringWell;
    this.groundwaterLevelTemp = data.groundwaterLevelTemp;
    this.groundLevel = data.groundLevel;
    this.groundwaterLevelNet = data.groundwaterLevelNet;
    this.foundationType = data.foundationType;
    this.enforcementTerm = data.enforcementTerm;
    this.recoveryAdvised = data.recoveryAdvised;
    this.damageCause = data.damageCause;
    this.damageCharacteristics = data.damageCharacteristics;
    this.constructionPile = data.constructionPile;
    this.woodType = data.woodType;
    this.woodEncroachement = data.woodEncroachement;
    this.constructionLevel = data.constructionLevel;
    this.woodLevel = data.woodLevel;
    this.pileDiameterTop = data.pileDiameterTop;
    this.pileDiameterBottom = data.pileDiameterBottom;
    this.pileHeadLevel = data.pileHeadLevel;
    this.pileTipLevel = data.pileTipLevel;
    this.foundationDepth = data.foundationDepth;
    this.masonLevel = data.masonLevel;
    this.concreteChargerLength = data.concreteChargerLength;
    this.pileDistanceLength = data.pileDistanceLength;
    this.woodPenetrationDepth = data.woodPenetrationDepth;
    this.overallQuality = data.overallQuality;
    this.woodQuality = data.woodQuality;
    this.constructionQuality = data.constructionQuality;
    this.woodCapacityHorizontalQuality = data.woodCapacityHorizontalQuality;
    this.pileWoodCapacityVerticalQuality = data.pileWoodCapacityVerticalQuality;
    this.carryingCapacityQuality = data.carryingCapacityQuality;
    this.masonQuality = data.masonQuality;
    this.woodQualityNecessity = data.woodQualityNecessity;
    this.crackIndoorRestored = data.crackIndoorRestored;
    this.crackIndoorType = data.crackIndoorType;
    this.crackIndoorSize = data.crackIndoorSize;
    this.crackFacadeFrontRestored = data.crackFacadeFrontRestored;
    this.crackFacadeFrontType = data.crackFacadeFrontType;
    this.crackFacadeFrontSize = data.crackFacadeFrontSize;
    this.crackFacadeBackRestored = data.crackFacadeBackRestored;
    this.crackFacadeBackType = data.crackFacadeBackType;
    this.crackFacadeBackSize = data.crackFacadeBackSize;
    this.crackFacadeLeftRestored = data.crackFacadeLeftRestored;
    this.crackFacadeLeftType = data.crackFacadeLeftType;
    this.crackFacadeLeftSize = data.crackFacadeLeftSize;
    this.crackFacadeRightRestored = data.crackFacadeRightRestored;
    this.crackFacadeRightType = data.crackFacadeRightType;
    this.crackFacadeRightSize = data.crackFacadeRightSize;
    this.deformedFacade = data.deformedFacade;
    this.thresholdUpdownSkewed = data.thresholdUpdownSkewed;
    this.thresholdFrontLevel = data.thresholdFrontLevel;
    this.thresholdBackLevel = data.thresholdBackLevel;
    this.skewedParallel = data.skewedParallel;
    this.skewedParallelFacade = data.skewedParallelFacade;
    this.skewedPerpendicular = data.skewedPerpendicular;
    this.skewedPerpendicularFacade = data.skewedPerpendicularFacade;
    this.settlementSpeed = data.settlementSpeed;
    this.skewedWindowFrame = data.skewedWindowFrame;
  }

  // Array containing enum properties
  enumProperties = [
    'substructure',
    'foundationType',
    'enforcementTerm',
    'damageCause',
    'damageCharacteristics',
    'constructionPile',
    'woodType',
    'woodEncroachement',
    'overallQuality',
    'woodQuality',
    'constructionQuality',
    'woodCapacityHorizontalQuality',
    'pileWoodCapacityVerticalQuality',
    'carryingCapacityQuality',
    'masonQuality',
    'crackIndoorType',
    'crackFacadeFrontType',
    'crackFacadeBackType',
    'crackFacadeLeftType',
    'crackFacadeRightType',
    'skewedParallelFacade',
    'skewedPerpendicularFacade'
  ];

  // Getters for enum labels
  get substructureLabel(): string {
    return (this.substructure || this.substructure === 0) ? (ESubstructureLabels.get(this.substructure) || '') : '';
  }
  
  get foundationTypeLabel(): string {
    return (this.foundationType || this.foundationType === 0) ? (EFoundationTypeLabels.get(this.foundationType) || '') : '';
  }
  
  get enforcementTermLabel(): string {
    return (this.enforcementTerm || this.enforcementTerm === 0) ? (EEnforcementTermLabels.get(this.enforcementTerm) || '') : '';
  }
  
  get damageCauseLabel(): string {
    return (this.damageCause || this.damageCause === 0) ? (EFoundationDamageCauseLabels.get(this.damageCause) || '') : '';
  }
  
  get damageCharacteristicsLabel(): string {
    return (this.damageCharacteristics || this.damageCharacteristics === 0) ? (EFoundationDamageCharacteristicsLabels.get(this.damageCharacteristics) || '') : '';
  }
  
  get constructionPileLabel(): string {
    return (this.constructionPile || this.constructionPile === 0) ? (EConstructionPileLabels.get(this.constructionPile) || '') : '';
  }
  
  get woodTypeLabel(): string {
    return (this.woodType || this.woodType === 0) ? (EWoodTypeLabels.get(this.woodType) || '') : '';
  }
  
  get woodEncroachementLabel(): string {
    return (this.woodEncroachement || this.woodEncroachement === 0) ? (EWoodEncroachementLabels.get(this.woodEncroachement) || '') : '';
  }
  
  get overallQualityLabel(): string {
    return (this.overallQuality || this.overallQuality === 0) ? (EFoundationQualityLabels.get(this.overallQuality) || '') : '';
  }
  
  get woodQualityLabel(): string {
    return (this.woodQuality || this.woodQuality === 0) ? (EWoodQualityLabels.get(this.woodQuality) || '') : '';
  }
  
  get constructionQualityLabel(): string {
    return (this.constructionQuality || this.constructionQuality === 0) ? (EQualityLabels.get(this.constructionQuality) || '') : '';
  }
  
  get woodCapacityHorizontalQualityLabel(): string {
    return (this.woodCapacityHorizontalQuality || this.woodCapacityHorizontalQuality === 0) ? (EQualityLabels.get(this.woodCapacityHorizontalQuality) || '') : '';
  }
  
  get pileWoodCapacityVerticalQualityLabel(): string {
    return (this.pileWoodCapacityVerticalQuality || this.pileWoodCapacityVerticalQuality === 0) ? (EQualityLabels.get(this.pileWoodCapacityVerticalQuality) || '') : '';
  }
  
  get carryingCapacityQualityLabel(): string {
    return (this.carryingCapacityQuality || this.carryingCapacityQuality === 0) ? (EQualityLabels.get(this.carryingCapacityQuality) || '') : '';
  }
  
  get masonQualityLabel(): string {
    return (this.masonQuality || this.masonQuality === 0) ? (EQualityLabels.get(this.masonQuality) || '') : '';
  }
  
  get crackIndoorTypeLabel(): string {
    return (this.crackIndoorType || this.crackIndoorType === 0) ? (ECrackTypeLabels.get(this.crackIndoorType) || '') : '';
  }
  
  get crackFacadeFrontTypeLabel(): string {
    return (this.crackFacadeFrontType || this.crackFacadeFrontType === 0) ? (ECrackTypeLabels.get(this.crackFacadeFrontType) || '') : '';
  }
  
  get crackFacadeBackTypeLabel(): string {
    return (this.crackFacadeBackType || this.crackFacadeBackType === 0) ? (ECrackTypeLabels.get(this.crackFacadeBackType) || '') : '';
  }
  
  get crackFacadeLeftTypeLabel(): string {
    return (this.crackFacadeLeftType || this.crackFacadeLeftType === 0) ? (ECrackTypeLabels.get(this.crackFacadeLeftType) || '') : '';
  }
  
  get crackFacadeRightTypeLabel(): string {
    return (this.crackFacadeRightType || this.crackFacadeRightType === 0) ? (ECrackTypeLabels.get(this.crackFacadeRightType) || '') : '';
  }
  
  get skewedParallelFacadeLabel(): string {
    return (this.skewedParallelFacade || this.skewedParallelFacade === 0) ? (ERotationTypeLabels.get(this.skewedParallelFacade) || '') : '';
  }
  
  get skewedPerpendicularFacadeLabel(): string {
    return (this.skewedPerpendicularFacade || this.skewedPerpendicularFacade === 0) ? (ERotationTypeLabels.get(this.skewedPerpendicularFacade) || '') : '';
  }
}