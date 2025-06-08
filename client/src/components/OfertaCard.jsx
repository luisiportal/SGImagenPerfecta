import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import ReservarBtn from "./LandingPage/ReservarBtn.jsx";
import Edit_ElimBTN from "./LandingPage/Edit_ElimBTN.jsx"; // Asegúrate de que este componente reciba props para el SVG
import ListarServicios from "./Servicios/ListarServicios.jsx";

function OfertaCard({ oferta, personalizada }) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false); // Estado para controlar la visibilidad de los botones
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
      className={`w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden
                  relative transform hover:scale-105 transition-transform duration-300
                  flex flex-col border border-gray-200 ${colorExistencia()}`}
      onMouseEnter={() => setShowActions(true)} // Muestra los botones al pasar el ratón
      onMouseLeave={() => setShowActions(false)} // Oculta los botones al quitar el ratón
    >
      {/* Botones de edición/eliminación - Aparecen al pasar el ratón */}
      <div
        className={`absolute top-3 right-3 z-10 flex space-x-2 transition-opacity duration-300 ${
          showActions ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Edit_ElimBTN id_oferta={oferta.id_oferta} />{" "}
        {/* Asumo que Edit_ElimBTN renderiza los SVGs */}
      </div>

      {/* Cabecera naranja sólida */}
      <div className="grid items-center justify-center bg-slate-500 p-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-4xl mt-4 font-extrabold text-white leading-tight">
          {oferta.nombre_oferta}
        </h2>
        <p className="text-2xl font-medium text-white mb-4">
          {oferta.cantidad_fotos} <span className=" font-semibold">Fotos</span>
        </p>
      </div>

      <section className="flex flex-col flex-grow p-6">
        <div className="flex-none text-center mb-6">
          <h2 className="text-6xl md:text-5xl lg:text-5xl font-bold text-slate-500">
            ${oferta.precio_venta}
          </h2>
          <h4 className="text-xl text-gray-500 -mt-1">CUP</h4>
        </div>

        {/* Contenedor para asegurar el mismo ancho del texto */}

        <div className="flex-grow flex flex-col justify-between text-center text-gray-700">
          <p className="text-lg font-semibold mb-2 text-gray-800">
            Descripción:
          </p>
          {/* Descripción con altura fija y scroll si es necesario */}
          <div className="flex h-62 items-center justify-center overflow-y-auto p-2 border-t border-gray-200 rounded-md">
            <p className="text-base leading-relaxed text-gray-600 whitespace-pre-wrap">
              {oferta.descripcion}
            </p>
          </div>

          {/* Nuevos campos de Oferta.model.js con altura fija si es necesario */}
          <div className="flex-grow border-t border-gray-200 pt-4 mt-4 space-y-3">
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Locación:</span> {oferta.locacion}
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Transportación:</span>{" "}
              {oferta.transportacion ? "Incluida" : "No Incluida"}
            </p>
            <p className="text-md font-medium text-gray-700">
              <span className="font-semibold">Cambios de Ropa:</span>{" "}
              {oferta.cambios_ropa}
            </p>
          </div>
        </div>
      </section>

      <div className="flex-none p-4 text-sm mt-auto px-5">
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
