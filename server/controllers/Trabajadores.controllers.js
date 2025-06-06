import { Trabajador } from "../models/Trabajador.model.js";
import bcrypt from "bcryptjs";
import { saveImage } from "./upload.multer.js";

export const listarTrabajadores = async (req, res) => {
  try {
    const response = await Trabajador.findAll({
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

    const findUser = await Trabajador.findOne({ where: { usuario: usuario } });
    if (!findUser) {
      const passwordHash =
        password != null ? await bcrypt.hash(password, 10) : "";

      // El usuario no existe, crea uno nuevo
      await Trabajador.create({
        usuario,
        passwordHash,
        nombre,
        apellidos,
        ci,
        telefono,
        puesto,
        direccion,
        salario,
        foto_perfil,
      });
      saveImage(req.file, "trabajadores/perfil");
      res.status(201).json({ message: "Usuario creado correctamente" });
    } else {
      // El usuario ya existe
      res.status(400).json({ message: "El usuario ya existe" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    const response = await Trabajador.findByPk(id_trabajador);

    // Actualizar campos básicos
    response.usuario = usuario;
    response.password = password;
    response.nombre = nombre;
    response.apellidos = apellidos;
    response.ci = ci;
    response.telefono = telefono;
    response.puesto = puesto;
    response.direccion = direccion;
    response.salario = salario;

    // Solo actualizar la imagen si se envió un archivo nuevo
    if (req.file) {
      response.foto_perfil = req.file.originalname;
      saveImage(req.file, "trabajadores/perfil");
    }

    await response.save();
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const eliminarTrabajador = async (req, res) => {
  try {
    const response = await Trabajador.destroy({
      where: {
        id_trabajador: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const listarUnTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;

    const response = await Trabajador.findByPk(id_trabajador);
    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
