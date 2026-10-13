import { type Map } from 'mapbox-gl'

/**
 * Mark the pand on a map as a circle layer INSIDE the WebGL canvas. A
 * mapbox-gl Marker is a DOM overlay on top of the canvas, so the MapBox
 * wrapper's canvas→PNG snapshot (the PDF path) would never capture it.
 *
 * With `ring` the mark is an open ring instead of a filled dot, for a map
 * that is zoomed out so far that a dot covers the name of the place it marks;
 * `below` is the layer to draw it under (the map's first label layer), so
 * that name is written over the ring and not the other way round.
 */
export const addPandMarker = function addPandMarker(
  map: Map, longitude: number, latitude: number, { ring = false, below }: { ring?: boolean, below?: string } = {}
) {
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

  if (ring) {
    // The white edge on both sides keeps the ring visible on a dark district.
    map.addLayer({
      id: 'residence-marker-edge',
      type: 'circle',
      source: 'residence-marker',
      paint: {
        'circle-radius': 7.5,
        'circle-opacity': 0,
        'circle-stroke-width': 6,
        'circle-stroke-color': '#ffffff'
      }
    }, below)
    map.addLayer({
      id: 'residence-marker',
      type: 'circle',
      source: 'residence-marker',
      paint: {
        'circle-radius': 9,
        'circle-opacity': 0,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#191e3c'
      }
    }, below)
    return
  }

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
