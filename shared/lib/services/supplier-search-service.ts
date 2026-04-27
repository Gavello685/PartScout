import { normalizePartNumber } from '../types/utils';
import type {
  GroupedPartResult,
  SearchServiceResult,
  SupplierAdapter,
  SupplierOffer,
  SupplierPartResult,
} from '../suppliers/types';
import { digikeyAdapter } from '../suppliers/adapters/digikey-adapter';
import { mouserAdapter } from '../suppliers/adapters/mouser-adapter';
import { nexarAdapter } from '../suppliers/adapters/nexar-adapter';

const DEFAULT_ADAPTERS: SupplierAdapter[] = [digikeyAdapter, mouserAdapter, nexarAdapter];

export interface SearchPartsOptions {
  adapters?: SupplierAdapter[];
  enabledAdapterIds?: string[];
}

function mergeGroupedPart(existing: GroupedPartResult | undefined, incoming: SupplierPartResult): GroupedPartResult {
  const normalizedManufacturerPartNumber = normalizePartNumber(incoming.manufacturerPartNumber);
  const existingOffers = existing?.offers ?? [];
  const incomingOffers = incoming.offers;

  const dedupedOffers = new Map<string, SupplierOffer>();

  for (const offer of [...existingOffers, ...incomingOffers]) {
    dedupedOffers.set(`${offer.supplierId}:${offer.supplierSku}`, offer);
  }

  return {
    normalizedManufacturerPartNumber,
    manufacturerPartNumber: existing?.manufacturerPartNumber ?? incoming.manufacturerPartNumber.trim(),
    manufacturer: existing?.manufacturer || incoming.manufacturer,
    description: existing?.description || incoming.description,
    datasheetUrl: existing?.datasheetUrl ?? incoming.datasheetUrl,
    offers: [...dedupedOffers.values()].sort((a, b) => {
      if (a.supplierName !== b.supplierName) {
        return a.supplierName.localeCompare(b.supplierName);
      }

      return a.supplierSku.localeCompare(b.supplierSku);
    }),
  };
}

export async function searchSupplierParts(query: string, options: SearchPartsOptions = {}): Promise<SearchServiceResult> {
  const adapters = options.adapters ?? DEFAULT_ADAPTERS;
  const activeAdapters = adapters.filter((adapter) => {
    if (!adapter.enabled) {
      return false;
    }

    if (!options.enabledAdapterIds || options.enabledAdapterIds.length === 0) {
      return true;
    }

    return options.enabledAdapterIds.includes(adapter.id);
  });

  const adapterResults = await Promise.all(activeAdapters.map((adapter) => adapter.searchParts(query)));

  const groupedByMpn = new Map<string, GroupedPartResult>();

  for (const resultSet of adapterResults) {
    for (const part of resultSet) {
      const key = normalizePartNumber(part.manufacturerPartNumber);
      const existing = groupedByMpn.get(key);
      groupedByMpn.set(key, mergeGroupedPart(existing, part));
    }
  }

  return {
    query,
    normalizedQuery: normalizePartNumber(query),
    parts: [...groupedByMpn.values()].sort((a, b) => a.manufacturerPartNumber.localeCompare(b.manufacturerPartNumber)),
  };
}
