import { Routes, Route } from "react-router-dom";
import ServiciosList from "../components/Servicios/ServiciosList";
import ServicioForm from "../components/Servicios/ServicioForm";

const ServiciosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ServiciosList />} />
      <Route path="/edit/:id" element={<ServicioForm />} />
    </Routes>
  );
};

export default ServiciosRoutes;
