interface Result {
  id: number
  slug: string
  name: string
  isActive: boolean
  coordinates: Coordinate
  transportation: Array<string>
  district: string
  address: string
  start: string | null
  end: string | null
  times: Array<Array<string> | null> // this is Array<[string, string] | null> but TS complains about JSON
  website: string | null
  offerings: Array<Offering>
}

export interface StreetLights
  extends Pick<Result, 'id' | 'slug' | 'name' | 'isActive' | 'coordinates' | 'district' | 'address'> {
  type: ResultType.STREET_LIGHTS
  locationType: 'STREET' | 'SQUARE'
}

export enum Offering {
  OFFERING_GASTRONOMY = 'OFFERING_GASTRONOMY',
  OFFERING_SHOPPING = 'OFFERING_SHOPPING',
  OFFERING_CURLING = 'OFFERING_CURLING',
  OFFERING_ICE_SKATING = 'OFFERING_ICE_SKATING',
  OFFERING_KIDS_RIDES = 'OFFERING_KIDS_RIDES',
}

export enum ResultType {
  MARKET = 'MARKET',
  EVENT = 'EVENT',
  STREET_LIGHTS = 'STREET_LIGHTS',
}

export interface Market extends Result {
  type: ResultType.MARKET
}

export interface Event extends Result {
  type: ResultType.EVENT
}

export enum FilterType {
  OPEN_NOW = 'OPEN_NOW',
  FAVORITE = 'FAVORITE',
  NEAR_ME = 'NEAR_ME',
}

export interface Coordinate {
  lat: number
  lng: number
}

export enum Routes {
  HOME = '/',
  MARKETS = '/markets',
  EVENTS = '/events',
  VISITS = '/visits',
  LIGHTS = '/lights',
  ROUTES = '/routes',
  MAP = '/map',
}

export enum SortType {
  DATE = 'DATE',
  DISTRICT = 'DISTRICT',
}

interface RouteStop {
  id: number
  type: ResultType
  description: string
  order: number
}

export interface Route {
  id: number
  slug: string
  name: string
  district: string
  coverImgResultId: number
  distance: string
  description: string
  stops: Array<RouteStop>
  mapZoom: number
}
