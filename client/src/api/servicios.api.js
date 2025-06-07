import axios from "./axios.js";

// listarOfertas
export const listarServiciosRequest = async () => {
  try {
    const { data } = await axios.get(`/servicios`);

    return data;
  } catch (error) {
    console.log(error);
    
  }
};
