import { IAddress } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class Address extends EnumMethods implements IAddress {
  identifier: string;
  id: string;
  externalId: string;
  buildingNumber: string;
  postalCode: string | undefined;
  street: string;
  city: string;
  buildingId: string | undefined;
  fullAddress: string;
  
  className = 'Address'

  constructor(data: IAddress) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.externalId = data.externalId;
    this.buildingNumber = data.buildingNumber;
    this.postalCode = data.postalCode;
    this.street = data.street;
    this.city = data.city;
    this.buildingId = data.buildingId;
    this.fullAddress = data.fullAddress;
  }
}