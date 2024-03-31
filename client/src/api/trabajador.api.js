import { trabajadoresDB } from "../db/trabajadores";
import { usuariosDB } from "../db/usuarios";
import axios from "./axios.js";

//login
export const loginRequest = (values) => {
  const usuarioIngresado = values.username;
  const contrasenaIngresada = values.password;

  // Busca el usuario en usuariosDB
  const usuarioEncontrado = usuariosDB.find(
    (user) => user.username === usuarioIngresado
  );

  if (usuarioEncontrado) {
    if (usuarioEncontrado.password === contrasenaIngresada) {
      return usuarioEncontrado;
    } else {
    }
  } else {
  }
};

//perfil
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
  } catch (error) {}
};

export const listarunTrabajadorRequest = async (id_trabajador) => {
  try {
    const { data } = await axios.get(`/trabajadores/${id_trabajador}`);

    return data;
  } catch (error) {
    
  }
};

export const crearTrabajadoresRequest = async (formData) => {
  try {
    const response = await axios.post(`/trabajadores`, formData);
    return response;
   
  } catch (error) {

  }
 
};

export const editarTrabajadoresRequest = async (values,id_trabajador) => {
  try {
    return await axios.put(`/trabajadores/${id_trabajador}`, values,id_trabajador);
  } catch (error) {}
};

export const eliminarTrabajadorRequest = async (id_trabajador) => {
  try {
    await axios.delete(`/trabajadores/${id_trabajador}`);
  } catch (error) {}
};

