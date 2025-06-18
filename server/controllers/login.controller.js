import { Trabajador } from "../models/Trabajador.model.js";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET, createAccessToken } from "../libs/jwt.js";

import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const respuestaUserExist = await Trabajador.findOne({
      where: { usuario: usuario },
    });

    const userFound = respuestaUserExist || "";

    if (userFound.length === 0) {
      return res.status(400).json({ message: "Credencial inválida" });
    }

    const isMatch = await bcrypt.compare(password, userFound.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Credencial inválida" });
    }

    const token = await createAccessToken({ id: userFound.id_trabajador });

    res.cookie("token", token);

    res.json({
      id_trabajador: userFound.id_trabajador,
      usuario: userFound.usuario,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json("No autorizado");

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json("No autorizado");

    const respuestaUserExist = await Trabajador.findOne({
      where: { id_trabajador: user.id },
    });
    const userFound = respuestaUserExist || "";
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id_trabajador: userFound.id_trabajador,
      usuario: userFound.usuario,
    });
  });
};
