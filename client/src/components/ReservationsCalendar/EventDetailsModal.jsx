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
      // Llama a onEditClick para actualizar el estado en el componente padre
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
    } catch (error) {
      console.error("Error al crear notificación:", error);
    }
  };

  // Agrega esta función para manejar la eliminación de notificaciones
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
      className={`rbc-modal-overlay ${isOpen ? "rbc-modal-overlay-visible" : ""}`}
      onClick={onClose}
    >
      <div
        className="rbc-event-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="rbc-modal-close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rbc-modal-close-icon"
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

        <div className="rbc-modal-body">
          <h2 className="rbc-modal-title">Detalles de la Reserva</h2>
          <div className="rbc-modal-details-grid">
            <p>
              <span className="rbc-modal-detail-label">Cliente:</span>{" "}
              {reserva.nombre_cliente} {reserva.apellidos}
            </p>
            <p className="flex w-full">
              <span className="rbc-modal-detail-label">Estado de Pago:</span>
              {isAuthenticated ? (
                <label className="rbc-payment-toggle px-2">
                  <input
                    type="checkbox"
                    id="paid-toggle"
                    checked={localReserva.pagado}
                    onChange={handlePaymentToggle}
                    disabled={isUpdating}
                    className="transition hover:scale-125 duration-300 shadow-md"
                  />
                  <span
                    className={`rbc-payment-status ${localReserva.pagado ? "paid" : "unpaid"}`}
                  >
                    {localReserva.pagado ? "Pagado" : "Pendiente"}
                    {isUpdating && " (Actualizando...)"}
                  </span>
                </label>
              ) : (
                <span
                  className={`rbc-payment-status ${localReserva.pagado ? "paid" : "unpaid"}`}
                >
                  {localReserva.pagado ? "Pagado" : "Pendiente"}
                </span>
              )}
            </p>
            <p>
              <span className="rbc-modal-detail-label">Oferta:</span>{" "}
              <button
                onClick={toggleExpand}
                className="rbc-offer-expand-button"
              >
                {offerDisplayName}
                <span
                  className={`rbc-modal-arrow ${isExpanded ? "rbc-modal-arrow-up" : "rbc-modal-arrow-down"}`}
                ></span>
              </button>
            </p>
            {isExpanded && (
              <div className="rbc-modal-collapsible-content">
                {reserva.oferta_personalizada?.ofertas_servicios &&
                reserva.oferta_personalizada.ofertas_servicios.length > 0 ? (
                  <>
                    <p className="rbc-modal-detail-label">
                      Servicios incluidos:
                    </p>
                    <ul className="rbc-modal-service-list">
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
                  <p className="rbc-pre-wrap-text">
                    {reserva.descripcion_oferta || "Descripción no disponible"}
                  </p>
                )}
                <p className="border-gray-200 border-t-2">
                  <span className="rbc-modal-detail-label">
                    Precio de Venta:
                  </span>{" "}
                  {reserva.precio_venta_oferta
                    ? `$${reserva.precio_venta_oferta} CUP`
                    : "No disponible"}
                </p>
              </div>
            )}

            <p>
              <span className="rbc-modal-detail-label">Fecha:</span>{" "}
              {format(
                parseDateForCalendar(reserva.fecha_sesion),
                "dd MMMM yyyy",
                {
                  locale: es,
                }
              )}
            </p>
            <p>
              <span className="rbc-modal-detail-label">CI:</span> {reserva.ci}
            </p>
            <p>
              <span className="rbc-modal-detail-label">Teléfono:</span>{" "}
              {reserva.telefono}
            </p>
            <p>
              <span className="rbc-modal-detail-label">Correo:</span>{" "}
              {reserva.correo_electronico}
            </p>
          </div>

          {isAuthenticated && (
            <div className="rbc-modal-actions">
              <button
                onClick={() => onEditClick(reserva)}
                className="rbc-modal-edit-button"
              >
                Editar
              </button>
              <button
                onClick={() => onDeleteClick(reserva)}
                className="rbc-modal-delete-button"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Notificaciones</h3>

          {isAuthenticated && (
            <button
              onClick={() => setShowNotificacionForm(!showNotificacionForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm mb-3"
            >
              {showNotificacionForm ? "Cancelar" : "Agregar Notificación"}
            </button>
          )}

          {showNotificacionForm && (
            <NotificacionForm
              onSubmit={handleCrearNotificacion}
              onCancel={() => setShowNotificacionForm(false)}
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
    </div>
  );
};

export default EventDetailsModal;
