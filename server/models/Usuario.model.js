import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { Trabajador } from "./Trabajador.model.js";

export const Usuario = sequelize.define(
  "usuarios",
  {
    id_usuario: {
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
    id_trabajador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Trabajador,
        key: "id_trabajador",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    rol: {
      type: DataTypes.ENUM("trabajador", "administrador"),
      allowNull: false,
      defaultValue: "trabajador",
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
