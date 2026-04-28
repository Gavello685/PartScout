'use client';

import { FormEvent, useMemo, useState } from 'react';

interface SupplierPriceBreak {
  minQuantity: number;
  unitPrice: number;
}

interface SupplierOffer {
  supplierId: string;
  supplierName: string;
  supplierSku: string;
  stockQuantity: number;
  moq: number;
  priceBreaks: SupplierPriceBreak[];
  currency: string;
  leadTimeDays?: number;
  lastCheckedAt: string;
}

interface GroupedPartResult {
  normalizedManufacturerPartNumber: string;
  manufacturerPartNumber: string;
  manufacturer: string;
  description: string;
  datasheetUrl?: string;
  offers: SupplierOffer[];
}

interface SearchApiResponse {
  query: string;
  normalizedQuery: string;
  parts: GroupedPartResult[];
}

const EXAMPLE_PARTS = ['NE555P', 'LM358', 'ATMEGA328P', 'ESP32-WROOM-32'];

function getUnitPriceAtQuantityOne(offer: SupplierOffer): number | undefined {
  const sortedBreaks = [...offer.priceBreaks].sort((a, b) => a.minQuantity - b.minQuantity);
  const oneQtyBreak = sortedBreaks.find((priceBreak) => priceBreak.minQuantity <= 1);

  if (oneQtyBreak) {
    return oneQtyBreak.unitPrice;
  }

  return sortedBreaks[0]?.unitPrice;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return date.toISOString().slice(0, 10);
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [result, setResult] = useState<SearchApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasSearched = useMemo(() => activeQuery.trim().length > 0, [activeQuery]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    setActiveQuery(trimmedQuery);
    setError(null);

    if (!trimmedQuery) {
      setResult(null);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`);

      if (!response.ok) {
        throw new Error('Search request failed.');
      }

      const data = (await response.json()) as SearchApiResponse;
      setResult(data);
    } catch (requestError) {
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : 'Unexpected error while searching.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h1>Search Components</h1>
      <p className="page-description">Enter a manufacturer part number to search supplier offers.</p>

      <form className="card" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="part-number">
          Manufacturer part number
        </label>
        <input
          id="part-number"
          name="q"
          className="text-input"
          placeholder="e.g. NE555P"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="card mock-hints">
        <h2>Example parts</h2>
        <ul>
          {EXAMPLE_PARTS.map((part) => (
            <li key={part}>
              <button
                className="link-button"
                type="button"
                onClick={() => {
                  setQuery(part);
                  setActiveQuery(part);
                  setError(null);
                  setIsLoading(true);
                  fetch(`/api/search?q=${encodeURIComponent(part)}`)
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error('Search request failed.');
                      }

                      return response.json() as Promise<SearchApiResponse>;
                    })
                    .then((data) => setResult(data))
                    .catch((requestError) => {
                      setResult(null);
                      setError(requestError instanceof Error ? requestError.message : 'Unexpected error while searching.');
                    })
                    .finally(() => setIsLoading(false));
                }}
              >
                {part}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isLoading && <p className="card">Loading search results...</p>}

      {!isLoading && error && (
        <p className="card error-text" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && hasSearched && result && result.parts.length === 0 && (
        <p className="card">No results found for this manufacturer part number.</p>
      )}

      {!isLoading && !error && result && result.parts.length > 0 && (
        <div className="search-results">
          <h2>
            Results for <code>{result.query}</code>
          </h2>
          {result.parts.map((part) => (
            <article className="card" key={part.normalizedManufacturerPartNumber}>
              <div>
                <h3>{part.manufacturerPartNumber}</h3>
                <p className="page-description">
                  {part.manufacturer} · {part.description}
                </p>
                {part.datasheetUrl && (
                  <p>
                    <a href={part.datasheetUrl} target="_blank" rel="noreferrer">
                      Datasheet
                    </a>
                  </p>
                )}
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>Supplier SKU</th>
                      <th>Stock</th>
                      <th>MOQ</th>
                      <th>Unit price @ 1</th>
                      <th>Currency</th>
                      <th>Lead time</th>
                      <th>Last checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {part.offers.map((offer) => {
                      const unitPriceAtOne = getUnitPriceAtQuantityOne(offer);

                      return (
                        <tr key={`${offer.supplierId}-${offer.supplierSku}`}>
                          <td>{offer.supplierName}</td>
                          <td>{offer.supplierSku}</td>
                          <td>{offer.stockQuantity}</td>
                          <td>{offer.moq}</td>
                          <td>{typeof unitPriceAtOne === 'number' ? unitPriceAtOne.toFixed(2) : 'N/A'}</td>
                          <td>{offer.currency}</td>
                          <td>{typeof offer.leadTimeDays === 'number' ? `${offer.leadTimeDays} days` : 'N/A'}</td>
                          <td>{formatDate(offer.lastCheckedAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
