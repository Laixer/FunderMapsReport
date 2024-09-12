
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/WoodQuality.cs 
export enum EWoodQuality {
    /// <summary>
    ///     Area 1.
    /// </summary>
    Area1 = 0,

    /// <summary>
    ///     Area 2.
    /// </summary>
    Area2 = 1,

    /// <summary>
    ///     Area 3.
    /// </summary>
    Area3 = 2,

    /// <summary>
    ///     Area 4.k
    /// </summary>
    Area4 = 3,
}


export const EWoodQualityLabels: Map<EWoodQuality, string> = new Map([
  [EWoodQuality.Area1, "Gebied I"],
  [EWoodQuality.Area2, "Gebied II"],
  [EWoodQuality.Area3, "Gebied III"],
  [EWoodQuality.Area4, "Gebied IV"]
]);
  
  