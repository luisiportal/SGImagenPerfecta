// controllers/Servicios.controllers.js
import { Servicio } from "../models/Servicio.model.js"; // Importa tu modelo Servicio

// Listar todos los servicios
export const listarServicios = async (req, res) => {
  try {
    const response = await Servicio.findAll({
      order: [["created_at", "DESC"]], // Ordenar por fecha de creación descendente
    });
    res.json(response);
  } catch (error) {
    console.error("Error al listar servicios:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo servicio
export const crearServicio = async (req, res) => {
  try {
    const { nombre_servicio, descripcion_servicio, precio_servicio } = req.body; // Desestructura los campos del cuerpo de la petición

    const newServicio = await Servicio.create({
      nombre_servicio,
      descripcion_servicio,
      precio_servicio,
    }); // Crea un nuevo registro de servicio

    res.status(201).json(newServicio); // Devuelve el servicio creado con un status 201 (Created)
  } catch (error) {
    console.error("Error al crear servicio:", error);
    // Puedes añadir manejo de errores más específico para, por ejemplo, UNIQUE constraint (nombre_servicio)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Ya existe un servicio con este nombre." });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Listar un servicio por ID
export const listarUnServicio = async (req, res) => {
  try {
    const { id } = req.params; // Desestructura el ID de los parámetros de la URL
    const response = await Servicio.findByPk(id); // Busca un servicio por su clave primaria

    if (!response) {
      return res.status(404).json({ message: "Servicio no encontrado." });
    }
    res.json(response);
  } catch (error) {
    console.error("Error al listar un servicio:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un servicio
export const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_servicio, descripcion_servicio, precio_servicio } = req.body;

    const servicioToUpdate = await Servicio.findByPk(id); // Encuentra el servicio por ID

    if (!servicioToUpdate) {
      return res
        .status(404)
        .json({ message: "Servicio no encontrado para actualizar." });
    }

    // Actualiza los campos del servicio
    servicioToUpdate.nombre_servicio =
      nombre_servicio || servicioToUpdate.nombre_servicio;
    servicioToUpdate.descripcion_servicio =
      descripcion_servicio || servicioToUpdate.descripcion_servicio;
    servicioToUpdate.precio_servicio =
      precio_servicio || servicioToUpdate.precio_servicio;

    await servicioToUpdate.save(); // Guarda los cambios en la base de datos

    res.json(servicioToUpdate); // Devuelve el servicio actualizado
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

// Eliminar un servicio
export const eliminarServicio = async (req, res) => {
  try {
    const response = await Servicio.destroy({
      where: {
        id_servicio: req.params.id,
      },
    });

    if (response === 0) {
      // Verifica si se eliminó algo (0 filas afectadas)
      return res
        .status(404)
        .json({ message: "Servicio no encontrado para eliminar." });
    }
    res.sendStatus(204); // No Content - éxito sin devolver contenido
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    // Puedes añadir manejo de errores específicos si un servicio tiene dependencias (e.g., está asociado a una oferta)
    return res.status(500).json({ message: error.message });
  }
};
