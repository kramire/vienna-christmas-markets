export const getIsClosedForSeason = (endDate: string) => {
  const now = new Date()

  const localizedDateString = now.toLocaleString('en-US', {
    timeZone: 'Europe/Vienna',
  })

  const localizedDate = new Date(localizedDateString)

  return formatAsDate(endDate) < localizedDate
}

const formatAsDate = (date: string | Date) => {
  if (typeof date === 'string') {
    return new Date(date)
  }
  return date
}
