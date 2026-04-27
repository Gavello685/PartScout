export default function HomePage() {
  return (
    <section>
      <h1>Welcome to PartScout</h1>
      <p className="page-description">
        Compare supplier offers, upload BOMs, and build purchase plans with fewer clicks.
      </p>
      <div className="card-grid">
        <article className="card">
          <h2>Search parts</h2>
          <p>Look up normalized component records by manufacturer part number.</p>
        </article>
        <article className="card">
          <h2>Manage BOMs</h2>
          <p>Track uploaded BOM files and inspect line-item matching status.</p>
        </article>
        <article className="card">
          <h2>Plan purchases</h2>
          <p>Generate purchase plans based on stock, MOQ, and total cost constraints.</p>
        </article>
      </div>
    </section>
  );
}
