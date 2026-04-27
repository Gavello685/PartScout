export interface SupplierPriceBreak {
  minQuantity: number;
  unitPrice: number;
}

export interface SupplierOffer {
  supplierId: string;
  supplierName: string;
  supplierSku: string;
  stockQuantity: number;
  moq: number;
  priceBreaks: SupplierPriceBreak[];
  currency: string;
  lastCheckedAt: string;
}

export interface SupplierPartResult {
  manufacturerPartNumber: string;
  manufacturer: string;
  description: string;
  datasheetUrl?: string;
  offers: SupplierOffer[];
}

export interface SupplierAdapter {
  id: string;
  name: string;
  enabled: boolean;
  searchParts(query: string): Promise<SupplierPartResult[]>;
}

export interface GroupedPartResult {
  normalizedManufacturerPartNumber: string;
  manufacturerPartNumber: string;
  manufacturer: string;
  description: string;
  datasheetUrl?: string;
  offers: SupplierOffer[];
}

export interface SearchServiceResult {
  query: string;
  normalizedQuery: string;
  parts: GroupedPartResult[];
}
