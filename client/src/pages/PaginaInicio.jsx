import React from "react";
import CardTexto from "../components/LandingPage/CardTexto";
import ImagenFront from "../components/LandingPage/ImagenFront";
import Cliente from "./Cliente";

const PaginaInicio = () => {
  return (
    <div>
      <div className=" max-w-6xl mx-auto pt-5">
        <main>
          <article className="mb-6 lg:mb-20">
            <img src={"../images/fotos/frontGrande.png"} alt="Foto de Modelo" />
          </article>
        </main>
        <section className="flex flex-col lg:flex-row">
          <div className="bg-neutral-300 w-full flex-1">
            <ImagenFront
              ruta={"../images/fotos/frontLeft.png"}
              alt={"Foto de Modelo"}
            />
          </div>
          <div className="bg-neutral-300 w-full flex flex-1">
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
        <section className="flex flex-col lg:flex-row-reverse mb-20">
          <div className="bg-neutral-200 w-full flex-1">
            <ImagenFront
              ruta={"../images/fotos/frontRight.png"}
              alt={"Foto de Modelo"}
            />
          </div>
          <div className="bg-neutral-200 w-full flex-1">
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
        <section className="flex flex-1 bg-sect_gray px-3 lg:px-0 w-fit  lg:pt-8">
          <Cliente />
        </section>
      </div>

      <footer></footer>
    </div>
  );
};

export default PaginaInicio;
