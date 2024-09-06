import { IEnumMethods } from "../util";


export interface IRecordControl extends IEnumMethods {
  createDate: string, // DateTime
  updateDate?: string, // DateTime
  deleteDate?: string // DateTime
}