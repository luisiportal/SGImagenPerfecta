import axios from "./axios.js";

export const listarVentasRequest = async () => {
  try {
    const { data } = await axios.get(`/ventas`);
    return data;
  } catch (error) {}
};

export const confirmarVentaRequest = async (id_venta) => {
  try {
    await axios.put(`/ventas/confirmar/${id_venta}`);
  } catch (error) {}
};

export const eliminarVentaRequest = async (id_venta) => {
  try {
    await axios.delete(`/ventas/${id_venta}`);
  } catch (error) {}
};

export const listarResumenVentasRequest = async () => {
  try {
    const { data } = await axios.get(`/resumen-ventas`);
    return data;
  } catch (error) {}
};
