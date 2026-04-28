import { searchSupplierParts } from '@/shared/lib/services';

interface SearchPageProps {
  searchParams?: Promise<{ q?: string }>;
}

const EXAMPLE_PARTS = ['NE555P', 'LM358', 'ATMEGA328P', 'ESP32-WROOM-32'];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = resolvedSearchParams?.q?.trim() ?? '';
  const result = query ? await searchSupplierParts(query) : undefined;

  return (
    <section>
      <h1>Search Components</h1>
      <p className="page-description">Enter a manufacturer part number to search mock supplier adapters.</p>

      <form className="card" method="get" action="/search">
        <label className="field-label" htmlFor="part-number">
          Manufacturer part number
        </label>
        <input
          id="part-number"
          name="q"
          className="text-input"
          placeholder="e.g. NE555P"
          type="text"
          defaultValue={query}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>

      <div className="card mock-hints">
        <h2>Mock parts you can try</h2>
        <ul>
          {EXAMPLE_PARTS.map((part) => (
            <li key={part}>
              <a href={`/search?q=${encodeURIComponent(part)}`}>{part}</a>
            </li>
          ))}
        </ul>
      </div>

      {result && (
        <div className="search-results">
          <h2>
            Results for <code>{result.query}</code>
          </h2>
          {result.parts.length === 0 ? (
            <p className="page-description">No mock data found for this part number.</p>
          ) : (
            result.parts.map((part) => (
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
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>MOQ</th>
                        <th>Currency</th>
                        <th>Price breaks</th>
                        <th>Last checked</th>
                      </tr>
                    </thead>
                    <tbody>
                      {part.offers.map((offer) => (
                        <tr key={`${offer.supplierId}-${offer.supplierSku}`}>
                          <td>{offer.supplierName}</td>
                          <td>{offer.supplierSku}</td>
                          <td>{offer.stockQuantity}</td>
                          <td>{offer.moq}</td>
                          <td>{offer.currency}</td>
                          <td>
                            {offer.priceBreaks
                              .map((priceBreak) => `${priceBreak.minQuantity}+: ${priceBreak.unitPrice.toFixed(2)}`)
                              .join(', ')}
                          </td>
                          <td>{new Date(offer.lastCheckedAt).toISOString().slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
