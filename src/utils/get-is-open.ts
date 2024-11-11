export const getIsOpen = (startDate: string, endDate: string, times: Array<Array<string> | null>) => {
  // Localize current date and time to Vienna timezone
  const now = new Date()
  const localizedDateString = now.toLocaleString('en-US', { timeZone: 'Europe/Vienna' })
  const localizedDate = new Date(localizedDateString)

  // Determine the day of the week in a 0-based format (0 = Monday, 6 = Sunday)
  const dayOfWeek = (localizedDate.getDay() + 6) % 7
  const todayTimes = times[dayOfWeek]

  if (!todayTimes) return null // Closed on this day

  // Check if the current date is within the open date range
  const start = parseDateString(startDate)
  const end = parseDateString(endDate)
  if (start > localizedDate || end < localizedDate) {
    return false
  }

  // Convert startTime and endTime to today's Date objects for comparison
  const [startTime, endTime] = todayTimes
  const startDateTime = setTimeOnDate(localizedDate, startTime)
  const endDateTime = setTimeOnDate(localizedDate, endTime)

  return startDateTime <= localizedDate && localizedDate <= endDateTime
}

// Helper function to parse date strings
const parseDateString = (date: string | Date) => {
  return typeof date === 'string' ? new Date(date) : date
}

// Helper function to create Date objects for today with specific hours and minutes
const setTimeOnDate = (date: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  const dateTime = new Date(date)
  dateTime.setHours(hours, minutes, 0, 0) // Set to HH:mm:00.000
  return dateTime
}
