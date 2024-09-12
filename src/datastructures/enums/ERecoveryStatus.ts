
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/RecoveryStatus.cs
export enum ERecoveryStatus {
    /// <summary>
    ///     Planned.
    /// </summary>
    Planned = 0,

    /// <summary>
    ///     Requested.
    /// </summary>
    Requested = 1,

    /// <summary>
    ///     Executed.
    /// </summary>
    Executed = 2,
}


export const ERecoveryStatusLabels: Map<ERecoveryStatus, string> = new Map([
  [ERecoveryStatus.Planned, "Gepland"],
  [ERecoveryStatus.Requested, "Aangevraagd"],
  [ERecoveryStatus.Executed, "Uitgevoerd"]
]);

