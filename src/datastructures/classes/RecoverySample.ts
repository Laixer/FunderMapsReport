import { ERecoveryStatus, ERecoveryType, EPileType, EFacade, ERecoveryStatusLabels, ERecoveryTypeLabels, EPileTypeLabels, EFacadeLabels } from "../enums";
import { IRecoverySample } from "../interfaces";
import { EnumMethods } from "./EnumMethods";

export class RecoverySample extends EnumMethods implements IRecoverySample {
  identifier: number;
  id: number;
  recovery: number;
  note?: string;
  building: string;
  status?: ERecoveryStatus;
  type: ERecoveryType;
  pileType?: EPileType;
  contractor?: number;
  facade?: EFacade[];
  permit?: string;
  permitDate?: string;
  recoveryDate?: string;

  className = 'RecoverySample'

  enumProperties = ['status', 'type', 'pileType', 'facade']; 

  constructor(data: IRecoverySample) {
    super()

    this.identifier = data.identifier;
    this.id = data.id;
    this.recovery = data.recovery;
    this.note = data.note;
    this.building = data.building;
    this.status = data.status;
    this.type = data.type;
    this.pileType = data.pileType;
    this.contractor = data.contractor;
    this.facade = data.facade;
    this.permit = data.permit;
    this.permitDate = data.permitDate;
    this.recoveryDate = data.recoveryDate;
  }

  // Getter methods for enum labels
  get statusLabel(): string {
    return (this.status || this.status === 0) ? (ERecoveryStatusLabels.get(this.status) || '') : ''
  }

  get typeLabel(): string {
    return (this.type || this.type === 0) ? (ERecoveryTypeLabels.get(this.type) || '') : '';
  }

  get pileTypeLabel(): string {
    return (this.pileType || this.pileType === 0) ? (EPileTypeLabels.get(this.pileType) || '') : '';
  }

  get facadeLabel(): string {
    return Array.isArray(this.facade)
      ? this.facade
          .map(value => EFacadeLabels.get(value) || '')
          .join(', ') 
      : '';
  }
}