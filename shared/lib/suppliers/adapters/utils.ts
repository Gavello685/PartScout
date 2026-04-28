import { normalizePartNumber } from '../../types/utils';
import type { SupplierPartResult } from '../types';

export function filterMockPartsByQuery(parts: SupplierPartResult[], query: string): SupplierPartResult[] {
  const normalizedQuery = normalizePartNumber(query);

  if (!normalizedQuery) {
    return [];
  }

  return parts.filter((part) => normalizePartNumber(part.manufacturerPartNumber).includes(normalizedQuery));
}
