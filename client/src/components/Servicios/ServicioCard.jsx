import React, { useState } from "react";
import EditElimBTNServicio from "./Edit_ElimBTN_Servicio";

const ServicioCard = ({
  servicio,
  isAuthenticated,
  onDeleteSuccess,
  onEditClick,
  onDeleteResult,
  onOpenDeleteModal, // Nuevo prop para abrir el modal de confirmación
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      key={servicio.id_servicio}
      className="relative flex flex-row justify-between items-baseline py-3 border-b last:border-b-0 border-gray-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isAuthenticated && (
        <div
          className={`absolute top-2 right-2 z-10 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <EditElimBTNServicio
            id_servicio={servicio.id_servicio}
            onDeleteSuccess={onDeleteSuccess}
            onEditClick={onEditClick}
            onDeleteResult={onDeleteResult}
            onOpenDeleteModal={onOpenDeleteModal} // Pasa el nuevo callback
          />
        </div>
      )}
      <div className="flex flex-grow flex-col">
        <div className="flex flex-grow items-baseline min-w-0">
          <h3 className="font-semibold text-lg text-slate-800 ">
            {servicio.nombre_servicio}
          </h3>
          <div className="flex-grow border-b-2 border-dotted border-st_color mx-2"></div>
        </div>
        {servicio.descripcion_servicio && (
          <p className="text-sm text-gray-500 pl-1">
            {servicio.descripcion_servicio}
          </p>
        )}
      </div>
      <div className="flex-shrink-0 text-lg font-bold text-st_color">
        ${Number(servicio.precio_servicio).toFixed(2)}
      </div>
    </div>
  );
};

export default ServicioCard;
