

// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/Substructure.cs
export enum ESubstructure {
  /// <summary>
  ///     Cellar.
  /// </summary>
  Cellar = 0,

  /// <summary>
  ///     Basement.
  /// </summary>
  Basement = 1,

  /// <summary>
  ///     Crawlspace.
  /// </summary>
  Crawlspace = 2,

  /// <summary>
  ///     None.
  /// </summary>
  None = 3,
}


export const ESubstructureLabels: Map<ESubstructure, string> = new Map([
  [ESubstructure.Cellar, "Kelder"],
  [ESubstructure.Basement, "Souterrain"],
  [ESubstructure.Crawlspace, "Kruipruimte"],
  [ESubstructure.None, "Geen"]
]);

