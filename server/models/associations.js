// import { Pago_Tributo } from "./Pago_Tributo.models.js";
import { Oferta } from "./Oferta.model.js";
// import { Proyecto } from "./Proyecto.model.js";
// import { Registro_Venta } from "./Registro_Venta.model.js";
import { Reserva } from "./Reserva.model.js";
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
    foreignKey: "id_oferta",
    onDelete: "RESTRICT", // Importante para que la base de datos impida la eliminación
    onUpdate: "CASCADE",
  });
  Oferta.hasMany(Reserva, {
    foreignKey: "id_oferta",
    onDelete: "RESTRICT", // También es una buena práctica aquí, aunque belongsTo es el que manda la restricción
    onUpdate: "CASCADE",
  });

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
