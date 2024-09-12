import { EFoundationType, 
  EFoundationDamageCause, 
  EFoundationDamageCharacteristics, 
  EEnvironmentDamageCharacteristics, 
  EAuditStatus, 
  EIncidentQuestionType, 
  EFoundationTypeLabels, 
  EFoundationDamageCauseLabels, 
  EAuditStatusLabels, 
  EIncidentQuestionTypeLabels, 
  EFoundationDamageCharacteristicsLabels, 
  EEnvironmentDamageCharacteristicsLabels 
} from "../enums";
import { IIncidentReport } from "../interfaces";
import { EnumMethods } from "./EnumMethods";

export class IncidentReport extends EnumMethods implements IIncidentReport {
  id: string;
  clientId?: string;
  clientName: string;
  foundationType?: EFoundationType;
  chainedBuilding: boolean;
  owner: boolean;
  foundationRecovery: boolean;
  neighborRecovery: boolean;
  foundationDamageCause: EFoundationDamageCause;
  documentFile?: string[];
  note?: string;
  internalNote?: string;
  foundationDamageCharacteristics: EFoundationDamageCharacteristics[];
  environmentDamageCharacteristics: EEnvironmentDamageCharacteristics[];
  email: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  building: string;
  auditStatus: EAuditStatus;
  incidentQuestionType: EIncidentQuestionType;
  meta: object;

  className = 'IncidentReport'

  enumProperties = [
    'foundationType',
    'foundationDamageCause',
    'foundationDamageCharacteristics',
    'environmentDamageCharacteristics',
    'auditStatus',
    'incidentQuestionType'
  ]

  constructor(data: IIncidentReport) {
    super()
    
    this.id = data.id;
    this.clientId = data.clientId;
    this.clientName = data.clientName;
    this.foundationType = data.foundationType;
    this.chainedBuilding = data.chainedBuilding;
    this.owner = data.owner;
    this.foundationRecovery = data.foundationRecovery;
    this.neighborRecovery = data.neighborRecovery;
    this.foundationDamageCause = data.foundationDamageCause;
    this.documentFile = data.documentFile;
    this.note = data.note;
    this.internalNote = data.internalNote;
    this.foundationDamageCharacteristics = data.foundationDamageCharacteristics;
    this.environmentDamageCharacteristics = data.environmentDamageCharacteristics;
    this.email = data.email;
    this.name = data.name;
    this.phoneNumber = data.phoneNumber;
    this.address = data.address;
    this.building = data.building;
    this.auditStatus = data.auditStatus;
    this.incidentQuestionType = data.incidentQuestionType;
    this.meta = data.meta;
  }

  // Getter for foundationType label
  get foundationTypeLabel(): string {
    return (this.foundationType || this.foundationType === 0) ? (EFoundationTypeLabels.get(this.foundationType) || '') : '';
  }

  // Getter for foundationDamageCause label
  get foundationDamageCauseLabel(): string {
    return EFoundationDamageCauseLabels.get(this.foundationDamageCause) || '';
  }

  // Getter for foundationDamageCharacteristics label
  get foundationDamageCharacteristicsLabel(): string {
    return (this.foundationDamageCharacteristics || [])
      .map(value => EFoundationDamageCharacteristicsLabels.get(value) || '')
      .join(', ');
  }

  // Getter for environmentDamageCharacteristics label
  get environmentDamageCharacteristicsLabel(): string {
    return (this.environmentDamageCharacteristics || [])
      .map(value => EEnvironmentDamageCharacteristicsLabels.get(value) || '')
      .join(', ');
  }

  // Getter for auditStatus label
  get auditStatusLabel(): string {
    return EAuditStatusLabels.get(this.auditStatus) || '';
  }

  // Getter for incidentQuestionType label
  get incidentQuestionTypeLabel(): string {
    return EIncidentQuestionTypeLabels.get(this.incidentQuestionType) || '';
  }

}