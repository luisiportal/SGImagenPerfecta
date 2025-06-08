// src/components/ReservationsCalendar/ReservationsCalendar.jsx

import React, { useState, useCallback, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ConfirmModal";
import ReservarForm from "../Cliente/ReservarForm"; // Asume que este formulario ya está en un archivo separado
import EventDetailsModal from "./EventDetailsModal";
import "../../styles/calendar-styles.css";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format"; // Todavía necesitamos format para el ConfirmModal
import { es } from "date-fns/locale"; // Todavía necesitamos es para el ConfirmModal

// Importar utilidades y componentes de presentación
import { localizer, parseDateForCalendar } from "../../utils/dateUtils";
import { CalendarEvent, AgendaEvent } from "./CalendarEvent";

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
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // Para cuando se selecciona una fecha para añadir una reserva

  // Mapear las reservas a eventos del calendario
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
          reservaData: reserva, // Guarda la reserva completa en el evento
        };
      })
      .filter(Boolean);
  }, [reservations]);

  // Manejadores para los modales
  const handleConfirmEliminar = useCallback(async () => {
    if (selectedReserva) {
      setShowConfirmModal(false);
      await onDelete(selectedReserva.id_reserva);
      setSelectedReserva(null);
      fetchReservations();
    }
  }, [selectedReserva, onDelete, fetchReservations]);

  const handleCancelEliminar = useCallback(() => {
    setShowConfirmModal(false);
    setSelectedReserva(null);
  }, []);

  const handleDeleteClick = useCallback((reserva) => {
    setSelectedReserva(reserva);
    setShowConfirmModal(true);
    setShowEventDetailsModal(false);
  }, []);

  const handleEditClick = useCallback((reserva) => {
    setSelectedReserva(reserva);
    setShowEditModal(true);
    setShowEventDetailsModal(false);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
    setSelectedReserva(null);
    fetchReservations();
  }, [fetchReservations]);

  const handleCloseEventDetailsModal = useCallback(() => {
    setShowEventDetailsModal(false);
    setSelectedReserva(null);
  }, []);

  const handleGuardarEdicion = useCallback(
    async (values) => {
      try {
        await onEdit(values);
        setShowEditModal(false);
        fetchReservations();
      } catch (error) {
        console.error("Error al editar reserva:", error);
      }
    },
    [onEdit, fetchReservations]
  );

  const handleSelectEvent = useCallback((event) => {
    setSelectedReserva(event.reservaData);
    setShowEventDetailsModal(true);
  }, []);

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      if (isAuthenticated) {
        setSelectedDate(slotInfo.start);
        // Podrías añadir lógica aquí para abrir un modal de "nueva reserva"
      }
    },
    [isAuthenticated]
  );

  const handleCalendarNavigate = useCallback(
    (newDate) => {
      onNavigateCalendar && onNavigateCalendar(newDate);
    },
    [onNavigateCalendar]
  );

  // Componentes personalizados para BigCalendar
  const components = useMemo(
    () => ({
      event: CalendarEvent, // Usa el componente CalendarEvent
      day: {
        event: ({ event }) => <CalendarEvent event={event} />, // Reusa CalendarEvent para la vista de día
        header: ({ label }) => <div className="rbc-header-label">{label}</div>,
      },
      agenda: {
        event: AgendaEvent, // Usa el componente AgendaEvent
      },
    }),
    [] // Estas referencias son estables, por lo que el array de dependencias puede estar vacío
  );

  return (
    <div className="rbc-calendar-container min-w-[500px]">
      <div style={{ height: "800px" }}>
        <Calendar
          localizer={localizer} // Importado de dateUtils
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
          eventPropGetter={() => ({ className: "rbc-event" })}
          dayPropGetter={() => ({
            style: { minHeight: "120px", position: "relative" },
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

      {/* Modal de Confirmación de Eliminación */}
      <ConfirmModal
        isOpen={showConfirmModal}
        message={
          selectedReserva
            ? `¿Estás seguro de eliminar la reserva de ${selectedReserva?.nombre_cliente} para el ${format(parseDateForCalendar(selectedReserva.fecha_sesion), "dd MMMM", { locale: es })}?`
            : ""
        }
        onConfirm={handleConfirmEliminar}
        onCancel={handleCancelEliminar}
      />

      {/* Modal de Detalles del Evento */}
      {selectedReserva && (
        <EventDetailsModal
          isOpen={showEventDetailsModal}
          onClose={handleCloseEventDetailsModal}
          reserva={selectedReserva}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          isAuthenticated={isAuthenticated}
        />
      )}

      {/* Modal de Edición de Reserva */}
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
