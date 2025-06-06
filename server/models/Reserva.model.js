import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Reserva = sequelize.define(
  "reservas",
  {
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
    // Nuevos campos para almacenar detalles de la oferta
    descripcion_oferta: {
      type: DataTypes.TEXT,
    },
    precio_venta_oferta: {
      type: DataTypes.DECIMAL(10, 2),
    },
    telefono: {
      type: DataTypes.STRING,
    },
    // Nuevo campo para el correo electrónico
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: true, // Puedes cambiar a false si es obligatorio
    },
    fecha_sesion: {
      type: DataTypes.DATE,
    },
    id_oferta: {
      type: DataTypes.INTEGER,
      allowNull: false, // Una reserva siempre debe estar vinculada a una oferta
      references: {
        model: "ofertas", // Nombre de la tabla a la que hace referencia
        key: "id_oferta", // Clave primaria en la tabla 'ofertas'
      },
      onDelete: "RESTRICT", // Impide la eliminación de la oferta si hay reservas asociadas
      onUpdate: "CASCADE", // Si el id_oferta cambia en la tabla Ofertas, se actualiza en Reservas
    },
  },
  {
    timestamps: false,
  }
);
