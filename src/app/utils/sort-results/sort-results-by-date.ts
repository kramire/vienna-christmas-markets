 import { Market, Event } from '../../App.types'

export function sortResultsByDate(resultA: Market | Event, resultB: Market | Event) {
  if (!resultA.start && resultB.start) {
    return 1
  }

  if (resultA.start && !resultB.start) {
    return -1
  }

  if (resultA.start && resultB.start) {
    const startA = new Date(resultA.start)
    const startB = new Date(resultB.start)
    const currentYear = new Date().getFullYear()

    const outdatedA = startA.getFullYear() < currentYear
    const outdatedB = startB.getFullYear() < currentYear

    if (outdatedA !== outdatedB) {
      return outdatedA ? 1 : -1
    }

    return startA.getTime() - startB.getTime()
  }

  return 0
}