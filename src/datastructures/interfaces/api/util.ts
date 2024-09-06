export interface IAPIModel {}

export interface IEnumMethods extends IAPIModel {

  className: string

  enumProperties: string[]

  // Method to check if a property is an enum
  isEnum(propertyName: string): boolean;

  // Method to get the label of an enum property or null
  getEnumLabel(property: string): string|number|null

  getClassName(): string
}

