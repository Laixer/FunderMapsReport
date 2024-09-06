
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/RecoveryDocumentType.cs
export enum ERecoveryDocumentType {
  /// <summary>
  ///     Permit.
  /// </summary>
  Permit = 0,

  /// <summary>
  ///     Foundation report
  /// </summary>
  FoundationReport = 1,

  /// <summary>
  ///     Archive report.
  /// </summary>
  ArchiveReport = 2,

  /// <summary>
  ///     Owner evidence.
  /// </summary>
  OwnerEvidence = 3,

  /// <summary>
  ///     Unknown.
  /// </summary>
  Unknown = 4,
}

export const ERecoveryDocumentTypeLabels: Map<ERecoveryDocumentType, string> = new Map([
  [ERecoveryDocumentType.Permit, "Vergunning"],
  [ERecoveryDocumentType.FoundationReport, "Funderingsonderzoek"],
  [ERecoveryDocumentType.ArchiveReport, "Archiefonderzoek"],
  [ERecoveryDocumentType.OwnerEvidence, "Bewijs van eigenaar"],
  [ERecoveryDocumentType.Unknown, "Onbekend"]
]);