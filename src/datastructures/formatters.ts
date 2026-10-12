export const toEuro = function toEuro(value: string | number): string {
  // \u20AC - euro sign
  return `${parseFloat(value + '').toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}`
}

// Dutch notation with two decimals: 39,20 and 1.072,50 (toFixed gives a decimal point).
const toDecimals = function toDecimals(value: string | number): string {
  return parseFloat(value + '').toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const toMMYear = function toMMYear(value: string | number): string {
  return `${toDecimals(value)} mm/jaar`
}

export const toMeters = function toMeters(value: string | number): string {
  return `${toDecimals(value)} m`
}

export const toSquareM = function toSquareM(value: string | number): string {
  return `${toDecimals(value)} m²`
}

export const toCubicM = function toCubicM(value: string | number): string {
  return `${toDecimals(value)} m³`
}

export const toNAP = function toNAP(value: string | number): string {
  return `${toDecimals(value)} m t.o.v. NAP`
}

// Depth below ground level, in the map app's wording for the same field.
export const toMaaiveld = function toMaaiveld(value: string | number): string {
  return `${toDecimals(value)} m beneden maaiveldniveau`
}

export const toMM = function toMM(value: string | number): string {
  return `${toDecimals(value)} mm`
}

export const toKN = function toKN(value: string | number): string {
  return `${toDecimals(value)} kN`
}

export const toScale = function toScale(value: string | number): string {
  return `1:${parseFloat(value + '').toFixed(0)}`
}

// example input format: 2022-05-11T15:09:24.289848Z
// desired output dd-mm-jjjj
export const toFormattedDate = function toFormattedDate(value: string | number): string {
  try {
    if (value === '') return value as string

    return (new Date(value)).toLocaleDateString("nl-NL", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return String(value)
  }
}

// 2022-05-11T15:09:24.289848Z => 2022
export const toYear = function toYear(value: string | number): string {
  return `${value}`.substring(0, 4)
}
