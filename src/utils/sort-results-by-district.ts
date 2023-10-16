import { Market, Event } from '../app.types'

export default function sortResultsByDistrict(resultA: Market | Event, resultB: Market | Event) {
  return Number(resultA.district) - Number(resultB.district)
}
