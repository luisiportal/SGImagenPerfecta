// NavbarComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import BarraMovil from "./navbar/BarraMovil";
import HamburguesaSVG from "./SVG/HamburguesaSVG";

import { Link } from "react-router-dom";
import ReservarBTN from "./navbar/ReservarBTN";
import BarraEscritorio from "./navbar/BarraEscritorio";

const NavbarComponent = () => {
  const [abrirHamburguesa, setabrirHamburguesa] = useState(false);
  const { logout, perfil, isAuthenticated, user } = useAuth();

  const sidebarRef = useRef(false);
  const openButtonRef = useRef(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef && sidebarRef.current) {
        if (sidebarRef.current.contains(event.target)) {
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
        <div className="lg:hidden flex flex-grow justify-between items-center py-2">
          <div ref={openButtonRef} className="flex-shrink-0">
            <button
              onClick={hamburguerClick}
              className="mt-1 text-slate-700 border-black hover:bg-st_color hover:text-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 focus:ring-slate-200"
            >
              <HamburguesaSVG />
            </button>
          </div>
          <div className="flex-none">
            <Link to={"/"}>
              <img
                className="w-14 h-14 object-cover"
                src={"/images/logo.png"}
                alt="Logo Otra Dimensión"
              />
            </Link>
          </div>
          <div className="flex-shrink-0">
            <ReservarBTN />
          </div>
        </div>
        <div className="hidden lg:flex flex-grow justify-center">
          <BarraEscritorio />{" "}
        </div>
      </nav>
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
