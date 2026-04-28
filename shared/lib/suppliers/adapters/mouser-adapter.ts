import { MOUSER_MOCK_PARTS } from '../mock-data';
import type { SupplierAdapter } from '../types';
import { filterMockPartsByQuery } from './utils';

export const mouserAdapter: SupplierAdapter = {
  id: 'mouser',
  name: 'Mouser',
  enabled: true,
  async searchParts(query: string) {
    return filterMockPartsByQuery(MOUSER_MOCK_PARTS, query);
  },
};
