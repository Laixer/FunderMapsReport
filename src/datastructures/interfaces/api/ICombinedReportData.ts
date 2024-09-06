import { IIncidentReport } from "./IIncidentReport";
import { IInquiryReport } from "./IInquiryReport";
import { IInquirySample } from "./IInquirySample";
import { IRecoveryReport } from "./IRecoveryReport";
import { IRecoverySample } from "./IRecoverySample";


export interface ICombinedReportData {
  incidents: IIncidentReport[],
  inquiries: IInquiryReport[],
  inquirySamples: IInquirySample[],
  recoveries: IRecoveryReport[],
  recoverySamples: IRecoverySample[]
}