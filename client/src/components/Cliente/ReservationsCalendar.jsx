import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ConfirmModal";
import ReservarForm from "./ReservarForm";
import "../../styles/calendar-styles.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { es } from "date-fns/locale";
import { isDate } from "date-fns";

const locales = { es: es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Aceptar 'onNavigateCalendar' como un prop
const ReservationsCalendar = ({
  reservations,
  onEdit,
  onDelete,
  fetchReservations,
  onNavigateCalendar,
}) => {
  const { isAuthenticated } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false); // Estado para el despliegue de detalles de oferta

  // Función para alternar el estado de despliegue
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const parseDateForCalendar = useCallback((dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isDate(date) && !isNaN(date.getTime())) {
        return date;
      }
    } catch (error) {
      console.error("Error al analizar la cadena de fecha:", dateString, error);
    }
    return null;
  }, []);

  const events = useMemo(() => {
    return reservations
      .map((reserva) => {
        const sessionDate = parseDateForCalendar(reserva.fecha_sesion);
        if (!sessionDate) return null;
        return {
          id: reserva.id_reserva,
          title: `${reserva.nombre_cliente} ${reserva.apellidos.split(" ")[0]}\n${reserva.oferta?.nombre_oferta || "Oferta Personalizada"}`,
          start: sessionDate,
          end: sessionDate,
          allDay: true,
          reservaData: reserva,
        };
      })
      .filter(Boolean);
  }, [reservations, parseDateForCalendar]);

  const handleConfirmEliminar = async () => {
    if (selectedReserva) {
      setShowConfirmModal(false);
      await onDelete(selectedReserva.id_reserva);
      setSelectedReserva(null);
      fetchReservations();
    }
  };

  const handleCancelEliminar = () => {
    setShowConfirmModal(false);
    setSelectedReserva(null);
  };

  const handleDeleteClick = useCallback((reserva) => {
    setSelectedReserva(reserva);
    setShowConfirmModal(true);
    setShowEventModal(false);
  }, []);

  const handleEditClick = useCallback((reserva) => {
    setSelectedReserva(reserva);
    setShowEditModal(true);
    setShowEventModal(false);
  }, []);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedReserva(null);
    fetchReservations();
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setSelectedReserva(null);
  };

  const handleGuardarEdicion = async (values) => {
    try {
      await onEdit(values);
      setShowEditModal(false);
      fetchReservations();
    } catch (error) {
      console.error("Error al editar reserva:", error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedReserva(event.reservaData);
    setShowEventModal(true);
  };

  const handleSelectSlot = (slotInfo) => {
    if (isAuthenticated) {
      setSelectedDate(slotInfo.start);
    }
  };

  // NUEVO: Handler para la navegación del calendario
  const handleCalendarNavigate = useCallback(
    (newDate) => {
      if (onNavigateCalendar) {
        onNavigateCalendar(newDate); // Llama al callback pasado desde el padre
      }
    },
    [onNavigateCalendar]
  );

  const Event = useCallback(({ event }) => {
    const reserva = event.reservaData;
    const primerApellido = reserva.apellidos.split(" ")[0];

    return (
      <div className="rbc-event-content">
        <div className="rbc-event-title">
          {reserva.nombre_cliente} {primerApellido}
        </div>
        <div className="rbc-event-offer">
          {reserva.oferta?.nombre_oferta ?? "Oferta Personalizada"}
        </div>
      </div>
    );
  }, []);

  const components = useMemo(
    () => ({
      event: Event,
      day: {
        event: ({ event }) => <Event event={event} />,
        header: ({ label }) => <div className="rbc-header-label">{label}</div>,
      },
      agenda: {
        event: ({ event }) => (
          <div className="agenda-event-card">
            <div className="agenda-event-date">
              {format(
                parseDateForCalendar(event.reservaData.fecha_sesion),
                "dd MMMM",
                { locale: es }
              )}
            </div>
            <div className="agenda-event-details">
              <div className="detail-item">
                <span className="detail-label">Cliente:</span>
                <p>
                  {event.reservaData.nombre_cliente}{" "}
                  {event.reservaData.apellidos}
                </p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Oferta:</span>
                <p>
                  {event.reservaData.oferta?.nombre_oferta ||
                    "Oferta Personalizada"}
                </p>
              </div>
              <div className="detail-item">
                <span className="detail-label">CI:</span>
                <p>{event.reservaData.ci}</p>
              </div>
              <div className="detail-item">
                <span className="detail-label">Teléfono:</span>
                <p>{event.reservaData.telefono}</p>
              </div>
            </div>
          </div>
        ),
      },
    }),
    [Event, parseDateForCalendar]
  );

  return (
    <div className="rbc-calendar-container min-w-[500px]">
      <div style={{ height: "800px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          culture="es"
          showMultiDayTimes={false}
          views={["month", "agenda"]}
          messages={{
            allDay: "Todo el día",
            previous: "Anterior",
            next: "Siguiente",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay eventos en este rango.",
            showMore: (total) => `+ ${total} más`,
          }}
          components={components}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={isAuthenticated}
          eventPropGetter={(event) => ({
            className: "rbc-event",
          })}
          dayPropGetter={() => ({
            style: {
              minHeight: "120px",
              position: "relative",
            },
          })}
          dayWrapper={(props) => (
            <div {...props} className="rbc-day-wrapper">
              {props.children}
              {isAuthenticated && (
                <button
                  onClick={() => setSelectedDate(props.value)}
                  className="rbc-add-reservation-button"
                  title="Añadir reserva"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="rbc-add-reservation-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
          onNavigate={handleCalendarNavigate}
        />
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        message={`¿Estás seguro de eliminar la reserva de ${selectedReserva?.nombre_cliente} para el ${selectedReserva ? format(parseDateForCalendar(selectedReserva.fecha_sesion), "dd MMMM", { locale: es }) : ""}?`}
        onConfirm={handleConfirmEliminar}
        onCancel={handleCancelEliminar}
      />

      {selectedReserva && (
        <div
          className={`rbc-modal-overlay ${showEventModal ? "rbc-modal-overlay-visible" : ""}`}
          onClick={handleCloseEventModal}
        >
          <div
            className="rbc-event-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseEventModal}
              className="rbc-modal-close-button"
            >
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
                  {selectedReserva.nombre_cliente} {selectedReserva.apellidos}
                </p>
                <p>
                  <span className="rbc-modal-detail-label">Oferta:</span>{" "}
                  <button
                    onClick={toggleExpand}
                    className="rbc-offer-expand-button" // Nueva clase para el estilo
                  >
                    {selectedReserva.oferta?.nombre_oferta ||
                      selectedReserva?.ofertas_personalizada?.ofertas_servicios?.map(
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

                {/* Contenido desplegable */}
                {isExpanded && (
                  <div className="rbc-modal-collapsible-content">
                    <p className="rbc-pre-wrap-text">
                      {selectedReserva.descripcion_oferta || "No disponible"}
                    </p>
                    <p>
                      <span className="rbc-modal-detail-label">
                        Precio de Venta:
                      </span>{" "}
                      {selectedReserva.precio_venta_oferta
                        ? `${selectedReserva.precio_venta_oferta} CUP`
                        : "No disponible"}
                    </p>
                    {/* Añade aquí cualquier otro detalle que quieras desplegar */}
                  </div>
                )}

                <p>
                  <span className="rbc-modal-detail-label">Fecha:</span>{" "}
                  {format(
                    parseDateForCalendar(selectedReserva.fecha_sesion),
                    "dd MMMM, HH:mm",
                    { locale: es }
                  )}
                </p>
                <p>
                  <span className="rbc-modal-detail-label">CI:</span>{" "}
                  {selectedReserva.ci}
                </p>
                <p>
                  <span className="rbc-modal-detail-label">Teléfono:</span>{" "}
                  {selectedReserva.telefono}
                </p>
              </div>

              {isAuthenticated && (
                <div className="rbc-modal-actions">
                  <button
                    onClick={() => handleEditClick(selectedReserva)}
                    className="rbc-modal-edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(selectedReserva)}
                    className="rbc-modal-delete-button"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedReserva && showEditModal && (
        <div
          className="rbc-modal-overlay rbc-modal-overlay-visible"
          onClick={handleCloseEditModal}
        >
          <div
            className="rbc-edit-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseEditModal}
              className="rbc-modal-close-button"
            >
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
              <h2 className="rbc-modal-title">Editar Reserva</h2>
              <ReservarForm
                initialValues={selectedReserva}
                onSubmit={handleGuardarEdicion}
                onCancel={handleCloseEditModal}
                isEditing={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsCalendar;
