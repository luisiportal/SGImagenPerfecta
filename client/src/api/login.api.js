import axios from "./axios.js";

export const loginRequest = async (values) => {
  try {
    const res = await axios.post(`/auth/login`, values); // Cambiado a ruta más estándar
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error de respuesta del servidor:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
  }
};

export const logoutRequest = async () => {
  try {
    const res = await axios.post(`/auth/logout`);
    return res.data;
  } catch (error) {
    console.error("Error en logout:", error);
    throw error;
  }
};

export const verifyTokenRequest = async () => {
  try {
    const res = await axios.get(`/auth/verify`);
    return res.data;
  } catch (error) {
    console.error("Error verificando token:", error);
    throw error;
  }
};
