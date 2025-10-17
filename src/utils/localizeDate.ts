export const localizeDate = (date: string | Date, language: string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(language, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
