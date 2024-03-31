import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Venta = sequelize.define("ventas", {
    id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  id_trabajador: {
    type: DataTypes.INTEGER,
  },

  descripcion: {
    type: DataTypes.TEXT,
  },
  pago_confirmado: {
    type: DataTypes.TEXT,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()'),
  },
  actualizado: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()'),
  },
}, {
  timestamps: false, // Deshabilita createdAt y updatedAt
});