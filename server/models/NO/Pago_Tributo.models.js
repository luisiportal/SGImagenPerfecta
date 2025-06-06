import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Pago_Tributo = sequelize.define("pagos_tributo", {
  id_pago_tributo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_tributo: {
    type: DataTypes.INTEGER,
  },
  id_trabajador: {
    type: DataTypes.INTEGER,
  },
  periodo: {
    type: DataTypes.DATE,
  },
  monto: {
    type: DataTypes.DECIMAL,
  },
  pagado: {
    type: DataTypes.BOOLEAN,
  },
});
