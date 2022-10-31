export interface Market {
  id: number;
  name: string;
  district: string;
  start: string;
  end: string;
  times: Array<[string, string] | null>;
}
