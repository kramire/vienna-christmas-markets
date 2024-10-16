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

export enum Offering {
  OFFERING_GASTRONOMY = 'OFFERING_GASTRONOMY',
  OFFERING_SHOPPING = 'OFFERING_SHOPPING',
  OFFERING_CURLING = 'OFFERING_CURLING',
}

export enum ResultType {
  MARKET = 'MARKET',
  EVENT = 'EVENT',
}

export interface Market extends Result {
  type: ResultType.MARKET
}

export interface Event extends Result {
  type: ResultType.EVENT
}

export type FilterType = 'openNow' | 'favorited' | 'nearMe'

export interface Coordinate {
  lat: number
  lng: number
}

export enum Routes {
  HOME = '/',
  MARKETS = '/markets',
  EVENTS = '/events',
  VISITS = '/visits',
}

export enum SortType {
  DATE = 'DATE',
  DISTRICT = 'DISTRICT',
}
