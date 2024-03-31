import axios from "./axios.js";

// crear producto
export const crearProductoRequest = async (values) => {
  try {
    await axios.post(`/productos`, values);
  } catch (error) {}
};

// listarProductos
export const listarProductosRequest = async () => {
  try {
    const { data } = await axios.get(`/productos`);

    return data;
  } catch (error) {}
};

export const listarunProductoRequest = async (id_producto) => {
  try {
    const { data } = await axios.get(`/productos/${id_producto}`);

    return data;
  } catch (error) {}
};

export const actualizarProductoRequest = async (id_producto,values) => {
  try {
    await axios.put(`/productos/${id_producto}`,values);
  } catch (error) {}
};

export const eliminarProductoRequest = async (id_producto) => {
  try {
    await axios.delete(`/productos/${id_producto}`);
  } catch (error) {}
};
