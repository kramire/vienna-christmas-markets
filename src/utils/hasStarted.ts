// technically should be localized, but assuming user is in same time zone

export const hasStarted = (startDate: string) => {
  if (!startDate) return false

  const today = new Date()

  if (typeof startDate === 'string') {
    const startDateFromString = new Date(startDate)
    return startDateFromString < today
  }

  return startDate < today
}
