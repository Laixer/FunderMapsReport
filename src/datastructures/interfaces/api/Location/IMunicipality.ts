import { INamedGeoLocationWithWater } from "./INamedGeoLocationWithWater";

export interface IMunicipality extends INamedGeoLocationWithWater {
  stateId?: string
}