import { IEnumMethods } from "../interfaces/api/util";


export class EnumMethods implements IEnumMethods {

  className = 'Onbekend'

  enumProperties: string[] = []

  // Method to check if a property is an enum
  isEnum(property: string): boolean {
    return this.enumProperties.includes(property);
  }

  // Method to get the label of an enum property or null
  getEnumLabel(property: string): string|number|null {
    // Check if the property is an enum
    if (this.isEnum(property)) {
      console.log('Check - it is an enum')

      let labelProperty = `${property}Label`

      console.log("Property", labelProperty)

      // using `in` to include prototype chain
      if (labelProperty in this) {

        // @ts-ignore
        console.log("Found property", this[labelProperty])

        // @ts-ignore - We know that all enum labels are either a string or number.
        return this[labelProperty] as string|number
      }
    }

    return null
  }

  getClassName(): string {
    return this.className
  }
}