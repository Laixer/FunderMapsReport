import { IRecoveryReport } from "../api/IRecoveryReport";
import { IRecoverySample } from "../api/IRecoverySample";

export interface ICombinedRecoveryData { 
  report: IRecoveryReport, 
  sample?: IRecoverySample 
}