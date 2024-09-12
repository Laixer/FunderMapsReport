

// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/ConstructionPile.cs
export enum EConstructionPile {
  /// <summary>
  ///     Punched.
  /// </summary>
  Punched = 0,

  /// <summary>
  ///     Broken.
  /// </summary>
  Broken = 1,

  /// <summary>
  ///     Pinched.
  /// </summary>
  Pinched = 2,

  /// <summary>
  ///     Pressed.
  /// </summary>
  Pressed = 3,

  /// <summary>
  ///     Perished.
  /// </summary>
  Perished = 4,

  /// <summary>
  ///     Decay.
  /// </summary>
  Decay = 5,

  /// <summary>
  ///     Root growth.
  /// </summary>
  RootGrowth = 6,
}


export const EConstructionPileLabels: Map<EConstructionPile, string> = new Map([
  [EConstructionPile.Punched, "Geperforeerd"],
  [EConstructionPile.Broken, "Gebroken"],
  [EConstructionPile.Pinched, "Verschoven"],
  [EConstructionPile.Pressed, "Gedrukt"],
  [EConstructionPile.Perished, "Vergaan"],
  [EConstructionPile.Decay, "Verrot"],
  [EConstructionPile.RootGrowth, "Wortelgroei"]
]);

