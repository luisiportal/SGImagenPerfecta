import { Router } from "express";
import {
  ListarReservas,
  actualizarReserva,
  crearReserva,
  eliminarReserva,
  listarUnaReserva,
} from "../controllers/Reservas.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
const routerReservas = Router();

routerReservas.get("/reservas",authRequired, ListarReservas);
routerReservas.post("/reservas",authRequired, crearReserva);
routerReservas.put("/reservas/:id",authRequired, actualizarReserva);
routerReservas.delete("/reservas/:id",authRequired, eliminarReserva);
routerReservas.get("/reservas/:id", listarUnaReserva);

export default routerReservas;
