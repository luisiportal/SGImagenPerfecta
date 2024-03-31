import { Reserva } from "../models/Reserva.model.js";
import { Producto } from "../models/Producto.model.js";
import sequelize from "../db.js";

export const ListarReservas = async (req, res) => {
  try {
    const response = await Reserva.findAll({
      include: [
        {
          model: Producto,
        },
      ],
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearReserva = async (req, res) => {
  try {
    const {
      nombre_cliente,
      apellidos,
      ci,
      id_producto,
      fecha_sesion,
      telefono,
    } = req.body;

    const response = await Reserva.create({
      nombre_cliente,
      apellidos,
      ci,
      id_producto,
      fecha_sesion,
      telefono,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
export const actualizarReserva = async (req, res) => {
  try {
    const id_reserva = req.params.id;
    const {
      nombre_cliente,
      apellidos,
      ci,
      id_producto,
      fecha_sesion,
      telefono,
    } = req.body;

    const response = await Reserva.findByPk(id_reserva);
    (response.nombre_cliente = nombre_cliente),
      (response.apellidos = apellidos),
      (response.ci = ci),
      (response.id_producto = id_producto),
      (response.fecha_sesion = fecha_sesion),
      (response.telefono = telefono),
      await response.save();

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const eliminarReserva = async (req, res) => {
  try {
    const response = await Reserva.destroy({
      where: {
        id_reserva: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const listarUnaReserva = async (req, res) => {
  try {
    const id_reserva = req.params.id;

    const response = await Reserva.findAll({
      where: { ci: id_reserva },
      include: [
        {
          model: Producto,
        },
      ],
    });

    if (response.length === 0)
      return res.status(404).json({ message: "No tiene reserva" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
