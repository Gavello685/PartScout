export default function SearchPage() {
  return (
    <section>
      <h1>Search Components</h1>
      <p className="page-description">Enter a manufacturer part number to find matching components.</p>
      <div className="card">
        <label className="field-label" htmlFor="part-number">
          Manufacturer part number
        </label>
        <input id="part-number" className="text-input" placeholder="e.g. TPS7A4700RGWT" type="text" />
        <button className="button" type="button">
          Search
        </button>
      </div>
    </section>
  );
}
