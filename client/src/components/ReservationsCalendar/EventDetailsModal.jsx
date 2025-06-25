import { useState, useEffect, useCallback } from "react";
import format from "date-fns/format";
import { es } from "date-fns/locale";
import { parseDateForCalendar } from "../../utils/dateUtils";
import { actualizarEstadoPagoRequest } from "../../api/reservas.api";
import {
  obtenerNotificacionesPorReservaRequest,
  crearNotificacionRequest,
  eliminarNotificacionRequest,
} from "../../api/notificaciones.api";
import NotificacionCard from "../Notificaciones/NotificacionCard";
import NotificacionForm from "../Notificaciones/NotificacionForm";
import Modal from "../Modal/Modal";

const EventDetailsModal = ({
  isOpen,
  onClose,
  reserva,
  onEditClick,
  onDeleteClick,
  isAuthenticated,
  onReservationUpdate,
}) => {
  const [localReserva, setLocalReserva] = useState(reserva);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [showNotificacionForm, setShowNotificacionForm] = useState(false);
  const [showNotificacionModal, setShowNotificacionModal] = useState(false);
  const [loadingNotificaciones, setLoadingNotificaciones] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    setLocalReserva(reserva);
  }, [reserva]);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      if (!reserva) return;
      try {
        setLoadingNotificaciones(true);
        const response = await obtenerNotificacionesPorReservaRequest(
          reserva.id_reserva
        );
        setNotificaciones(response);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      } finally {
        setLoadingNotificaciones(false);
      }
    };

    cargarNotificaciones();
  }, [reserva]);

  if (!isOpen || !reserva) return null;
  const offerDisplayName =
    reserva.oferta?.nombre_oferta ||
    reserva.oferta_personalizada?.nombre_oferta ||
    "Oferta Personalizada";

  const handlePaymentToggle = async (e) => {
    const newPaidStatus = e.target.checked;
    setIsUpdating(true);
    try {
      await actualizarEstadoPagoRequest(localReserva.id_reserva, newPaidStatus);
      setLocalReserva({ ...localReserva, pagado: newPaidStatus });
      if (onReservationUpdate) {
        onReservationUpdate();
      }
    } catch (error) {
      console.error("Error al actualizar estado de pago:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCrearNotificacion = async (data) => {
    try {
      await crearNotificacionRequest({
        ...data,
        id_reserva: reserva.id_reserva,
      });
      const response = await obtenerNotificacionesPorReservaRequest(
        reserva.id_reserva
      );
      setNotificaciones(response);
      setShowNotificacionForm(false);
      setShowNotificacionModal(false);
    } catch (error) {
      console.error("Error al crear notificación:", error);
    }
  };

  const handleEliminarNotificacion = async (id_notificacion) => {
    try {
      await eliminarNotificacionRequest(id_notificacion);
      const response = await obtenerNotificacionesPorReservaRequest(
        reserva.id_reserva
      );
      setNotificaciones(response);
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 transition-colors duration-150"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 pt-10">
          <h2 className="text-center text-xl font-bold text-gray-800 mb-4">
            Detalles de la Reserva
          </h2>
          <div className="space-y-2 border-t-2 border-orange-200">
            <p className="mt-4">
              <span className="font-semibold">Cliente:</span>{" "}
              {reserva.nombre_cliente} {reserva.apellidos}
            </p>
            <p className="flex w-full items-center">
              <span className="font-semibold">Estado de Pago:</span>
              {isAuthenticated ? (
                <label className="flex items-center ml-2">
                  <input
                    type="checkbox"
                    checked={localReserva.pagado}
                    onChange={handlePaymentToggle}
                    disabled={isUpdating}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition-all hover:scale-110 duration-300 shadow"
                  />
                  <span
                    className={`ml-2 px-2 py-1 rounded-md font-medium text-white ${
                      localReserva.pagado ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {localReserva.pagado ? "Pagado" : "Pendiente"}
                    {isUpdating && " (Actualizando...)"}
                  </span>
                </label>
              ) : (
                <span
                  className={`ml-2 px-2 py-1 rounded-md font-medium text-white ${
                    localReserva.pagado ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {localReserva.pagado ? "Pagado" : "Pendiente"}
                </span>
              )}
            </p>
            <p>
              <button
                onClick={toggleExpand}
                className="text-blue-600 hover:text-blue-800 flex items-center font-bold"
              >
                {offerDisplayName}
                <span
                  className={`inline-block ml-1 w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent ${
                    isExpanded
                      ? "border-b-[6px] border-b-blue-600"
                      : "border-t-[6px] border-t-blue-600"
                  }`}
                ></span>
              </button>
            </p>
            {isExpanded && (
              <div className="ml-4 pl-4 border-l-2 border-gray-200">
                {reserva.oferta_personalizada?.ofertas_servicios &&
                reserva.oferta_personalizada.ofertas_servicios.length > 0 ? (
                  <>
                    <p className="font-semibold">Servicios incluidos:</p>
                    <ul className="list-disc pl-5">
                      {reserva.oferta_personalizada.ofertas_servicios.map(
                        (servicio) => (
                          <li key={servicio.id_servicio}>
                            {servicio.servicio.nombre_servicio}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                ) : (
                  <p className="whitespace-pre-wrap">
                    {reserva.descripcion_oferta || "Descripción no disponible"}
                  </p>
                )}
                <p className="border-t border-gray-200 pt-2 mt-2">
                  <span className="font-semibold">Precio de Venta:</span>{" "}
                  {reserva.precio_venta_oferta
                    ? `$${reserva.precio_venta_oferta} CUP`
                    : "No disponible"}
                </p>
              </div>
            )}

            <p>
              <span className="font-semibold">Fecha:</span>{" "}
              {format(
                parseDateForCalendar(reserva.fecha_sesion),
                "dd MMMM yyyy",
                {
                  locale: es,
                }
              )}
            </p>
            <p>
              <span className="font-semibold">CI:</span> {reserva.ci}
            </p>
            <p>
              <span className="font-semibold">Teléfono:</span>{" "}
              {reserva.telefono}
            </p>
            <p>
              <span className="font-semibold">Correo:</span>{" "}
              {reserva.correo_electronico}
            </p>
          </div>
          <div className="mt-8 ">
            {isAuthenticated && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowNotificacionModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm mb-3 transition-colors duration-150"
                >
                  {showNotificacionForm ? "Cancelar" : "Agregar Notificación"}
                </button>
              </div>
            )}
          </div>
          {isAuthenticated && (
            <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => onEditClick(reserva)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors duration-150"
              >
                Editar
              </button>
              <button
                onClick={() => onDeleteClick(reserva)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors duration-150"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>

        {(notificaciones.length > 0 || showNotificacionForm) && (
          <div className="bg-gray-100 border border-gray-400 rounded-md m-2 p-2">
            <div className="w-full">
              <h3 className="text-xl text-left text-gray-600 font-bold mb-3 px-2">
                Notificaciones
              </h3>
            </div>
            <div className="px-4">
              {showNotificacionForm && (
                <NotificacionForm
                  onSubmit={handleCrearNotificacion}
                  onCancel={() => {
                    setShowNotificacionForm(false);
                    setShowNotificacionModal(false);
                  }}
                  onSuccess={() => {
                    setShowNotificacionForm(false);
                    setShowNotificacionModal(false);
                  }}
                  reservaId={reserva.id_reserva}
                />
              )}

              {loadingNotificaciones ? (
                <p>Cargando notificaciones...</p>
              ) : notificaciones.length === 0 ? (
                <p className="text-gray-500">
                  No hay notificaciones para esta reserva
                </p>
              ) : (
                <div className="space-y-3">
                  {notificaciones.map((notificacion) => (
                    <NotificacionCard
                      key={notificacion.id_notificacion}
                      notificacion={notificacion}
                      onDelete={handleEliminarNotificacion}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={showNotificacionModal}
        onClose={() => setShowNotificacionModal(false)}
      >
        <NotificacionForm
          onSubmit={handleCrearNotificacion}
          onCancel={() => setShowNotificacionModal(false)}
          onSuccess={() => setShowNotificacionModal(false)}
          reservaId={reserva.id_reserva}
        />
      </Modal>
    </div>
  );
};

export default EventDetailsModal;
