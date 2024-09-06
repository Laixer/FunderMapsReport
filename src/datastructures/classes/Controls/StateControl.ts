import { EAuditStatus, EAuditStatusLabels } from "@/datastructures/enums";
import { IStateControl } from "@/datastructures/interfaces/api/Controls";
import { EnumMethods } from "../EnumMethods";

export class StateControl extends EnumMethods implements IStateControl {
  auditStatus: EAuditStatus;
  allowWrite: boolean;

  className = 'StateControl'

  enumProperties = ['auditStatus']

  constructor(data: IStateControl) {
    super();
    this.auditStatus = data.auditStatus;
    this.allowWrite = data.allowWrite;
  }

  // Getter method for enum label
  get auditStatusLabel(): string {
    return (this.auditStatus || this.auditStatus === 0) ? (EAuditStatusLabels.get(this.auditStatus) || '') : '';
  }
}