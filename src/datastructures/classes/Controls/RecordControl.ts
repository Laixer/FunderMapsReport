import { IRecordControl } from "@/datastructures/interfaces/api/Controls";
import { EnumMethods } from "../EnumMethods";

export class RecordControl extends EnumMethods implements IRecordControl {
  createDate: string;
  updateDate?: string;
  deleteDate?: string;

  className = 'RecordControl'

  constructor(data: IRecordControl) {
    super()
    
    this.createDate = data.createDate;
    this.updateDate = data.updateDate;
    this.deleteDate = data.deleteDate;
  }
}