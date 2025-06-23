import { Router } from "express";
import {
  crearNotificacion,
  obtenerNotificaciones,
  obtenerNotificacionPorId,
  actualizarNotificacion,
  eliminarNotificacion,
  obtenerNotificacionesPorReserva,
  programarEliminacion, // ¡Asegúrate de agregar esta importación!
} from "../controllers/Notificaciones.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/notificaciones", crearNotificacion);
router.get("/notificaciones", authRequired, obtenerNotificaciones);
router.get("/notificaciones/:id", authRequired, obtenerNotificacionPorId);
router.put("/notificaciones/:id", authRequired, actualizarNotificacion);
router.delete("/notificaciones/:id", authRequired, eliminarNotificacion);
router.put(
  "/notificaciones/:id/programar-eliminacion",
  authRequired,
  programarEliminacion
);
router.get(
  "/reservas/:id_reserva/notificaciones",
  authRequired,
  obtenerNotificacionesPorReserva
);

export default router;
