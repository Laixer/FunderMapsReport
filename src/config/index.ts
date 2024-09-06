/**
 * Generic configuration 
 */

export const apiBasePath = import.meta.env.VITE_FUNDERMAPS_URL || '' 

export const feedbackLink = 'https://feedback.fundermaps.com/building/' // + buildingId
export const incidentLink = 'https://incident.fundermaps.com/'


export const CHART_COLORS = {
  green: "rgb(40, 204, 139)",
  blue: "rgb(23, 164, 234)",
  yellow: "rgb(255, 204, 105)",
  orange: "rgb(234, 93, 23)",
  red: "rgb(237, 28, 36)",
  pink: "rgb(206, 0, 124)",
  grey: "rgb(127, 143, 164)",
};

export const CHART_TRANSPARENT_COLORS = {
  green: "rgb(40, 204, 139, 0.5)",
  blue: "rgb(23, 164, 234, 0.5)",
  yellow: "rgb(255, 204, 105, 0.5)",
  orange: "rgb(234, 93, 23, 0.5)",
  red: "rgb(237, 28, 36, 0.5)",
  pink: "rgb(206, 0, 124, 0.5)",
  grey: "rgb(127, 143, 164, 0.5)",
}