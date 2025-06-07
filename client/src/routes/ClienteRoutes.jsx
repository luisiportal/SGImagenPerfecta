import { Routes, Route } from "react-router-dom";
import Cliente from "../pages/Cliente";
import ReservarForm from "../components/Cliente/ReservarForm";
import ListarReservas from "../components/Cliente/ListarReservas";
import { OfertaContextProvider } from "../context/OfertaProvider";
import ListarReservaCliente from "../components/Cliente/ListarReservaCliente";

const ClienteRoutes = () => {
  return (
    <OfertaContextProvider>
      <Routes>
        <Route path="/" element={<Cliente />} />
        <Route path="/reservar/:id_oferta" element={<ReservarForm />} />
        <Route path="/reservar/personalizada" element={<ReservarForm />} />
        <Route path="/calendario" element={<ListarReservas />} />
        <Route path="/reserva" element={<ListarReservaCliente />} />
      </Routes>
    </OfertaContextProvider>
  );
};

export default ClienteRoutes;
