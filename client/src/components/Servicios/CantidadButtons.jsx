import React from "react";

const CantidadButtons = ({
  setOferta_personalizada,
  oferta_personalizada,
  servicio,
}) => {
  const incrementar = (servicio) => {
    const serviciosActualizados = oferta_personalizada.map((item) =>
      item.id_servicio === servicio.id_servicio
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
    setOferta_personalizada(serviciosActualizados);
  };

  const decrementar = (servicio) => {
    const serviciosActualizados = oferta_personalizada.map((item) =>
      item.id_servicio === servicio.id_servicio
        ? {
            ...item,
            cantidad: item.cantidad > 1 ? item.cantidad - 1 : item.cantidad,
          }
        : item
    );
    setOferta_personalizada(serviciosActualizados);
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        aria-label={`Aumentar cantidad de ${servicio.nombre}`}
        className="group bg-white hover:bg-blue-50 transition-colors duration-150 w-7 h-7 p-1 rounded-md aspect-square flex items-center justify-center text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent"
        onClick={() => incrementar(servicio)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-3.5 h-3.5 group-hover:stroke-[3px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <button
        aria-label={`Reducir cantidad de ${servicio.nombre}`}
        className="group bg-white hover:bg-red-50 transition-colors duration-150 w-7 h-7 p-1 rounded-md aspect-square flex items-center justify-center text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-transparent"
        onClick={() => decrementar(servicio)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-3.5 h-3.5 group-hover:stroke-[3px]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
    </div>
  );
};

export default CantidadButtons;
