import { useState, useEffect, useCallback } from "react";
import {
  listarReservasRequest,
  actualizarReservaRequest,
  eliminarReservaRequest,
} from "../../api/reservas.api";
import ReservationsCalendar from "../ReservationsCalendar/ReservationsCalendar";
import { useAuth } from "../../context/AuthContext";
import ReservationsPdfExport from "../ReservationsPdfExport";

const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [notificacion_msg, setNotificacion_msg] = useState(null);
  const { isAuthenticated } = useAuth();
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const loadReservas = useCallback(async () => {
    try {
      const response = await listarReservasRequest();
      setReservas(response || []);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      setNotificacion_msg({
        mensaje: "Error al cargar las reservas.",
        errorColor: true,
      });
      setReservas([]);
    }
  }, []);

  useEffect(() => {
    loadReservas();
  }, [loadReservas]);

  useEffect(() => {
    if (notificacion_msg) {
      const timer = setTimeout(() => {
        setNotificacion_msg(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notificacion_msg]);

  const handleUpdate = async (updatedReserva) => {
    try {
      await actualizarReservaRequest(updatedReserva.id_reserva, updatedReserva);
      setNotificacion_msg({
        mensaje: "Reserva actualizada con éxito!",
        errorColor: false,
      });
      await loadReservas(); //revisar
    } catch (error) {
      console.error("Error al actualizar reserva en handleUpdate:", error);
      setNotificacion_msg({
        mensaje: "Error al actualizar la reserva.",
        errorColor: true,
      });
      throw error;
    }
  };

  const handleDelete = async (id_reserva) => {
    try {
      await eliminarReservaRequest(id_reserva);
      console.log("Reserva eliminada en el backend. Recargando reservas...");
      await loadReservas();
      console.log("Reservas recargadas:", reservas); // Verifica el estado 'reservas' aquís
      setNotificacion_msg({
        mensaje: "Reserva eliminada con éxito!",
        errorColor: false,
      });
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      const errorMessage =
        error.response?.data?.message || "Error al eliminar la reserva.";
      setNotificacion_msg({ mensaje: errorMessage, errorColor: true });
      throw error;
    }
  };

  const handleCalendarNavigation = useCallback((date) => {
    setCurrentCalendarDate(date);
    console.log("ListarReservas: Fecha actual del calendario:", date);
    console.log("ListarReservas: Mes (0-indexado):", date.getMonth());
    console.log("ListarReservas: Año:", date.getFullYear());
  }, []);

  return (
    <section className="items-center justify-end px-4 py-8 ">
      <h2 className="rbc-calendar-title">Calendario de Reservaciones</h2>

      {isAuthenticated && (
        <div className="flex flex-wrap justify-end items-end">
          <ReservationsPdfExport
            reservations={reservas}
            month={currentCalendarDate.getMonth()}
            year={currentCalendarDate.getFullYear()}
            refreshReservations={loadReservas}
          />
        </div>
      )}

      <ReservationsCalendar
        reservations={reservas}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        fetchReservations={loadReservas}
        onNavigateCalendar={handleCalendarNavigation}
      />
    </section>
  );
};

export default ListarReservas;
