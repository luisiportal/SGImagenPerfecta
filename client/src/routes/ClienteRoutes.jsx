import React from "react";
import { Routes, Route } from "react-router-dom";
import Cliente from "../pages/Cliente";
import ReservarForm from "../components/Cliente/ReservarForm";
import ListarReservas from "../components/Cliente/ListarReservas";
import { ProductoContextProvider } from "../context/ProductoProvider";
import ListarReservaCliente from "../components/Cliente/ListarReservaCliente";

const ClienteRoutes = () => {
  return (
    <ProductoContextProvider>
 <Routes>
  
      <Route path="/" element={<Cliente />} />
      <Route path="/reservar/:id_producto" element={<ReservarForm />} />
      <Route path="/reservas" element={<ListarReservas />} />
      <Route path="/reserva" element={<ListarReservaCliente />} />
    </Routes>
    </ProductoContextProvider>
   
  );
};

export default ClienteRoutes;
