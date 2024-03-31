import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductoContextProvider } from "../context/ProductoProvider";
import ProductosPage from "../pages/ProductosPage";
import ProductoForm from "../components/ProductosForm";

const ProductosRoutes = () => {
  return (
    <ProductoContextProvider>
      <Routes>
        <Route path="/" element={<ProductosPage />} />
        <Route path="/edit/:id_producto" element={<ProductoForm />} />
        <Route path="/new" element={<ProductoForm />} />
      </Routes>
    </ProductoContextProvider>
  );
};

export default ProductosRoutes;
