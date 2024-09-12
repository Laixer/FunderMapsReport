

// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/WoodEncroachement.cs
export enum EWoodEncroachement {
  /// <summary>
  ///     Fungus infection.
  /// </summary>
  FungusInfection = 0,

  /// <summary>
  ///     Bio fungus infection.
  /// </summary>
  BioFungusInfection = 1,

  /// <summary>
  ///     Bio infection.
  /// </summary>
  BioInfection = 2,
}


export const EWoodEncroachementLabels: Map<EWoodEncroachement, string> = new Map([
  [EWoodEncroachement.FungusInfection, "Schimmelaantasting"],
  [EWoodEncroachement.BioFungusInfection, "Bacteriële en schimmelaantasting"],
  [EWoodEncroachement.BioInfection, "Bacteriële aantasting"]
]);

