import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavbarComponent from "./components/NavbarComponent";

import { AuthProvider } from "./context/AuthContext";
import Trabajador from "./pages/TrabajadorPage";
import PaginaInicio from "./pages/PaginaInicio";
import TrabajadorRoutes from "./routes/TrabajadorRoutes";
import ProductosRoutes from "./routes/ProductosRoutes";
import ClienteRoutes from "./routes/ClienteRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { ProductoContextProvider } from "./context/ProductoProvider";
import Servicios from "./pages/Servicios";
import Galeria from "./pages/Galeria";
import { TrabajadorContextProvider } from "./context/TrabajadorContext";
import VentasRoutes from "./routes/VentasRoutes";

const App = () => {
  return (
    <div className="bg-white min-h-screen">
      <AuthProvider>
        <TrabajadorContextProvider>
          
            <NavbarComponent />
          

          <div className="mx-auto">
            <ProductoContextProvider>
              <Routes>
                <Route path="/" element={<PaginaInicio />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/galeria" element={<Galeria />} />

                <Route path="/trabajador/login" element={<Trabajador />} />
                <Route path="*" element={<NotFound />} />

                <Route path="/cliente/*" element={<ClienteRoutes />} />

                <Route element={<ProtectedRoutes></ProtectedRoutes>}>
                  <Route path="/productos/*" element={<ProductosRoutes />} />

                  <Route path="/ventas/*" element={<VentasRoutes />} />
                  <Route path="/trabajador/*" element={<TrabajadorRoutes />} />
                </Route>
              </Routes>
            </ProductoContextProvider>
          </div>
        </TrabajadorContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
