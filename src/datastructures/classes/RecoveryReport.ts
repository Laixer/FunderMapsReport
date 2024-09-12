import { ERecoveryDocumentType, ERecoveryDocumentTypeLabels } from "../enums";
import { IRecoveryReport } from "../interfaces";
import { IAttributionControl, IStateControl, IAccessControl, IRecordControl } from "../interfaces/api/Controls";
import { AccessControl, AttributionControl, RecordControl, StateControl } from "./Controls";
import { EnumMethods } from "./EnumMethods";

export class RecoveryReport extends EnumMethods implements IRecoveryReport {
  identifier: number;
  id: number;
  note?: string;
  type: ERecoveryDocumentType; 
  documentFile: string;
  documentDate: string;
  documentName: string;
  attribution: IAttributionControl; 
  state: IStateControl;
  access: IAccessControl; 
  record: IRecordControl;

  className = 'RecoveryReport'

  enumProperties = ['type'];

  constructor(data: IRecoveryReport) {
    super()

    this.identifier = data.identifier;
    this.id = data.id;
    this.note = data.note;
    this.type = data.type;
    this.documentFile = data.documentFile;
    this.documentDate = data.documentDate;
    this.documentName = data.documentName;
    this.attribution = new AttributionControl(data.attribution);
    this.state = new StateControl(data.state);
    this.access = new AccessControl(data.access);
    this.record = new RecordControl(data.record);
  }

  // Getter methods for enums
  get typeLabel(): string {
    return ERecoveryDocumentTypeLabels.get(this.type) || ''
  }
}