import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Servicio = sequelize.define(
  "servicio",
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_servicio: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    descripcion_servicio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    precio_servicio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "servicios",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
