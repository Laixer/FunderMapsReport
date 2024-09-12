
import {
  EInquiryType,
} from '../../enums'

import { 
  IAccessControl, 
  IAttributionControl, 
  IRecordControl, 
  IStateControl 
} from './Controls'
import { IEnumMethods } from './util'


export interface IInquiryReport extends IEnumMethods  {
  identifier: number,
  id: number,
  documentName: string,
  inspection: boolean,
  jointMeasurement: boolean,
  floorMeasurement: boolean,
  note?: string,
  documentDate: string, // DateTime
  documentFile: string,
  type: EInquiryType, 
  standardF3o: boolean,
  attribution: IAttributionControl, 
  state: IStateControl,
  access: IAccessControl, 
  record: IRecordControl

  // Getter methods for enums
  get typeLabel(): string;
}
