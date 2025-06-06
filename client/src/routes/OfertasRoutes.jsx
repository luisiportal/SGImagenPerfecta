import { Routes, Route } from "react-router-dom";
import { OfertaContextProvider } from "../context/OfertaProvider";
import OfertasPage from "../pages/OfertasPage";
import OfertaForm from "../components/OfertasForm";

const OfertasRoutes = () => {
  return (
    <OfertaContextProvider>
      <Routes>
        <Route path="/" element={<OfertasPage />} />
        <Route path="/edit/:id_oferta" element={<OfertaForm />} />
        <Route path="/new" element={<OfertaForm />} />
      </Routes>
    </OfertaContextProvider>
  );
};

export default OfertasRoutes;
