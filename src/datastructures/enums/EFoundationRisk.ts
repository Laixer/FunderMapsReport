
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/FoundationRisk.cs
export enum EFoundationRisk {
    /// <summary>
    ///     Risk level A.
    /// </summary>
    A = 0,

    /// <summary>
    ///     Risk level B.
    /// </summary>
    B = 1,

    /// <summary>
    ///     Risk level C.
    /// </summary>
    C = 2,

    /// <summary>
    ///     Risk level D.
    /// </summary>
    D = 3,

    /// <summary>
    ///     Risk level E.
    /// </summary>
    E = 4,
}


export const EFoundationRiskLabels: Map<EFoundationRisk, string> = new Map([
  [EFoundationRisk.A, "A (Geen risico)"],
  [EFoundationRisk.B, "B (Laag risico)"],
  [EFoundationRisk.C, "C (Verhoogd risico)"],
  [EFoundationRisk.D, "D (Hoog)"],
  [EFoundationRisk.E, "E (Aanzienlijk hoog risico)"]
]);


export const EFoundationRiskIconNames: Map<EFoundationRisk, string> = new Map([
  [EFoundationRisk.A, "a"],
  [EFoundationRisk.B, "b"],
  [EFoundationRisk.C, "c"],
  [EFoundationRisk.D, "d"],
  [EFoundationRisk.E, "e"]
])
