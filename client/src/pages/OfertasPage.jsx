import { useEffect } from "react";
import OfertaCard from "../components/OfertaCard";
import { useOfertas } from "../context/OfertaProvider";
import { Link } from "react-router-dom";
import AgregarSVG from "../components/SVG/AgregarSVG";
import ServiciosList from "../components/Servicios/ServiciosList";
import { useServicios } from "../hooks/useServicios";
import Footer from "./Footer";

const OfertasPage = () => {
  const { servicios } = useServicios(); // Obtén los servicios
  const { ofertas, loadOfertas } = useOfertas();

  useEffect(() => {
    loadOfertas();
  }, []);

  function renderMain() {
    if (ofertas.length === 0) {
      return (
        <div className="flex justify-center items-center h-96 p-8">
          <p className="text-2xl text-gray-600 font-semibold">
            No hay ofertas disponibles en este momento.
          </p>
        </div>
      );
    }

    // Mantener la ordenación si es deseado, pero eliminar la limitación
    const offersToDisplay = [...ofertas].sort(
      (a, b) => a.precio_venta - b.precio_venta
    ); // Las ordena por precio de venta

    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-7xl mx-auto py-12`}
      >
        {offersToDisplay.map((oferta) => (
          <OfertaCard oferta={oferta} key={oferta.id_oferta} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="flex flex-col items-center pt-8 px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          Ofertas
        </h1>
        <Link to={"/ofertas/new"}>
          <button className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
            <AgregarSVG className="w-6 h-6 mr-2" />
            Añadir Nueva Oferta
          </button>
        </Link>
      </section>

      {renderMain()}
      <div className="pt-4 bg-sect_gray">
        <ServiciosList servicios={servicios} />
      </div>
      <Footer />
    </div>
  );
};

export default OfertasPage;
