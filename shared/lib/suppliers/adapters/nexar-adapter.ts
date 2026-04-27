import { NEXAR_MOCK_PARTS } from '../mock-data';
import type { SupplierAdapter } from '../types';
import { filterMockPartsByQuery } from './utils';

export const nexarAdapter: SupplierAdapter = {
  id: 'nexar',
  name: 'Nexar/Octopart',
  enabled: true,
  async searchParts(query: string) {
    return filterMockPartsByQuery(NEXAR_MOCK_PARTS, query);
  },
};
