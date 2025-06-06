import React from "react";
import { listarResumenVentasRequest } from "../../api/ventas.api";
import ResumenCard from "./ResumenCard";
import { useState, useEffect } from "react";

const ResumenVentas = () => {
  const [resumenVentas, setResumenVentas] = useState([]);
  const [actualizar, setActualizar] = useState([]);
  useEffect(() => {
    const loadResumenVentas = async () => {
      try {
        const response = await listarResumenVentasRequest();
        setResumenVentas(response);
        setActualizar(false);
      } catch (error) {}
    };
    loadResumenVentas();
  }, [actualizar]);
  function renderMain() {
    if (resumenVentas.length === 0) return <h1>No hay datos</h1>;
    return resumenVentas.map((resumen) => (
      <ResumenCard resumen={resumen} key={resumen.id_registro_venta} />
    ));
  }

  return (
    <div>
      <section className="flex justify-center">
        <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
          Ventas
        </h1>
      </section>

      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8  px-3 bg-sect_gray">
        {renderMain()}
      </div>
    </div>
  );
};

export default ResumenVentas;
