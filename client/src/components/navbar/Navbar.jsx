import React from "react";
import ElementoNavbar from "./ElementoNavbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import HandlePerfil from "./HandlePerfil.jsx";
const Navbar = ({ hidden }) => {
  const { isAuthenticated, user } = useAuth();
  

  const navigate = useNavigate();


  return (
    <div className={`${hidden} m-4 md:m-0 lg:flex md:ml-8 font-semibold`}>
      <section className="lg:flex">
        <ElementoNavbar nombre={"Inicio"} href={"/"} />
        <ElementoNavbar nombre={"Reservas"} href={"/cliente/reserva"} />
        <ElementoNavbar nombre={"Servicios"} href={"/servicios"} />
        <ElementoNavbar nombre={"Galeria"} href={"/galeria"} />

        {isAuthenticated ? (
          <>
            <ElementoNavbar nombre={"Ofertas"} href={"/productos"} isAuthenticated={isAuthenticated} />
            <ElementoNavbar nombre={"Calendario"} href={"/ventas"} isAuthenticated={isAuthenticated} />
            <ElementoNavbar
              nombre={"Trabajadores"}
              href={"/trabajador/plantilla"}
              isAuthenticated={isAuthenticated}
            />
            <ElementoNavbar nombre={"Gest.Reservas"} href={"/cliente/reservas"} isAuthenticated={isAuthenticated} />
          </>
        ) : (
          ""
        )}
      </section>

      <HandlePerfil isAuthenticated={isAuthenticated} user={user} />
    </div>
  );
};

export default Navbar;
