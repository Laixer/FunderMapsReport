import { IBuilding } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class Building extends EnumMethods implements IBuilding {
  identifier: string;
  id: string;
  externalId: string;
  builtYear: string | undefined;
  isActive: boolean;
  neighborhoodId: string | undefined;

  className = 'Building'
  
  constructor(data: IBuilding) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.externalId = data.externalId;
    this.builtYear = data.builtYear;
    this.isActive = data.isActive;
    this.neighborhoodId = data.neighborhoodId;
  }
}