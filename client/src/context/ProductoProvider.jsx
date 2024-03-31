import { useContext, useState } from "react";
import { ProductoContext } from "./ProductoContext";
import {
  eliminarProductoRequest,
  listarProductosRequest,
} from "../api/productos.api";

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context === undefined) {
    throw new Error("No hay contexto provider");
  }
  return context;
};

export const ProductoContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const loadProductos = async () => {
    try {
      const response = await listarProductosRequest();
      setProductos(response);
    } catch (error) {}
  };

  const deleteProducto = async (id_producto) => {
    try {
      eliminarProductoRequest(id_producto);
      setProductos(
        productos.filter((producto) => producto.id_producto !== id_producto)
      );
      alert("Se ha eliminado el producto correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loadProductos,

        deleteProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
