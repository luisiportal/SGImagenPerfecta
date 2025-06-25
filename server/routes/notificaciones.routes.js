import { Router } from "express";
import {
  crearNotificacion,
  obtenerNotificaciones,
  obtenerNotificacionPorId,
  actualizarNotificacion,
  eliminarNotificacion,
  obtenerNotificacionesPorReserva,
  programarEliminacion,
  enviarCorreoNotificacion,
} from "../controllers/Notificaciones.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/notificaciones", crearNotificacion);
router.get("/notificaciones", authRequired, obtenerNotificaciones);
router.get("/notificaciones/:id", authRequired, obtenerNotificacionPorId);
router.put("/notificaciones/:id", authRequired, actualizarNotificacion);
router.delete("/notificaciones/:id", authRequired, eliminarNotificacion);
router.put(
  "/notificaciones/programar-eliminacion/:id",
  authRequired,
  programarEliminacion
);
router.get(
  "/reservas/notificaciones/:id_reserva",
  obtenerNotificacionesPorReserva
);

router.post("/notificaciones/enviar-correo", enviarCorreoNotificacion);

export default router;
