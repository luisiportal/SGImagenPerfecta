import axios from "./axios.js";

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
export const editarMiPerfilRequest = async (values, id_trabajador) => {
  try {
    const response = await axios.put(
      `/trabajadores/my-profile/${id_trabajador}`,
      values
    ); // ¡Nueva URL!
    return response;
  } catch (error) {
    console.error("Error en editarMiPerfilRequest:", error);
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
