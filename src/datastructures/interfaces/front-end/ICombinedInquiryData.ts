
import { IInquiryReport } from "../api/IInquiryReport"
import { IInquirySample } from "../api/IInquirySample"


export interface ICombinedInquiryData { 
  report: IInquiryReport, 
  sample?: IInquirySample 
}