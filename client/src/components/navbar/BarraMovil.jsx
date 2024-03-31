import React from "react";
import Navbar from "./Navbar";
import HandlePerfil from "./HandlePerfil";

const BarraMovil = ({ abrirHamburguesa, perfil, logout,isAuthenticated }) => {
  
  return (
    <div
      className={`fixed mt-8 lg:hidden ${
        abrirHamburguesa ? `left-0` : `-left-80`
      }  h-full w-48 bg-white shadow-2xl transition-all duration-500 ease-in-out z-50`}
    >
      <Navbar hidden={""}> </Navbar>
    </div>
  );
};

export default BarraMovil;
