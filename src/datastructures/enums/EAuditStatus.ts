
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/AuditStatus.cs
export enum EAuditStatus {
  /// <summary>
  ///     Needs to be done.
  /// </summary>
  Todo = 0,

  /// <summary>
  ///     Pending.
  /// </summary>
  Pending = 1,

  /// <summary>
  ///     Done.
  /// </summary>
  Done = 2,

  // FUTURE: Remove.
  /// <summary>
  ///     Discarded.
  /// </summary>
  Discarded = 3,

  /// <summary>
  ///     Pending review.
  /// </summary>
  PendingReview = 4,

  /// <summary>
  ///     Rejected.
  /// </summary>
  Rejected = 5,
}


export const EAuditStatusLabels: Map<EAuditStatus, string> = new Map([
  [EAuditStatus.Todo, "Nog behandelen"],
  [EAuditStatus.Pending, "In afwachting"],
  [EAuditStatus.Done, "Afgerond"],
  [EAuditStatus.Discarded, "Vervallen"],
  [EAuditStatus.PendingReview, "Ter review"],
  [EAuditStatus.Rejected, "Afgewezen"]
]);