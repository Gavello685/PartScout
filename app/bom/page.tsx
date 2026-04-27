import Link from "next/link";

const mockBoms = [
  { id: "bom-001", name: "Main controller BOM", lines: 48 },
  { id: "bom-002", name: "Sensor board BOM", lines: 22 }
];

export default function BomListPage() {
  return (
    <section>
      <h1>BOM Uploads</h1>
      <p className="page-description">Upload and review bill-of-material files.</p>
      <div className="card">
        <button className="button" type="button">
          Upload CSV (placeholder)
        </button>
      </div>
      <div className="card">
        <h2>Recent BOMs</h2>
        <ul className="bom-list">
          {mockBoms.map((bom) => (
            <li key={bom.id}>
              <Link href={`/bom/${bom.id}`}>{bom.name}</Link>
              <span>{bom.lines} lines</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
