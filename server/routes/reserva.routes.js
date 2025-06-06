import { Router } from "express";
import {
  ListarReservas,
  actualizarReserva,
  crearReserva,
  eliminarReserva,
  listarUnaReserva,
  obtenerFechasReservadas,
} from "../controllers/Reservas.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const routerReservas = Router();

routerReservas.get("/reservas/fechas-reservadas", obtenerFechasReservadas); // Nueva ruta para obtener fechas reservadas
routerReservas.get("/reservas/listar", authRequired, ListarReservas);
routerReservas.post("/reservas/crear", crearReserva);
routerReservas.get("/reservas/listar/:id", listarUnaReserva);
routerReservas.put("/reservas/:id", authRequired, actualizarReserva);
routerReservas.delete("/reservas/:id", authRequired, eliminarReserva);

export default routerReservas;
