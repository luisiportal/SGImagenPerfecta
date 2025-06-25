import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  eliminarNotificacionRequest,
  programarEliminacionRequest,
  enviarCorreoNotificacionRequest,
} from "../../api/notificaciones.api";
import NotificacionForm from "./NotificacionForm";
import ConfirmModal from "../Modal/ConfirmModal";
import Modal from "../Modal/Modal";
import format from "date-fns/format";
import { es } from "date-fns/locale";
import { formatDate, parseDateForCalendar } from "../../utils/dateUtils";

const NotificacionCard = ({ notificacion, onUpdate }) => {
  const { isAuthenticated } = useAuth();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fechaEliminacion, setFechaEliminacion] = useState(
    notificacion.fecha_eliminacion || ""
  );
  const [loadingSend, setLoadingSend] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [sendSuccess, setSendSuccess] = useState(null);

  const getNombreCompleto = () => {
    if (!notificacion.Reserva) return "Cliente no especificado";
    const nombre = notificacion.Reserva.nombre_cliente || "";
    const apellido = notificacion.Reserva.apellidos || "";
    return `${nombre} ${apellido}`.trim();
  };

  const handleEliminar = async () => {
    if (!notificacion?.id_notificacion) {
      setSendError("ID de notificación no válido");
      setTimeout(() => setSendError(null), 3000);
      return;
    }
    try {
      await eliminarNotificacionRequest(notificacion.id_notificacion);
      if (onUpdate && typeof onUpdate === "function") {
        onUpdate();
      }
      setSendSuccess("Notificación eliminada exitosamente");
      setTimeout(() => setSendSuccess(null), 3000);
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
      setSendError(
        error.response?.data?.message || "Error al eliminar la notificación"
      );
      setTimeout(() => setSendError(null), 5000);
    } finally {
      setShowConfirmModal(false);
    }
  };
  const handleProgramarEliminacion = async () => {
    try {
      await programarEliminacionRequest(
        notificacion.id_notificacion,
        fechaEliminacion ? formatDate(new Date(fechaEliminacion)) : null
      );
      if (onUpdate && typeof onUpdate === "function") {
        onUpdate();
      }
    } catch (error) {
      console.error("Error al programar eliminación:", error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleEnviarCorreo = async () => {
    setLoadingSend(true);
    setSendError(null);
    setSendSuccess(null);
    try {
      await enviarCorreoNotificacionRequest(notificacion.id_notificacion);
      setSendSuccess("Correo enviado exitosamente");
      if (onUpdate && typeof onUpdate === "function") {
        onUpdate();
      }
    } catch (error) {
      console.error("Error al enviar correo:", error);
      setSendError(error.message || "Error al enviar el correo");
    } finally {
      setLoadingSend(false);
      setTimeout(() => {
        setSendSuccess(null);
        setSendError(null);
      }, 5000);
    }
  };

  const formatFechaEnvio = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return format(date, "dd MMM, HH:mm", { locale: es });
  };

  const getFechaReserva = () => {
    if (!notificacion.Reserva?.fecha_sesion) return "Fecha no disponible";
    try {
      const date = parseDateForCalendar(notificacion.Reserva.fecha_sesion);
      if (!date) return "Fecha inválida";
      return format(date, "dd MMM", { locale: es });
    } catch (error) {
      console.error("Error al obtener fecha de reserva:", error);
      return "Fecha inválida";
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-4 border border-green-500 relative hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
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
            <div
              className={`absolute top-0 left-0 w-full h-2 ${
                notificacion.enviado ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></div>

            <div className="absolute top-3 right-2 text-xs text-gray-500">
              {formatFechaEnvio(notificacion.fecha_envio)}
            </div>

            <div className="pt-2 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {getFechaReserva()} {getNombreCompleto()}
              </h3>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {notificacion.asunto || "Sin asunto"}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {notificacion.mensaje}
              </p>
            </div>

            {sendError && (
              <p className="text-red-500 text-sm mt-2">{sendError}</p>
            )}
            {sendSuccess && (
              <p className="text-green-500 text-sm mt-2">{sendSuccess}</p>
            )}
            <div className="flex">
              {isAuthenticated &&
                notificacion.tipo === "email" &&
                !notificacion.enviado && (
                  <button
                    onClick={handleEnviarCorreo}
                    disabled={loadingSend}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm mt-2 flex items-center justify-center"
                  >
                    {loadingSend ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Correo Ahora"
                    )}
                  </button>
                )}
              {isAuthenticated &&
                notificacion.tipo === "email" &&
                notificacion.enviado && (
                  <p className="text-green-600 text-sm mt-2">Correo Enviado</p>
                )}

              {isAuthenticated && (
                <div className="flex flex-grow space-x-2 justify-end ">
                  <button
                    onClick={() => setShowEditForm(true)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Editar Notificación"
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
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="text-red-500 rounded"
                    title="Eliminar Notificación"
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
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Modal isOpen={showEditForm} onClose={() => setShowEditForm(false)}>
        <NotificacionForm
          notificacion={notificacion}
          onSuccess={() => {
            setShowEditForm(false);
            onUpdate();
          }}
          onCancel={() => setShowEditForm(false)}
        />
      </Modal>
      <ConfirmModal
        isOpen={showConfirmModal}
        message={`¿Estás seguro de ${fechaEliminacion ? `programar la eliminación para ${format(new Date(fechaEliminacion), "dd MMM yyyy", { locale: es })}` : "eliminar la notificación ahora"}?`}
        onConfirm={
          fechaEliminacion ? handleProgramarEliminacion : handleEliminar
        }
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default NotificacionCard;
