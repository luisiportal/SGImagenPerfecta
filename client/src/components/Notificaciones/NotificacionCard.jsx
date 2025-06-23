import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  eliminarNotificacionRequest,
  programarEliminacionRequest,
} from "../../api/notificaciones.api";
import NotificacionForm from "./NotificacionForm";
import ConfirmModal from "../Modal/ConfirmModal";
import format from "date-fns/format";
import { es } from "date-fns/locale";

const NotificacionCard = ({ notificacion, onUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fechaEliminacion, setFechaEliminacion] = useState(
    notificacion.fecha_eliminacion || ""
  );

  const handleEliminar = async () => {
    try {
      await eliminarNotificacionRequest(notificacion.id_notificacion);
      onUpdate();
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
    }
  };

  const handleProgramarEliminacion = async () => {
    try {
      await programarEliminacionRequest(
        notificacion.id_notificacion,
        fechaEliminacion || null
      );
      onUpdate();
    } catch (error) {
      console.error("Error al programar eliminación:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {showEditForm ? (
        <NotificacionForm
          notificacion={notificacion}
          onSuccess={() => {
            setShowEditForm(false);
            onUpdate();
          }}
          onCancel={() => setShowEditForm(false)}
        />
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800">
              Notificación para: {notificacion.Reserva?.nombre_cliente} (
              {notificacion.Reserva?.ci})
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                notificacion.enviado
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {notificacion.tipo} -{" "}
              {notificacion.enviado ? "Enviado" : "Pendiente"}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Fecha envío:</span>{" "}
              {format(
                new Date(notificacion.fecha_envio),
                "dd MMMM yyyy HH:mm",
                { locale: es }
              )}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Asunto:</span> {notificacion.asunto}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Mensaje:</span>{" "}
              {notificacion.mensaje}
            </p>
            {notificacion.fecha_eliminacion && (
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Eliminación programada:</span>{" "}
                {format(
                  new Date(notificacion.fecha_eliminacion),
                  "dd MMMM yyyy",
                  { locale: es }
                )}
              </p>
            )}
          </div>

          {isAuthenticated && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={fechaEliminacion}
                  onChange={(e) => setFechaEliminacion(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                  min={new Date().toISOString().split("T")[0]}
                />
                <button
                  onClick={handleProgramarEliminacion}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-3 py-1 rounded"
                >
                  Programar
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        message="¿Estás seguro de eliminar esta notificación?"
        onConfirm={handleEliminar}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default NotificacionCard;
