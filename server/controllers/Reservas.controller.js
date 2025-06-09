// Reservas.controller.js

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
      // Formato 'YYYY-MM-DD'
      return date.toISOString().split("T")[0];
    });

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
      oferta_personalizada, // Este array contendrá los servicios seleccionados del frontend
    } = req.body;

    let id_oferta_personalizada_db = null;
    let descripcion_oferta_para_reserva = null;
    let precio_venta_oferta_para_reserva = null;

    // Lógica para oferta personalizada
    if (oferta_personalizada && oferta_personalizada.length > 0) {
      // 1. Crear la Oferta_Personalizada (si aún no tiene ID)
      const nuevaOfertaPersonalizada = await Oferta_Personalizada.create(
        {},
        { transaction }
      );
      id_oferta_personalizada_db = nuevaOfertaPersonalizada.id;

      // 2. Calcular la descripción de la oferta y el precio total
      const nombresServicios = oferta_personalizada.map(
        (s) => s.nombre_servicio
      );
      descripcion_oferta_para_reserva = `Oferta Personalizada: ${nombresServicios.join(
        ", "
      )}`;

      const precioTotal = oferta_personalizada.reduce((total, servicio) => {
        return total + (Number(servicio.precio_servicio) || 0);
      }, 0);
      precio_venta_oferta_para_reserva = precioTotal;

      // 3. Crear las relaciones en Oferta_Servicio
      await Promise.all(
        oferta_personalizada.map((servicio) =>
          Oferta_Servicio.create(
            {
              id_servicio: servicio.id_servicio,
              id_oferta_personalizada: id_oferta_personalizada_db,
              cantidad: servicio.cantidad || 1, // Asegúrate de que cantidad esté definido o usa un default
            },
            { transaction }
          )
        )
      );
    } else if (id_oferta) {
      // Lógica para oferta estándar (si se proporciona id_oferta y no hay servicios personalizados)
      const ofertaEstandar = await Oferta.findByPk(id_oferta, { transaction });
      if (ofertaEstandar) {
        descripcion_oferta_para_reserva = ofertaEstandar.descripcion;
        precio_venta_oferta_para_reserva = ofertaEstandar.precio_venta;
      }
    }

    // Crear la Reserva
    const reserva = await Reserva.create(
      {
        nombre_cliente,
        apellidos,
        ci,
        fecha_sesion,
        telefono,
        correo_electronico,
        id_oferta: id_oferta || null, // Asegúrate de que sea null si es personalizada
        id_oferta_personalizada: id_oferta_personalizada_db, // Asigna el ID de la oferta personalizada
        descripcion_oferta: descripcion_oferta_para_reserva, // Guarda la descripción generada
        precio_venta_oferta: precio_venta_oferta_para_reserva, // Guarda el precio calculado
      },
      { transaction }
    );

    await transaction.commit();
    res.sendStatus(201);
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
      oferta_personalizada, // Este array contendrá los servicios seleccionados (si se actualiza a personalizada)
    } = req.body;

    const reserva = await Reserva.findByPk(id_reserva, { transaction });
    if (!reserva) {
      await transaction.rollback();
      return res.status(404).json({ message: "Reserva no encontrada." });
    }

    // Actualizar campos básicos
    reserva.nombre_cliente = nombre_cliente;
    reserva.apellidos = apellidos;
    reserva.ci = ci;
    reserva.fecha_sesion = fecha_sesion;
    reserva.telefono = telefono;
    reserva.correo_electronico = correo_electronico;

    // Reiniciar los campos de oferta por si se cambia el tipo de oferta
    reserva.id_oferta = null;
    reserva.id_oferta_personalizada = null;
    reserva.descripcion_oferta = null;
    reserva.precio_venta_oferta = null;

    // Manejo de ofertas
    if (id_oferta) {
      reserva.id_oferta = id_oferta;
      const oferta = await Oferta.findByPk(id_oferta, { transaction });
      if (oferta) {
        reserva.descripcion_oferta = oferta.descripcion;
        reserva.precio_venta_oferta = oferta.precio_venta;
      }
      // Si se cambia a una oferta estándar, asegurarse de limpiar la oferta personalizada existente
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
      // Manejo de ofertas personalizadas
      let id_oferta_personalizada_actual = reserva.id_oferta_personalizada;

      if (!id_oferta_personalizada_actual) {
        // Si no existe una oferta personalizada asociada, crear una nueva
        const nuevaPersonalizada = await Oferta_Personalizada.create(
          {},
          { transaction }
        );
        id_oferta_personalizada_actual = nuevaPersonalizada.id;
      }
      reserva.id_oferta_personalizada = id_oferta_personalizada_actual; // Asignar el ID (nuevo o existente)

      // Eliminar servicios existentes asociados a esta oferta personalizada antes de añadir los nuevos
      await Oferta_Servicio.destroy({
        where: { id_oferta_personalizada: id_oferta_personalizada_actual },
        transaction,
      });

      // Agregar nuevos servicios
      await Promise.all(
        oferta_personalizada.map((servicio) =>
          Oferta_Servicio.create(
            {
              id_servicio: servicio.id_servicio,
              id_oferta_personalizada: id_oferta_personalizada_actual,
              cantidad: servicio.cantidad || 1,
            },
            { transaction }
          )
        )
      );

      // Calcular y asignar la descripción y el precio para la oferta personalizada
      const nombresServicios = oferta_personalizada.map(
        (s) => s.nombre_servicio
      );
      reserva.descripcion_oferta = `Oferta Personalizada: ${nombresServicios.join(
        ", "
      )}`;

      const precioTotal = oferta_personalizada.reduce((total, servicio) => {
        return total + (Number(servicio.precio_servicio) || 0); // Corrected: Use precio_servicio
      }, 0);
      reserva.precio_venta_oferta = precioTotal;
    } else {
      // Si no hay id_oferta ni oferta_personalizada (ej. se está desvinculando de ambos)
      // Asegurarse de limpiar cualquier referencia a oferta personalizada si existía
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
    const id_reserva = req.params.id; // Este 'id' es el CI enviado desde el frontend
    const response = await Reserva.findAll({
      where: { ci: id_reserva }, // Busca por el campo 'ci'
      include: [
        {
          model: Oferta,
          required: false, // Incluir Oferta si existe
        },
        {
          model: Oferta_Personalizada, // Asegúrate de incluir ofertas personalizadas si es necesario para la visualización
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

    // ¡CAMBIO CLAVE AQUÍ!
    // Si un CI puede tener múltiples reservas, devuelve el array completo:
    res.json(response);
    // Si solo se espera una reserva por CI, puedes mantener:
    // res.json(response[0]); // Esto devolvería solo la primera
  } catch (error) {
    console.error("Error al listar una reserva por CI:", error); // Log más descriptivo
    return res.status(500).json({ message: error.message });
  }
};

export const buscarReservasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query; // Obtener la fecha de los parámetros de consulta
    if (!fecha) {
      return res
        .status(400)
        .json({ message: "La fecha es requerida para la búsqueda." });
    }

    // Buscar reservas que coincidan con la fecha (ignorando la hora)
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
      order: [["fecha_sesion", "ASC"]], // Opcional: ordenar por hora
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
