
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/FoundationQuality.cs
export enum EFoundationQuality {
  /// <summary>
  ///     Bad.
  /// </summary>
  Bad = 0,

  /// <summary>
  ///     Mediocre.
  /// </summary>
  Mediocre = 1,

  /// <summary>
  ///     Tolerable.
  /// </summary>
  Tolerable = 2,

  /// <summary>
  ///     Good.
  /// </summary>
  Good = 3,

  /// <summary>
  ///     Mediocre good.
  /// </summary>
  MediocreGood = 4,

  /// <summary>
  ///     Mediocre bad.
  /// </summary>
  MediocreBad = 5,
}


export const EFoundationQualityLabels: Map<EFoundationQuality, string> = new Map([
  [EFoundationQuality.Bad, "Slecht"],
  [EFoundationQuality.Mediocre, "Matig"],
  [EFoundationQuality.Tolerable, "Redelijk"],
  [EFoundationQuality.Good, "Goed"],
  [EFoundationQuality.MediocreGood, "Matig tot goed"],
  [EFoundationQuality.MediocreBad, "Matig tot slecht"]
]);