type BomDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BomDetailPage({ params }: BomDetailPageProps) {
  const { id } = await params;

  return (
    <section>
      <h1>BOM Detail</h1>
      <p className="page-description">Viewing placeholder for BOM ID: {id}</p>
      <div className="card">
        <p>
          Detailed line-item matching, supplier offers, and purchase-plan views will be added in future
          iterations.
        </p>
      </div>
    </section>
  );
}
