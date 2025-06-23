import CardTexto from "../components/LandingPage/CardTexto";
import ImagenFront from "../components/LandingPage/ImagenFront";
import Cliente from "./Cliente";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const PaginaInicio = () => {
  useEffect(() => {
    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentItem = 0;

    function showNextItem() {
      carouselItems[currentItem].classList.remove("active");
      currentItem = (currentItem + 1) % carouselItems.length;
      carouselItems[currentItem].classList.add("active");
    }

    carouselItems[currentItem].classList.add("active");

    const interval = setInterval(showNextItem, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <article>
        <div className="relative h-[400px] lg:h-[900px]">
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
          <div className="absolute top-1/2 left-0 right-0 flex flex-col items-center justify-center transform -translate-y-1/2 z-20">
            <h1 className="text-white text-center sm:text-4xl lg:text-5xl mb-2 sm:mb-4 p-3 text-2xl">
              Estudio Fotográfico
            </h1>
            <h1 className="text-white text-center sm:text-8xl lg:text-9xl mb-2 sm:mb-4 font-greatVibes text-6xl">
              Otra Dimensión
            </h1>

            <Link
              className="transition scale-125 hover:scale-150 bg-st_color font-bold text-white rounded-full px-6 py-2 text-sm sm:text-base"
              to={"/cliente"}
            >
              ¡Reserva Ahora!
            </Link>
          </div>
        </div>
      </article>
      <div className="md:max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-1/2">
            <ImagenFront
              ruta={"../public/images/fotos/01.png"}
              alt={"Foto de Modelo"}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <CardTexto
              titulo={"Momentos Únicos"}
              slogan={
                "Buscamos el mejor momento para inmortalizarlo en fotografía."
              }
              texto={
                "Una mirada discreta, una sonrisa, una lágrima de emoción; tu celebración está llena de detalles especiales que logramos capturar."
              }
              bg={"bg-sect_gray"}
              textColor={"text-slate-500"}
            />
          </div>
        </section>

        <section className="flex flex-col lg:flex-row-reverse overflow-hidden">
          <div className="w-full lg:w-1/2">
            <ImagenFront
              ruta={"../public/images/fotos/02.png"}
              alt={"Foto de Modelo"}
            />
          </div>
          <div className="w-full lg:w-1/2 ">
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
        <section className=" bg-sect_gray">
          <Cliente />
        </section>
      </div>
    </div>
  );
};

export default PaginaInicio;
