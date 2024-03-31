import { Router } from "express";
import { actualizarProducto, crearProducto,eliminarProducto,ListarProductos, listarUnProducto } from "../controllers/Productos.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get("/productos", ListarProductos);
router.post("/productos", authRequired,crearProducto);
router.put("/productos/:id",authRequired,actualizarProducto);
router.delete("/productos/:id",authRequired,eliminarProducto);
router.get("/productos/:id",authRequired,listarUnProducto);

export default router;
