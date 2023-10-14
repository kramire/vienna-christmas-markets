export const getIsOpen = (startDate: string, endDate: string, times: Array<Array<string> | null>) => {
  const now = new Date()
  const localizedDateString = now.toLocaleString('en-US', {
    timeZone: 'Europe/Vienna',
  })
  const localizedDate = new Date(localizedDateString)

  const dow = localizedDate.getDay()
  const dowAdjusted = dow === 0 ? 6 : dow - 1

  const todayTimes = times[dowAdjusted]
  if (!todayTimes) return null

  if (formatAsDate(startDate) > localizedDate || formatAsDate(endDate) < localizedDate) {
    return false
  }

  const [startTime, endTime] = todayTimes

  const localizedTimeString = now.toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Vienna',
  })

  return startTime < localizedTimeString && localizedTimeString < endTime
}

const formatAsDate = (date: string | Date) => {
  if (typeof date === 'string') {
    return new Date(date)
  }
  return date
}
