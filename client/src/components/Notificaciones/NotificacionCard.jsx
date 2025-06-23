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

  // Formatear fecha_sesion de Reserva
  const formatFechaSesion = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: es });
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
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {notificacion.Reserva?.nombre_cliente} (
                {notificacion.Reserva?.ci})
              </h3>
              <p className="text-lg font-medium text-gray-700">
                Fecha de Reserva:{" "}
                {formatFechaSesion(notificacion.Reserva?.fecha_sesion)}
              </p>
            </div>
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
            <p className="text-gray-800 font-semibold text-base">
              Asunto: {notificacion.asunto || "Sin asunto"}
            </p>
            <p className="text-gray-800 text-base">
              Mensaje: {notificacion.mensaje}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            <p>
              Fecha de Envío:{" "}
              {format(
                new Date(notificacion.fecha_envio),
                "dd MMMM yyyy HH:mm",
                { locale: es }
              )}
            </p>
            {notificacion.fecha_eliminacion && (
              <p>
                Eliminación Programada:{" "}
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
