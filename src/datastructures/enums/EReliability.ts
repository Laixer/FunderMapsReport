
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/Reliability.cs
export enum EReliability {
  /// <summary>
  ///     When our model was used.
  /// </summary>
  Indicative = 0,

  /// <summary>
  ///     When a report is present.
  /// </summary>
  Established = 1,

  /// <summary>
  ///     When building from the same cluster was used.
  /// </summary>
  Cluster = 2,

  /// <summary>
  ///     When building from the same supercluster was used.
  /// </summary>
  Supercluster = 3,
}


export const EReliabilityLabels: Map<EReliability, string> = new Map( [
  [ EReliability.Indicative, "Indicatief" ],
  [ EReliability.Established, "Vastgesteld" ],
  [ EReliability.Cluster, "Afgeleid" ],
  [ EReliability.Supercluster, "Afgeleid" ],
]);