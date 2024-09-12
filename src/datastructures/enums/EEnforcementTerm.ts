
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/EnforcementTerm.cs
export enum EEnforcementTerm {
  /// <summary>
  ///     Between 0 - 5 years.
  /// </summary>
  Term05 = 0,

  /// <summary>
  ///     Between 5 - 10 years.
  /// </summary>
  Term510 = 1,

  /// <summary>
  ///     Between 10 - 20 years.
  /// </summary>
  Term1020 = 2,

  /// <summary>
  ///     5 years.
  /// </summary>
  Term5 = 3,

  /// <summary>
  ///     10 years.
  /// </summary>
  Term10 = 4,

  /// <summary>
  ///     15 years.
  /// </summary>
  Term15 = 5,

  /// <summary>
  ///     20 years.
  /// </summary>
  Term20 = 6,

  /// <summary>
  ///     25 years.
  /// </summary>
  Term25 = 7,

  /// <summary>
  ///     30 years.
  /// </summary>
  Term30 = 8,

  /// <summary>
  ///     40 years.
  /// </summary>
  Term40 = 9,
}


export const EEnforcementTermLabels: Map<EEnforcementTerm, string> = new Map([
  [EEnforcementTerm.Term05, "0 tot 5 jaar"],
  [EEnforcementTerm.Term510, "5 tot 10 jaar"],
  [EEnforcementTerm.Term1020, "10 tot 20 jaar"],
  [EEnforcementTerm.Term5, "tot 5 jaar (F3o)"],
  [EEnforcementTerm.Term10, "tot 10 jaar (F3o)"],
  [EEnforcementTerm.Term15, "tot 15 jaar (F3o)"],
  [EEnforcementTerm.Term20, "tot 20 jaar (F3o)"],
  [EEnforcementTerm.Term25, "tot 25 jaar (F3o)"],
  [EEnforcementTerm.Term30, "tot 30 jaar (F3o)"],
  [EEnforcementTerm.Term40, "tot 40 jaar (F3o)"]
]);