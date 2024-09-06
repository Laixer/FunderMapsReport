import { IDistrict } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class District extends EnumMethods implements IDistrict {
  identifier: string;
  id: string;
  externalId: string;
  name: string;
  water: boolean;
  municipalityId: string | undefined;
  
  className = 'District'

  constructor(data: IDistrict) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.externalId = data.externalId;
    this.name = data.name;
    this.water = data.water
    this.municipalityId = data.municipalityId;
  }
}