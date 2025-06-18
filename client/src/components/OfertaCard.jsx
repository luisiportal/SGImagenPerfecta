import { useState } from "react";

import ReservarBtn from "./LandingPage/ReservarBtn.jsx";
import Edit_ElimBTN from "./LandingPage/Edit_ElimBTN.jsx";
import ListarServicios from "./Servicios/ListarServicios.jsx";

function OfertaCard({ oferta, personalizada }) {
  const [showActions, setShowActions] = useState(false);
  const [showServicios, setShowServicios] = useState(false);

  const colorExistencia = () => {
    return oferta.existencia <= oferta.stockMinimo && oferta.existencia !== "0"
      ? "border-r-8 border-yellow-400"
      : oferta.existencia === "0"
        ? "border-r-8 border-red-400 "
        : "";
  };

  return (
    <div
      className={`flex flex-col min-h-60 min-w-64 w-96 items-center justify-center bg-white shadow-lg rounded-xl overflow-hidden
                  relative transform hover:scale-105 transition-transform duration-300
                   border border-gray-200 ${colorExistencia()}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`absolute top-3 right-3 z-10 flex space-x-2 transition-opacity duration-300 ${
          showActions ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Edit_ElimBTN id_oferta={oferta.id_oferta} />
      </div>
      <div
        className={`flex-grow flex flex-col items-center justify-center w-full p-4 text-center ${
          oferta.nombre_oferta === "Premium" ? "bg-st_color" : "bg-slate-500"
        }`}
      >
        <h2 className="text-4xl font-extrabold text-white leading-tight uppercase">
          {oferta.nombre_oferta}
        </h2>
        <p className="text-2xl font-medium text-white">
          {oferta.cantidad_fotos}{" "}
          <span className=" font-semibold uppercase">Fotos</span>
        </p>
      </div>

      <section className="flex flex-col flex-grow items-center justify-center">
        <div className="p-4">
          <h2 className="text-center text-5xl font-bold text-slate-500">
            ${oferta.precio_venta}
          </h2>
          <h4 className="text-1xl text-center  text-gray-500 uppercase">CUP</h4>
        </div>

        <div className="flex-grow flex flex-col justify-between text-center text-gray-700">
          <p className="text-lg font-semibold text-gray-800 uppercase">
            Descripción:
          </p>
          <div className="flex items-center min-h-36 justify-center p-2 px-8 border-t border-gray-200 rounded-md">
            <p className="text-base text-gray-600 whitespace-pre-wrap uppercase">
              {oferta.descripcion}
            </p>
          </div>

          <div className="flex-grow border-t border-gray-200 pt-2 space-y-1">
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold uppercase">
                Cambios de Ropa: {oferta.cambios_ropa}
              </span>
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold uppercase">
                Locación: {oferta.locacion}
              </span>
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold uppercase">
                Transportación:{" "}
                {oferta.transportacion ? "Incluida" : "No Incluida"}
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="flex-none p-2 text-sm px-5">
        <ReservarBtn
          id_oferta={oferta.id_oferta}
          personalizada={personalizada}
          setShowServicios={setShowServicios}
        />
      </div>
      {showServicios && (
        <div className="bg-red-500">
          <ListarServicios setShowServicios={setShowServicios} />
        </div>
      )}
    </div>
  );
}

export default OfertaCard;
