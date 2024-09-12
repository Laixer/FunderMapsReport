import { EAccessPolicy } from "@/datastructures/enums";
import { IEnumMethods } from "../util";

export interface IAccessControl extends IEnumMethods {
  accessPolicy: EAccessPolicy,
  isPublic: boolean,
  isPrivate: boolean

  // Getter methods for enums
  get accessPolicyLabel(): string
}