import React from "react";
import ElementoNavbar from "./ElementoNavbar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="font-semibold">
      <section className="lg:flex">
        <ElementoNavbar nombre={"Inicio"} href={"/"} />
        <ElementoNavbar nombre={"Reservas"} href={"/cliente/reserva"} />
        <ElementoNavbar nombre={"Servicios"} href={"/servicios"} />
        <ElementoNavbar nombre={"Galeria"} href={"/galeria"} />

        {isAuthenticated ? (
          <>
            <ElementoNavbar
              nombre={"Ofertas"}
              href={"/ofertas"}
              isAuthenticated={isAuthenticated}
            />
            <ElementoNavbar
              nombre={"Calendario"}
              href={"/cliente/calendario"}
              isAuthenticated={isAuthenticated}
            />
            <ElementoNavbar
              nombre={"Trabajadores"}
              href={"/trabajador/plantilla"}
              isAuthenticated={isAuthenticated}
            />
          </>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Navbar;
