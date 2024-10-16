import { Market, Event } from '../App.types'

export default function sortResultsByDistrict(resultA: Market | Event, resultB: Market | Event) {
  return Number(resultA.district) - Number(resultB.district)
}
