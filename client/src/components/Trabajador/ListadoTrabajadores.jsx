import { useEffect, useState } from "react";
import TrabajadorCard from "./TrabajadorCard";
import { useTrabajadores } from "../../context/TrabajadorContext";
import { Link } from "react-router-dom";
import AgregarSVG from "../SVG/AgregarSVG";
const ListadoTrabajadores = () => {
  const { trabajadores, loadTrabajadoresContext } = useTrabajadores();

  useEffect(() => {
    const loadTrabajadores = async () => {
      try {
        const response = await loadTrabajadoresContext();
        setReservas(response);
      } catch (error) {}
    };
    loadTrabajadores();
  }, []);

  return (
    <>
      <section className="flex justify-center">
        <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
          Trabajadores
        </h1>
        <Link to={"/trabajador/new"}>
          <button className="text-slate-500 font-bold w-16 h-16 flex justify-center items-center">
            <AgregarSVG />
          </button>
        </Link>
      </section>
      <div className="grid sm:grid-cols-1 gap-2 xl:grid-cols-4">
        {trabajadores.map((trabajador) => (
          <TrabajadorCard
            trabajador={trabajador}
            key={trabajador.id_trabajador}
          />
        ))}
      </div>
    </>
  );
};

export default ListadoTrabajadores;
