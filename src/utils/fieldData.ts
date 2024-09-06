import { IEnumMethods } from "@/datastructures/interfaces/api/util"
import { MaybeRefOrGetter, toValue } from "vue" // ComputedRef, Ref, 

import { fieldLabelsBySource } from '@/datastructures/fieldLabels'
import { formattersByField } from '@/datastructures/fieldFormatters'


/**
 * Apply context information to a group of FieldDataConfigs
 */
export const applyContextToFieldDataConfigs = function(
  data: {
    configs: IFieldDataConfig[],
    source?: MaybeRefOrGetter<IEnumMethods|null|undefined>, // | ComputedRef<IEnumMethods|null|undefined>,
    labels?: Record<string, string>
  }
) {

  console.log('Apply context')
  console.log(data.source)

  return (data.configs || []).map(
    (config: IFieldDataConfig) => {
      // If no specific source was set on the config, apply the source from the context
      if (! config.source && data.source) {
        config.source = data.source
      }

      // If no specific label was set in the config, check the context for a relevant label by field name
      if (! config.label) {
        // If the context provides a set of labels
        if (data.labels && data.labels[config.name]) {
          config.label = data.labels[config.name]
        }
      }

      return config
    }
  )
}

export interface IFieldDataConfig {

  // The property name
  name: string

  // The label of the field
  label?: string

  // Source of the data. (e.g. Analysis)
  source?: MaybeRefOrGetter<IEnumMethods|null|undefined> // | ComputedRef<IEnumMethods|null|undefined>

  // Whether or not to apply the formatter (includes centrally configured formatter)
  format?: Boolean

  // Optional formatter function
  formatter?: Function

  // A default value if the property cannot be found on the data source
  default?: string

  // An optional group reference, which can be used to structure a list of fields
  group?: string
}

export class FieldDataConfig implements IFieldDataConfig {
  // interface properties
  name: string
  label?: string
  source?: MaybeRefOrGetter<IEnumMethods|null|undefined> // | ComputedRef<IEnumMethods|null|undefined>
  format?: Boolean = true
  formatter?: Function
  group?: string

  default: string = 'Geen data'

  constructor(data: IFieldDataConfig) {
    this.name = data.name

    if (data.source) {
      this.source = data.source
    }
    
    if (data.label) {
      this.label = data.label
    }

    if (data.formatter) {
      this.formatter = data.formatter
    }

    if (data.default) {
      this.default = data.default
    }

    if (data.format === true || data.format === false) {
      this.format = data.format
    }

    if (data.group) {
      this.group = data.group
    }

    if (! data.name) {
      console.error("FieldDataConfig requires a name", data)
      throw new Error("FieldDataConfig is missing something")
    }


  }
}

export class CompletedFieldData {
  name: string
  group?: string
  label: string = 'Onbekende eigenschap'
  fieldValue: null|undefined|number|boolean|string = undefined
  fieldValueLabel: null|undefined|number|boolean|string = 'Geen data'
  formattedFieldValueLabel: null|undefined|boolean|number|string = 'Geen data'

  constructor(name: string, group?: string) {
    this.name = name

    if (group) {
      this.group = group
    }
  }

  getValue(format = 'formatted') {

    switch(format) {
      case 'formatted':
        return this.formattedFieldValueLabel

      case 'pre-format':
        return this.fieldValueLabel

      case 'raw':
        return this.fieldValue

      default:
        return this.formattedFieldValueLabel
    }
  }

  get value(): null|undefined|number|boolean|string {
    return this.getValue()
  }
}

export const retrieveAndFormatFieldData = function retrieveAndFormatFieldData(config: IFieldDataConfig) {

  const dataObj = new CompletedFieldData(config.name, config.group)

  console.log("format field", dataObj, config)

  /**
   * A data source is required, unless intentionally set to `null`
   */
  if (! config.source && config.source !== null) {
    throw new Error(`Missing source for ${config.name}`)
  }

  /**
   * Getting the data source data
   */
  const source = config.source !== null ? toValue(config.source) : null

  /**
   * Setting the field label 
   * 
   * Use the provided field label if available. 
   * Otherwise look for the known field labels by field name
   */ 
  if (config.label) {
    dataObj.label = config.label
  } else if (source) {
    const className = source?.getClassName() || source?.constructor.name
    if (className && fieldLabelsBySource[className] && fieldLabelsBySource[className][config.name]) {
      dataObj.label = fieldLabelsBySource[className][config.name]
    } else {
      console.error("Missing label for field", className, config.name)
    }
  }

  /** 
   * Verify the source
   * 
   * If the source is missing, or has no value for the property, we're done
   */ 
  if (! source || ! source?.hasOwnProperty(config.name)) {

    // If there is a default label, use it
    if (config.default) {
      dataObj.fieldValueLabel = config.default
      dataObj.formattedFieldValueLabel = config.default
    }
    return dataObj
  }

  /**
   * Setting the base field value
   * 
   * If the value is empty, we're done.
   * 
   */ // @ts-ignore just keep quiet if you can't process something 
  const sourcedFieldValue = source[config.name]
  if (sourcedFieldValue || sourcedFieldValue === false || sourcedFieldValue === 0) {
    dataObj.fieldValue = sourcedFieldValue
  } else {
    // If there is a default label, use it
    if (config.default) {
      dataObj.fieldValueLabel = config.default
      dataObj.formattedFieldValueLabel = config.default
    }
    return dataObj
  }

  /**
   * Make enums pretty
   * 
   * If the field is an enum, we translate the raw field value into an enum label
   */
  if (source?.isEnum(config.name)) {
    console.log(`${config.name} is an enum`)
    dataObj.fieldValueLabel = source?.getEnumLabel(config.name)
    console.log(`${config.name} enum value`, dataObj.fieldValueLabel)
  } else {
    // Otherwise use the value we found as field value label
    dataObj.fieldValueLabel = dataObj.fieldValue
  }

  /**
   * Some presentational sugar may be added
   * 
   * If the formatter is disabled, or the field value is empty, or "no data" => skip formatting
   */
  if (
    config.format === false || 
    dataObj.fieldValue === undefined ||
    dataObj.fieldValue === null ||
    dataObj.fieldValue === '' ||
    dataObj.fieldValueLabel === '' || 
    dataObj.fieldValueLabel === 'Geen data'
  ) {
    dataObj.formattedFieldValueLabel = dataObj.fieldValueLabel
  } else {
    // Apply formatting if there is a field formatter
    if (config.formatter) {
      dataObj.formattedFieldValueLabel = config.formatter(dataObj.fieldValueLabel)
    } else if (formattersByField[config.name]) {
      dataObj.formattedFieldValueLabel = formattersByField[config.name](dataObj.fieldValueLabel)
    } else {

      if (dataObj.fieldValueLabel === true || dataObj.fieldValueLabel === false) {
        dataObj.formattedFieldValueLabel = dataObj.fieldValueLabel === true ? 'ja' : 'nee'
      } else {
        dataObj.formattedFieldValueLabel = dataObj.fieldValueLabel
      }
    }
  }

  // Report the end result
  console.log(config.name, dataObj)

  return dataObj
}