// frontend/src/api/notificaciones.api.js
import axios from "./axios.js";

export const crearNotificacionRequest = async (values) => {
  try {
    const res = await axios.post("/notificaciones", values);
    return res.data;
  } catch (error) {
    console.error(
      "Error al crear notificación:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Modificada para aceptar filtros
export const obtenerNotificacionesRequest = async (filters = {}) => {
  try {
    // Construir la URL con parámetros de consulta si hay filtros
    const params = new URLSearchParams(filters).toString();
    const url = params ? `/notificaciones?${params}` : "/notificaciones";
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(
      "Error al obtener notificaciones:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const obtenerNotificacionesPorReservaRequest = async (id_reserva) => {
  try {
    const { data } = await axios.get(`/reservas/${id_reserva}/notificaciones`);
    return data; // Esto debería devolver un array de notificaciones
  } catch (error) {
    console.error(
      "Error al obtener notificaciones por reserva:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const actualizarNotificacionRequest = async (
  id_notificacion,
  values
) => {
  try {
    const res = await axios.put(`/notificaciones/${id_notificacion}`, values);
    return res.data;
  } catch (error) {
    console.error(
      "Error al actualizar notificación:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const eliminarNotificacionRequest = async (id_notificacion) => {
  try {
    const res = await axios.delete(`/notificaciones/${id_notificacion}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error al eliminar notificación:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const programarEliminacionRequest = async (
  id_notificacion,
  fecha_eliminacion
) => {
  try {
    const res = await axios.put(
      `/notificaciones/${id_notificacion}/programar-eliminacion`,
      { fecha_eliminacion }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Error al programar eliminación:",
      error.response?.data || error.message
    );
    throw error;
  }
};
