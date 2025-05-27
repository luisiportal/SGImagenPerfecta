import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AgregarSVG from "../components/SVG/AgregarSVG";
import { listarVentasRequest } from "../api/ventas.api";
import VentaCard from "../components/Ventas/VentaCard";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [actualizarVenta, setActualizarVenta] = useState(false);
  useEffect(() => {
    const loadVentas = async () => {
      try {
        const response = await listarVentasRequest();
        setVentas(response);
        setActualizarVenta(false);
      } catch (error) {}
    };
    loadVentas();
  }, [actualizarVenta]);
  function renderMain() {
    if (ventas.length === 0) return <h1>No hay Ofertas</h1>;
    return ventas.map((venta) => (
      <VentaCard
        venta={venta}
        key={venta.id_venta}
        setActualizarVenta={setActualizarVenta}
      />
    ));
  }
  return (
    <div>
      <section className="flex justify-center">
        <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
          Calendario de Trabajos
        </h1>
      </section>

      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4 mt-8  px-3 bg-sect_gray">
        {renderMain()}
      </div>
      <div className="flex justify-center"><Link to={"/ventas/resumen"}>
      <button className="bg-huellas_color font-bold text-white rounded-full ml-8 px-5 py-1">
           Resumen Ventas
          </button>
        </Link></div>
    </div>
  );
};

export default Ventas;
