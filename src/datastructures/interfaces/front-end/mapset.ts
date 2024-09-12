import { IMapsetLayer } from "../api/Mapset";

export interface IMapsetFE {

  /**
   * Unique identifier in uuid format
   */
  id: string,

  /**
   * Unique string identifier
   */
  slug: string,

  /**
   * The readable name
   */
  name: string,

  /**
   * The slug of the mapset icon
   */
  icon: string,

  /**
   * A mapbox style url
   */
  style: string,

  /**
   * Mapbox layer names
   */
  layers: string[],

  /**
   * Configuration options for the layers
   * TODO: Which options? How do they differ for multiple layers?
   */
  options: { center?: number[] },

  /**
   * Whether the mapset can be shared with others
   */
  public: boolean,

  /**
   * An optional disclaimer, to be shown in a popup that needs to be accepted before presentation of the layer
   */
  consent: null | string,

  /**
   * An optional explanation about the layers included in this mapset
   */
  note: null | string,

  /**
   * The neighborhood reference that should be used as mask on the layerdata.
   *  If no value is provided, all data should be accessible.
   */
  fenceNeighborhood: string[],

  /**
   * The district reference that should be used as mask on the layerdata.
   *  If no value is provided, all data should be accessible.
   */
  fenceDistrict: string[],

  /**
   * The municipality reference that should be used as mask on the layerdata.
   *  If no value is provided, all data should be accessible.
   */
  fenceMunicipality: string[],

  /**
   * Layer styling / legend config
   */
  layerSet: IMapsetLayer[],


  /**
   * Timestamp to mark when the mapset was loaded (allows presentation in order by which the mapsest were loaded)
   */
  loadedAt: number
}