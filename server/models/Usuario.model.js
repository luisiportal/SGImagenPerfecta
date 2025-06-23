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
      allowNull: true, // Puede ser null si un usuario no siempre es un trabajador
      references: {
        model: Trabajador, // Referencia al modelo Trabajador
        key: "id_trabajador", // La clave primaria en Trabajador
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // O 'CASCADE' si quieres eliminar el usuario si se elimina el trabajador
    },
  },
  {
    tableName: "usuarios",
    timestamps: false, // O true si quieres createdAt/updatedAt
  }
);
