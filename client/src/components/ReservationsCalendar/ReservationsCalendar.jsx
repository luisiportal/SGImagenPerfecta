import { useState, useCallback, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../Modal/ConfirmModal";
import ReservarForm from "../Reserva/ReservarForm";
import EventDetailsModal from "./EventDetailsModal";
import "../../styles/calendar-styles.css";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import { es } from "date-fns/locale";
import { localizer, parseDateForCalendar } from "../../utils/dateUtils";
import { CalendarEvent, AgendaEvent } from "./CalendarEvent";
import { startOfMonth, endOfMonth, differenceInDays } from "date-fns";

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // Estado para la fecha actual del calendario
  const [currentView, setCurrentView] = useState("month");

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
  }, [reservations]);

  const getMonthRange = useCallback((date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const length = differenceInDays(end, start) + 1;
    return { start, end, length };
  }, []);

  const handleConfirmEliminar = useCallback(async () => {
    if (selectedReserva) {
      setShowConfirmModal(false);
      await onDelete(selectedReserva.id_reserva);
      setSelectedReserva(null);
      setShowEditModal(false);
      fetchReservations();
    }
  }, [selectedReserva, onDelete, fetchReservations]);

  const handleCancelEliminar = useCallback(() => {
    setShowConfirmModal(false);
    setShowEditModal(false);
    setShowEventDetailsModal(true);
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

  const handleCloseEditModal = useCallback(
    (returnToDetails = false) => {
      setShowEditModal(false);
      setShowConfirmModal(false);
      if (returnToDetails) {
        setShowEventDetailsModal(true);
      } else {
        setShowEventDetailsModal(false);
        setSelectedReserva(null);
      }
      fetchReservations();
    },
    [fetchReservations]
  );

  const handleCloseEventDetailsModal = useCallback(() => {
    setShowEventDetailsModal(false);
    setShowEditModal(false);
    setShowConfirmModal(false);
    setSelectedReserva(null);
  }, []);

  const handleGuardarEdicion = useCallback(
    async (values) => {
      try {
        await onEdit(values);
        setShowEditModal(false);
        setShowConfirmModal(false);
        setSelectedReserva(null);
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
      }
    },
    [isAuthenticated]
  );

  const handleCalendarNavigate = useCallback(
    (newDate, view) => {
      setCurrentDate(newDate);
      if (view) setCurrentView(view);
      onNavigateCalendar && onNavigateCalendar(newDate);
    },
    [onNavigateCalendar]
  );

  const components = useMemo(
    () => ({
      event: CalendarEvent,
      day: {
        event: ({ event }) => <CalendarEvent event={event} />,
        header: ({ label }) => <div className="rbc-header-label">{label}</div>,
      },
      agenda: {
        event: AgendaEvent,
      },
    }),
    []
  );

  const agendaRange = useMemo(() => {
    const { start, end } = getMonthRange(currentDate);
    return { start, end };
  }, [currentDate, getMonthRange]);

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
          date={currentDate}
          {...(currentView === "agenda" && {
            min: agendaRange.start,
            max: agendaRange.end,
          })}
        />
      </div>

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

      {selectedReserva && (
        <EventDetailsModal
          isOpen={showEventDetailsModal}
          onClose={handleCloseEventDetailsModal}
          reserva={selectedReserva}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onReservationUpdate={fetchReservations}
          isAuthenticated={isAuthenticated}
        />
      )}

      {selectedReserva && showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleCloseEditModal(true)}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Editar Reserva
              </h2>
              <ReservarForm
                initialValues={selectedReserva}
                onSubmit={handleGuardarEdicion}
                onCancel={() => handleCloseEditModal(true)}
                isEditing={true}
                returnToDetails={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsCalendar;
