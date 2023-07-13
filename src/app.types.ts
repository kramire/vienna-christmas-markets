interface Result {
  id: number
  name: string
  coordinates: Coordinate
  district: string
  start: string | null
  end: string | null
  times: Array<Array<string> | null> // this is Array<[string, string] | null> but TS complains about JSON
  website: string | null
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
