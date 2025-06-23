import axios from "./axios.js";



export const listarUsuariosRequest = async () => {
  try {
    const { data } = await axios.get(`/usuarios`);
    return data;
  } catch (error) {
    console.error("Error en listar usuarios (API):", error);
    return [];
  }
};

export const listarunUsuarioRequest = async (id_usuario) => {
  try {
    const { data } = await axios.get(`/usuarios/${id_usuario}`);
    return data;
  } catch (error) {
    console.error("Error en usuarios:", error);
    return null;
  }
};

export const crearUsuarioRequest = async (formData) => {
  try {
    const response = await axios.post(`/usuarios`, formData);
    return response;
  } catch (error) {
    console.error("Error en crear usuario:", error);
    throw error;
  }
};

export const editarUsuarioRequest = async (values, id_trabajador) => {
  try {
    const response = await axios.put(`/usuarios/${id_trabajador}`, values);
    return response;
  } catch (error) {
    console.error("Error en editar usuario:", error);
    throw error;
  }
};

export const eliminarUsuarioRequest = async (id_trabajador) => {
  try {
    const response = await axios.delete(`/usuarios/${id_trabajador}`);
    return response;
  } catch (error) {
    console.error("Error en eliminar usuario:", error);
    throw error;
  }
};
