import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import BarraEscritorio from "./navbar/BarraEscritorio";
import BarraMovil from "./navbar/BarraMovil";
import HamburguesaSVG from "./SVG/HamburguesaSVG";
import ReservarBTN from "./navbar/ReservarBTN";

const NavbarComponent = () => {
  const [abrirHamburguesa, setabrirHamburguesa] = useState(false);
  const { logout,perfil,isAuthenticated } = useAuth();


  const sidebarRef = useRef(false);
  const openButtonRef = useRef(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef && sidebarRef.current) {
        if (sidebarRef.current.contains(event.target)) {
          setabrirHamburguesa(false);
        } else if (
          !sidebarRef.current.contains(event.target) &&
          (!openButtonRef || !openButtonRef.current || !openButtonRef.current.contains(event.target))
        ) {
          setabrirHamburguesa(false);
        }
      }
    }
    

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hamburguerClick = () => {
    setabrirHamburguesa(!abrirHamburguesa);
  };
  return (
    <nav className="flex justify-between items-center lg:justify-center sticky top-0 left-0 w-full bg-white px-6 z-50 rounded shadow-xl">
      <div ref={openButtonRef}>
        <button
          onClick={hamburguerClick}
          className="mt-1 text-slate-700 border-black hover:bg-huellas_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200 lg:hidden"
        >
          <HamburguesaSVG />
        </button>
      </div>
      <BarraEscritorio />

      <ReservarBTN />
      <div ref={sidebarRef} className="lg:hidden">
        <BarraMovil
          abrirHamburguesa={abrirHamburguesa}
          perfil={perfil}
          logout={logout}
          isAuthenticated={isAuthenticated}
        ></BarraMovil>
      </div>
    </nav>
  );
};

export default NavbarComponent;
