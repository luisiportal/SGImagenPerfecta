import { Trabajador } from "../models/Trabajador.model.js";
import { Usuario } from "../models/Usuario.model.js";
import bcrypt from "bcryptjs";
import { saveImage } from "./upload.multer.js";

export const listarTrabajadores = async (req, res) => {
  try {
    const response = await Trabajador.findAll({
      include: [
        {
          model: Usuario,
          attributes: ["id_usuario", "usuario"], // Incluir datos del usuario
        },
      ],
      order: [["id_trabajador", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// export const crearTrabajador = async (req, res) => {
//   let foto_perfil = "default.jpg";
//   if (req.file !== undefined) {
//     foto_perfil = req.file.originalname;
//   }
//   try {
//     const {
//       nombre,
//       apellidos,
//       ci,
//       telefono,
//       puesto,
//       direccion,
//       salario,
//     } = req.body;

//     const findUser = await Trabajador.findByPk(id_trabajador);
//     if (!findUser) {
//       await Trabajador.create({
//         nombre,
//         apellidos,
//         ci,
//         telefono,
//         puesto,
//         direccion,
//         salario,
//         foto_perfil,
//       });
//       saveImage(req.file, "trabajadores/perfil");
//       res.status(201).json({ message: "Trabajador creado correctamente" });
//     } else {
//       res.status(400).json({ message: "El trabajador ya existe" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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

    // Validación básica de campos requeridos
    if (!usuario || !password) {
      return res
        .status(400)
        .json({ message: "Usuario y contraseña son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({
      where: { usuario: usuario },
    });

    if (usuarioExistente) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está registrado" });
    }

    // Crear el usuario primero
    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      usuario,
      passwordHash,
    });

    // Crear el trabajador asociado
    const nuevoTrabajador = await Trabajador.create({
      id_usuario: nuevoUsuario.id_usuario,
      nombre,
      apellidos,
      ci,
      telefono,
      puesto,
      direccion,
      salario,
      foto_perfil,
    });

    // Guardar la imagen si fue proporcionada
    if (req.file) {
      saveImage(req.file, "trabajadores/perfil");
    }

    // Obtener el registro completo con la relación de usuario
    const resultado = await Trabajador.findByPk(nuevoTrabajador.id_trabajador, {
      include: [
        {
          model: Usuario,
          attributes: ["id_usuario", "usuario"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Trabajador registrado exitosamente",
      data: resultado,
    });
  } catch (error) {
    console.error("Error en crearTrabajador:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear trabajador",
      error: error.message,
    });
  }
};

export const actualizarTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;
    const { nombre, apellidos, ci, telefono, puesto, direccion, salario } =
      req.body;

    const trabajador = await Trabajador.findByPk(id_trabajador, {
      include: [
        {
          model: Usuario,
          attributes: ["id_usuario", "usuario"],
        },
      ],
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

    if (req.file) {
      trabajador.foto_perfil = req.file.originalname;
      saveImage(req.file, "trabajadores/perfil");
    }

    await trabajador.save();

    // Obtener datos actualizados con la información del usuario
    const trabajadorActualizado = await Trabajador.findByPk(id_trabajador, {
      include: [
        {
          model: Usuario,
          attributes: ["id_usuario", "usuario"],
        },
      ],
    });

    res.json(trabajadorActualizado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarTrabajador = async (req, res) => {
  try {
    const trabajador = await Trabajador.findByPk(req.params.id, {
      include: [Usuario],
    });

    if (!trabajador) {
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    // Eliminar primero el trabajador
    await trabajador.destroy();

    // Luego eliminar el usuario asociado
    if (trabajador.usuario) {
      await trabajador.usuario.destroy();
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const listarUnTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;
    const response = await Trabajador.findByPk(id_trabajador, {
      include: [
        {
          model: Usuario,
          attributes: ["id_usuario", "usuario"],
        },
      ],
    });

    if (!response) return res.status(404).json({ message: "No encontrado" });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
