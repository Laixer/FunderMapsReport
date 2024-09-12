
// https://github.com/Laixer/FunderMaps/blob/develop/src/FunderMaps.Core/Types/InquiryType.cs
export enum EInquiryType {
  /// <summary>
  ///     Additional research.
  /// </summary>
  AdditionalResearch = 0,

  /// <summary>
  ///     Monitoring.
  /// </summary>
  Monitoring = 1,

  /// <summary>
  ///     Note.
  /// </summary>
  Note = 2,

  /// <summary>
  ///     Quickscan.
  /// </summary>
  Quickscan = 3,

  /// <summary>
  ///     Unknown.
  /// </summary>
  Unknown = 4,

  /// <summary>
  ///     Demolition research.
  /// </summary>
  DemolitionResearch = 5,

  /// <summary>
  ///     Second opinion.
  /// </summary>
  SecondOpinion = 6,

  /// <summary>
  ///     Archieve research.
  /// </summary>
  ArchieveResearch = 7,

  /// <summary>
  ///     Architectural research.
  /// </summary>
  ArchitecturalResearch = 8,

  /// <summary>
  ///     Foundation advice.
  /// </summary>
  FoundationAdvice = 9,

  /// <summary>
  ///     Inspectionpit.
  /// </summary>
  Inspectionpit = 10,

  /// <summary>
  ///     Foundation research.
  /// </summary>
  FoundationResearch = 11,

  /// <summary>
  ///     Groundwaterlevel research.
  /// </summary>
  GroundWaterLevelResearch = 12,

  /// <summary>
  ///     Soil investigation.
  /// </summary>
  SoilInvestigation = 13,

  /// <summary>
  ///     Facade scan.
  /// </summary>
  FacadeScan = 14,
}


export const EInquiryTypeLabels: Map<EInquiryType, string> = new Map([
  [EInquiryType.AdditionalResearch, "Aanvullend onderzoek"],
  [EInquiryType.Monitoring, "Monitoring"],
  [EInquiryType.Note, "Notitie"],
  [EInquiryType.Quickscan, "Quickscan"],
  [EInquiryType.Unknown, "Onbekend"],
  [EInquiryType.DemolitionResearch, "Sloopgrensonderzoek"],
  [EInquiryType.SecondOpinion, "Secondopinion"],
  [EInquiryType.ArchieveResearch, "Archiefonderzoek"],
  [EInquiryType.ArchitecturalResearch, "Bouwkundigonderzoek"],
  [EInquiryType.FoundationAdvice, "Funderingsadvies"],
  [EInquiryType.Inspectionpit, "Onderzoeksput"],
  [EInquiryType.FoundationResearch, "Funderinsonderzoek"],
  [EInquiryType.GroundWaterLevelResearch, "Grondwateronderzoek"],
  [EInquiryType.SoilInvestigation, "Grondonderzoek"],
  [EInquiryType.FacadeScan, "Gevelscan"]
]);

