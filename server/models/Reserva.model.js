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
    descripcion_oferta: {
      type: DataTypes.TEXT,
    },
    precio_venta_oferta: {
      type: DataTypes.DECIMAL(10, 2),
    },
    telefono: {
      type: DataTypes.STRING,
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_sesion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    id_oferta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    id_oferta_personalizada: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pagado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);
