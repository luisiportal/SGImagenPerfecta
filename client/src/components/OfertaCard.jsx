import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import ReservarBtn from "./LandingPage/ReservarBtn.jsx"; // Asegúrate de la ruta correcta
import Edit_ElimBTN from "./LandingPage/Edit_ElimBTN.jsx"; // Asegúrate de la ruta correcta

function OfertaCard({ oferta }) {
  const navigate = useNavigate(); // Todavía se podría usar si la tarjeta tuviera su propio onClick de navegación

  const colorExistencia = () => {
    // Esta lógica de color parece estar relacionada con existencias y stock,
    // que no se muestran en el HTML actual de OfertaCard, pero se mantiene si es relevante para el futuro.
    return oferta.existencia <= oferta.stockMinimo && oferta.existencia !== "0"
      ? "border-r-8 border-yellow-400"
      : oferta.existencia === "0"
        ? "border-r-8 border-red-400 "
        : "";
  };

  return (
    <div
      // Eliminamos el estilo en línea con 'width: "400px", margin: "0 auto"'
      // y añadimos 'w-full' para que ocupe todo el ancho disponible en la columna de la cuadrícula.
      // Se eliminan los manejadores de eventos si no son directamente usados para la tarjeta.
      className={`w-full justify-center max-w-md  bg-white shadow-lg rounded-lg overflow-hidden relative transform hover:scale-105 transition-transform duration-300 ease-in-out ${colorExistencia()}`}
    >
      <section className="flex flex-col text-he_card pb-16">
        <div className="bg-he_card text-white h-28 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="font-extrabold text-3xl mb-1">
              {oferta.nombre_oferta}
            </h2>
            {/* Si "20 Fotos" no es dinámico y solo un texto fijo, considera quitarlo o hacer un prop */}
            {/* <h4 className="font-semibold text-lg">20 Fotos</h4> */}
          </div>
        </div>

        <div className="flex flex-col text-2xl pt-6">
          <h2 className="flex justify-center text-7xl md:text-6xl lg:text-5xl font-bold text-gray-800">
            ${oferta.precio_venta}
          </h2>
          <h4 className="flex justify-center -mt-2 text-gray-600">CUP</h4>

          <h4
            className="flex justify-center p-5 text-center text-xl font-medium text-gray-700"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {oferta.formato_entrega}
          </h4>

          <p
            className="flex flex-col grow p-5 text-center font-normal text-gray-700 leading-relaxed"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {oferta.descripcion}
          </p>

          <div className="absolute bottom-0 left-0 w-full p-4 text-sm mt-4 px-5">
            <ReservarBtn id_oferta={oferta.id_oferta} />
          </div>
        </div>
      </section>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100">
        <Edit_ElimBTN id_oferta={oferta.id_oferta} />
      </div>

      {/* Eliminado el ConfirmModal de aquí, ya que ReservarBtn y Edit_ElimBTN lo gestionan internamente */}
    </div>
  );
}

export default OfertaCard;
