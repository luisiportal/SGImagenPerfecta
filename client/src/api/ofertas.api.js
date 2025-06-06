import axios from "./axios.js";

// crear oferta
export const crearOfertaRequest = async (values) => {
  try {
    const res = await axios.post(`/ofertas`, values);
    return res.data;
  } catch (error) {
    console.error(
      "Error en crearOfertaRequest:",
      error.response?.data || error.message
    );
    throw error; // Re-lanza el error para que el componente lo maneje
  }
};

// listarOfertas
export const listarOfertasRequest = async () => {
  try {
    const { data } = await axios.get(`/ofertas`);

    return data;
  } catch (error) {}
};

export const listarunOfertaRequest = async (id_oferta) => {
  try {
    const { data } = await axios.get(`/ofertas/${id_oferta}`);

    return data;
  } catch (error) {}
};

export const actualizarOfertaRequest = async (id_oferta, values) => {
  try {
    await axios.put(`/ofertas/${id_oferta}`, values);
  } catch (error) {}
};

export const eliminarOfertaRequest = async (id_oferta) => {
  try {
    await axios.delete(`/ofertas/${id_oferta}`);
  } catch (error) {}
};
