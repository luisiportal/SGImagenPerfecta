import { Reserva } from "../models/Reserva.model.js";
import { Oferta } from "../models/Oferta.model.js";
import { Oferta_Personalizada } from "../models/Oferta_Personalizada.js";
import { Oferta_Servicio } from "../models/Oferta_Servicio.js";
import sequelize from "../db.js";
import { Servicio } from "../models/Servicio.model.js";

export const ListarReservas = async (req, res) => {
  try {
    const response = await Reserva.findAll({
      include: [
        {
          model: Oferta,
          required: false,
        },
        {
          model: Oferta_Personalizada,
          required: false,
          include: [
            {
              model: Oferta_Servicio,
              include: [{ model: Servicio }],
            },
          ],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const obtenerFechasReservadas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      attributes: ["fecha_sesion"],
    });
    const fechasReservadas = reservas.map((reserva) => reserva.fecha_sesion);
    res.json(fechasReservadas);
  } catch (error) {
    console.error("Error al obtener fechas de reservas:", error);
    return res.status(500).json({ message: error.message });
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

    if (
      !nombre_cliente ||
      !apellidos ||
      !ci ||
      !fecha_sesion ||
      !correo_electronico
    ) {
      await transaction.rollback();
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }
    // Verificar si ya existe una reserva con el mismo CI
    const reservaExistentePorCI = await Reserva.findOne({
      where: { ci },
      transaction,
    });

    if (reservaExistentePorCI) {
      await transaction.rollback();
      return res.status(400).json({
        message:
          "Ya existe una reserva con este número de Carnet de Identidad.",
        field: "ci",
      });
    }

    // Verificar si ya existe una reserva con el mismo nombre y apellidos
    const reservaExistentePorNombre = await Reserva.findOne({
      where: {
        nombre_cliente,
        apellidos,
      },
      transaction,
    });

    if (reservaExistentePorNombre) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Ya existe una reserva con este nombre y apellidos.",
        fields: ["nombre_cliente", "apellidos"],
      });
    }

    if (id_oferta && oferta_personalizada?.length > 0) {
      await transaction.rollback();
      return res.status(400).json({
        message:
          "No se puede asignar tanto una oferta estándar como personalizada.",
      });
    }

    if (
      !id_oferta &&
      (!oferta_personalizada || oferta_personalizada.length === 0)
    ) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Debe proporcionar una oferta estándar o personalizada.",
      });
    }

    let id_oferta_personalizada_db = null;
    let descripcion = null;
    let precio_venta = null;

    if (oferta_personalizada && oferta_personalizada.length > 0) {
      for (const servicio of oferta_personalizada) {
        if (!servicio.id_servicio || typeof servicio.cantidad !== "number") {
          await transaction.rollback();
          return res.status(400).json({
            message: "Datos incompletos o inválidos en oferta_personalizada.",
          });
        }
      }

      const serviciosIds = oferta_personalizada.map((s) => s.id_servicio);
      const servicios = await Servicio.findAll({
        where: { id_servicio: serviciosIds },
        attributes: ["id_servicio", "nombre_servicio", "precio_servicio"],
        transaction,
      });

      if (servicios.length !== serviciosIds.length) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "Uno o más servicios no existen." });
      }

      const nuevaOfertaPersonalizada = await Oferta_Personalizada.create(
        {},
        { transaction }
      );
      id_oferta_personalizada_db = nuevaOfertaPersonalizada.id;

      await Promise.all(
        oferta_personalizada.map((servicio) => {
          const servicioDb = servicios.find(
            (s) => s.id_servicio === servicio.id_servicio
          );
          return Oferta_Servicio.create(
            {
              id_servicio: servicio.id_servicio,
              id_oferta_personalizada: id_oferta_personalizada_db,
              cantidad: servicio.cantidad || 1,
              totalServicio:
                (servicio.cantidad || 1) * servicioDb.precio_servicio,
            },
            { transaction }
          );
        })
      );

      descripcion = `Oferta Personalizada: ${servicios
        .map((s) => s.nombre_servicio)
        .join(", ")}`;
      precio_venta = oferta_personalizada.reduce((total, servicio) => {
        const servicioDb = servicios.find(
          (s) => s.id_servicio === servicio.id_servicio
        );
        return total + servicioDb.precio_servicio * (servicio.cantidad || 1);
      }, 0);
    } else if (id_oferta) {
      const ofertaEstandar = await Oferta.findByPk(id_oferta, { transaction });
      if (!ofertaEstandar) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Oferta estándar no encontrada." });
      }
      descripcion = ofertaEstandar.descripcion;
      precio_venta = ofertaEstandar.precio_venta;
    }

    const reserva = await Reserva.create(
      {
        nombre_cliente,
        apellidos,
        ci,
        fecha_sesion,
        telefono,
        correo_electronico,
        id_oferta: id_oferta || null,
        id_oferta_personalizada: id_oferta_personalizada_db,
        descripcion_oferta: descripcion,
        precio_venta_oferta: precio_venta,
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json(reserva);
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear reserva:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarReserva = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const id_reserva = req.params.id;
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

    if (
      !nombre_cliente ||
      !apellidos ||
      !ci ||
      !fecha_sesion ||
      !correo_electronico
    ) {
      await transaction.rollback();
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    if (id_oferta && oferta_personalizada?.length > 0) {
      await transaction.rollback();
      return res.status(400).json({
        message:
          "No se puede asignar tanto una oferta estándar como personalizada.",
      });
    }

    const reserva = await Reserva.findByPk(id_reserva, { transaction });
    if (!reserva) {
      await transaction.rollback();
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    reserva.nombre_cliente = nombre_cliente;
    reserva.apellidos = apellidos;
    reserva.ci = ci;
    reserva.fecha_sesion = fecha_sesion;
    reserva.telefono = telefono;
    reserva.correo_electronico = correo_electronico;

    reserva.id_oferta = null;
    reserva.id_oferta_personalizada = null;
    reserva.descripcion_oferta = null;
    reserva.precio_venta_oferta = null;

    if (id_oferta) {
      const oferta = await Oferta.findByPk(id_oferta, { transaction });
      if (!oferta) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: "Oferta estándar no encontrada." });
      }
      reserva.id_oferta = id_oferta;
      reserva.descripcion_oferta = oferta.descripcion;
      reserva.precio_venta_oferta = oferta.precio_venta;

      if (reserva.id_oferta_personalizada) {
        await Oferta_Servicio.destroy({
          where: { id_oferta_personalizada: reserva.id_oferta_personalizada },
          transaction,
        });
        await Oferta_Personalizada.destroy({
          where: { id: reserva.id_oferta_personalizada },
          transaction,
        });
        reserva.id_oferta_personalizada = null;
      }
    } else if (oferta_personalizada && oferta_personalizada.length > 0) {
      for (const servicio of oferta_personalizada) {
        if (!servicio.id_servicio || typeof servicio.cantidad !== "number") {
          await transaction.rollback();
          return res.status(400).json({
            message: "Datos incompletos o inválidos en oferta_personalizada.",
          });
        }
      }

      const serviciosIds = oferta_personalizada.map((s) => s.id_servicio);
      const servicios = await Servicio.findAll({
        where: { id_servicio: serviciosIds },
        attributes: ["id_servicio", "nombre_servicio", "precio_servicio"],
        transaction,
      });

      if (servicios.length !== serviciosIds.length) {
        await transaction.rollback();
        return res
          .status(400)
          .json({ message: "Uno o más servicios no existen." });
      }

      let id_oferta_personalizada_actual = reserva.id_oferta_personalizada;
      if (!id_oferta_personalizada_actual) {
        const nuevaPersonalizada = await Oferta_Personalizada.create(
          {},
          { transaction }
        );
        id_oferta_personalizada_actual = nuevaPersonalizada.id;
      }
      reserva.id_oferta_personalizada = id_oferta_personalizada_actual;

      await Oferta_Servicio.destroy({
        where: { id_oferta_personalizada: id_oferta_personalizada_actual },
        transaction,
      });

      await Promise.all(
        oferta_personalizada.map((servicio) => {
          const servicioDb = servicios.find(
            (s) => s.id_servicio === servicio.id_servicio
          );
          return Oferta_Servicio.create(
            {
              id_servicio: servicio.id_servicio,
              id_oferta_personalizada: id_oferta_personalizada_actual,
              cantidad: servicio.cantidad || 1,
              totalServicio:
                (servicio.cantidad || 1) * servicioDb.precio_servicio,
            },
            { transaction }
          );
        })
      );

      reserva.descripcion_oferta = `Oferta Personalizada: ${servicios
        .map((s) => s.nombre_servicio)
        .join(", ")}`;
      reserva.precio_venta_oferta = oferta_personalizada.reduce(
        (total, servicio) => {
          const servicioDb = servicios.find(
            (s) => s.id_servicio === servicio.id_servicio
          );
          return total + servicioDb.precio_servicio * (servicio.cantidad || 1);
        },
        0
      );
    } else {
      if (reserva.id_oferta_personalizada) {
        await Oferta_Servicio.destroy({
          where: { id_oferta_personalizada: reserva.id_oferta_personalizada },
          transaction,
        });
        await Oferta_Personalizada.destroy({
          where: { id: reserva.id_oferta_personalizada },
          transaction,
        });
        reserva.id_oferta_personalizada = null;
      }
    }

    await reserva.save({ transaction });
    await transaction.commit();
    res.json(reserva);
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar reserva:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarReserva = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const id_reserva = req.params.id;

    const reserva = await Reserva.findByPk(id_reserva, { transaction });
    if (!reserva) {
      await transaction.rollback();
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    if (reserva.id_oferta_personalizada) {
      await Oferta_Personalizada.destroy({
        where: { id: reserva.id_oferta_personalizada },
        transaction,
      });
    }

    await Reserva.destroy({
      where: { id_reserva },
      transaction,
    });

    await transaction.commit();
    res.sendStatus(204);
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar reserva:", error);
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
          required: false,
        },
        {
          model: Oferta_Personalizada,
          required: false,
          include: [
            {
              model: Oferta_Servicio,
              include: [{ model: Servicio }],
            },
          ],
        },
      ],
    });

    if (response.length === 0) {
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    res.json(response);
  } catch (error) {
    console.error("Error al listar una reserva por CI:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const buscarReservasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      return res
        .status(400)
        .json({ message: "La fecha es requerida para la búsqueda." });
    }

    const reservas = await Reserva.findAll({
      where: sequelize.where(
        sequelize.fn("date", sequelize.col("fecha_sesion")),
        "=",
        fecha
      ),
      include: [
        {
          model: Oferta,
          required: false,
        },
        {
          model: Oferta_Personalizada,
          required: false,
          include: [
            {
              model: Oferta_Servicio,
              include: [{ model: Servicio }],
            },
          ],
        },
      ],
      order: [["fecha_sesion", "ASC"]],
    });

    if (reservas.length === 0) {
      return res.status(404).json({
        message: "No se encontraron reservas para la fecha especificada.",
      });
    }

    res.json(reservas);
  } catch (error) {
    console.error("Error al buscar reservas por fecha:", error);
    return res.status(500).json({ message: error.message });
  }
};
