import { Registro_Venta } from "../models/Registro_Venta.model.js";

export const ListarRegistroVentas = async (req, res) => {
  try {
    const response = await Registro_Venta.findAll({});
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
