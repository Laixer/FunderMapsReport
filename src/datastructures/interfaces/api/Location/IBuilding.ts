import { IGeoLocationModel } from "./IGeoLocationModel";

export interface IBuilding extends IGeoLocationModel {
  builtYear?: string, // DateTime
  isActive: boolean,
  neighborhoodId?: string
}