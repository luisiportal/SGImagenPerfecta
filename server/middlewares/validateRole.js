export const isAdmin = (req, res, next) => {
  const { rol } = req.user; // Asume que el usuario está en req.user después de authRequired
  if (rol !== "administrador") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol de administrador" });
  }
  next();
};
