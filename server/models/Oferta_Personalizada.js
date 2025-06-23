import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Oferta_Personalizada = sequelize.define("oferta_personalizadas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
