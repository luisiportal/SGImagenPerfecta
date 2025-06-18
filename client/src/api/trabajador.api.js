import axios from "./axios.js";

export const loginRequest = async (values) => {
  try {
    const res = await axios.post(`/trabajadores/login`, values);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error de respuesta del servidor:", error.response.data);
      console.error("Estado:", error.response.status);
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

export const cargarPerfilRequest = (id) => {
  const usuarioEncontrado = trabajadoresDB.find(
    (user) => user.id_usuario === id
  );
  return usuarioEncontrado;
};

export const listarTrabajadoresRequest = async () => {
  try {
    const { data } = await axios.get(`/trabajadores`);
    return data;
  } catch (error) {
    console.error("Error en listarTrabajadoresRequest (API):", error);
    return [];
  }
};

export const listarunTrabajadorRequest = async (id_trabajador) => {
  try {
    const { data } = await axios.get(`/trabajadores/${id_trabajador}`);
    return data;
  } catch (error) {
    console.error("Error en listarunTrabajadorRequest:", error);
    return null;
  }
};

export const crearTrabajadoresRequest = async (formData) => {
  try {
    const response = await axios.post(`/trabajadores`, formData);
    return response;
  } catch (error) {
    console.error("Error en crearTrabajadoresRequest:", error);
    throw error;
  }
};

export const editarTrabajadoresRequest = async (values, id_trabajador) => {
  try {
    const response = await axios.put(`/trabajadores/${id_trabajador}`, values);
    return response;
  } catch (error) {
    console.error("Error en editarTrabajadoresRequest:", error);
    throw error;
  }
};

export const eliminarTrabajadorRequest = async (id_trabajador) => {
  try {
    const response = await axios.delete(`/trabajadores/${id_trabajador}`);
    return response;
  } catch (error) {
    console.error("Error en eliminarTrabajadorRequest:", error);
    throw error;
  }
};
