// Servicios.controllers.js
import { Servicio } from "../models/Servicio.model.js";

export const listarServicios = async (req, res) => {
  try {
    const response = await Servicio.findAll({
      // Cambiamos el orden de 'created_at' a 'precio_servicio' y de 'DESC' a 'ASC'
      order: [["precio_servicio", "ASC"]], //
    });
    res.json(response);
  } catch (error) {
    console.error("Error al listar servicios:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const crearServicio = async (req, res) => {
  try {
    const { nombre_servicio, descripcion_servicio, precio_servicio } = req.body;
    const descripcionFinal =
      descripcion_servicio === "" ? null : descripcion_servicio;

    const newServicio = await Servicio.create({
      nombre_servicio,
      descripcion_servicio: descripcionFinal,
      precio_servicio,
    });

    res.status(201).json(newServicio);
  } catch (error) {
    console.error("Error al crear servicio:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Ya existe un servicio con este nombre." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const listarUnServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Servicio.findByPk(id);

    if (!response) {
      return res.status(404).json({ message: "Servicio no encontrado." });
    }
    res.json(response);
  } catch (error) {
    console.error("Error al listar un servicio:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_servicio, descripcion_servicio, precio_servicio } = req.body;

    const servicioToUpdate = await Servicio.findByPk(id);

    if (!servicioToUpdate) {
      return res
        .status(404)
        .json({ message: "Servicio no encontrado para actualizar." });
    }

    servicioToUpdate.nombre_servicio =
      nombre_servicio !== undefined
        ? nombre_servicio
        : servicioToUpdate.nombre_servicio;
    servicioToUpdate.descripcion_servicio =
      descripcion_servicio !== undefined
        ? descripcion_servicio
        : servicioToUpdate.descripcion_servicio;
    servicioToUpdate.precio_servicio =
      precio_servicio !== undefined
        ? precio_servicio
        : servicioToUpdate.precio_servicio;

    await servicioToUpdate.save();

    res.json(servicioToUpdate);
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Ya existe un servicio con este nombre." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarServicio = async (req, res) => {
  try {
    const response = await Servicio.destroy({
      where: {
        id_servicio: req.params.id,
      },
    });

    if (response === 0) {
      return res
        .status(404)
        .json({ message: "Servicio no encontrado para eliminar." });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    // Detecta el error específico de llave foránea
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res
        .status(409) // Conflict
        .json({
          message:
            "El servicio está siendo usado en una reserva personalizada y no puede ser eliminado.",
        }); //
    }
    return res.status(500).json({ message: error.message });
  }
};
