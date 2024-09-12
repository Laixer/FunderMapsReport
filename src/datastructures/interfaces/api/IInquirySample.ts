import { ESubstructure, EFoundationType, EEnforcementTerm, EFoundationDamageCause, EFoundationDamageCharacteristics, EConstructionPile, EWoodType, EWoodEncroachement, EFoundationQuality, EWoodQuality, EQuality, ECrackType, ERotationType } from "@/datastructures/enums";
import { IEnumMethods } from "./util";

export interface IInquirySample extends IEnumMethods {
  identifier: number,
  id: number,
  inquiry: number,
  address: string,
  building: string,
  note?: string,
  builtYear?: string, // DateTime
  substructure?: ESubstructure,
  cpt?: string,
  monitoringWell?: string,
  groundwaterLevelTemp?: number,
  groundLevel?: number,
  groundwaterLevelNet?: number,
  foundationType?: EFoundationType,
  enforcementTerm?: EEnforcementTerm,
  recoveryAdvised?: boolean,
  damageCause?: EFoundationDamageCause,
  damageCharacteristics?: EFoundationDamageCharacteristics,
  constructionPile?: EConstructionPile,
  woodType?: EWoodType,
  woodEncroachement?: EWoodEncroachement,

  constructionLevel?: number,
  woodLevel?: number,
  pileDiameterTop?: number,
  pileDiameterBottom?: number,
  pileHeadLevel?: number,
  pileTipLevel?: number,
  foundationDepth?: number,
  masonLevel?: number,
  concreteChargerLength?: number,
  pileDistanceLength?: number,
  woodPenetrationDepth?: number,

  overallQuality?: EFoundationQuality,
  woodQuality?: EWoodQuality,
  constructionQuality?: EQuality,
  woodCapacityHorizontalQuality?: EQuality,
  pileWoodCapacityVerticalQuality?: EQuality,
  carryingCapacityQuality?: EQuality,
  masonQuality?: EQuality,
  woodQualityNecessity?: boolean,

  crackIndoorRestored?: boolean,
  crackIndoorType?: ECrackType,
  crackIndoorSize?: number,
  crackFacadeFrontRestored?: boolean,
  crackFacadeFrontType?: ECrackType,
  crackFacadeFrontSize?: number,
  crackFacadeBackRestored?: boolean,
  crackFacadeBackType?: ECrackType,
  crackFacadeBackSize?: number,
  crackFacadeLeftRestored?: boolean,
  crackFacadeLeftType?: ECrackType,
  crackFacadeLeftSize?: number,
  crackFacadeRightRestored?: boolean,
  crackFacadeRightType?: ECrackType,
  crackFacadeRightSize?: number,
  deformedFacade?: boolean,
  thresholdUpdownSkewed?: boolean,
  thresholdFrontLevel?: number,
  thresholdBackLevel?: number,
  skewedParallel?: number,
  skewedParallelFacade?: ERotationType,
  skewedPerpendicular?: number,
  skewedPerpendicularFacade?: ERotationType,
  settlementSpeed?: number,
  skewedWindowFrame?: boolean

  // Getter methods for enum labels
  get substructureLabel(): string;
  get foundationTypeLabel(): string;
  get enforcementTermLabel(): string;
  get damageCauseLabel(): string;
  get damageCharacteristicsLabel(): string;
  get constructionPileLabel(): string;
  get woodTypeLabel(): string;
  get woodEncroachementLabel(): string;
  get overallQualityLabel(): string;
  get woodQualityLabel(): string;
  get constructionQualityLabel(): string;
  get woodCapacityHorizontalQualityLabel(): string;
  get pileWoodCapacityVerticalQualityLabel(): string;
  get carryingCapacityQualityLabel(): string;
  get masonQualityLabel(): string;
  get crackIndoorTypeLabel(): string;
  get crackFacadeFrontTypeLabel(): string;
  get crackFacadeBackTypeLabel(): string;
  get crackFacadeLeftTypeLabel(): string;
  get crackFacadeRightTypeLabel(): string;
  get skewedParallelFacadeLabel(): string;
  get skewedPerpendicularFacadeLabel(): string;
}