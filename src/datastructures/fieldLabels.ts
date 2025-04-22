/**
 * All fieldlabels by fieldname as defined in excels from https://github.com/Laixer/FunderMapsWebFront/issues/2
 * 
 * All fieldlabels are provided per endpoint / class, as one combined set (with overlap!) and grouped by associated class name
 */

export const addressFieldLabels = <Record<string, string>>{
  fullAddress: 'Adres',
  postalCode: 'Postcode',
  buildingNumber: 'Nummeraanduiding'
}
export const buildingFieldLabels = <Record<string, string>>{
  externalId: 'BAG Pand ID'
}
export const neighborhoodFieldLabels = <Record<string, string>>{
  name: 'Buurt'
}
export const districtFieldLabels = <Record<string, string>>{
  name: 'Wijk'
}
export const municipalityFieldLabels = <Record<string, string>>{
  name: 'Gemeente'
}
export const stateFieldLabels = <Record<string, string>>{
  name: 'Provincie'
}

export const locationFieldLabels = <Record<string, string>>{

}

export const analysisFieldLabels = <Record<string, string>>{
  constructionYear: "Bouwjaar",
  constructionYearReliability: "Betrouwbaarheid bouwjaar",
  surfaceArea: "Vloeroppervlak",
  volume: "Inhoud", // TODO: missing fieldName E15
  height: "Pandhoogte",
  groundWaterLevel: "Grondwaterstand volgens landelijk watermodel",
  groundLevel: "Maaiveldniveau voor pand",
  soil: "Type ondergrond",
  foundationType: "Type fundering",
  foundationTypeReliability: "Betrouwbaarheid funderingstype",
  restorationCosts: "Indicatieve funderingsherstel kosten",
  velocity: "Pandzakkingsnelheid (InSAR)",
  drystandRisk: "Droogstandrisico",
  drystand: "Droogstand",
  drystandReliability: "Betrouwbaarheid droogstandsrisico",
  dewateringDepthRisk: "Ontwateringsdiepte risico",
  dewateringDepth: "Ontwateringsdiepte",
  dewateringDepthReliability: "Betrouwbaarheid ontwateringsdiepte",
  bioInfectionRisk: "Bacterieelaantatsing risico",
  bioInfectionReliability: "Betrouwbaarheid bacteriële aantasting",
  negativeclingRisk: "Negatieve kleef risico",
  negativeclingReliability: "Betrouwbaarheid Negatieve kleef",
  differentialsettlementRisk: "Verschilzakking risico",
  differentialsettlementReliability: "Betrouwbaarheid Verschilzakking",
  unclassifiedRisk: "Vastgesteld",
  facadescanRisk: "Risico GevelScan"
}

export const recoveryFieldLabels = <Record<string, string>>{
  documentName: "Documentnaam",
  id: "Onderzoeksnummer",
  type: "Type bewijslast",
  note: "Opmerking",
  auditStatus: "Controle status",
}

export const AttributionControlFieldLabels = <Record<string, string>>{
  contractor: "Uitvoerder",
  owner: "Opdrachtgever",
  creator: "Verwerkt door",
  reviewer: "Gecontroleerd door",
  contractorName: "Uitvoerder",
  ownerName: "Opdrachtgever",
  creatorName: "Verwerkt door",
  reviewerName: "Gecontroleerd door"
}

export const StateControlFieldLabels = <Record<string, string>>{
  auditStatus: 'Controlestatus'
}

export const recoverySampleFieldLabels = <Record<string, string>>{
  // recovery: "Type herstel",
  recovery: 'Onderzoeksnummer',
  type: "Methode herstel",
  pileType: "Paaltype",
  status: "Status herstel",
  note: "Opmerking",
  contractor: "Uitvoerder",
  facade: "Herstelde gevel",
  permit: "Vergunningsnummer",
  permitDate: "Vergunningsdatum",
  recoveryDate: "Datum herstel",
  id: 'Herstelnummer'
}

export const inquiryFieldLabels = <Record<string, string>>{
  documentName: "Documentnaam",
  id: "Onderzoeksnummer",
  type: "Onderzoekstype",
  documentDate: "Documentdatum",
  contractor: "Uitvoerder",
  owner: "Opdrachtgever",
  creator: "Verwerkt door",
  reviewer: "Gecontroleerd door",
  auditStatus: "Controlestatus",
  standardF3o: "Conform KCAF/F3o uitgevoerd?",
  inspection: "Inspectieput gemaakt?",
  jointMeasurement: "Lintvoegmeting uitgevoerd?",
  floorMeasurement: "Vloerveldwaterpassing uitgevoerd?",
  note: "Opmerking"
}

export const inquirySampleFieldLabels = <Record<string, string>>{
  address: 'Adres ID',
  building: 'Pand ID',

  foundationType: "Type fundering",
  recoveryAdvised: "Funderingsherstel advies",

  note: "Opmerking",
  builtYear: "Bouwjaar volgens onderzoek",
  substructure: "Onderbouw",
  cpt: "Sondering",
  groundLevel: "Maaiveldniveau (uit onderzoek)",
  groundwaterLevelNet: "Grondwaterstand (uit peilbuis)",
  monitoringWell: "Peilbuis",
  groundwaterLevelTemp: "Grondwaterniveau bij ontgraving",
  enforcementTerm: "Handhavingstermijn",
  damageCause: "Oorzaak funderingsschade",
  overallQuality: "Totale funderingskwaliteit",
  damageCharacteristics: "Geconstateerde schade",
  pileHeadLevel: "Paalkop niveau",
  pileDiameterTop: "Paalkop diameter",
  pileDistanceLength: "Hart-op-hart afstand",
  pileTipLevel: "Paalpunt niveau",
  pileDiameterBottom: "Paalpunt diameter",
  concreteChargerLength: "Oplanger lengte",
  woodType: "Houtsoort",
  woodPenetrationDepth: "Inslagdiepte",
  woodQuality: "Houtkwaliteit paal",
  carryingCapacityQuality: "Resterende draagkracht paal",
  woodEncroachement: "Houtaantasting",
  pileWoodCapacityVerticalQuality: "Kwaliteit draagkracht paal",
  woodQualityNecessity: "Noodzaak houtonderzoek",
  constructionType: "Materiaal funderingsbalk",
  woodCapacityHorizontalQuality: "Horizontale draagkracht paal",
  constructionQuality: "Funderingsbalk",
  foundationDepth: "Fundeirngsnsniveau",
  constructionLevel: "Niveau onderkant funderingsbalk",
  woodLevel: "Niveau bovenkant langshout",
  masonLevel: "Niveau onderkant metselwerk",
  masonQuality: "Kwaliteit metselwerk",
  constructionPile: "Constructie paal",
  settlementSpeed: "Pandzakkingsnelheid gemeten",
  deformedFacade: "Gevel vervormd",
  skewedParallelFacade: "Lintvoegmeting beoordeling",
  skewedParallel: "Lintvoegmeting",
  thresholdFrontLevel: "Drempel voorgevel niveau",
  skewedWindowFrame: "Scheve deur- en/of raamkozijn",
  thresholdUpdownSkewed: "Ongelijkmatige zakking?",
  skewedPerpendicularFacade: "Loodmeting beoordeling",
  skewedPerpendicular: "Loodmeting",
  thresholdBackLevel: "Drempel achtergevel niveau",
  crackIndoorRestored: "Hersteld",
  crackIndoorType: "Type",
  crackIndoorSize: "Scheur",
  crackFacadeFrontRestored: "Hersteld",
  crackFacadeFrontType: "Type",
  crackFacadeFrontSize: "Scheur",
  crackFacadeBackRestored: "Hersteld",
  crackFacadeBackType: "Type",
  crackFacadeBackSize: "Scheur",
  crackFacadeLeftRestored: "Hersteld",
  crackFacadeLeftType: "Type",
  crackFacadeLeftSize: "Scheur",
  crackFacadeRightRestored: "Hersteld",
  crackFacadeRightType: "Type",
  crackFacadeRightSize: "Scheur"
}

export const statisticsFieldLabels = <Record<string, string>>{
  // TODO: missing field names E134 - E138
  // TODO: Typo in F135: fundeirngstypes => funderingstypes
  /**
   Verhouding aantal soorten fundeirngstypes in de buurt
Verhouding aantal bouwjaar verloop in de buurt
Verhouding aantal soorten risico's in de buurt
Aantal incidenten in buurt naar jaar
Aantal onderzoeken in buurt naar jaar
   */
}

export const riskFieldLabels = <Record<string, string>>{
  drystandRisk: "Droogstandrisico",
  drystand: "Droogstand",
  drystandReliability: "Betrouwbaarheid droogstandsrisico",
  dewateringDepthRisk: "Ontwateringsdiepte risico",
  dewateringDepth: "Ontwateringsdiepte",
  dewateringDepthReliability: "Betrouwbaarheid ontwateringsdiepte",
  bioInfectionRisk: "Bacterieelaantatsing risico",
  bioInfectionReliability: "Betrouwbaarheid Bacterieel aantasting", // TODO: Typo in F150
  // TODO: Missing field names: E152 - 156
  unclassifiedRisk: "Vastgesteld"
}

export const indicentFieldLabels = <Record<string, string>>{
  id: "Nummer",
  address: "Adres",
  building: "BAG Pand ID",
  clientId: "Meldingsloket",
  clientName: "Meldingsloket",
  createDate: "Meldingsdatum",
  foundationType: "Funderingstype",
  chainedBuilding: "Geschakelde bouw",
  owner: "Eigenaar",
  foundationRecovery: "Herstel uitgevoerd?",
  neighborRecovery: "Herstel uitgevoerd bij buren?",
  foundationDamageCause: "Vermoedelijke schade oorzaak",
  note: "Opmerking",
  name: "Naam melder",
  phoneNumber: "Telefoon melder",
  email: "Email melder",
  foundationDamageCharacteristics: "Schade oorzaken",
  environmentDamageCharacteristics: "Omgevingsaspecten",
  auditStatus: "Controle status",
  documentFile: "Link naar documenten",
  internalNote: "Interne opmerking",
  questionType: "Vraag type"
}

/**
 * All field labels put together. 
 *  NOTE: There is overlap! 
 */
export const fieldLabels = Object.assign(
  analysisFieldLabels,
  addressFieldLabels,
  buildingFieldLabels,
  neighborhoodFieldLabels,
  districtFieldLabels,
  municipalityFieldLabels,
  stateFieldLabels,
  locationFieldLabels,
  AttributionControlFieldLabels,
  StateControlFieldLabels,
  recoveryFieldLabels,
  recoverySampleFieldLabels,
  inquiryFieldLabels,
  inquirySampleFieldLabels,
  statisticsFieldLabels,
  riskFieldLabels,
  indicentFieldLabels
)

/**
 * Field labels grouped by source class name 
 */
export const fieldLabelsBySource = <Record<string, Record<string, string>>>{
  'Analysis': analysisFieldLabels,

  'Location': locationFieldLabels,
  'Address': addressFieldLabels,
  'Building': buildingFieldLabels,
  'Neighborhood': neighborhoodFieldLabels,
  'District': districtFieldLabels,
  'Municipality': municipalityFieldLabels,
  'State': stateFieldLabels,

  'AttributionControl': AttributionControlFieldLabels,
  'StateControl': StateControlFieldLabels,
  'RecoveryReport': recoveryFieldLabels,
  'RecoverySample': recoverySampleFieldLabels,

  'Inquiry': inquiryFieldLabels,
  'InquirySample': inquirySampleFieldLabels,
  'stat': statisticsFieldLabels, // TODO: 
  'risk': riskFieldLabels, // TODO: 
  'IncidentReport': indicentFieldLabels
}

