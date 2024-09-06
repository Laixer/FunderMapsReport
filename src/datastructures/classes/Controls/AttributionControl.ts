import { IAttributionControl } from "@/datastructures/interfaces/api/Controls";
import { EnumMethods } from "../EnumMethods";

export class AttributionControl extends EnumMethods implements IAttributionControl {
  id: number;
  reviewer: string;
  reviewerName: string;
  creator: string;
  creatorName: string;
  owner: string;
  ownerName: string;
  contractor: string;
  contractorName: string;

  className = 'AttributionControl'

  constructor(data: IAttributionControl) {
    super()
    
    this.id = data.id;
    this.reviewer = data.reviewer;
    this.reviewerName = data.reviewerName
    this.creator = data.creator;
    this.creatorName = data.creatorName
    this.owner = data.owner;
    this.ownerName = data.ownerName
    this.contractor = data.contractor;
    this.contractorName = data.contractorName
  }
}