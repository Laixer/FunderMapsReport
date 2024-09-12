import { IMunicipality } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class Municipality extends EnumMethods implements IMunicipality {
  identifier: string;
  id: string;
  externalId: string;
  name: string;
  water: boolean;
  stateId: string | undefined;

  className = 'Municipality'
  
  constructor(data: IMunicipality) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.externalId = data.externalId;
    this.name = data.name;
    this.water = data.water;
    this.stateId = data.stateId;
  }
}