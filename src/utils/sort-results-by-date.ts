import { Market, Event } from '../App.types'

export default function sortResultsByDate(resultA: Market | Event, resultB: Market | Event) {
  if (!resultA.start && resultB.start) {
    return 1
  }

  if (resultA.start && !resultB.start) {
    return -1
  }

  if (resultA.start && resultB.start) {
    const startA = new Date(resultA.start)
    const startB = new Date(resultB.start)

    return startA.getTime() - startB.getTime()
  }

  return 0
}
