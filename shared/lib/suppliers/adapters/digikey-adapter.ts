import { DIGIKEY_MOCK_PARTS } from '../mock-data';
import type { SupplierAdapter } from '../types';
import { filterMockPartsByQuery } from './utils';

export const digikeyAdapter: SupplierAdapter = {
  id: 'digikey',
  name: 'Digi-Key',
  enabled: true,
  async searchParts(query: string) {
    return filterMockPartsByQuery(DIGIKEY_MOCK_PARTS, query);
  },
};
