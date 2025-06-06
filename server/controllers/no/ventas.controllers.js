import { Venta } from "../models/Venta.model.js";
import sequelize from "../db.js";
import { QueryTypes } from "sequelize";

export const ListarVentas = async (req, res) => {
  try {
    const response = await sequelize.query(
      `SELECT v.id_venta, r.nombre_cliente, r.apellidos, pro.nombre_oferta, v.descripcion, v.pago_confirmado, pro.precio_venta
      FROM "ventas" AS v 
      JOIN reservas AS r ON v.id_reserva = r.id_reserva
      JOIN ofertas AS pro ON r.id_oferta = pro.id_oferta
      ORDER BY v.id_venta DESC`,
      { type: QueryTypes.SELECT }
    );

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearVenta = async (req, res) => {
  try {
    const { id_oferta, id_reserva, id_trabajador, descripcion } = req.body;

    const response = await Venta.create({
      id_oferta,
      id_reserva,
      id_trabajador,
      descripcion,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const confirmarVenta = async (req, res) => {
  try {
    const id_venta = req.params.id;

    const response = await Venta.findByPk(id_venta);
    response.pago_confirmado = "Confirmado";
    await response.save();

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const actualizarVenta = async (req, res) => {
  try {
    const id_venta = req.params.id;
    const { id_oferta, id_reserva, id_trabajador, descripcion } = req.body;

    const response = await Venta.findByPk(id_venta);
    response.id_oferta = id_oferta;
    response.id_reserva = id_reserva;
    response.id_trabajador = id_trabajador;
    response.descripcion = descripcion;
    await response.save();

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const eliminarVenta = async (req, res) => {
  try {
    const response = await Venta.destroy({
      where: {
        id_venta: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const listarUnVenta = async (req, res) => {
  try {
    const id_venta = req.params.id;

    const response = await Venta.findByPk(id_venta);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
