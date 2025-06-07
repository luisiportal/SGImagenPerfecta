import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Reserva = sequelize.define(
  "reservas",
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_cliente: {
      type: DataTypes.STRING,
    },
    apellidos: {
      type: DataTypes.STRING,
    },
    ci: {
      type: DataTypes.STRING,
    },
    // Nuevos campos para almacenar detalles de la oferta
    descripcion_oferta: {
      type: DataTypes.TEXT,
    },
    precio_venta_oferta: {
      type: DataTypes.DECIMAL(10, 2),
    },
    telefono: {
      type: DataTypes.STRING,
    },
    // Nuevo campo para el correo electrónico
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: true, // Puedes cambiar a false si es obligatorio
    },
    fecha_sesion: {
      type: DataTypes.DATE,
    },
    id_oferta: {
      type: DataTypes.INTEGER,
      allowNull: true, // Una reserva siempre debe estar vinculada a una oferta
    },

    id_oferta_personalizada: {
      type: DataTypes.INTEGER,
      allowNull: true, // Una reserva siempre debe estar vinculada a una oferta
    },
    pagado: {
      type: DataTypes.BOOLEAN, // true si está pagado, false si no. Útil para validación.
      defaultValue: false, // Valor por defecto si no se especifica
    },
  },
  {
    timestamps: false,
  }
);
