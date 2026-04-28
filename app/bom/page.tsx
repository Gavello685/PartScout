"use client";

import { ChangeEvent, useMemo, useState } from "react";
import Link from "next/link";
import { parseBomCsv } from "@/shared/lib/services/bom-csv";

type ParsedBomState = {
  fileName: string;
  headerErrors: string[];
  rows: ReturnType<typeof parseBomCsv>["rows"];
};

const SAMPLE_CSV = `part_number,quantity,description
NE555P,10,Timer IC for pulse generation
LM358,6,Dual op amp
ATMEGA328P,2,Main microcontroller
ESP32-WROOM-32,3,Wi-Fi module`;

export default function BomListPage() {
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedBom, setParsedBom] = useState<ParsedBomState | null>(null);

  const hasRowErrors = useMemo(() => parsedBom?.rows.some((row) => row.errors.length > 0) ?? false, [parsedBom]);

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    setParseError(null);
    setParsedBom(null);

    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      const csvContent = await selectedFile.text();
      const parseResult = parseBomCsv(csvContent);

      setParsedBom({
        fileName: selectedFile.name,
        headerErrors: parseResult.headerErrors,
        rows: parseResult.rows
      });
    } catch {
      setParseError("Could not read file. Please upload a valid CSV file.");
    }
  }

  return (
    <section>
      <h1>BOM Uploads</h1>
      <p className="page-description">Upload and preview bill-of-material CSV files.</p>

      <div className="card">
        <label className="field-label" htmlFor="bom-upload">
          Upload BOM CSV
        </label>
        <input accept=".csv,text/csv" className="text-input" id="bom-upload" onChange={handleFileUpload} type="file" />
        <p className="hint-text">Accepted columns: part_number, quantity, and optional description.</p>
        <p className="hint-text">
          Try the sample file: <Link href="/sample-bom.csv">sample-bom.csv</Link>
        </p>
        <details>
          <summary>Sample CSV preview</summary>
          <pre className="sample-csv">{SAMPLE_CSV}</pre>
        </details>
      </div>

      {parseError ? <p className="error-text">{parseError}</p> : null}

      {parsedBom ? (
        <div className="card">
          <h2>Preview: {parsedBom.fileName}</h2>
          {parsedBom.headerErrors.length > 0 ? (
            <div>
              {parsedBom.headerErrors.map((error) => (
                <p className="error-text" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}

          {parsedBom.rows.length === 0 ? <p>No rows found in CSV.</p> : null}

          {parsedBom.rows.length > 0 ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Part Number</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Validation</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedBom.rows.map((row) => (
                    <tr key={row.rowNumber}>
                      <td>{row.rowNumber}</td>
                      <td>{row.partNumber || "—"}</td>
                      <td>{row.quantity ?? (row.quantityRaw || "—")}</td>
                      <td>{row.description || "—"}</td>
                      <td>
                        {row.errors.length > 0 ? (
                          <ul className="row-errors">
                            {row.errors.map((error) => (
                              <li className="error-text" key={`${row.rowNumber}-${error}`}>
                                {error}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "Valid"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {hasRowErrors || parsedBom.headerErrors.length > 0 ? (
            <p className="error-text">Please fix validation errors before continuing.</p>
          ) : (
            <p>All rows are valid. Database save is intentionally disabled for now.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
