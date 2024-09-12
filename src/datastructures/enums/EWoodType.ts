

// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/WoodType.cs
export enum EWoodType {
  /// <summary>
  ///     Pine.
  /// </summary>
  Pine = 0,

  /// <summary>
  ///     Spruce.
  /// </summary>
  Spruce = 1,
}


export const EWoodTypeLabels: Map<EWoodType, string> = new Map([
  [EWoodType.Pine, "Grenen"],
  [EWoodType.Spruce, "Vuren"]
]);

