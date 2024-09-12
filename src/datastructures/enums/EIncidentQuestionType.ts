
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/IncidentQuestionType.cs
export enum EIncidentQuestionType {
  /// <summary>
  ///     Buy or sell.
  /// </summary>
  BuySell = 0,

  /// <summary>
  ///     Registration.
  /// </summary>
  Registration = 1,

  /// <summary>
  ///     Legal.
  /// </summary>
  Legal = 2,

  /// <summary>
  ///     Financial.
  /// </summary>
  Financial = 3,

  /// <summary>
  ///     Guidance.
  /// </summary>
  Guidance = 4,

  /// <summary>
  ///     Recovery.
  /// </summary>
  Recovery = 5,

  /// <summary>
  ///     Research.
  /// </summary>
  Research = 6,

  /// <summary>
  ///     Other.
  /// </summary>
  Other = 7,
}


export const EIncidentQuestionTypeLabels: Map<EIncidentQuestionType, string> = new Map([
  [EIncidentQuestionType.BuySell, "Kopen/verkopen"],
  [EIncidentQuestionType.Registration, "Registratie"],
  [EIncidentQuestionType.Legal, "Juridische vraag"],
  [EIncidentQuestionType.Financial, "Financiële vraag"],
  [EIncidentQuestionType.Guidance, "Begeleiding"],
  [EIncidentQuestionType.Recovery, "Herstelvraag"],
  [EIncidentQuestionType.Research, "Onderzoeksvraag"],
  [EIncidentQuestionType.Other, "Overig"]
]);