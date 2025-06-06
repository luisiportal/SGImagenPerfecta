import { Router } from "express";
import {
  actualizarOferta,
  crearOferta,
  eliminarOferta,
  ListarOfertas,
  listarUnaOferta,
} from "../controllers/Ofertas.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/ofertas", ListarOfertas);
router.post("/ofertas", authRequired, crearOferta);
router.put("/ofertas/:id", authRequired, actualizarOferta);
router.delete("/ofertas/:id", authRequired, eliminarOferta);
router.get("/ofertas/:id", authRequired, listarUnaOferta);

export default router;
