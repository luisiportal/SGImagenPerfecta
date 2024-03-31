import { Router } from "express";
import { login, logout, verifyToken } from "../controllers/login.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { uploadTrabajador } from "../controllers/upload.multer.js";

const loginRouter = Router();

loginRouter.post("/trabajadores/login", login);
loginRouter.post("/trabajadores/logout", logout);


loginRouter.get("/auth/verify", verifyToken);

export default loginRouter;
