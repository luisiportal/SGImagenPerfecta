// import { Pago_Tributo } from "./Pago_Tributo.models.js";
import { Oferta } from "./Oferta.model.js";
import { Oferta_Personalizada } from "./Oferta_Personalizada.js";
import { Oferta_Servicio } from "./Oferta_Servicio.js";
// import { Proyecto } from "./Proyecto.model.js";
// import { Registro_Venta } from "./Registro_Venta.model.js";
import { Reserva } from "./Reserva.model.js";
import { Servicio } from "./Servicio.model.js";
// import { Trabajador } from "./Trabajador.model.js";
// import { Tributo } from "./Tributo.model.js";
// import { Venta } from "./Venta.model.js";

export const associations = () => {
  // Reserva.hasOne(Venta, {
  //   foreignKey: "id_reserva",
  //   onDelete: "CASCADE",
  //   hooks: true,
  // });

  // Venta.hasOne(Registro_Venta, {
  //   foreignKey: "id_venta",
  //   onDelete: "CASCADE",
  //   hooks: true,
  // });

  Reserva.belongsTo(Oferta, {
    foreignKey: { name: "id_oferta", allowNull: true },
    onDelete: "RESTRICT", // Importante para que la base de datos impida la eliminación
    onUpdate: "CASCADE",
  });

  Oferta.hasMany(Reserva, {
    foreignKey: { name: "id_oferta", allowNull: true },
    onDelete: "RESTRICT", // También es una buena práctica aquí, aunque belongsTo es el que manda la restricción
    onUpdate: "CASCADE",
  });

  Reserva.belongsTo(Oferta_Personalizada, {
    foreignKey: { name: "id_oferta_personalizada", allowNull: true },
    onDelete: "RESTRICT", // Importante para que la base de datos impida la eliminación
    onUpdate: "CASCADE",
  });

  Oferta_Personalizada.hasMany(Reserva, {
    foreignKey: { name: "id_oferta_personalizada", allowNull: true },
    onDelete: "RESTRICT", // También es una buena práctica aquí, aunque belongsTo es el que manda la restricción
    onUpdate: "CASCADE",
  });

  Oferta_Servicio.belongsTo(Oferta_Personalizada, {
    foreignKey: "id_oferta_personalizada",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  Oferta_Personalizada.hasMany(Oferta_Servicio, {
    foreignKey: "id_oferta_personalizada",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  });

  Oferta_Servicio.belongsTo(Servicio, { foreignKey: "id_servicio" });
  Servicio.hasOne(Oferta_Servicio, { foreignKey: "id_servicio" });

  // Proyecto.belongsTo(Venta, {
  //   foreignKey: "id_venta",
  // });

  // Pago_Tributo.belongsTo(Tributo, {
  //   foreignKey: "id_tributo",
  // });

  // Registro_Venta.hasMany(Venta, {
  //   foreignKey: "id_venta",
  //   onDelete: "CASCADE",
  //   hooks: true,
  // });
};
