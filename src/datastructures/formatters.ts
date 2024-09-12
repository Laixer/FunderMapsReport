

export const toEuro = function toEuro(value: string|number): string { 
  // \u20AC - euro sign
  return `${parseFloat(value+'').toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}`
}

export const toMMYear = function toMMYear(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} mm/jaar`
}

export const toMeters = function toMeters(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} m`
}

export const toSquareM = function toSquareM(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} m2`
}

export const toCubicM = function toCubicM(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} m3`
}

export const toNAP = function toNAP(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} m t.o.v. NAP`
}

export const toMM = function toMM(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} mm`
}

export const toKN = function toKN(value: string|number): string {
  return `${parseFloat(value+'').toFixed(2)} kN`
}

export const toScale = function toScale(value: string|number): string {
  return `1:${parseFloat(value+'').toFixed(0)}`
}

// example input format: 2022-05-11T15:09:24.289848Z
// desired output dd-mm-jjjj
export const toFormattedDate = function toFormattedDate(value: string): string {
  try {
    if (value === '') return value 

    return (new Date(value)).toLocaleDateString("nl-NL", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  } catch(e) {
    return value
  }
}

// 2022-05-11T15:09:24.289848Z => 2022
export const toYear = function toYear(value: string|number): string {
  return `${value}`.substring(0, 4)
}
