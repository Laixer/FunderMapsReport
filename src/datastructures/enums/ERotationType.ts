
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/RotationType.cs
export enum ERotationType {
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
  ///     Big.
  /// </summary>
  Big = 3,

  /// <summary>
  ///     Very big.
  /// </summary>
  VeryBig = 4,
}


export const ERotationTypeLabels: Map<ERotationType, string> = new Map([
  [ERotationType.Nil, "Nihil"],
  [ERotationType.Small, "Klein"],
  [ERotationType.Mediocre, "Middelmatig"],
  [ERotationType.Big, "Groot"],
  [ERotationType.VeryBig, "Zeer groot"]
]);

