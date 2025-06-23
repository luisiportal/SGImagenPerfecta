import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  listarUnUsuario,
  listarUsuarios,
} from "../models/UsuarioControlller.js";

const routerUsuario = Router();

routerUsuario.get("/usuarios", listarUsuarios);
routerUsuario.post("/usuarios", crearUsuario);
routerUsuario.put("/usuarios/:id", authRequired, actualizarUsuario);
routerUsuario.delete("/usuarios/:id", authRequired, eliminarUsuario);
routerUsuario.get("/usuarios/:id", authRequired, listarUnUsuario);

export default routerUsuario;
