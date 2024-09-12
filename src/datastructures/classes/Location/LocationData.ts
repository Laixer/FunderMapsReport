import { IAddress, IBuilding, IDistrict, IGeoLocationData, IMunicipality, INeighborhood, IResidence, IState } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";
import { Building } from "./Building";
import { Address } from "./Address";
import { District } from "./District";
import { Municipality } from "./Municipality";
import { Neighborhood } from "./Neighborhood";
import { State } from "./State";
import { Residence } from "./Residence";

export class GeoLocationData extends EnumMethods implements IGeoLocationData {
  building: IBuilding;
  address: IAddress;
  neighborhood: INeighborhood | null;
  residence: IResidence | null;
  district: IDistrict | null;
  municipality: IMunicipality | null;
  state: IState | null;

  className = 'LocationData'
  
  constructor(data: IGeoLocationData) {
    super()
    
    this.building = new Building(data.building);
    this.address = new Address(data.address);
    this.neighborhood = data.neighborhood ? new Neighborhood(data.neighborhood) : null;
    this.residence = data.residence ? new Residence(data.residence) : null;
    this.district = data.district ? new District(data.district) : null;
    this.municipality = data.municipality ? new Municipality(data.municipality) : null;
    this.state = data.state ? new State(data.state) : null;
  }
}