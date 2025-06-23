import { Trabajador } from "../models/Trabajador.model.js";
import { Usuario } from "../models/Usuario.model.js";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET, createAccessToken } from "../libs/jwt.js";

import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { usuario, password } = req.body;
  console.log(
    "Intento de login recibido - Usuario:",
    usuario,
    "Contraseña:",
    password
  ); // 1. Log de entrada

  try {
    // Validar campos requeridos
    if (!usuario || !password) {
      console.log("Error: Usuario o contraseña faltantes"); // 2. Log de validación fallida
      return res
        .status(400)
        .json({ message: "Usuario y contraseña son requeridos" });
    }

    console.log("Buscando usuario en la base de datos..."); // 3. Log antes de la consulta
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
      console.log("Error: Usuario no encontrado"); // 4. Log de usuario no encontrado
      return res.status(400).json({ message: "Credencial inválida" });
    }

    console.log("Usuario encontrado:", {
      id_usuario: userFound.id_usuario,
      usuario: userFound.usuario,
      tieneTrabajador: !!userFound.trabajador, // Verifica si tiene asociado un trabajador
    }); // 5. Log de datos del usuario

    console.log("Comparando contraseña..."); // 6. Log antes de bcrypt.compare
    const isMatch = await bcrypt.compare(password, userFound.passwordHash);
    if (!isMatch) {
      console.log("Error: Contraseña incorrecta"); // 7. Log de contraseña incorrecta
      return res.status(400).json({ message: "Credencial inválida" });
    }

    if (!userFound.trabajador) {
      console.log("Error: Usuario sin trabajador asociado"); // 8. Log de falta de trabajador
      return res
        .status(400)
        .json({ message: "El usuario no está asociado a un trabajador" });
    }

    console.log("Creando token JWT..."); // 9. Log antes de crear el token
    const token = await createAccessToken({
      id: userFound.id_usuario,
      id_trabajador: userFound.trabajador.id_trabajador,
      usuario: userFound.usuario,
    });

    console.log("Token generado:", token); // 10. Log del token (¡Opcional! No lo hagas en producción)

    console.log("Configurando cookie..."); // 11. Log antes de setear la cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 6 * 60 * 60 * 1000,
    });

    console.log("Login exitoso. Datos enviados al cliente:", {
      id_usuario: userFound.id_usuario,
      id_trabajador: userFound.trabajador.id_trabajador,
      usuario: userFound.usuario,
      nombre: userFound.trabajador.nombre,
      apellidos: userFound.trabajador.apellidos,
      foto_perfil: userFound.trabajador.foto_perfil,
    }); // 12. Log de respuesta exitosa

    res.json({
      id_usuario: userFound.id_usuario,
      id_trabajador: userFound.trabajador.id_trabajador,
      usuario: userFound.usuario,
      nombre: userFound.trabajador.nombre,
      apellidos: userFound.trabajador.apellidos,
      foto_perfil: userFound.trabajador.foto_perfil,
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
    });
  } catch (error) {
    console.error("Error en verifyToken:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
