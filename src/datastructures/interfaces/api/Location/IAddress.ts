import { IGeoLocationModel } from "./IGeoLocationModel";

export interface IAddress extends IGeoLocationModel {
  buildingNumber: string,
  postalCode?: string,
  street: string,
  city: string,
  buildingId?: string,
  fullAddress: string
}