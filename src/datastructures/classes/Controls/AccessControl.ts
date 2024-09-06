import { EAccessPolicy, EAccessPolicyLabels } from "@/datastructures/enums";
import { IAccessControl } from "@/datastructures/interfaces/api/Controls";
import { EnumMethods } from "../EnumMethods";

export class AccessControl extends EnumMethods implements IAccessControl {
  accessPolicy: EAccessPolicy;
  isPublic: boolean;
  isPrivate: boolean;

  className = 'AccessControl'

  enumProperties = ['accessPolicy']

  constructor(data: IAccessControl) {
    super()

    this.accessPolicy = data.accessPolicy;
    this.isPublic = data.isPublic;
    this.isPrivate = data.isPrivate;
  }

  get accessPolicyLabel(): string {
    return (this.accessPolicy || this.accessPolicy === 0) ? (EAccessPolicyLabels.get(this.accessPolicy) || '') : '';
  }
}