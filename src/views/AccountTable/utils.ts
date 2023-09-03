export const getCurentYearRange = () => {
  const currentYear = new Date().getFullYear();
  const firstJanuary = new Date(currentYear, 0, 1);

  return [firstJanuary, new Date()];
};