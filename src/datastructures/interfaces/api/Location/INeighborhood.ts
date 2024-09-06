import { INamedGeoLocation } from "./INamedGeoLocation";

export interface INeighborhood extends INamedGeoLocation {
  districtId?: string
}