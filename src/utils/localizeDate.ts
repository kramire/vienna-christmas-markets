export const localizeDate = (date: string | Date, language: string) => {
  if (typeof date === 'string') {
    const dateFromString = new Date(date)
    return dateFromString.toLocaleDateString(language)
  }

  return date.toLocaleDateString(language)
}
