
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/FoundationDamageCause.cs
export enum EFoundationDamageCause {
  /// <summary>
  ///     Drainage.
  /// </summary>
  Drainage = 0,

  /// <summary>
  ///     Construction flaw.
  /// </summary>
  ConstructionFlaw = 1,

  /// <summary>
  ///     Drystand.
  /// </summary>
  Drystand = 2,

  /// <summary>
  ///     Overcharge.
  /// </summary>
  Overcharge = 3,

  /// <summary>
  ///     Overcharge and negative cling.
  /// </summary>
  OverchargeNegativeCling = 4,

  /// <summary>
  ///     Negative cling.
  /// </summary>
  NegativeCling = 5,

  /// <summary>
  ///     Bio infection.
  /// </summary>
  BioInfection = 6,

  /// <summary>
  ///     Fungus infection.
  /// </summary>
  FungusInfection = 8,

  /// <summary>
  ///     Bio and fungus infection.
  /// </summary>
  BioFungusInfection = 9,

  /// <summary>
  ///     Foundation flaw.
  /// </summary>
  FoundationFlaw = 10,

  /// <summary>
  ///     Construnction heave.
  /// </summary>
  ConstructionHeave = 11,

  /// <summary>
  ///     Subsidence.
  /// </summary>
  Subsidence = 12,

  /// <summary>
  ///     Vegetation.
  /// </summary>
  Vegetation = 13,

  /// <summary>
  ///     Gas.
  /// </summary>
  Gas = 14,

  /// <summary>
  ///     Vibrations.
  /// </summary>
  Vibrations = 15,

  /// <summary>
  ///     Foundation was partially recovered.
  /// </summary>
  PartialFoundationRecovery = 16,

  /// <summary>
  ///     Damage due japanese knotweed.
  /// </summary>
  JapanseKnotweed = 17,

  /// <summary>
  ///     Groundwater level reduction.
  /// </summary>
  GroundwaterLevelReduction = 18,
}


/**
 * Labels for user friendly presentation
 */
export const EFoundationDamageCauseLabels: Map<EFoundationDamageCause, string> = new Map([
  [EFoundationDamageCause.Drainage, "Te lage grondwaterstand"],
  [EFoundationDamageCause.ConstructionFlaw, "Constructiefouten"],
  [EFoundationDamageCause.Drystand, "Droogstand houten paalkop"],
  [EFoundationDamageCause.Overcharge, "Overbelasting"],
  [EFoundationDamageCause.OverchargeNegativeCling, "Overbelastingen / of negatievekleef"],
  [EFoundationDamageCause.NegativeCling, "Negatievekleef"],
  [EFoundationDamageCause.BioInfection, "Bacterieleaantasting (palenpest)"],
  [EFoundationDamageCause.FungusInfection, "Schimmelaantasting (paalrot)"],
  [EFoundationDamageCause.BioFungusInfection, "Bacterieleen / of schimmelaantasting"],
  [EFoundationDamageCause.FoundationFlaw, "Funderingsfouten"],
  [EFoundationDamageCause.ConstructionHeave, "Opdrukking pand"],
  [EFoundationDamageCause.Subsidence, "Verzakking"],
  [EFoundationDamageCause.Vegetation, "Beschadiging fundering door planten en wortels"],
  [EFoundationDamageCause.Gas, "Gaswinning"],
  [EFoundationDamageCause.Vibrations, "Trillingen"],
  [EFoundationDamageCause.PartialFoundationRecovery, "Partieel funderingsherstel"],
  [EFoundationDamageCause.JapanseKnotweed, "Beschadiging fundering door japanse duizendknoop"],
  [EFoundationDamageCause.GroundwaterLevelReduction, "Verlaging van grondwaterniveau"]
]);