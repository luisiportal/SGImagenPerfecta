import { verifyToken } from "../libs/jwt.js";

export const authRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado - Token no proporcionado" });
    }

    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error en authRequired:", error);
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
