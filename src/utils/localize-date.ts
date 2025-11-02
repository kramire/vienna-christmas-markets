interface Props {
  date: string | Date
  language: string
  variant?: 'short' | 'default'
}

export const localizeDate = ({ date, language, variant = 'default' }: Props) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString(
    language,
    variant === 'short'
      ? { day: 'numeric', month: 'numeric' }
      : {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
  )
}
