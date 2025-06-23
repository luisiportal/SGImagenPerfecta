import { Trabajador } from "../models/Trabajador.model.js";
import bcrypt from "bcryptjs";
import { saveImage } from "./upload.multer.js";
import { Usuario } from "./Usuario.model.js";

export const listarUsuarios = async (req, res) => {
  try {
    const response = await Usuario.findAll({
      order: [["id_usuario", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const findUser = await Usuario.findOne({ where: { usuario: usuario } });
    if (!findUser) {
      const passwordHash = password ? await bcrypt.hash(password, 10) : "";
      await Usuario.create({
        usuario,
        passwordHash,
        
      });
      res.status(201).json({ message: "Usuario creado correctamente" });
    } else {
      res.status(400).json({ message: "El usuario ya existe" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id;
    const {
      usuario,
      password,
    } = req.body;

    const response = await Usuario.findByPk(id_usuario);
    if (!response) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    response.usuario = usuario;

    if (password) {
      response.passwordHash = await bcrypt.hash(password, 10);
    }

    await response.save();
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const response = await Usuario.destroy({
      where: {
        id_usuario: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const listarUnUsuario = async (req, res) => {
  try {
    const id_usuario = req.params.id;
    const response = await Usuario.findByPk(id_usuario);
    if (!response) return res.status(404).json({ message: "No encontrado" });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
