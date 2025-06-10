// NavbarComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import BarraMovil from "./navbar/BarraMovil";
import HamburguesaSVG from "./SVG/HamburguesaSVG";

import { Link } from "react-router-dom";
import ReservarBTN from "./navbar/ReservarBTN"; // Necesario para el layout móvil
import BarraEscritorio from "./navbar/BarraEscritorio"; // Necesario para el layout de escritorio

const NavbarComponent = () => {
  const [abrirHamburguesa, setabrirHamburguesa] = useState(false);
  const { logout, perfil, isAuthenticated, user } = useAuth(); // Obtener 'user' y 'perfil' del contexto

  const sidebarRef = useRef(false);
  const openButtonRef = useRef(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef && sidebarRef.current) {
        if (sidebarRef.current.contains(event.target)) {
          // No hacemos nada, el clic dentro de la barra lateral no la cierra
        } else if (
          !sidebarRef.current.contains(event.target) &&
          (!openButtonRef ||
            !openButtonRef.current ||
            !openButtonRef.current.contains(event.target))
        ) {
          setabrirHamburguesa(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, []);

  const hamburguerClick = () => {
    setabrirHamburguesa(!abrirHamburguesa);
  };

  return (
    <>
      <nav className="flex items-center sticky top-0 left-0 w-full px-6 z-50 rounded shadow-xl bg-white">
        {" "}
        {/* Agregado bg-white */}
        {/* CONTENIDO PARA MÓVIL (visible SOLO en pantallas pequeñas) */}
        {/* Disposición: Botón Hamburguesa (Izq), Logo (Centro), Botón Reservar (Der) */}
        <div className="lg:hidden flex flex-grow justify-between items-center py-2">
          {/* Botón de Hamburguesa a la izquierda */}
          <div ref={openButtonRef} className="flex-shrink-0">
            <button
              onClick={hamburguerClick}
              className="mt-1 text-slate-700 border-black hover:bg-st_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200"
            >
              <HamburguesaSVG />
            </button>
          </div>

          {/* Logo centrado en móvil */}
          {/* Se usa `flex-none` para que mantenga su tamaño fijo y no se encoja */}
          <div className="flex-none">
            <Link to={"/"}>
              <img
                className="w-14 h-14 object-cover" // Tamaño fijo y object-cover para evitar distorsión
                src={"/images/logo.png"}
                alt="Logo Otra Dimensión"
              />
            </Link>
          </div>

          {/* Botón Reservar a la derecha en móvil */}
          <div className="flex-shrink-0">
            <ReservarBTN />
          </div>
        </div>
        {/* CONTENIDO PARA ESCRITORIO (visible SOLO en pantallas grandes) */}
        {/* Se centra BarraEscritorio que ya contiene todos los elementos centrados */}
        <div className="hidden lg:flex flex-grow justify-center">
          <BarraEscritorio />{" "}
          {/* BarraEscritorio se encarga de todo el layout de escritorio */}
        </div>
      </nav>

      {/* BarraMovil fuera del nav principal (es la barra lateral que se desliza) */}
      <div ref={sidebarRef} className="lg:hidden">
        <BarraMovil
          abrirHamburguesa={abrirHamburguesa}
          perfil={perfil}
          logout={logout}
          isAuthenticated={isAuthenticated}
        ></BarraMovil>
      </div>
    </>
  );
};

export default NavbarComponent;
