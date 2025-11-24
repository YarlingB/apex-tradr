export const calculatePercentChange = (
  currentPrice: number,
  basePrice: number,
): string | number => {
  if (basePrice === 0 || isNaN(basePrice)) return 'N/A';
  const marginalPercent = ((currentPrice - basePrice) / basePrice) * 100;
  return marginalPercent;
};
