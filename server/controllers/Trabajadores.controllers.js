import { Trabajador } from "../models/Trabajador.model.js";
import { Usuario } from "../models/Usuario.model.js";
import bcrypt from "bcryptjs";
import { saveImage } from "./upload.multer.js";
import { sequelize } from "../db.js";

export const listarTrabajadores = async (req, res) => {
  try {
    const response = await Trabajador.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id_usuario", "usuario"],
        },
      ],
      order: [["id_trabajador", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearTrabajador = async (req, res) => {
  let foto_perfil = "default.jpg";
  if (req.file !== undefined) {
    foto_perfil = req.file.originalname;
  }
  try {
    const {
      nombre,
      apellidos,
      ci,
      telefono,
      puesto,
      direccion,
      salario,
      usuario,
      password,
    } = req.body;

    const nuevoTrabajador = await Trabajador.create({
      nombre,
      apellidos,
      ci,
      telefono,
      puesto,
      direccion,
      salario,
      foto_perfil,
    });
    if (usuario && password) {
      const passwordHash = await bcrypt.hash(password, 10);
      await Usuario.create({
        usuario,
        passwordHash,
        id_trabajador: nuevoTrabajador.id_trabajador,
      });
      if (req.file) {
        saveImage(req.file, "trabajadores/perfil");
      }
    } else {
      await nuevoTrabajador.destroy();
      return res.status(400).json({
        message:
          "Se requiere nombre de usuario y contraseña para el trabajador.",
      });
    }

    const trabajadorConUsuario = await Trabajador.findByPk(
      nuevoTrabajador.id_trabajador,
      {
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["id_usuario", "usuario"],
          },
        ],
      }
    );

    res.status(201).json(trabajadorConUsuario);
  } catch (error) {
    console.error("Error al crear trabajador:", error);
    return res
      .status(500)
      .json({ message: error.message, details: error.stack });
  }
};

export const actualizarTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;

    const {
      usuario,
      password,
      nombre,
      apellidos,
      ci,
      telefono,
      puesto,
      direccion,
      salario,
    } = req.body;

    const trabajador = await Trabajador.findByPk(id_trabajador, {
      include: [{ model: Usuario, as: "usuario" }],
    });

    if (!trabajador) {
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    // Actualizar datos del trabajador
    trabajador.nombre = nombre;
    trabajador.apellidos = apellidos;
    trabajador.ci = ci;
    trabajador.telefono = telefono;
    trabajador.puesto = puesto;
    trabajador.direccion = direccion;
    trabajador.salario = salario;

    // Actualizar foto de perfil si existe
    if (req.file) {
      trabajador.foto_perfil = req.file.originalname;
      saveImage(req.file, "trabajadores/perfil");
    }

    await trabajador.save();

    // Actualizar datos de usuario si existe
    if (trabajador.usuario) {
      trabajador.usuario.usuario = usuario;

      // Solo actualizar la contraseña si se proporcionó una nueva
      if (password && password.trim() !== "") {
        trabajador.usuario.passwordHash = await bcrypt.hash(password, 10);
      }

      await trabajador.usuario.save();
    }

    return res.status(200).json({
      message: "Trabajador actualizado correctamente",
      trabajador,
    });
  } catch (error) {
    console.error("Error en editarTrabajador:", error);
    return res.status(500).json({
      message: "Error interno del servidor al actualizar el trabajador.",
      error: error.message,
    });
  }
};

export const eliminarTrabajador = async (req, res) => {
  const transaction = await sequelize.transaction(); // Iniciar transacción

  try {
    // 1. Buscar el trabajador con su usuario asociado
    const trabajador = await Trabajador.findByPk(req.params.id, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          required: false,
        },
      ],
      transaction,
    });

    if (!trabajador) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Trabajador no encontrado",
      });
    }

    if (trabajador.usuario) {
      await trabajador.usuario.destroy({ transaction });
    }

    await trabajador.destroy({ transaction });
    await transaction.commit();

    res.sendStatus(204);
  } catch (error) {
    await transaction.rollback();
    console.error("Error al eliminar trabajador:", error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar trabajador",
      error: error.message,
    });
  }
};

export const listarUnTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;
    const response = await Trabajador.findByPk(id_trabajador, {
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id_usuario", "usuario"],
        },
      ],
    });

    if (!response) {
      return res.status(404).json({ message: "No encontrado" });
    }
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
