export const formatDate = (dateString: string): string => {
  const [date] = dateString.split('T');
  return date;
};
