import axios from "./axios.js";

// crear reserva
export const crearReservaRequest = async (values) => {
  try {
    await axios.post(`/reservas`, values);
  } catch (error) {}
};

//listo
export const listarReservasRequest = async () => {
  try {
    const { data } = await axios.get(`/reservas`);
    return data;
  } catch (error) {}
};


export const eliminarReservaRequest = async (id_reserva) => {
  try {
    await axios.delete(`/reservas/${id_reserva}`);
  } catch (error) {}
};

export const actualizarReservaRequest = async (id_reserva,values) => {
  try {
    await axios.put(`/reservas/${id_reserva}`,values);
  } catch (error) {}
};



export const listarunReservaRequest = async (ci) => {
  try {
   return await axios.get(`/reservas/${ci}`);
    

  
  } catch (error) {}
};
