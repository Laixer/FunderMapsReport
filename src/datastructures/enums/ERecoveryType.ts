
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/RecoveryType.cs
export enum ERecoveryType {
  /// <summary>
  ///     Table.
  /// </summary>
  Table = 0,

  /// <summary>
  ///     Beam on pile.
  /// </summary>
  BeamOnPile = 1,

  /// <summary>
  ///     Pile lowering.
  /// </summary>
  PileLowering = 2,

  /// <summary>
  ///     Pile in wall.
  /// </summary>
  PileInWall = 3,

  /// <summary>
  ///     Injection.
  /// </summary>
  Injection = 4,

  /// <summary>
  ///     Unknown.
  /// </summary>
  Unknown = 5,
}


export const ERecoveryTypeLabels: Map<ERecoveryType, string> = new Map([
  [ERecoveryType.Table, "Tafelfundering"],
  [ERecoveryType.BeamOnPile, "Opzetters"],
  [ERecoveryType.PileLowering, "Paalkopverlaging"],
  [ERecoveryType.PileInWall, "Paalinkassing in (muur)"],
  [ERecoveryType.Injection, "Grondinjectie/verbetering"],
  [ERecoveryType.Unknown, "Onbekend"]
]);