
/**
 * https://api.pdok.nl/bzk/locatieserver/search/v3_1/ui/#/
 */
export interface IPDOKSuggestion {
  type: string,
  weergavenaam: string,
  adrestype: null | string
  id: string,
  score: number
}