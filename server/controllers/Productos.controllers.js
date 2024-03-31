import { Producto } from "../models/Producto.model.js";

export const ListarProductos = async (req, res) => {
  try {
    const response = await Producto.findAll({
      order: [['id_producto', 'DESC']]
    });
    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const crearProducto = async (req, res) => {

  try {
    const { nombre_producto, precio_venta, descripcion } = req.body;

    const response = await Producto.create({
      nombre_producto,
      precio_venta,
      descripcion,
    });

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const actualizarProducto = async (req, res) => {
  try {
    const id_producto = req.params.id;
    const { nombre_producto, precio_venta, descripcion } = req.body;

    const response = await Producto.findByPk(id_producto);
    response.nombre_producto = nombre_producto;
    response.precio_venta = precio_venta;
    response.descripcion = descripcion;
    await response.save();

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const eliminarProducto = async (req, res) => {
  try {
    const response = await Producto.destroy({
      where: {
        id_producto: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const listarUnProducto = async (req, res) => {
  try {
    const id_producto = req.params.id;

    const response = await Producto.findByPk(id_producto);
   if(!response)
    return res.status(404).json({ message: 'No encontrado' });

    res.json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
