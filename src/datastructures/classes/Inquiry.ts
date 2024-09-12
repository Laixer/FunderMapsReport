import { EInquiryType, EInquiryTypeLabels } from "../enums";
import { IInquiryReport } from "../interfaces";
import { IAccessControl, IAttributionControl, IRecordControl, IStateControl } from "../interfaces/api/Controls";
import { AccessControl, AttributionControl, RecordControl, StateControl } from "./Controls";
import { EnumMethods } from "./EnumMethods";

// Implement IInquiryReport interface
export class Inquiry extends EnumMethods implements IInquiryReport {
  identifier: number;
  id: number;
  documentName: string;
  inspection: boolean;
  jointMeasurement: boolean;
  floorMeasurement: boolean;
  note?: string;
  documentDate: string; // DateTime
  documentFile: string;
  type: EInquiryType;
  standardF3o: boolean;
  attribution: IAttributionControl;
  state: IStateControl;
  access: IAccessControl;
  record: IRecordControl;

  className = 'Inquiry'

  enumProperties = ['type']

  constructor(data: IInquiryReport) {
    super()
    
    // Initialize properties from data
    this.identifier = data.identifier;
    this.id = data.id;
    this.documentName = data.documentName;
    this.inspection = data.inspection;
    this.jointMeasurement = data.jointMeasurement;
    this.floorMeasurement = data.floorMeasurement;
    this.note = data.note;
    this.documentDate = data.documentDate;
    this.documentFile = data.documentFile;
    this.type = data.type;
    this.standardF3o = data.standardF3o;
    this.attribution = new AttributionControl(data.attribution);
    this.state = new StateControl(data.state);
    this.access = new AccessControl(data.access);
    this.record = new RecordControl(data.record);
  }

  // Getter for type label
  get typeLabel(): string {
    return EInquiryTypeLabels.get(this.type) || '';
  }
}