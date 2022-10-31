export const localizeDate = (date: string | Date) => {
  const navLang = navigator.language;

  if (typeof date === 'string') {
    const dateFromString = new Date(date);
    return dateFromString.toLocaleDateString(navLang);
  }

  return date.toLocaleDateString(navLang);
};
