/**
 * Note: The API provides these values in a plain string property, not an ENUM
 */
export enum ESoil {
  az = "az",
  du = "du",
  hl = "hl",
  hz = "hz",
  lv = "lv",
  ni = "ni",
  "ni-du" = "ni-du",
  "ni-hl" = "ni-hl",
  "ni-lv" = "ni-lv",
  "ni-hz" = "ni-hz",
  "ni-zk" = "ni-zk",
  ri = "ri",
  zk = "zk"
}

export const ESoilLabels: Map<ESoil, string> = new Map([
  [ESoil.az, "Afgesloten Zeearmen"],
  [ESoil.du, "Duinen"],
  [ESoil.hl, "Heuvelland"],
  [ESoil.hz, "Zandgronden"],
  [ESoil.lv, "Laagveengronden"],
  [ESoil.ni, "Stedelijk gebied"],
  [ESoil["ni-du"], "Duinen"],
  [ESoil["ni-hl"], "Heuvelland"],
  [ESoil["ni-lv"], "Laagveengronden"],
  [ESoil["ni-hz"], "Zandgronden"],
  [ESoil["ni-zk"], "Zeekleigebied"],
  [ESoil.ri, "Rivierengebied"],
  [ESoil.zk, "Zeekleigebied"]
]);

