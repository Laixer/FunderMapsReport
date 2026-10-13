import { type ICombinedInquiryData, type IInquirySample } from '@/datastructures/interfaces'
import { inquirySampleFieldLabels } from '@/datastructures/fieldLabels'
import { FieldDataConfig, applyContextToFieldDataConfigs, retrieveAndFormatFieldData } from '@/utils/fieldData'

/**
 * The values the Fundering chapter prints from a report's sample, in the
 * order it prints them. (The row above them, the reliability of the
 * foundation type, comes from the model.)
 *
 * The blocks "Palen & Hout" and "Niveau & Kwaliteit" are switched off and
 * therefore not listed: a report with nothing but those would still leave
 * the chapter empty. If they are ever shown, their fields belong here.
 */
export const foundationSampleFieldNames = [
  'enforcementTerm',
  'damageCharacteristics',
  'overallQuality',
  'damageCause',
  'substructure',
]

/**
 * Whether a sample has a value to print for at least one of those fields.
 * Asked of the same formatter the chapter prints with, so the two cannot
 * disagree about what counts as a value.
 */
export const sampleHasFoundationData = function sampleHasFoundationData(sample?: IInquirySample): boolean {
  if (!sample) return false

  return applyContextToFieldDataConfigs({
    source: sample,
    labels: inquirySampleFieldLabels,
    configs: foundationSampleFieldNames.map(name => new FieldDataConfig({ name }))
  })
    .map(retrieveAndFormatFieldData)
    .some(field => field.value !== null && field.value !== undefined && field.value !== '' && field.value !== 'Geen data')
}

/**
 * The report (with its sample) the Fundering chapter shows: the newest one
 * that has something to show there. The newest report of a pand is often a
 * gevelscan or QuickScan row without any of these values; picking that one
 * left the chapter at "Geen data" while an older funderingsonderzoek had them.
 *
 * `entries` is newest report first (the store sorts it). When no report has
 * any of the values, the newest one is shown, as before.
 */
export const pickFoundationEntry = function pickFoundationEntry(entries: ICombinedInquiryData[]): ICombinedInquiryData | undefined {
  return entries.find(entry => sampleHasFoundationData(entry.sample)) ?? entries[0]
}
