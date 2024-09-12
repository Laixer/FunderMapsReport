
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/EnvironmentDamageCharacteristics.cs
export enum EEnvironmentDamageCharacteristics {
  /// <summary>
  ///     Subsidence.
  /// </summary>
  Subsidence = 0,

  /// <summary>
  ///     Sagging cewer connections.
  /// </summary>
  SaggingSewerConnection = 1,

  /// <summary>
  ///     Sagging cables and pipes.
  /// </summary>
  SaggingCablesPipes = 2,

  /// <summary>
  ///     Flooding.
  /// </summary>
  Flooding = 3,

  /// <summary>
  ///     Foundation damage nearby.
  /// </summary>
  FoundationDamageNearby = 4,

  /// <summary>
  ///     Elevation.
  /// </summary>
  Elevation = 5,

  /// <summary>
  ///     Increasing traffic.
  /// </summary>
  IncreasingTraffic = 6,

  /// <summary>
  ///     Construction nearby.
  /// </summary>
  ConstructionNearby = 7,

  /// <summary>
  ///     Vegetation nearby.
  /// </summary>
  VegetationNearby = 8,

  /// <summary>
  ///     Sewage leakage.
  /// </summary>
  SewageLeakage = 9,

  /// <summary>
  ///     Low ground water.
  /// </summary>
  LowGroundWater = 10,
}

export const EEnvironmentDamageCharacteristicsLabels: Map<EEnvironmentDamageCharacteristics, string> = new Map([
  [EEnvironmentDamageCharacteristics.Subsidence, "Bodemdaling"],
  [EEnvironmentDamageCharacteristics.SaggingSewerConnection, "Verzakkend riool"],
  [EEnvironmentDamageCharacteristics.SaggingCablesPipes, "Verzakkende kabels/leidingen"],
  [EEnvironmentDamageCharacteristics.Flooding, "Wateroverlast"],
  [EEnvironmentDamageCharacteristics.FoundationDamageNearby, "Funderingschade in wijk"],
  [EEnvironmentDamageCharacteristics.Elevation, "Recent opgehoogd"],
  [EEnvironmentDamageCharacteristics.IncreasingTraffic, "Verkeerstoename"],
  [EEnvironmentDamageCharacteristics.ConstructionNearby, "Werkzaamheden in wijk"],
  [EEnvironmentDamageCharacteristics.VegetationNearby, "Bomen nabij"],
  [EEnvironmentDamageCharacteristics.SewageLeakage, "Lekkend riool"],
  [EEnvironmentDamageCharacteristics.LowGroundWater, "Wateronderlast"]
]);