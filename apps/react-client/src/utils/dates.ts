export const getTodayInFormat = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const formatDate = (dateString: string): string => {
  const [date] = dateString.split('T');
  return date;
};
