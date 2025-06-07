import { Reserva } from "../models/Reserva.model.js";
import { Oferta } from "../models/Oferta.model.js";
import { Oferta_Personalizada } from "../models/Oferta_Personalizada.js";
import { Oferta_Servicio } from "../models/Oferta_Servicio.js";

export const ListarReservas = async (req, res) => {
  try {
    const response = await Reserva.findAll({
      include: [
        {
          model: Oferta,
        },
      ],
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Obtener Fechas de Reservas Existentes
export const obtenerFechasReservadas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      attributes: ["fecha_sesion"], // columna fecha_sesion
    });

    // fechas y formatearlas para que sean fáciles de comparar en el frontend
    // Las fechas vienen como objetos Date de la base de datos, las convertimos a formato 'YYYY-MM-DD'
    const fechasReservadas = reservas.map((reserva) => {
      const date = new Date(reserva.fecha_sesion);
      // evitar problemas de zona horaria, UTC para la comparación
      return date.toISOString().split("T")[0]; // Ejemplo: "2025-05-29"
    });

    res.json(fechasReservadas);
  } catch (error) {
    console.error("Error al obtener fechas reservadas:", error);
    return res.status(500).json({
      message: "Error interno del servidor al obtener fechas reservadas.",
    });
  }
};

export const crearReserva = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      nombre_cliente,
      apellidos,
      ci,
      fecha_sesion,
      telefono,
      correo_electronico,
      id_oferta,
      oferta_personalizada,
    } = req.body;

    const reserva = await Reserva.create(
      {
        nombre_cliente,
        apellidos,
        ci,
        id_oferta,
        oferta_personalizada,
        descripcion_oferta,
        precio_venta_oferta,
        fecha_sesion,
        telefono,
        correo_electronico,
      },
      { transaction }
    );

    if (oferta_personalizada) {
      const personalizada = await Oferta_Personalizada.create(
        { id_reserva: reserva.id_reserva },
        { transaction }
      );

      await Promise.all(
        oferta_personalizada.map((personalizada) =>
          Oferta_Servicio.create(
            {
              id_servicio,
              id_oferta_personalizada: personalizada.id_oferta_personalizada,
              cantidad,
            },
            { transaction }
          )
        )
      );
    }

    await transaction.commit();
    res.sendStatus(201);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
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
      nombre_oferta,
      fecha_sesion,
      telefono,
      correo_electronico,
    } = req.body; // Agrega correo_electronico aquí

    const response = await Reserva.findByPk(id_reserva);
    if (!response) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    // Obtener los detalles de la oferta si se proporciona id_oferta y es diferente
    let descripcion_oferta_to_save = response.descripcion_oferta;
    let precio_venta_oferta_to_save = response.precio_venta_oferta;

    if (id_oferta && id_oferta !== response.id_oferta) {
      const oferta = await Oferta.findByPk(id_oferta);
      if (!oferta) {
        return res.status(404).json({ message: "Oferta no encontrada." });
      }
      descripcion_oferta_to_save = oferta.descripcion;
      precio_venta_oferta_to_save = oferta.precio_venta;
    }

    response.nombre_cliente = nombre_cliente;
    response.apellidos = apellidos;
    response.ci = ci;
    response.nombre_oferta = nombre_oferta;
    response.descripcion_oferta = descripcion_oferta_to_save;
    response.precio_venta_oferta = precio_venta_oferta_to_save;
    response.fecha_sesion = fecha_sesion;
    response.telefono = telefono;
    response.correo_electronico = correo_electronico; // Actualiza el campo de correo electrónico
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
          model: Oferta,
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
