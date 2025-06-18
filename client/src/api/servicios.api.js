import axios from "./axios.js";

export const listarServiciosRequest = async () => {
  try {
    const { data } = await axios.get(`/servicios`);
    return data;
  } catch (error) {
    console.error("Error al listar servicios:", error);
    throw error.response?.data?.message || "Error al listar servicios";
  }
};

export const listarUnServicioRequest = async (id) => {
  try {
    const { data } = await axios.get(`/servicios/${id}`);
    return data;
  } catch (error) {
    console.error("Error al listar un servicio:", error);
    throw error.response?.data?.message || "Servicio no encontrado";
  }
};

export const crearServicioRequest = async (servicio) => {
  try {
    const { data } = await axios.post(`/servicios`, servicio);
    return data;
  } catch (error) {
    console.error("Error al crear servicio:", error);
    if (error.response?.status === 409) {
      throw "Ya existe un servicio con este nombre";
    }
    throw error.response?.data?.message || "Error al crear servicio";
  }
};

export const actualizarServicioRequest = async (id, servicio) => {
  try {
    const { data } = await axios.put(`/servicios/${id}`, servicio);
    return data;
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    if (error.response?.status === 409) {
      throw "Ya existe un servicio con este nombre";
    }
    throw error.response?.data?.message || "Error al actualizar servicio";
  }
};

export const eliminarServicioRequest = async (id) => {
  try {
    await axios.delete(`/servicios/${id}`);
    return { message: "Servicio eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    throw error.response?.data?.message || "Error al eliminar servicio";
  }
};
