import { INeighborhood } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class Neighborhood extends EnumMethods implements INeighborhood {
  identifier: string;
  id: string;
  externalId: string;
  name: string;
  districtId: string | undefined;

  className = 'Neighborhood'
  
  constructor(data: INeighborhood) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.externalId = data.externalId;
    this.name = data.name;
    this.districtId = data.districtId;
  }
}