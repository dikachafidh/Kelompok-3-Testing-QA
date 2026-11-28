import { describe, it, expect } from 'vitest';

// Unit kode dari src/lib/doku.ts (RizzFlow)
function calculatePromoDiscount(
  subtotal: number,
  discountPercent: number,
  maxDiscountAmount: number
) {
  const safeSubtotal = Math.max(0, Number(subtotal) || 0);
  const safePercent = Math.min(100, Math.max(0, Number(discountPercent) || 0));
  const safeMax = Math.max(0, Number(maxDiscountAmount) || 0);

  const rawDiscount = Math.round((safeSubtotal * safePercent) / 100);
  const discountAmount =
    safeMax > 0 ? Math.min(rawDiscount, safeMax) : rawDiscount;
  const finalAmount = Math.max(0, safeSubtotal - discountAmount);

  return { discountAmount, finalAmount };
}

describe('White-Box Basis Path Testing: calculatePromoDiscount', () => {
  it('Path 1: Diskon dibatasi oleh maxDiscountAmount (safeMax > 0)', () => {
    const result = calculatePromoDiscount(100000, 50, 20000);
    expect(result).toEqual({ discountAmount: 20000, finalAmount: 80000 });
  });

  it('Path 2: Diskon tanpa batas maksimum (safeMax === 0)', () => {
    const result = calculatePromoDiscount(100000, 10, 0);
    expect(result).toEqual({ discountAmount: 10000, finalAmount: 90000 });
  });

  it('Boundary: Input negatif dan persen > 100 dinormalisasi', () => {
    const result = calculatePromoDiscount(-5000, 150, -100);
    expect(result).toEqual({ discountAmount: 0, finalAmount: 0 });
  });
});