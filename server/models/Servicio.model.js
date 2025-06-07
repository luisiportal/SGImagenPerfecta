import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Servicio = sequelize.define(
  "Servicio",
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_servicio: {
      type: DataTypes.STRING(255), // VARCHAR(255) para el nombre del servicio
      allowNull: false,
      unique: true, // Asume que cada servicio tendrá un nombre único
    },
    descripcion_servicio: {
      type: DataTypes.TEXT, // TEXT para descripciones más largas
      allowNull: true, // La descripción puede ser opcional
    },
    precio_servicio: {
      type: DataTypes.DECIMAL(10, 2), // DECIMAL(10, 2) para el precio (ej: 12345678.99)
      allowNull: false,
      defaultValue: 0.0, // Un valor por defecto si no se especifica
    },
  },
  {
    tableName: "servicios", // Define el nombre de la tabla en la base de datos
    timestamps: true, // Habilita las columnas `createdAt` y `updatedAt`
    createdAt: "created_at", // Mapea `createdAt` a `created_at` en la DB
    updatedAt: "updated_at", // Mapea `updatedAt` a `updated_at` en la DB
  }
);
