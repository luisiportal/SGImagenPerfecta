import { Oferta } from "./Oferta.model.js";
import { Oferta_Personalizada } from "./Oferta_Personalizada.js";
import { Oferta_Servicio } from "./Oferta_Servicio.js";
import { Reserva } from "./Reserva.model.js";
import { Servicio } from "./Servicio.model.js";
import { Notificacion } from "./Notification.model.js";

export const associations = () => {
  Reserva.belongsTo(Oferta, {
    foreignKey: "id_oferta",
    allowNull: true,
  });

  Oferta.hasMany(Reserva, {
    foreignKey: "id_oferta",
    allowNull: true,
  });

  Reserva.belongsTo(Oferta_Personalizada, {
    foreignKey: "id_oferta_personalizada",
    allowNull: true,
    onDelete: "CASCADE",
  });

  Oferta_Personalizada.hasMany(Oferta_Servicio, {
    foreignKey: "id_oferta_personalizada",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Oferta_Servicio.belongsTo(Servicio, {
    foreignKey: "id_servicio",
  });

  Servicio.hasOne(Oferta_Servicio, { foreignKey: "id_servicio" });
};

Notificacion.belongsTo(Reserva, {
  foreignKey: "id_reserva",
});

Reserva.hasMany(Notificacion, {
  foreignKey: "id_reserva",
});
