import { Notificacion } from "../models/Notification.model.js";
import { Reserva } from "../models/Reserva.model.js";

// Helper function para generar enlaces mailto
function generarMailtoLink(
  reserva,
  mensaje,
  asunto = "Notificación de reserva"
) {
  const body =
    `Hola ${reserva.nombre_cliente},\n\n${mensaje}\n\n` +
    `Detalles de la reserva:\n` +
    `- Fecha: ${reserva.fecha_sesion}\n` +
    `- Servicio: ${reserva.descripcion_oferta}\n` +
    `- Total: $${reserva.precio_venta_oferta}`;

  return (
    `mailto:${reserva.correo_electronico}?` +
    `subject=${encodeURIComponent(asunto)}&` +
    `body=${encodeURIComponent(body)}`
  );
}

// CRUD Completo
export const crearNotificacion = async (req, res) => {
  try {
    const { id_reserva, mensaje, tipo, asunto, fecha_eliminacion } = req.body;

    const reserva = await Reserva.findByPk(id_reserva);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Validar fecha de eliminación si fue proporcionada
    let fechaEliminacion = null;
    if (fecha_eliminacion) {
      fechaEliminacion = new Date(fecha_eliminacion);
      if (fechaEliminacion < new Date()) {
        return res.status(400).json({
          message: "La fecha de eliminación debe ser en el futuro",
        });
      }
    }

    const notificacion = await Notificacion.create({
      id_reserva,
      mensaje,
      tipo,
      asunto,
      destinatario: reserva.correo_electronico,
      enviado: tipo === "sistema",
      fecha_eliminacion: fechaEliminacion,
    });

    // Para emails no enviados, generar el mailtoLink
    if (tipo === "email" && !notificacion.enviado) {
      notificacion.mailtoLink = generarMailtoLink(reserva, mensaje, asunto);
    }

    res.status(201).json(notificacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear notificación",
      error: error.message,
    });
  }
};

export const obtenerNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.findAll({
      order: [["fecha_envio", "DESC"]],
      include: [Reserva],
    });

    // Agregar mailtoLink a notificaciones de email no enviadas
    const notificacionesConLinks = notificaciones.map((notif) => {
      if (notif.tipo === "email" && !notif.enviado && notif.Reserva) {
        return {
          ...notif.toJSON(),
          mailtoLink: generarMailtoLink(
            notif.Reserva,
            notif.mensaje,
            notif.asunto
          ),
        };
      }
      return notif;
    });

    res.json(notificacionesConLinks);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener notificaciones",
      error: error.message,
    });
  }
};

export const obtenerNotificacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const notificacion = await Notificacion.findByPk(id, {
      include: [Reserva],
    });

    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    // Generar mailtoLink si es necesario
    if (
      notificacion.tipo === "email" &&
      !notificacion.enviado &&
      notificacion.Reserva
    ) {
      notificacion.mailtoLink = generarMailtoLink(
        notificacion.Reserva,
        notificacion.mensaje,
        notificacion.asunto
      );
    }

    res.json(notificacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener notificación",
      error: error.message,
    });
  }
};

export const actualizarNotificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { mensaje, asunto, enviado, fecha_eliminacion } = req.body;

    const notificacion = await Notificacion.findByPk(id, {
      include: [Reserva],
    });

    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    // Validar fecha de eliminación si fue proporcionada
    if (fecha_eliminacion) {
      const fechaEliminacion = new Date(fecha_eliminacion);
      if (fechaEliminacion < new Date()) {
        return res.status(400).json({
          message: "La fecha de eliminación debe ser en el futuro",
        });
      }
      notificacion.fecha_eliminacion = fechaEliminacion;
    }

    // Actualizar campos
    notificacion.mensaje = mensaje || notificacion.mensaje;
    notificacion.asunto = asunto || notificacion.asunto;
    notificacion.enviado =
      enviado !== undefined ? enviado : notificacion.enviado;

    await notificacion.save();

    // Regenerar mailtoLink si es necesario
    if (
      notificacion.tipo === "email" &&
      !notificacion.enviado &&
      notificacion.Reserva
    ) {
      notificacion.mailtoLink = generarMailtoLink(
        notificacion.Reserva,
        notificacion.mensaje,
        notificacion.asunto
      );
    }

    res.json(notificacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar notificación",
      error: error.message,
    });
  }
};

export const eliminarNotificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Notificacion.destroy({
      where: { id_notificacion: id },
    });

    if (!eliminado) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar notificación",
      error: error.message,
    });
  }
};

export const obtenerNotificacionesPorReserva = async (req, res) => {
  try {
    const { id_reserva } = req.params;
    const notificaciones = await Notificacion.findAll({
      where: { id_reserva },
      include: [Reserva],
      order: [["fecha_envio", "DESC"]],
    });

    // Agregar mailtoLink a notificaciones de email no enviadas
    const notificacionesConLinks = notificaciones.map((notif) => {
      if (notif.tipo === "email" && !notif.enviado && notif.Reserva) {
        return {
          ...notif.toJSON(),
          mailtoLink: generarMailtoLink(
            notif.Reserva,
            notif.mensaje,
            notif.asunto
          ),
        };
      }
      return notif;
    });

    res.json(notificacionesConLinks);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener notificaciones por reserva",
      error: error.message,
    });
  }
};

export const programarEliminacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_eliminacion } = req.body;

    const notificacion = await Notificacion.findByPk(id);
    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    // Si se proporciona null, se cancela la eliminación automática
    if (fecha_eliminacion === null) {
      notificacion.fecha_eliminacion = null;
      await notificacion.save();
      return res.json(notificacion);
    }

    // Validar fecha de eliminación
    const fechaEliminacion = new Date(fecha_eliminacion);
    if (fechaEliminacion < new Date()) {
      return res.status(400).json({
        message: "La fecha de eliminación debe ser en el futuro",
      });
    }

    notificacion.fecha_eliminacion = fechaEliminacion;
    await notificacion.save();

    res.json(notificacion);
  } catch (error) {
    res.status(500).json({
      message: "Error al programar eliminación",
      error: error.message,
    });
  }
};

// Función para limpieza automática (usar en tarea programada)
export const limpiarNotificacionesExpiradas = async () => {
  try {
    const resultado = await Notificacion.destroy({
      where: {
        fecha_eliminacion: {
          [sequelize.Op.lte]: sequelize.fn("NOW"),
        },
      },
    });
    console.log(`Notificaciones eliminadas automáticamente: ${resultado}`);
    return resultado;
  } catch (error) {
    console.error("Error en limpieza automática:", error);
    throw error;
  }
};
