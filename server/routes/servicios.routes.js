import { Router } from "express";
import {
  listarServicios,
  crearServicio,
  listarUnServicio,
  actualizarServicio,
  eliminarServicio,
} from "../controllers/Servicios.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/servicios", listarServicios);
router.post("/servicios", crearServicio);
router.get("/servicios/:id", authRequired, listarUnServicio);
router.put("/servicios/:id", authRequired, actualizarServicio);
router.delete("/servicios/:id", authRequired, eliminarServicio);

export default router;
