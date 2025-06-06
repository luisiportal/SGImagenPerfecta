import { Router } from "express";
import { ListarRegistroVentas } from "../controllers/registroVenta.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const routerRegistroVentas = Router();

routerRegistroVentas.get(
  "/resumen-ventas/",
  authRequired,
  ListarRegistroVentas
);

export default routerRegistroVentas;
