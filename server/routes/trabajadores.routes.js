import { Router } from "express";
import {
  actualizarTrabajador,
  crearTrabajador,
  eliminarTrabajador,
  listarTrabajadores,
  listarUnTrabajador,
} from "../controllers/Trabajadores.controllers.js";
import { uploadTrabajador } from "../controllers/upload.multer.js";
import { authRequired } from "../middlewares/validateToken.js";

const routerTrabajadores = Router();

routerTrabajadores.get("/trabajadores", listarTrabajadores);
routerTrabajadores.post(
  "/trabajadores",
  
  uploadTrabajador.single("imagenPerfil"),
  crearTrabajador
);
routerTrabajadores.put(
  "/trabajadores/:id",
  authRequired,
  uploadTrabajador.single("imagenPerfil"),
  actualizarTrabajador
);
routerTrabajadores.delete(
  "/trabajadores/:id",
  authRequired,
  eliminarTrabajador
);
routerTrabajadores.get("/trabajadores/:id", authRequired, listarUnTrabajador);

export default routerTrabajadores;
