export const isOpen = (startDate: string) => {
  const today = new Date();

  if (typeof startDate === 'string') {
    const startDateFromString = new Date(startDate);
    return startDateFromString < today;
  }

  return startDate < today;
};
