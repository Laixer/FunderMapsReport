
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/PileType.cs
export enum EPileType {
  /// <summary>
  ///     Press.
  /// </summary>
  Press = 0,

  /// <summary>
  ///     Intgernally driven.
  /// </summary>
  IntgernallyDriven = 1,

  /// <summary>
  ///     Segment.
  /// </summary>
  Segment = 2,
}


export const EPileTypeLabels: Map<EPileType, string> = new Map([
  [EPileType.Press, "Drukpaal"],
  [EPileType.IntgernallyDriven, "Inwendig geheide buispaal"],
  [EPileType.Segment, "Segmentpaal"]
]);
