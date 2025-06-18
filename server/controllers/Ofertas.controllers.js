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
      cantidad_fotos,
      locacion,
      transportacion,
      cambios_ropa,
      pagado,
    } = req.body;

    const response = await Oferta.create({
      nombre_oferta,
      precio_venta,
      descripcion,
      cantidad_fotos,
      locacion,
      transportacion,
      cambios_ropa,
      pagado,
    });

    res.sendStatus(201);
  } catch (error) {
    console.error("Error al crear oferta:", error);
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
      cantidad_fotos,
      locacion,
      transportacion,
      cambios_ropa,
      pagado,
    } = req.body;

    const response = await Oferta.findByPk(id_oferta);

    if (!response) {
      return res.status(404).json({ message: "Oferta no encontrada." });
    }

    response.nombre_oferta = nombre_oferta;
    response.precio_venta = precio_venta;
    response.descripcion = descripcion;
    response.cantidad_fotos = cantidad_fotos;
    response.locacion = locacion;
    response.transportacion = transportacion;
    response.cambios_ropa = cambios_ropa;
    response.pagado = pagado;
    await response.save();

    res.json(response);
  } catch (error) {
    console.error("Error al actualizar oferta:", error);
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
      return res
        .status(404)
        .json({ message: "Oferta no encontrada para eliminar." });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar oferta:", error);
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        message:
          "No se puede eliminar esta oferta porque tiene reservas asociadas. Primero debe eliminar las reservas vinculadas.",
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const listarUnaOferta = async (req, res) => {
  try {
    const { id } = req.params;
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
