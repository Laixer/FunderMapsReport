
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/CrackType.cs
export enum ECrackType {
  /// <summary>
  ///     None.
  /// </summary>
  None = 0,

  /// <summary>
  ///     Nil.
  /// </summary>
  Nil = 1,

  /// <summary>
  ///     Small.
  /// </summary>
  Small = 2,

  /// <summary>
  ///     Mediocre.
  /// </summary>
  Mediocre = 3,

  /// <summary>
  ///     Big.
  /// </summary>
  Big = 4,
}


export const ECrackTypeLabels: Map<ECrackType, string> = new Map([
  [ECrackType.None, "Geen"],
  [ECrackType.Nil, "Zeer klein (haarscheuren)"],
  [ECrackType.Small, "Klein (0,5 - 1 mm)"],
  [ECrackType.Mediocre, "Matig (1 - 3 mm)"],
  [ECrackType.Big, "Groot (> 3 mm)"]
]);

