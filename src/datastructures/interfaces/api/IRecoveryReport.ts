
import { ERecoveryDocumentType } from '@/datastructures/enums'
import { 
  IAccessControl, 
  IAttributionControl, 
  IRecordControl, 
  IStateControl 
} from './Controls'
import { IEnumMethods } from './util'


export interface IRecoveryReport extends IEnumMethods {
  identifier: number,
  id: number,
  note?: string,
  type: ERecoveryDocumentType, 
  documentFile: string,
  documentDate: string,
  documentName: string,

  attribution: IAttributionControl, 
  state: IStateControl,
  access: IAccessControl, 
  record: IRecordControl

  // Getter methods for enums
  get typeLabel(): string
}