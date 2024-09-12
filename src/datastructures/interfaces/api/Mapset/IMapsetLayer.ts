import { IMapsetField } from "./IMapsetField";

export interface IMapsetLayer {
  id: string,
  name?: string,
  isVisible?: boolean,
  fields: IMapsetField[]
}