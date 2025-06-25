import { Router } from "express";
import {
  ListarReservas,
  actualizarReserva,
  crearReserva,
  eliminarReserva,
  listarUnaReserva,
  obtenerFechasReservadas,
  actualizarEstadoPago,
} from "../controllers/Reservas.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const routerReservas = Router();

routerReservas.get("/reservas/fechas-reservadas", obtenerFechasReservadas);
routerReservas.get("/reservas/listar", authRequired, ListarReservas);
routerReservas.post("/reservas/crear", crearReserva);
routerReservas.get("/reservas/listar/:id", listarUnaReserva);
routerReservas.put("/reservas/:id", authRequired, actualizarReserva);
routerReservas.put(
  "/reservas/:id/estado-pago",
  authRequired,
  actualizarEstadoPago
);
routerReservas.delete("/reservas/:id", authRequired, eliminarReserva);

export default routerReservas;
