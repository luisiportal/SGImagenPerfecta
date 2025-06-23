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
          as: "usuario",
          attributes: ["id_usuario", "usuario"],
        },
      ],
      order: [["id_trabajador", "DESC"]],
    });
    console.log("Trabajadores encontrados prueb:", response.length);
    res.json(response);
  } catch (error) {
    console.error("Error en listarTrabajadores:", {
      message: error.message,
      stack: error.stack,
    });
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
      usuario, // Nombre de usuario para el login
      password, // Contraseña para el login
    } = req.body;

    // --- Paso 1: Crear el Trabajador ---
    const nuevoTrabajador = await Trabajador.create({
      nombre,
      apellidos,
      ci,
      telefono,
      puesto,
      direccion,
      salario,
      foto_perfil,
      // IMPORTANTE: NO incluyas 'id_usuario' aquí si la tabla 'trabajadores' NO tiene una FK que referencie a 'usuarios'.
      // Según tu esquema y asociaciones, la FK está en la tabla 'usuarios'.
      // Si la incluyes y es null, es porque no la estás enviando y no es necesaria aquí.
      // Si la incluyes y esperas que se llene automáticamente, no lo hará si no es una clave foránea que apunte a un modelo existente.
    });

    // --- Paso 2: Crear el Usuario y asociarlo al Trabajador ---
    // Esto se hace asignando el id_trabajador recién creado al nuevo Usuario
    if (usuario && password) {
      const passwordHash = await bcrypt.hash(password, 10);
      await Usuario.create({
        usuario,
        passwordHash,
        id_trabajador: nuevoTrabajador.id_trabajador, // ¡AQUÍ ES DONDE ASIGNAS LA FK!
      });
    } else {
      // Manejar el caso donde no se proporciona usuario/contraseña si es obligatorio
      console.warn("Advertencia: Se creó un trabajador sin datos de usuario.");
      // O podrías lanzar un error si siempre se espera un usuario para cada trabajador
      // await nuevoTrabajador.destroy(); // Si la creación del usuario es crítica, revierte la creación del trabajador
      // return res.status(400).json({ message: "Se requiere nombre de usuario y contraseña para el trabajador." });
    }

    // --- Paso 3: Recuperar el Trabajador con el Usuario incluido para la respuesta (opcional) ---
    // Esto es para asegurarte de que la respuesta de la API incluya el usuario asociado
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
    // Para depuración, puedes enviar el error completo al frontend (solo en desarrollo)
    return res
      .status(500)
      .json({ message: error.message, details: error.stack });
  }
};

export const actualizarTrabajador = async (req, res) => {
  try {
    const id_trabajador = req.params.id;
    console.log("Recibida solicitud de edición para ID:", id_trabajador);
    console.log("Cuerpo de la solicitud (req.body):", req.body);
    console.log("Archivo recibido (req.file):", req.file);

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

    // 1. Encontrar el trabajador existente y su usuario asociado
    const trabajador = await Trabajador.findByPk(id_trabajador, {
      // *** CAMBIO CLAVE AQUÍ: VOLVEMOS a usar 'as: "usuario"' (singular) ***
      include: [{ model: Usuario, as: "usuario" }], // <-- MODIFICA ESTA LÍNEA
    });

    if (!trabajador) {
      console.warn(
        `Trabajador con ID ${id_trabajador} no encontrado para edición.`
      );
      return res.status(404).json({ message: "Trabajador no encontrado" });
    }

    // 2. Actualizar el usuario asociado (nombre de usuario y/o contraseña)
    // Asegúrate de acceder al objeto de usuario con el alias correcto (singular 'usuario')
    if (trabajador.usuario) {
      // <-- Usa 'trabajador.usuario' aquí (singular)
      trabajador.usuario.usuario = usuario; // Actualiza el nombre de usuario

      if (password) {
        const salt = await bcrypt.genSalt(10);
        trabajador.usuario.password = await bcrypt.hash(password, salt);
      }
      await trabajador.usuario.save(); // Guarda los cambios en el modelo Usuario
      console.log("Usuario asociado actualizado correctamente.");
    } else {
      console.warn(
        `Trabajador con ID ${id_trabajador} no tiene un usuario asociado.`
      );
    }

    // 3. Actualizar los datos del trabajador
    let foto_perfil_path = trabajador.foto_perfil;
    if (req.file) {
      try {
        foto_perfil_path = await saveImage(req.file);
        console.log("Nueva imagen de perfil guardada:", foto_perfil_path);
      } catch (saveError) {
        console.error("Error al guardar la nueva imagen de perfil:", saveError);
        return res
          .status(500)
          .json({ message: "Error al procesar la imagen de perfil." });
      }
    }

    trabajador.nombre = nombre;
    trabajador.apellidos = apellidos;
    trabajador.ci = ci;
    trabajador.telefono = telefono;
    trabajador.puesto = puesto;
    trabajador.direccion = direccion;
    trabajador.salario = salario;
    trabajador.foto_perfil = foto_perfil_path;

    await trabajador.save();
    console.log("Trabajador actualizado correctamente.");

    return res
      .status(200)
      .json({ message: "Trabajador actualizado correctamente", trabajador });
  } catch (error) {
    console.error("Error en editarTrabajador:", {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
      requestFile: req.file,
    });
    return res.status(500).json({
      message: "Error interno del servidor al actualizar el trabajador.",
      error: error.message,
    });
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
          as: "usuario",
          attributes: ["id_usuario", "usuario"],
        },
      ],
    });
    if (!response) {
      console.warn(`Trabajador con ID ${id_trabajador} no encontrado`);
      return res.status(404).json({ message: "No encontrado" });
    }
    console.log("Trabajador encontrado:", response.toJSON());
    res.json(response);
  } catch (error) {
    console.error("Error en listarUnTrabajador:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message });
  }
};
