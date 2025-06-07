import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Oferta_Servicio = sequelize.define("ofertas_servicios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
   id_servicio: {
    type: DataTypes.INTEGER,
  },
    id_oferta_personalizada: {
    type: DataTypes.INTEGER,
  },
    cantidad: {
    type: DataTypes.INTEGER,
  },
});