import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Tributo = sequelize.define("tributos", {
  id_tributo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
});
