
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/AccessPolicy.cs
export enum EAccessPolicy {
  /// <summary>
  ///     Public.
  /// </summary>
  Public = 0,

  /// <summary>
  ///     Private.
  /// </summary>
  Private = 1,
}

export const EAccessPolicyLabels: Map<EAccessPolicy, string> = new Map( [
  [ EAccessPolicy.Public, "Publiek" ],
  [ EAccessPolicy.Private, "Afgeschermd" ],
]);
