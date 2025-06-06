// src/components/Cliente/ListarReservas.jsx

import React, { useState, useEffect, useCallback } from "react";
import {
  listarReservasRequest,
  actualizarReservaRequest,
  eliminarReservaRequest,
} from "../../api/reservas.api";
import Notificacion from "../validacionForm/Notificacion";
import ReservationsCalendar from "./ReservationsCalendar";
import { useAuth } from "../../context/AuthContext";
import ReservationsPdfExport from "../ReservationsPdfExport"; // Asegúrate de que esta ruta sea correcta

const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [notificacion_msg, setNotificacion_msg] = useState(null);
  const { isAuthenticated } = useAuth();
  // NUEVO: Estado para la fecha actual del calendario
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const loadReservas = useCallback(async () => {
    try {
      const response = await listarReservasRequest();
      setReservas(response);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      setNotificacion_msg({
        mensaje: "Error al cargar las reservas.",
        errorColor: true,
      });
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
      await loadReservas();
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

  // NUEVO: Función para recibir la fecha del calendario y actualizar el estado
  const handleCalendarNavigation = useCallback((date) => {
    setCurrentCalendarDate(date);
    // NUEVO: Log para verificar la fecha recibida del calendario
    console.log("ListarReservas: Fecha actual del calendario:", date);
    console.log("ListarReservas: Mes (0-indexado):", date.getMonth());
    console.log("ListarReservas: Año:", date.getFullYear());
  }, []);

  return (
    <section className="items-center justify-end px-4 py-8 ">
      <h2 className="rbc-calendar-title">Calendario de Reservaciones</h2>
      {/* ... (resto del JSX) */}

      {isAuthenticated && (
        <ReservationsPdfExport
          month={currentCalendarDate.getMonth()}
          year={currentCalendarDate.getFullYear()}
        />
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
