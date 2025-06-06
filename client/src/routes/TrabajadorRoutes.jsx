import { Route, Routes } from "react-router-dom";
import { TrabajadorContextProvider } from "../context/TrabajadorContext";
import ListadoTrabajadores from "../components/Trabajador/ListadoTrabajadores";
import TrabajadorForm from "../components/Trabajador/TrabajadorForm";

const TrabajadorRoutes = () => {
  return (
    <TrabajadorContextProvider>
      {" "}
      {/* El contexto envuelve las rutas */}
      <Routes>
        {/* Rutas RELATIVAS al path="/trabajador/*" de App.jsx */}
        <Route path="new" element={<TrabajadorForm />} />
        <Route
          path="edit/:id" // Corregido para que coincida con el navigate de ListadoTrabajadores
          element={<TrabajadorForm />}
        />
        <Route path="plantilla" element={<ListadoTrabajadores />} />
        {/* Si quieres que /trabajador/ también muestre la plantilla por defecto */}
        <Route index element={<ListadoTrabajadores />} />
      </Routes>
    </TrabajadorContextProvider>
  );
};

export default TrabajadorRoutes;
