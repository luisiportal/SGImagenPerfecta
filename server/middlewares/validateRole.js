export const isAdmin = (req, res, next) => {
  const { rol } = req.user;
  if (rol !== "administrador") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol de administrador" });
  }
  next();
};
