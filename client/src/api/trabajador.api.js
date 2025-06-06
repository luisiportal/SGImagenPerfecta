// trabajador.api.js
import { trabajadoresDB } from "../db/trabajadores";
import { usuariosDB } from "../db/usuarios";
import axios from "./axios.js"; // Asegúrate de que esta ruta sea correcta y axios esté configurado para tu backend

// login
export const loginRequest = async (values) => {
  // Añadir 'async' porque haremos una petición asíncrona
  try {
    // Realiza una petición POST a la API de login con los valores de usuario y contraseña
    const res = await axios.post(`/trabajadores/login`, values);
    return res.data; // Retorna los datos de respuesta del servidor (e.g., token, user info)
  } catch (error) {
    // Manejo de errores de la petición HTTP
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error de respuesta del servidor:", error.response.data);
      console.error("Estado:", error.response.status);
      // Puedes lanzar el error específico del servidor para que se maneje en el AuthContext
      throw error.response.data;
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta (e.g., servidor no disponible)
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo sucedió al configurar la petición que disparó un error
      console.error("Error al configurar la solicitud:", error.message);
      throw new Error("Error al configurar la solicitud.");
    }
  }
};

// ... el resto de tu código de trabajador.api.js

// perfil (Este era el código original, si lo tienes, asegúrate de que no cause conflictos si la API ya maneja perfiles)
export const cargarPerfilRequest = (id) => {
  const usuarioEncontrado = trabajadoresDB.find(
    (user) => user.id_usuario === id
  );
  return usuarioEncontrado;
};

// plantilla trabajadores
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
    throw error; // Propagar el error para que se maneje en el componente
  }
};

export const editarTrabajadoresRequest = async (values, id_trabajador) => {
  try {
    // Axios PUT recibe la URL, luego los datos a enviar y luego la configuración.
    // El id_trabajador en el tercer argumento no es el uso correcto para datos adicionales,
    // asumo que 'values' ya contiene todos los campos necesarios.
    const response = await axios.put(`/trabajadores/${id_trabajador}`, values);
    return response;
  } catch (error) {
    console.error("Error en editarTrabajadoresRequest:", error);
    throw error; // Propagar el error
  }
};

export const eliminarTrabajadorRequest = async (id_trabajador) => {
  try {
    const response = await axios.delete(`/trabajadores/${id_trabajador}`);
    return response;
  } catch (error) {
    console.error("Error en eliminarTrabajadorRequest:", error);
    throw error; // Propagar el error
  }
};
