import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Trabajador = sequelize.define("trabajadores", {
  id_trabajador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  telefono: {
    type: DataTypes.STRING,
  },
  puesto: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  salario: {
    type: DataTypes.DECIMAL,
  },
  foto_perfil: {
    type: DataTypes.STRING,
  },
});
