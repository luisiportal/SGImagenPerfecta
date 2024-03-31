import { Router } from "express";
import { actualizarTrabajador, crearTrabajador,eliminarTrabajador,listarTrabajadores, listarUnTrabajador } from "../controllers/Trabajadores.controllers.js";
import {uploadTrabajador } from "../controllers/upload.multer.js";

const routerTrabajadores = Router();

routerTrabajadores.get("/trabajadores", listarTrabajadores);
routerTrabajadores.post("/trabajadores",uploadTrabajador.single("imagenPerfil"),crearTrabajador);
routerTrabajadores.put("/trabajadores/:id",uploadTrabajador.single("imagenPerfil"),actualizarTrabajador);
routerTrabajadores.delete("/trabajadores/:id",eliminarTrabajador);
routerTrabajadores.get("/trabajadores/:id",listarUnTrabajador);

export default routerTrabajadores;