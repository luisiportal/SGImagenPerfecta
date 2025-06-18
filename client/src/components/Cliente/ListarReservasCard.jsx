import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ConfirmModal";

const ListarReservasCard = ({ reserva, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEliminarClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmEliminar = async () => {
    setShowConfirmModal(false);
    if (onDelete) {
      await onDelete(reserva.id_reserva);
    }
  };

  const handleCancelEliminar = () => {
    setShowConfirmModal(false);
  };

  const handleEditarClick = () => {
    if (onEdit) {
      onEdit(reserva);
    }
  };

  const formatFechaSesion = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(`${dateString}T00:00:00`);

    if (isNaN(date.getTime())) {
      console.error("Error: Fecha inválida. Cadena original:", dateString);
      return "Fecha inválida";
    }

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 my-3 mx-auto w-full max-w-md">
      <div className="p-6">
        <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold mb-2 border-b border-indigo-100 pb-2 flex justify-between items-center">
          <span>Detalle de la Reserva</span>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {formatFechaSesion(reserva.fecha_sesion)}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <h1 className="whitespace-pre-line text-gray-900">
            {reserva.descripcion_oferta || "Oferta no especificada"}
          </h1>
        </div>

        <div className="mt-4 text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Cliente:</span>{" "}
            {`${reserva.nombre_cliente} ${reserva.apellidos}`}
          </p>
          <p>
            <span className="font-semibold">CI:</span> {reserva.ci}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span> {reserva.telefono}
          </p>
          <p>
            <span className="font-semibold">Precio de Venta:</span>{" "}
            {reserva.precio_venta_oferta
              ? `$${Number(reserva.precio_venta_oferta).toFixed(2)} CUP`
              : "No disponible"}
          </p>
        </div>

        {isAuthenticated && (onEdit || onDelete) && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
            {onEdit && (
              <button
                onClick={handleEditarClick}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Editar reserva"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleEliminarClick}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Eliminar reserva"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        message={`¿Estás seguro de eliminar la reserva de ${
          reserva.nombre_cliente
        } para el ${formatFechaSesion(reserva.fecha_sesion)}?`}
        onConfirm={handleConfirmEliminar}
        onCancel={handleCancelEliminar}
      />
    </div>
  );
};

export default ListarReservasCard;
