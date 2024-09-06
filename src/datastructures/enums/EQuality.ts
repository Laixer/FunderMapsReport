
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/Quality.cs
export enum EQuality {
  /// <summary>
  ///     Nil.
  /// </summary>
  Nil = 0,

  /// <summary>
  ///     Small.
  /// </summary>
  Small = 1,

  /// <summary>
  ///     Mediocre.
  /// </summary>
  Mediocre = 2,

  /// <summary>
  ///     Large.
  /// </summary>
  Large = 3,
}


export const EQualityLabels: Map<EQuality, string> = new Map([
  [EQuality.Nil, "Slecht"],
  [EQuality.Small, "Redelijk"],
  [EQuality.Mediocre, "Goed"],
  [EQuality.Large, "Zeer goed"]
]);

