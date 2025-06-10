// client/src/api/reservas.api.js
import axios from "./axios.js";

export const crearReservaRequest = async (values) => {
  try {
    console.log(values);
    const res = await axios.post(`/reservas/crear`, values);
    return res.data; // Devuelve la respuesta si es exitosa
  } catch (error) {
    console.error(
      "Error en crearReservaRequest:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const listarReservasRequest = async () => {
  try {
    const { data } = await axios.get(`/reservas/listar`);
    return data;
  } catch (error) {
    console.error(
      "Error en listarReservasRequest:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const eliminarReservaRequest = async (id_reserva) => {
  try {
    const res = await axios.delete(`/reservas/${id_reserva}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error en eliminarReservaRequest:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const actualizarReservaRequest = async (id_reserva, values) => {
  try {
    const res = await axios.put(`/reservas/${id_reserva}`, values);
    return res.data;
  } catch (error) {
    console.error(
      "Error en actualizarReservaRequest:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const listarunReservaRequest = async (ci) => {
  try {
    const res = await axios.get(`/reservas/listar/${ci}`);
    return res.data; // Devolver los datos directamente
  } catch (error) {
    // console.error("Error en listarunReservaRequest:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener las fechas de las reservas
export const obtenerFechasReservadasRequest = async () => {
  try {
    const { data } = await axios.get(`/reservas/fechas-reservadas`);
    return data;
  } catch (error) {
    throw error;
  }
};
