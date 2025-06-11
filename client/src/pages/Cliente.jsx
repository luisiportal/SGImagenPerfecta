import { useEffect } from "react";
import { useOfertas } from "../context/OfertaProvider";
import OfertaCard from "../components/OfertaCard";

const Cliente = () => {
  const { ofertas, loadOfertas } = useOfertas();

  useEffect(() => {
    loadOfertas();
  }, []);

  function renderMain() {
    if (ofertas.length === 0) {
      return (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl text-gray-600 font-semibold">
            No hay ofertas disponibles en este momento.
          </p>
        </div>
      );
    }

    const offersToDisplay = [...ofertas].sort(
      (a, b) => a.precio_venta - b.precio_venta
    );

    // Las clases de la cuadrícula deben adaptarse al número real de ofertas.
    // Usaremos un layout de 1, 2 o 3 columnas que se adapta al tamaño de pantalla.
    // Añadimos 'justify-items-center' para centrar individualmente los elementos de la cuadrícula
    // o 'justify-content-center' en el contenedor flex si decides cambiar a flexbox.
    const gridClasses =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center"; // <-- CLAVE: justify-items-center

    return (
      <div className={`${gridClasses} max-w-full lg:max-w-7xl mx-auto p-4`}>
        {offersToDisplay.map((oferta) => (
          <OfertaCard oferta={oferta} key={oferta.id_oferta} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-sect_gray">
      {window.location.pathname === "/cliente" && (
        <section className="px-2 pb-2 text-slate-700 flex flex-col items-center">
          <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl sm:text-5xl md:text-6xl">
            Ofertas
          </h1>
          <p className="text-base text-slate-700 font-semibold flex justify-center mt-2">
            ¡Descubre nuestras mejores ofertas!
          </p>
        </section>
      )}
      <section className="py-4">{renderMain()}</section>
    </div>
  );
};

export default Cliente;
