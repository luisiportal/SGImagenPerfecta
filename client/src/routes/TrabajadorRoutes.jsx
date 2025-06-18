import { Route, Routes } from "react-router-dom";
import { TrabajadorContextProvider } from "../context/TrabajadorContext";
import ListadoTrabajadores from "../components/Trabajador/ListadoTrabajadores";
import TrabajadorForm from "../components/Trabajador/TrabajadorForm";

const TrabajadorRoutes = () => {
  return (
    <TrabajadorContextProvider>
      <Routes>
        <Route path="new" element={<TrabajadorForm />} />
        <Route path="edit/:id" element={<TrabajadorForm />} />
        <Route path="plantilla" element={<ListadoTrabajadores />} />
        <Route index element={<ListadoTrabajadores />} />
      </Routes>
    </TrabajadorContextProvider>
  );
};

export default TrabajadorRoutes;
