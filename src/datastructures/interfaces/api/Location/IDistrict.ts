import { INamedGeoLocationWithWater } from "./INamedGeoLocationWithWater";

export interface IDistrict extends INamedGeoLocationWithWater {
  municipalityId?: string
}