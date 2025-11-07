export interface Result {
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
  alternateTimes?: Array<{ date: string; time: Array<Array<string> | null> }>
  description?: string
  prices?: Array<Price>
}

export interface Price {
  type: PriceType
  value: number
  currency: string
  hasRange?: boolean
}

export enum PriceType {
  CURLING_PER_HALF_HOUR = 'CURLING_PER_HALF_HOUR',
  CURLING_PER_HOUR = 'CURLING_PER_HOUR',
  ICE_SKATING_ADULTS = 'ICE_SKATING_ADULTS',
  ICE_SKATING_KIDS = 'ICE_SKATING_KIDS',
  PUNCH = 'PUNCH',
  MULLED_WINE = 'MULLED_WINE',
  NON_ALCOHOLIC = 'NON_ALCOHOLIC',
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
  CURLING = 'CURLING',
  FAMILY_ORIENTED = 'FAMILY_ORIENTED',
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
  nextDirections?: string
}

export interface Route {
  id: number
  slug: string
  name: string
  district: string
  coverImgResultId: number
  distance: string
  hasPublicTransport: boolean
  estimatedTime: string
  description: string
  stops: Array<RouteStop>
  mapZoom: number
}
