import { IResidence } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class Residence extends EnumMethods implements IResidence {
  id: string;
  addressId: string
  buildingId: string
  latitude: number
  longitude: number
  
  constructor(data: IResidence) {
    super();
    
    this.id = data.id;
    this.addressId = data.addressId,
    this.buildingId = data.buildingId
    this.latitude = data.latitude
    this.longitude = data.longitude
    
  }
}