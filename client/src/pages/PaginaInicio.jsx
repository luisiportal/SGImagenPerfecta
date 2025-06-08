import React from "react";
import CardTexto from "../components/LandingPage/CardTexto";
import ImagenFront from "../components/LandingPage/ImagenFront";
import Cliente from "./Cliente";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PaginaInicio = () => {
  useEffect(() => {
    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentItem = 0;

    function showNextItem() {
      carouselItems[currentItem].classList.remove("active");
      currentItem = (currentItem + 1) % carouselItems.length;
      carouselItems[currentItem].classList.add("active");
    }

    // Inicializar el primer ítem como visible
    carouselItems[currentItem].classList.add("active");

    // Cambiar imagen cada 4 segundos
    const interval = setInterval(showNextItem, 4000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto pt-5 px-4 sm:px-6 lg:px-8">
        <main>
          <article className="mb-8 lg:mb-20">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <div className="carousel overflow-hidden h-full">
                <div className="carousel-item absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out active">
                  <img
                    src={"../public/images/fotos/frontgrande.png"}
                    alt="Foto de Modelo 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="carousel-item absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out">
                  <img
                    src={"../public/images/fotos/frontleft.png"}
                    alt="Foto de Modelo 2"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="carousel-item absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out">
                  <img
                    src={"../public/images/fotos/frontright.png"}
                    alt="Foto de Modelo 3"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Contenedor para el encabezado y el botón apilados */}
              <div className="absolute top-1/2 left-0 right-0 flex flex-col items-center justify-center transform -translate-y-1/2 z-20">
                <h1 className="text-white text-center text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                  Estudio Fotográfico Otra Dimensión
                </h1>
                <button className="transition hover:scale-105 bg-st_color font-bold text-white rounded-full px-6 py-2 text-sm sm:text-base">
                  <Link to={"/cliente"}>¡Reserva Ahora!</Link>
                </button>
              </div>
            </div>
          </article>
        </main>

        {/* Primera Sección */}
        <section className="flex flex-col lg:flex-row overflow-hidden">
          {" "}
          {/* Apilamos en móviles, alineamos en horizontal en grandes, añadimos espacio */}
          <div className="w-full lg:w-1/2">
            {" "}
            {/* Ocupa todo el ancho en móviles, la mitad en grandes */}
            <ImagenFront
              ruta={"../public/images/fotos/01.png"}
              alt={"Foto de Modelo"}
            />
          </div>
          <div className="w-full lg:w-1/2">
            {" "}
            {/* Ocupa todo el ancho en móviles, la mitad en grandes */}
            <CardTexto
              titulo={"Momentos Únicos"}
              slogan={
                "Buscamos el mejor momento para inmortalizarlo en fotografía."
              }
              texto={
                "Una mirada discreta, una sonrisa, una lágrima de emoción; tu celebración está llena de detalles especiales que logramos capturar."
              }
              bg={"bg-white"}
              textColor={"text-slate-500"}
            />
          </div>
        </section>

        {/* Segunda Sección */}
        <section className="flex flex-col lg:flex-row-reverse overflow-hidden">
          {" "}
          {/* Apilamos en móviles, invertimos en grandes, añadimos espacio */}
          <div className="w-full lg:w-1/2">
            {" "}
            {/* Ocupa todo el ancho en móviles, la mitad en grandes */}
            <ImagenFront
              ruta={"../public/images/fotos/02.png"}
              alt={"Foto de Modelo"}
            />
          </div>
          <div className="w-full lg:w-1/2 ">
            {" "}
            {/* Ocupa todo el ancho en móviles, la mitad en grandes */}
            <CardTexto
              titulo={"VIVE, SIENTE Y ABSORBE CADA INSTANTE"}
              slogan={
                "Todo lo que necesitas para tener los mejores recuerdos de ese día tan especial."
              }
              texto={"Por que el tiempo pasa, pero los recuerdos quedan"}
              bg={"bg-grayFotos"}
              textColor={"text-white"}
            />
          </div>
        </section>
      </div>
      <div>
        <section className="py-8 bg-sect_gray">
          {" "}
          {/* Añadimos padding vertical */}
          {/* Centramos y añadimos padding horizontal adaptable */}
          <Cliente />
        </section>
      </div>

      {/* Footer */}
      <footer>
        <div className="bg-gray-800 text-white py-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Estudio Fotográfico Otra Dimensión.
            Holguín. Cuba
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PaginaInicio;
