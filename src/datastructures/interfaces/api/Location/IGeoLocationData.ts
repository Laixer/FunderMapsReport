import { IBuilding, IAddress, IResidence, INeighborhood, IDistrict, IMunicipality, IState } from "../..";
import { IEnumMethods } from "../util";

export interface IGeoLocationData extends IEnumMethods {
  building: IBuilding,
  address: IAddress,
  neighborhood: null | INeighborhood,
  residence: null | IResidence,
  district: null | IDistrict,
  municipality: null | IMunicipality,
  state: null | IState
}