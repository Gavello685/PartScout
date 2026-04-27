import type { NormalizedPriceBreak } from './domain';

export function normalizePartNumber(input: string): string {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function getUnitPriceForQuantity(
  priceBreaks: NormalizedPriceBreak[],
  quantity: number,
): number | undefined {
  if (quantity <= 0 || priceBreaks.length === 0) {
    return undefined;
  }

  const sortedBreaks = [...priceBreaks].sort(
    (a, b) => a.minQuantity - b.minQuantity,
  );

  let selectedPrice: number | undefined;

  for (const priceBreak of sortedBreaks) {
    if (quantity >= priceBreak.minQuantity) {
      selectedPrice = priceBreak.unitPrice;
    }
  }

  return selectedPrice ?? sortedBreaks[0]?.unitPrice;
}

export function calculateEffectiveLineCost(
  quantity: number,
  moq: number,
  unitPrice: number,
): number {
  const effectiveQuantity = Math.max(quantity, moq);
  return effectiveQuantity * unitPrice;
}
