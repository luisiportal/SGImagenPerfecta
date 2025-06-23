import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavbarComponent from "./components/NavbarComponent";

import { AuthProvider } from "./context/AuthContext";
import Trabajador from "./pages/TrabajadorPage";
import PaginaInicio from "./pages/PaginaInicio";
import OfertasRoutes from "./routes/OfertasRoutes";
import ClienteRoutes from "./routes/ClienteRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { OfertaContextProvider } from "./context/OfertaProvider";
import Servicios from "./pages/Servicios";
import Galeria from "./pages/Galeria";
import { TrabajadorContextProvider } from "./context/TrabajadorContext";

import AgregarTrabajadorPage from "./components/Trabajador/AgregarTrabajadorPage";
import EditarTrabajadorPage from "./components/Trabajador/EditarTrabajadorPage";
import ListadoTrabajadores from "./components/Trabajador/ListadoTrabajadores";
import ServiciosRoutes from "./routes/ServiciosRoutes.jsx";
import NotificacionesPage from "./pages/NotificacionesPage";

const App = () => {
  return (
    <div className="bg-white min-h-screen">
      <AuthProvider>
        <TrabajadorContextProvider>
          <NavbarComponent />

          <div className="mx-auto">
            <OfertaContextProvider>
              <Routes>
                <Route path="/" element={<PaginaInicio />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/trabajador/login" element={<Trabajador />} />{" "}
                <Route path="*" element={<NotFound />} />{" "}
                <Route path="/cliente/*" element={<ClienteRoutes />} />
                <Route
                  path="/notificaciones"
                  element={<NotificacionesPage />}
                />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/ofertas/*" element={<OfertasRoutes />} />
                  <Route path="/servicios/*" element={<ServiciosRoutes />} />
                  <Route
                    path="/trabajador/plantilla"
                    element={<ListadoTrabajadores />}
                  />{" "}
                  <Route
                    path="/trabajador/new"
                    element={<AgregarTrabajadorPage />}
                  />
                  <Route
                    path="/trabajador/profile/edit/:id"
                    element={<EditarTrabajadorPage />}
                  />
                </Route>
              </Routes>
            </OfertaContextProvider>
          </div>
        </TrabajadorContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
