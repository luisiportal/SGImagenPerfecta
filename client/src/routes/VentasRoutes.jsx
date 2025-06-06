import Ventas from "../pages/Ventas";
import { Routes, Route } from "react-router-dom";
import ResumenVentas from "../components/Ventas/ResumenVentas";

const VentasRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Ventas />} />
      <Route path="/resumen" element={<ResumenVentas />} />
    </Routes>
  );
};

export default VentasRoutes;
