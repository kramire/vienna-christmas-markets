export const getIsClosedForSeason = (endDate: string) => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  return end < now
}
