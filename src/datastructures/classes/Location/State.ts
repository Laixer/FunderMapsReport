import { IState } from "@/datastructures/interfaces";
import { EnumMethods } from "../EnumMethods";

export class State extends EnumMethods implements IState {
  identifier: string;
  id: string;
  externalId: string;
  water: boolean;
  name: string;

  className = 'State'
  
  constructor(data: IState) {
    super();
    this.identifier = data.identifier;
    this.id = data.id;
    this.externalId = data.externalId;
    this.water = data.water;
    this.name = data.name;
  }
}