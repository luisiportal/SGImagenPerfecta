// src/components/ReservationsCalendar/EventDetailsModal.jsx

import React, { useState, useCallback } from "react";
import format from "date-fns/format";
import { es } from "date-fns/locale";
import { parseDateForCalendar } from "../../utils/dateUtils"; // ¡Importa la utilidad!

const EventDetailsModal = ({
  isOpen,
  onClose,
  reserva,
  onEditClick,
  onDeleteClick,
  isAuthenticated,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  if (!isOpen || !reserva) return null;

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
            <p>
              <span className="rbc-modal-detail-label">Oferta:</span>{" "}
              <button
                onClick={toggleExpand}
                className="rbc-offer-expand-button"
              >
                {reserva.oferta?.nombre_oferta ||
                  reserva?.ofertas_personalizada?.ofertas_servicios?.map(
                    (servicio) => (
                      <section key={servicio.id_servicio}>
                        {servicio.servicio.nombre_servici}
                      </section>
                    )
                  )}
                <span
                  className={`rbc-modal-arrow ${isExpanded ? "rbc-modal-arrow-up" : "rbc-modal-arrow-down"}`}
                ></span>
              </button>
            </p>

            {isExpanded && (
              <div className="rbc-modal-collapsible-content">
                <p className="rbc-pre-wrap-text">
                  {reserva.descripcion_oferta || "No disponible"}
                </p>
                <p>
                  <span className="rbc-modal-detail-label">
                    Precio de Venta:
                  </span>{" "}
                  {reserva.precio_venta_oferta
                    ? `${reserva.precio_venta_oferta} CUP`
                    : "No disponible"}
                </p>
              </div>
            )}

            <p>
              <span className="rbc-modal-detail-label">Fecha:</span>{" "}
              {format(
                parseDateForCalendar(reserva.fecha_sesion),
                "dd MMMM, HH:mm",
                { locale: es }
              )}
            </p>
            <p>
              <span className="rbc-modal-detail-label">CI:</span> {reserva.ci}
            </p>
            <p>
              <span className="rbc-modal-detail-label">Teléfono:</span>{" "}
              {reserva.telefono}
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
      </div>
    </div>
  );
};

export default EventDetailsModal;
