interface Result {
  id: number;
  name: string;
  district: string;
  start: string;
  end: string;
  times: Array<[string, string] | null>;
  website: string;
}

export enum ResultType {
  MARKET = 'MARKET',
  EVENT = 'EVENT',
}

export interface Market extends Result {
  type: ResultType.MARKET;
}

export interface Event extends Result {
  type: ResultType.EVENT;
}

export enum PageType {
  HOME = 'HOME',
  MARKETS = 'MARKETS',
  EVENTS = 'EVENTS',
  FAVORITES = 'FAVORITES',
  VISITS = 'VISITS',
}
