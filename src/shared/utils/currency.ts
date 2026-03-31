export const DEFAULT_INR_PER_USD = 83;

export function formatUSDFromINR(inr: number, inrPerUsd: number = DEFAULT_INR_PER_USD) {
  const usd = Number(inr) / inrPerUsd;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usd);
}

