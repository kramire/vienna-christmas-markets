import { WEBSITE_URL } from '../../../App.constants'
import type { Result } from '../../../App.types'

const TIME_ZONE = 'Europe/Vienna'

function viennaLocalToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  // Start with the local date/time interpreted as UTC.
  const desired = Date.UTC(year, month - 1, day, hour, minute)
  let result = desired

  // Correct for the Europe/Vienna UTC offset, including DST.
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })

  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(
      formatter
        .formatToParts(new Date(result))
        .filter((part) => part.type !== 'literal')
        .map((part) => [part.type, Number(part.value)]),
    )

    const representedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second)

    result = desired - (representedAsUtc - result)
  }

  const check = formatter.formatToParts(new Date(result))
  const values = Object.fromEntries(
    check.filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]),
  )

  if (
    values.year !== year ||
    values.month !== month ||
    values.day !== day ||
    values.hour !== hour ||
    values.minute !== minute
  ) {
    throw new Error('The selected local time does not exist in Vienna.')
  }

  return new Date(result)
}

function formatUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

export function createCalendarFile(result: Result): string {
  if (!result.start) {
    throw new Error('This market has no opening date.')
  }

  const { start, times, slug, id, name, description, address, coordinates } = result

  const startDate = new Date(start)
  const year = startDate.getFullYear()
  const month = startDate.getMonth() + 1
  const day = startDate.getDate()

  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  const mondayFirstIndex = (weekday + 6) % 7

  const openingTime = times?.[mondayFirstIndex]?.[0]
  const closingTime = times?.[mondayFirstIndex]?.[1]

  if (!openingTime || !/^([01]\d|2[0-3]):[0-5]\d$/.test(openingTime) || !closingTime || !/^([01]\d|2[0-3]):[0-5]\d$/.test(closingTime)) {
    throw new Error('No valid opening time is available for this date.')
  }

  const [startHour, startMinutes] = openingTime.split(':').map(Number)
  const startTime = viennaLocalToUtc(year, month, day, startHour, startMinutes)
  
  const [closingHour, closingMinute] = closingTime.split(':').map(Number)
  const end = viennaLocalToUtc(year, month, day, closingHour, closingMinute)

  const calDescription = [description?.trim(), `${WEBSITE_URL}/${slug}`].filter(Boolean).join('\n\n')

  const uid = `${id}@vienna-christmas-markets.netlify.app`
  const now = formatUtc(new Date())

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vienna Christmas Markets//Market Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatUtc(startTime)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${name}`,
    `DESCRIPTION:${calDescription}`,
    `LOCATION:${address}`,
    `GEO:${coordinates.lat};${coordinates.lng}`,
    `URL:${WEBSITE_URL}/${slug}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${name}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return lines.join('\r\n') + '\r\n'
}
