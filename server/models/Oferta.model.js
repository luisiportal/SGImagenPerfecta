import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Oferta = sequelize.define("ofertas", {
  id_oferta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre_oferta: {
    type: DataTypes.STRING,
  },
  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  cantidad_fotos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transportacion: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  cambios_ropa: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
