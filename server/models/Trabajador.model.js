import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Trabajador = sequelize.define(
  "Trabajador",
  {
    id_trabajador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ci: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    puesto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    foto_perfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "trabajadores",
    timestamps: false,
  }
);
