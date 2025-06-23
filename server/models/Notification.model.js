import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Notificacion = sequelize.define(
  "notificaciones",
  {
    id_notificacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_reserva: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "reservas",
        key: "id_reserva",
      },
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_envio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    enviado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tipo: {
      type: DataTypes.ENUM("email", "sms", "sistema"),
      allowNull: false,
    },
    destinatario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asunto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_eliminacion: {
      type: DataTypes.DATE,
      allowNull: true,
      comment:
        "Fecha programada para eliminación automática. Si es null, persiste hasta eliminación manual",
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeSave: (notificacion, options) => {
        if (
          notificacion.fecha_eliminacion &&
          !(notificacion.fecha_eliminacion instanceof Date)
        ) {
          notificacion.fecha_eliminacion = new Date(
            notificacion.fecha_eliminacion
          );
        }
      },
    },
  }
);
