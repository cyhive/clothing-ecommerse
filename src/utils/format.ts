import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/sarees';

export function formatPrice(amountInINR: number, currency: Currency): string {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = Math.round(amountInINR * rateInfo.rate);

  if (currency === 'INR') {
    return `${rateInfo.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${rateInfo.symbol}${converted.toLocaleString('en-US')}`;
}

export function calculateDiscount(original: number, current: number): number {
  if (original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
