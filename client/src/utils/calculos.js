// client/src/utils/priceUtils.js

export const calcularPrecioOfertaPersonalizada = (servicios) => {
  const total = servicios.reduce(
    (total, servicio) =>
      total + (Number(servicio.precio_servicio * servicio.cantidad) || 0),
    0
  );
  return total;
};
