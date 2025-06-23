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
        className="group bg-blue-600 hover:bg-blue-500 transition-colors duration-150 w-5 h-5 rounded-md aspect-square flex items-center justify-center text-white"
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
        className="group bg-red-600 hover:bg-red-500 transition-colors duration-150 w-5 h-5 rounded-md aspect-square flex items-center justify-center text-white "
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
