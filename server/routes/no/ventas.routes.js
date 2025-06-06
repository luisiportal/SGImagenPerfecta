import { Router } from "express";
import {
  ListarVentas,
  actualizarVenta,
  confirmarVenta,
  crearVenta,
  eliminarVenta,
  listarUnVenta,
} from "../controllers/ventas.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const routerVentas = Router();

routerVentas.get("/ventas", authRequired, ListarVentas);
routerVentas.put("/ventas/confirmar/:id", authRequired, confirmarVenta);
routerVentas.post("/ventas", authRequired, crearVenta);
routerVentas.put("/ventas/:id/", authRequired, actualizarVenta);
routerVentas.delete("/ventas/:id/", authRequired, eliminarVenta);
routerVentas.get("/ventas/:id/", authRequired, listarUnVenta);

export default routerVentas;
