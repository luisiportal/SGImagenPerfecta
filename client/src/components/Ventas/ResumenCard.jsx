function ResumenCard({ resumen }) {
  return (
    <div
      className={`mx-4 md:mx-1 my-1 bg-neutral-200  shadow rounded overflow-hidden p-2`}
    >
      <main>
        <article className="px-3 text-left text-slate-700 font-semibold block">
          <h4>Mes : {`${resumen.mes}`}</h4>
          <h4>Venta Total : {`${resumen.total_ventas}`}</h4>
        </article>
      </main>
    </div>
  );
}

export default ResumenCard;
