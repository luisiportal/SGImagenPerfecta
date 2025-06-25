import { Router } from "express";
import {
  actualizarTrabajador,
  crearTrabajador,
  eliminarTrabajador,
  listarTrabajadores,
  listarUnTrabajador,
  // actualizarMiPerfil,
} from "../controllers/Trabajadores.controllers.js";
import { uploadTrabajador } from "../controllers/upload.multer.js";
import { authRequired } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/validateRole.js";

const routerTrabajadores = Router();

routerTrabajadores.get("/trabajadores", authRequired, listarTrabajadores);
routerTrabajadores.post(
  "/trabajadores",
  authRequired,
  isAdmin,
  uploadTrabajador.single("imagenPerfil"),
  crearTrabajador
);
// routerTrabajadores.put(
//   "/trabajadores/my-profile/:id",
//   authRequired,
//   uploadTrabajador.single("imagenPerfil"),
//   actualizarMiPerfil
// );
routerTrabajadores.put(
  "/trabajadores/:id",
  authRequired,
  isAdmin,
  uploadTrabajador.single("imagenPerfil"),
  actualizarTrabajador
);
routerTrabajadores.delete(
  "/trabajadores/:id",
  authRequired,
  isAdmin,
  eliminarTrabajador
);
routerTrabajadores.get("/trabajadores/:id", authRequired, listarUnTrabajador);

export default routerTrabajadores;
