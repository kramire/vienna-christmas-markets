import { Market, Event, StreetLights } from '../App.types'

export default function sortResultsByDistrict(
  resultA: Market | Event | StreetLights,
  resultB: Market | Event | StreetLights,
) {
  return Number(resultA.district) - Number(resultB.district)
}
