import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Oferta = sequelize.define("ofertas", {
  id_oferta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre_oferta: {
    type: DataTypes.STRING,
  },
  precio_venta: {
    type: DataTypes.DECIMAL(10, 2),
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  // Nuevos campos
  cantidad_fotos: {
    type: DataTypes.INTEGER, // Número de fotos, puedes ajustar a DECIMAL si son fracciones
    allowNull: false, // O false si es obligatorio
  },
  locacion: {
    type: DataTypes.STRING, // Por ejemplo, 'estudio', 'exterior', 'ambas'
    allowNull: true,
  },
  transportacion: {
    type: DataTypes.BOOLEAN, // true si incluye transporte, false si no
    allowNull: true,
  },
  cambios_ropa: {
    type: DataTypes.INTEGER, // Número de cambios de ropa permitidos
    allowNull: true,
  },
  pagado: {
    type: DataTypes.BOOLEAN, // true si está pagado, false si no. Útil para validación.
    defaultValue: false, // Valor por defecto si no se especifica
  },
});
