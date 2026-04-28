import Papa from "papaparse";

const REQUIRED_COLUMNS = ["part_number", "quantity"] as const;
const OPTIONAL_COLUMNS = ["description"] as const;
const ALLOWED_COLUMNS: Set<string> = new Set([...REQUIRED_COLUMNS, ...OPTIONAL_COLUMNS]);

type BomCsvRowRecord = {
  part_number?: string;
  quantity?: string;
  description?: string;
};

export type BomPreviewRow = {
  rowNumber: number;
  partNumber: string;
  quantityRaw: string;
  quantity: number | null;
  description: string;
  errors: string[];
};

export type BomParseResult = {
  headerErrors: string[];
  rows: BomPreviewRow[];
};

export function parseBomCsv(csvText: string): BomParseResult {
  const parseResult = Papa.parse<BomCsvRowRecord>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim().toLowerCase(),
    transform: (value) => value.trim()
  });

  const headerErrors: string[] = [];

  if (parseResult.meta.fields) {
    for (const requiredColumn of REQUIRED_COLUMNS) {
      if (!parseResult.meta.fields.includes(requiredColumn)) {
        headerErrors.push(`Missing required column: ${requiredColumn}`);
      }
    }

    for (const header of parseResult.meta.fields) {
      if (!ALLOWED_COLUMNS.has(header)) {
        headerErrors.push(`Unsupported column: ${header}`);
      }
    }
  }

  if (parseResult.errors.length > 0) {
    for (const parseError of parseResult.errors) {
      headerErrors.push(`CSV parse error: ${parseError.message}`);
    }
  }

  const rows = parseResult.data.map((row, index) => {
    const errors: string[] = [];

    const partNumber = row.part_number ?? "";
    const quantityRaw = row.quantity ?? "";
    const description = row.description ?? "";

    if (!partNumber) {
      errors.push("part_number is required");
    }

    if (!quantityRaw) {
      errors.push("quantity is required");
    }

    let quantity: number | null = null;

    if (quantityRaw) {
      const parsedQuantity = Number.parseInt(quantityRaw, 10);
      const isPositiveInteger = /^\d+$/.test(quantityRaw) && parsedQuantity > 0;

      if (!isPositiveInteger) {
        errors.push("quantity must be a positive integer");
      } else {
        quantity = parsedQuantity;
      }
    }

    return {
      rowNumber: index + 2,
      partNumber,
      quantityRaw,
      quantity,
      description,
      errors
    };
  });

  return {
    headerErrors,
    rows
  };
}
