import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Registro_Venta = sequelize.define(
  "registros_venta",
  {
    id_registro_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    mes: {
      type: DataTypes.INTEGER,
    },

    total_ventas: {
      type: DataTypes.DECIMAL,
    },

    fecha: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
    actualizado: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  {
    timestamps: false, // Deshabilita createdAt y updatedAt
  }
);
