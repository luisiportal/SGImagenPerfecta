import { Notificacion } from "../models/Notificacion.model.js";
import { Reserva } from "../models/Reserva.model.js";
import { sequelize } from "../db.js";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "2d791b90aa1707",
    pass: "32991ed99d0b8d",
  },
});
const sendSingleEmailNotification = async (notificacion) => {
  if (!notificacion.Reserva || !notificacion.Reserva.email_cliente) {
    console.warn(
      `[Notificación ID: ${notificacion.id_notificacion}] No hay datos de reserva o email del cliente.`
    );
    throw new Error("Missing client email or reservation data.");
  }

  try {
    const recipientEmail = notificacion.Reserva.email_cliente;
    const subject =
      notificacion.asunto || notificacion.titulo || "Notificación de Reserva"; // Asunto de la notificación
    const emailContent = notificacion.mensaje;

    await transporter.sendMail({
      from: '"Tu Negocio" <info@tunegocio.com>', // Remitente del email
      to: recipientEmail,
      subject: subject,
      html: emailContent,
    });

    console.log(
      `[Email Enviado] Notificación ID: ${notificacion.id_notificacion} a ${recipientEmail}`
    );
    return true; // Éxito en el envío
  } catch (emailError) {
    console.error(
      `[Error Envío Email] Notificación ID: ${notificacion.id_notificacion} -`,
      emailError.message
    );
    throw emailError; // Re-lanza el error para manejarlo en la función principal
  }
};

// **Función para el Cron Job: Buscar y Enviar Emails Pendientes**
export const checkAndSendPendingEmails = async () => {
  console.log(
    `[CRON JOB] Iniciando verificación de notificaciones pendientes... (${new Date().toISOString()})`
  );
  const transaction = await sequelize.transaction(); // Iniciar una transacción
  try {
    const now = new Date();

    const pendingNotifications = await Notificacion.findAll({
      where: {
        fecha_envio: { [Op.lte]: now }, // Fecha de envío menor o igual a la fecha y hora actual
        enviado: false, // Que aún no se haya enviado
        tipo: "email", // Que sea de tipo email
      },
      include: [
        {
          model: Reserva,
          as: "Reserva", // Asegúrate de que este 'as' coincida con tu asociación en associations.js
          attributes: [
            "nombre_cliente",
            "apellidos",
            "email_cliente",
            "fecha_sesion",
            "hora_sesion",
          ],
        },
      ],
      transaction: transaction, // Asegurarse de que la consulta esté dentro de la transacción
    });

    if (pendingNotifications.length === 0) {
      console.log(
        "[CRON JOB] No se encontraron notificaciones por email pendientes."
      );
      await transaction.commit(); // Confirmar la transacción incluso si no hay nada que hacer
      return {
        message: "No hay notificaciones por email pendientes para enviar.",
      };
    }

    console.log(
      `[CRON JOB] Encontradas ${pendingNotifications.length} notificaciones por email pendientes.`
    );

    for (const notificacion of pendingNotifications) {
      try {
        await sendSingleEmailNotification(notificacion); // Usar la función auxiliar

        // Actualizar el estado de la notificación después del envío exitoso
        notificacion.enviado = true;
        notificacion.fecha_envio_real = new Date(); // Registrar la fecha real de envío
        await notificacion.save({ transaction: transaction }); // Guardar dentro de la transacción
      } catch (error) {
        // Si hay un error en el envío de un correo, lo registramos pero continuamos con los demás
        console.error(
          `[CRON JOB ERROR] Falló el envío de la notificación ID: ${notificacion.id_notificacion}. Error: ${error.message}`
        );
        // Opcional: Podrías añadir lógica aquí para marcar la notificación con un error,
        // o incrementar un contador de intentos fallidos.
      }
    }

    await transaction.commit(); // Confirmar todos los cambios si todo el proceso fue bien
    console.log(
      "[CRON JOB] Proceso de envío de emails completado y transacción confirmada."
    );
    return {
      message: `Se procesaron ${pendingNotifications.length} notificaciones.`,
    };
  } catch (error) {
    await transaction.rollback(); // Deshacer todos los cambios si ocurre un error inesperado
    console.error(
      "[CRON JOB ERROR GLOBAL] Error en checkAndSendPendingEmails:",
      error
    );
    throw new Error(
      "Error interno del servidor al procesar notificaciones por email."
    );
  }
};

export const enviarCorreoNotificacion = async (req, res) => {
  try {
    const { id_notificacion } = req.body;

    const notificacion = await Notificacion.findByPk(id_notificacion, {
      include: [
        {
          model: Reserva,
          as: "Reserva",
        },
      ],
    });

    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    if (notificacion.tipo !== "email") {
      return res
        .status(400)
        .json({ message: "La notificación no es de tipo email." });
    }
    await sendSingleEmailNotification(notificacion);

    // Si todo fue bien, actualiza el estado y guarda
    notificacion.enviado = true;
    notificacion.fecha_envio_real = new Date();
    await notificacion.save();

    if (!notificacion.Reserva || !notificacion.Reserva.correo_electronico) {
      return res.status(400).json({
        message: "La reserva asociada no tiene un correo electrónico.",
      });
    }

    const { Reserva: reservaAsociada, mensaje, asunto } = notificacion;

    const precioNumerico = parseFloat(reservaAsociada.precio_venta_oferta || 0);

    const precioFormateado = isNaN(precioNumerico)
      ? "0.00"
      : precioNumerico.toFixed(2);

    const emailBodyHtml = `
      <p>Hola <strong>${reservaAsociada.nombre_cliente} ${
      reservaAsociada.apellidos
    }</strong>,</p>
      <p>${mensaje}</p>
      <p><strong>Detalles de tu reserva:</strong></p>
      <ul>
        <li><strong>Fecha y Hora:</strong> ${format(
          new Date(reservaAsociada.fecha_sesion),
          "dd/MM/yyyy HH:mm",
          { locale: es }
        )}</li>
        <li><strong>Servicio:</strong> ${
          reservaAsociada.descripcion_oferta
        }</li>
        <li><strong>Precio:</strong> $${precioFormateado}</li>
      </ul>
      <p>Gracias por tu preferencia.</p>
      <p>Estudio Fotográfico Otra Dimensión</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || "tu_correo@ejemplo.com",
      to: reservaAsociada.correo_electronico,
      subject: asunto || "Confirmación de Reserva",
      html: emailBodyHtml,
    };

    await transporter.sendMail(mailOptions);

    notificacion.enviado = true;
    await notificacion.save();

    res.status(200).json({ message: "Correo enviado con éxito", notificacion });
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    res.status(500).json({
      message: "Error al enviar correo electrónico",
      error: error.message,
    });
  }
};

export const crearNotificacion = async (req, res) => {
  try {
    const { id_reserva, mensaje, tipo, asunto, fecha_eliminacion } = req.body;

    const reserva = await Reserva.findByPk(id_reserva);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

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
      fecha_envio,
      enviado: false,
      destinatario: reserva.correo_electronico || "N/A",
      fecha_eliminacion: fechaEliminacion,
    });
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
    const { fechaDesde, fechaHasta, ci, nombre, tipo, enviado } = req.query;
    const where = {};

    if (fechaDesde && fechaHasta) {
      where.fecha_envio = {
        [Op.between]: [new Date(fechaDesde), new Date(fechaHasta)],
      };
    } else if (fechaDesde) {
      where.fecha_envio = {
        [Op.gte]: new Date(fechaDesde),
      };
    } else if (fechaHasta) {
      where.fecha_envio = {
        [Op.lte]: new Date(fechaHasta),
      };
    }
    if (tipo) {
      where.tipo = tipo;
    }
    if (enviado !== undefined) {
      where.enviado = enviado === "true";
    }

    const include = [
      {
        model: Reserva,
        as: "Reserva",
        attributes: [
          "nombre_cliente",
          "apellidos",
          "correo_electronico",
          "fecha_sesion",
          "descripcion_oferta",
          "precio_venta_oferta",
        ],
        required: true,
        where: {},
      },
    ];

    if (ci) {
      include[0].where.ci = { [Op.iLike]: `%${ci}%` };
    }
    if (nombre) {
      const nombreNormalizado = nombre;
      include[0].where[Op.or] = [
        { nombre_cliente: { [Op.like]: `%${nombreNormalizado}%` } },
        { apellidos: { [Op.like]: `%${nombreNormalizado}%` } },
      ];
    }

    const notificaciones = await Notificacion.findAll({
      where,
      include,
      order: [["fecha_envio", "DESC"]],
    });

    res.json(notificaciones);
  } catch (error) {
    console.error("Error al obtener notificaciones:", error);
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
      include: [
        {
          model: Reserva,
          as: "Reserva",
        },
      ],
    });

    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
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
    const {
      id_reserva,
      mensaje,
      tipo,
      asunto,
      fecha_envio,
      fecha_eliminacion,
    } = req.body;

    const notificacion = await Notificacion.findByPk(id);
    if (!notificacion) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    let fechaEliminacion = null;
    if (fecha_eliminacion) {
      fechaEliminacion = new Date(fecha_eliminacion);
      if (fechaEliminacion < new Date()) {
        return res.status(400).json({
          message: "La fecha de eliminación debe ser en el futuro",
        });
      }
    }
    let fechaEnvio = notificacion.fecha_envio;
    if (fecha_envio !== undefined && fecha_envio !== null) {
      fechaEnvio = new Date(fecha_envio);
      if (isNaN(fechaEnvio.getTime())) {
        return res.status(400).json({
          message: "La fecha de envío es inválida",
        });
      }
    }

    let destinatarioActualizado = notificacion.destinatario;
    if (id_reserva && id_reserva !== notificacion.id_reserva) {
      const nuevaReserva = await Reserva.findByPk(id_reserva);
      if (!nuevaReserva) {
        return res.status(404).json({ message: "Nueva reserva no encontrada" });
      }
      destinatarioActualizado = nuevaReserva.correo_electronico || "N/A";
    }

    await notificacion.update({
      id_reserva: id_reserva || notificacion.id_reserva,
      mensaje: mensaje || notificacion.mensaje,
      tipo: tipo || notificacion.tipo,
      asunto: asunto || notificacion.asunto,
      destinatario: destinatarioActualizado,
      fecha_eliminacion: fechaEliminacion,
      fecha_envio: fechaEnvio,
    });

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

    if (eliminado === 0) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.status(200).json({ message: "Notificación eliminada exitosamente" });
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
      include: [
        {
          model: Reserva,
          as: "Reserva",
          attributes: [
            "nombre_cliente",
            "apellidos",
            "correo_electronico",
            "fecha_sesion",
            "descripcion_oferta",
            "precio_venta_oferta",
          ],
        },
      ],
      order: [["fecha_envio", "DESC"]],
    });

    if (notificaciones.length === 0) {
      return res.status(404).json({
        message: "No se encontraron notificaciones para esta reserva.",
      });
    }

    res.json(notificaciones || []);
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

    if (fecha_eliminacion === null) {
      notificacion.fecha_eliminacion = null;
      await notificacion.save();
      return res.json(notificacion);
    }

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

export const limpiarNotificacionesExpiradas = async () => {
  try {
    const resultado = await Notificacion.destroy({
      where: {
        fecha_eliminacion: {
          [sequelize.Op.lte]: new Date(),
        },
      },
    });
    console.log(`Se eliminaron ${resultado} notificaciones expiradas.`);
    return resultado;
  } catch (error) {
    console.error("Error al limpiar notificaciones expiradas:", error.message);
    throw error;
  }
};
