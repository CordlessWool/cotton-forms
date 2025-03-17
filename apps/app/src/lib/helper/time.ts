export const isExpired = (date: Date): boolean => {
  const now = new Date();
  return now.getTime() > date.getTime();
};
