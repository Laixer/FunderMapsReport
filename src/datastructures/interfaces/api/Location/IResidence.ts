import { IEnumMethods } from "../util";

export interface IResidence extends IEnumMethods {
  id: string,
  addressId: string,
  buildingId: string,
  latitude: number,
  longitude: number
}