import { Router } from "express";
import { login, logout, verifyToken } from "../controllers/login.controller.js";

const loginRouter = Router();

loginRouter.post("/trabajadores/login", login);
loginRouter.post("/trabajadores/logout", logout);

loginRouter.get("/auth/verify", verifyToken);

export default loginRouter;
