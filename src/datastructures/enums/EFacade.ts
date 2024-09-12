
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/Facade.cs
export enum EFacade {
  /// <summary>
  ///     Front.
  /// </summary>
  Front = 0,

  /// <summary>
  ///     Sidewall left.
  /// </summary>
  SidewallLeft = 1,

  /// <summary>
  ///     Sidewall right.
  /// </summary>
  SidewallRight = 2,

  /// <summary>
  ///     Rear.
  /// </summary>
  Rear = 3,
}

export const EFacadeLabels: Map<EFacade, string> = new Map([
  [EFacade.Front, "Voorgevel"],
  [EFacade.SidewallLeft, "Linker gevel"],
  [EFacade.SidewallRight, "Rechter gevel"],
  [EFacade.Rear, "Achter gevel"]
]);

