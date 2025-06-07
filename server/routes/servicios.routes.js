import { Router } from "express";
import {
  listarServicios,
  crearServicio,
  listarUnServicio,
  actualizarServicio,
  eliminarServicio,
} from "../controllers/Servicios.controllers.js";
import { authRequired } from "../middlewares/validateToken.js"; // Asumo que necesitas autenticación

const router = Router();

// Rutas para servicios
router.get("/servicios", authRequired, listarServicios);
router.post("/servicios", authRequired, crearServicio);
router.get("/servicios/:id", authRequired, listarUnServicio);
router.put("/servicios/:id", authRequired, actualizarServicio);
router.delete("/servicios/:id", authRequired, eliminarServicio);

export default router;
