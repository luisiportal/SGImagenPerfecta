import { useEffect } from "react";
import { useOfertas } from "../context/OfertaProvider";
import OfertaCard from "../components/OfertaCard";
import { useServicios } from "../hooks/useServicios";
import ServiciosList from "../components/Servicios/ServiciosList";
import Footer from "./Footer";

const Cliente = () => {
  const { servicios } = useServicios();
  const { ofertas, loadOfertas } = useOfertas();
  useEffect(() => {
    loadOfertas();
  }, []);

  function renderMain() {
    if (ofertas.length === 0) {
      return (
        <div className="flex justify-center items-center h-48">
          <p className="text-2xl text-gray-600 font-semibold">
            No hay ofertas disponibles en este momento.
          </p>
        </div>
      );
    }

    const offersToDisplay = [...ofertas].sort(
      (a, b) => a.precio_venta - b.precio_venta
    );

    return (
      <div className={`flex flex-wrap justify-center gap-4  mx-auto p-8`}>
        {offersToDisplay.map((oferta) => (
          <OfertaCard oferta={oferta} key={oferta.id_oferta} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-sect_gray">
      {window.location.pathname === "/cliente" && (
        <section className="px-2 pb-2 text-slate-700 flex flex-col items-center p-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Ofertas
          </h1>
          <p className="text-base text-slate-700 font-semibold flex justify-center mt-2">
            ¡Descubre nuestras mejores ofertas!
          </p>
        </section>
      )}
      <section className="py-4">{renderMain()}</section>
      <ServiciosList servicios={servicios} />
      <Footer />
    </div>
  );
};

export default Cliente;
