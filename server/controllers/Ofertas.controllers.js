import { Oferta } from "../models/Oferta.model.js";

export const ListarOfertas = async (req, res) => {
  try {
    const response = await Oferta.findAll({
      order: [["id_oferta", "DESC"]],
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearOferta = async (req, res) => {
  try {
    const {
      nombre_oferta,
      precio_venta,
      descripcion,
      // Agrega los nuevos campos aquí
      cantidad_fotos,
      locacion,
      transportacion,
      cambios_ropa,
      pagado, // Asegúrate de que el frontend envíe este valor (true/false)
    } = req.body;

    const response = await Oferta.create({
      nombre_oferta,
      precio_venta,
      descripcion,
      // Pasa los nuevos campos al método create
      cantidad_fotos,
      locacion,
      transportacion,
      cambios_ropa,
      pagado,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error("Error al crear oferta:", error); // Mejorar el log de errores
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarOferta = async (req, res) => {
  try {
    const id_oferta = req.params.id;
    const {
      nombre_oferta,
      precio_venta,
      descripcion,
      // Agrega los nuevos campos aquí
      cantidad_fotos,
      locacion,
      transportacion,
      cambios_ropa,
      pagado,
    } = req.body;

    const response = await Oferta.findByPk(id_oferta);

    if (!response) {
      // Añadir verificación si la oferta existe
      return res.status(404).json({ message: "Oferta no encontrada." });
    }

    response.nombre_oferta = nombre_oferta;
    response.precio_venta = precio_venta;
    response.descripcion = descripcion;
    // Asigna los nuevos campos
    response.cantidad_fotos = cantidad_fotos;
    response.locacion = locacion;
    response.transportacion = transportacion;
    response.cambios_ropa = cambios_ropa;
    response.pagado = pagado; // Asigna el valor
    await response.save();

    res.json(response);
  } catch (error) {
    console.error("Error al actualizar oferta:", error); // Mejorar el log de errores
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarOferta = async (req, res) => {
  try {
    const response = await Oferta.destroy({
      where: {
        id_oferta: req.params.id,
      },
    });
    if (response === 0) {
      // Verifica si se eliminó algo
      return res
        .status(404)
        .json({ message: "Oferta no encontrada para eliminar." });
    }
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error al eliminar oferta:", error);
    // Manejo específico para el error de restricción de clave foránea
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res
        .status(409)
        .json({
          message:
            "No se puede eliminar esta oferta porque tiene reservas asociadas. Primero debe eliminar las reservas vinculadas.",
        });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const listarUnaOferta = async (req, res) => {
  try {
    const { id } = req.params; // Desestructura el ID
    const response = await Oferta.findByPk(id);

    if (!response) {
      return res.status(404).json({ message: "Oferta no encontrada" });
    }

    res.json(response);
  } catch (error) {
    console.error("Error al listar una oferta:", error);
    return res.status(500).json({ message: error.message });
  }
};
