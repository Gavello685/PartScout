export interface NormalizedPart {
  id: string;
  manufacturer: string;
  manufacturerPartNumber: string;
  normalizedPartNumber: string;
  description?: string;
  category?: string;
  lifecycleStatus?: 'active' | 'nrnd' | 'obsolete' | 'unknown';
}

export interface NormalizedPriceBreak {
  minQuantity: number;
  unitPrice: number;
  currency: string;
}

export interface NormalizedSupplierOffer {
  supplierId: string;
  supplierName: string;
  supplierSku: string;
  partId: string;
  stockQuantity: number;
  moq: number;
  leadTimeDays?: number;
  priceBreaks: NormalizedPriceBreak[];
  updatedAt: string;
}

export interface PartSearchResult {
  query: string;
  normalizedQuery: string;
  exactMatch: boolean;
  parts: NormalizedPart[];
}

export interface BomUploadRow {
  lineNumber: number;
  rawPartNumber: string;
  normalizedPartNumber: string;
  quantity: number;
  referenceDesignators?: string[];
  description?: string;
}

export interface BomMatchResult {
  bomRow: BomUploadRow;
  matchedPart?: NormalizedPart;
  candidateParts: NormalizedPart[];
  status: 'matched' | 'ambiguous' | 'unmatched';
}

export interface PurchasePlanLine {
  bomLineNumber: number;
  part: NormalizedPart;
  supplierOffer: NormalizedSupplierOffer;
  requestedQuantity: number;
  orderedQuantity: number;
  unitPrice: number;
  lineCost: number;
}

export interface PurchasePlan {
  strategy: 'lowest_total_cost' | 'fewest_suppliers';
  lines: PurchasePlanLine[];
  currency: string;
  totalCost: number;
  suppliersUsed: string[];
}
