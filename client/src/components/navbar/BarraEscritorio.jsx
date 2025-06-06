// BarraEscritorio.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Navbar (solo menú)
import HandlePerfil from "./HandlePerfil.jsx"; // Importar HandlePerfil
import ReservarBTN from "../navbar/ReservarBTN"; // Importar ReservarBTN
import { useAuth } from "../../context/AuthContext.jsx"; // Necesario para pasar props a HandlePerfil

const BarraEscritorio = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Obtener user y logout del contexto

  return (
    // Este div es el contenedor principal de la barra de navegación de escritorio.
    // Utiliza flex y justify-center para centrar todos sus elementos.
    <div className="flex justify-center items-center h-16 max-w-7xl mx-auto space-x-8">
      {" "}
      {/* mx-auto para centrar BarraEscritorio en la página, space-x-8 para espaciado entre elementos */}
      {/* Logo de Escritorio */}
      <Link
        className="text-st_color hover:scale-110 transition-transform duration-200"
        to={"/"}
      >
        <img
          className="w-14 h-14" // Mantener tamaño fijo para el logo de escritorio
          src={"../../images/logo.png"}
          alt="Logo Otra Dimensión"
        />
      </Link>
      {/* Menú de Navegación (solo enlaces) */}
      <Navbar />
      {/* Foto de Perfil */}
      <HandlePerfil
        isAuthenticated={isAuthenticated}
        user={user}
        logout={logout}
      />
      {/* Botón Reservar */}
      <ReservarBTN />
    </div>
  );
};

export default BarraEscritorio;
