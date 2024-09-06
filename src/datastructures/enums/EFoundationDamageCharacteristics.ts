

export enum EFoundationDamageCharacteristics {
  /// <summary>
  ///     Jamming door window.
  /// </summary>
  JammingDoorWindow = 0,

  /// <summary>
  ///     Crack.
  /// </summary>
  Crack = 1,

  /// <summary>
  ///     Skewed.
  /// </summary>
  Skewed = 2,

  /// <summary>
  ///     Crawlspace flooding.
  /// </summary>
  CrawlspaceFlooding = 3,

  /// <summary>
  ///     Threshold above subsurface.
  /// </summary>
  ThresholdAboveSubsurface = 4,

  /// <summary>
  ///     Threshold below subsurface.
  /// </summary>
  ThresholdBelowSubsurface = 5,

  /// <summary>
  ///     Crooked floor wall.
  /// </summary>
  CrookedFloorWall = 6,
}

export const EFoundationDamageCharacteristicsLabels: Map<EFoundationDamageCharacteristics, string> = new Map([
  [EFoundationDamageCharacteristics.JammingDoorWindow, "Klemmende deuren en ramen"],
  [EFoundationDamageCharacteristics.Crack, "Scheuren"],
  [EFoundationDamageCharacteristics.Skewed, "Scheefstand"],
  [EFoundationDamageCharacteristics.CrawlspaceFlooding, "Water in kruipruimte"],
  [EFoundationDamageCharacteristics.ThresholdAboveSubsurface, "Drempel boven maaiveld"],
  [EFoundationDamageCharacteristics.ThresholdBelowSubsurface, "Drempel onder maaiveld"],
  [EFoundationDamageCharacteristics.CrookedFloorWall, "Scheve vloer of wand"]
]);