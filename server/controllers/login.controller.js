import { Trabajador } from "../models/Trabajador.model.js";
import { Usuario } from "../models/Usuario.model.js";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET, createAccessToken } from "../libs/jwt.js";

import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    if (!usuario || !password) {
      return res
        .status(400)
        .json({ message: "Usuario y contraseña son requeridos" });
    }

    const userFound = await Usuario.findOne({
      where: { usuario: usuario },
      include: [
        {
          model: Trabajador,
          as: "trabajador",
          attributes: ["id_trabajador", "nombre", "apellidos", "foto_perfil"],
        },
      ],
    });

    if (!userFound) {
      return res.status(400).json({ message: "Credencial inválida" });
    }

    const isMatch = await bcrypt.compare(password, userFound.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Credencial inválida" });
    }

    const userRole = userFound.rol;

    if (!userFound.trabajador) {
      return res
        .status(400)
        .json({ message: "El usuario no está asociado a un trabajador" });
    }

    const token = await createAccessToken({
      id: userFound.id_usuario,
      rol: userFound.rol,
    });

    res.cookie("token", token, {
      maxAge: 6 * 60 * 60 * 1000,
    });

    res.json({
      id_usuario: userFound.id_usuario,
      id_trabajador: userFound.trabajador.id_trabajador,
      usuario: userFound.usuario,
      nombre: userFound.trabajador.nombre,
      apellidos: userFound.trabajador.apellidos,
      foto_perfil: userFound.trabajador.foto_perfil,
      rol: userFound.rol,
    });
  } catch (error) {
    console.error("Error en login:", error); // 13. Log de error interno
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // Buscar el usuario en lugar del trabajador
    const userFound = await Usuario.findByPk(decoded.id, {
      include: [
        {
          model: Trabajador,
          as: "trabajador",
          attributes: [
            "id_trabajador",
            "nombre",
            "apellidos",
            "foto_perfil",
            "puesto",
            "telefono",
            "direccion",
            "salario",
          ],
        },
      ],
    });

    if (!userFound || !userFound.trabajador) {
      return res.status(401).json({ message: "No autorizado" });
    }
    return res.json({
      id_usuario: userFound.id_usuario,
      id_trabajador: userFound.trabajador.id_trabajador,
      usuario: userFound.usuario,
      nombre: userFound.trabajador.nombre,
      apellidos: userFound.trabajador.apellidos,
      foto_perfil: userFound.trabajador.foto_perfil,
      puesto: userFound.trabajador.puesto,
      telefono: userFound.trabajador.telefono,
      direccion: userFound.trabajador.direccion,
      salario: userFound.trabajador.salario,
      rol: userFound.rol,
    });
  } catch (error) {
    console.error("Error en verifyToken:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
