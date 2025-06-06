// BarraMovil.jsx
import React from "react";
import Navbar from "./Navbar"; // Navbar (solo menú)
import HandlePerfil from "./HandlePerfil"; // Importar HandlePerfil

const BarraMovil = ({ abrirHamburguesa, perfil, logout, isAuthenticated }) => {
  return (
    <div
      className={`fixed lg:hidden ${
        // 'mt-8' fue removido en una interacción previa para pegar al navbar
        abrirHamburguesa ? `left-0` : `-left-80`
      }  h-full w-48 bg-white shadow-2xl transition-all duration-500 ease-in-out z-50 flex flex-col items-center pt-8 text-center`} // Agregado flex flex-col items-center para disposición vertical centrada
    >
      {/* Contenido de la barra móvil */}
      <Navbar /> {/* Renderiza el Navbar con los elementos del menú */}
      {/* Si ReservarBTN también va en la barra lateral móvil, agrégalo aquí */}
      <HandlePerfil
        isAuthenticated={isAuthenticated}
        user={perfil}
        logout={logout}
      />{" "}
      {/* Pasa perfil y logout a HandlePerfil */}
    </div>
  );
};

export default BarraMovil;
