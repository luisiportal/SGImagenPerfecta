import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";


export const Proyecto = sequelize.define("proyectos", {
  id_proyecto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

 id_venta: {
    type: DataTypes.INTEGER,
  },
 
  fecha_inicio: {
    type: DataTypes.DATE,
  },
  fecha_estimada: {
    type: DataTypes.DATE,
  },
  fecha_entrega_real: {
    type: DataTypes.DATE,
  },
  estado: {
    type: DataTypes.STRING,
  },
  trabajadoresProyecto: {
    type: DataTypes.STRING,
  }


});