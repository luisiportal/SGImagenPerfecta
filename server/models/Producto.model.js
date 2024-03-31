import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";


export const Producto = sequelize.define("productos", {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre_producto: {
    type: DataTypes.STRING,
  },
  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  locacion: {
    type: DataTypes.TEXT,
  },
});


