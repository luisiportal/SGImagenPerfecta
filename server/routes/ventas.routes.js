import { Router } from "express";
import { ListarVentas, actualizarVenta, confirmarVenta, crearVenta, eliminarVenta, listarUnVenta } from "../controllers/ventas.controllers.js";

const routerVentas = Router();

routerVentas.get("/ventas", ListarVentas);
routerVentas.put("/ventas/confirmar/:id", confirmarVenta);
routerVentas.post("/ventas",crearVenta);
routerVentas.put("/ventas/:id/",actualizarVenta);
routerVentas.delete("/ventas/:id/",eliminarVenta);
routerVentas.get("/ventas/:id/",listarUnVenta);

export default routerVentas;
