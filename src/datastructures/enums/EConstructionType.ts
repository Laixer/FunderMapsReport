

/**
 * TODO: Not yet implemented by API
 */
export enum EConstructionType {
  /// <summary>
  ///     Brick.
  /// </summary>
  Brick = 0,

  /// <summary>
  ///     Concrete.
  /// </summary>
  Concrete = 1,
}


export const EConstructionTypeLabels: Map<EConstructionType, string> = new Map([
  [EConstructionType.Brick, "Metselwerk"],
  [EConstructionType.Concrete, "Betonnenbalk"]
]);

