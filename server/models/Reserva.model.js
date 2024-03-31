import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Reserva = sequelize.define("reservas", {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  ci: {
    type: DataTypes.STRING,
  },

  id_producto: {
    type: DataTypes.INTEGER,
  },
  telefono: {
    type: DataTypes.STRING,
  },

  fecha_sesion: {
    type: DataTypes.DATE,
  },
});
