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

export const obtenerNotificacionesRequest = async (filters = {}) => {
  try {
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
    const response = await axios.get(`/reservas/notificaciones/${id_reserva}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error("Error al obtener notificaciones por reserva:", error);
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
      `/notificaciones/programar-eliminacion/${id_notificacion}`,
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

export const enviarCorreoNotificacionRequest = async (id_notificacion) => {
  try {
    const res = await axios.post(`/notificaciones/enviar-correo`, {
      id_notificacion,
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error al enviar correo de notificación:",
      error.response?.data || error.message
    );
    throw error;
  }
};
