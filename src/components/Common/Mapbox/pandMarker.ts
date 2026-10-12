import { type Map } from 'mapbox-gl'

/**
 * Mark the pand on a map as a circle layer INSIDE the WebGL canvas. A
 * mapbox-gl Marker is a DOM overlay on top of the canvas, so the MapBox
 * wrapper's canvas→PNG snapshot (the PDF path) would never capture it.
 */
export const addPandMarker = function addPandMarker(map: Map, longitude: number, latitude: number) {
  map.addSource('residence-marker', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    }
  })
  map.addLayer({
    id: 'residence-marker',
    type: 'circle',
    source: 'residence-marker',
    paint: {
      'circle-radius': 9,
      'circle-color': '#191e3c',
      'circle-stroke-width': 3,
      'circle-stroke-color': '#ffffff'
    }
  })
}
