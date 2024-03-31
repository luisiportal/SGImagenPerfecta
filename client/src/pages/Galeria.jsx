import React from "react";
import ImagenFront from "../components/LandingPage/ImagenFront";
const Galeria = () => {
  return (
    <div>
      <h1 className="flex justify-center pt-5 text-slate-500 font-bold text-4xl">
        Galería
      </h1>
      <section className="grid sm:grid-cols-1 gap-10 xl:grid-cols-2 pt-5 mx-5 lg:mx-48">
        <figure className="bg-neutral-300 hover:scale-105 transition-all duration-500 ease-in-out">
          <ImagenFront
            ruta={"../images/galeria/1.jpg"}
            alt={"Foto de Modelo"}
          />
        </figure>
        <figure className="bg-neutral-300 hover:scale-105 transition-all duration-500 ease-in-out">
          <ImagenFront
            ruta={"../images/galeria/2.jpg"}
            alt={"Foto de Modelo"}
          />
        </figure>
        <figure className="bg-neutral-300 hover:scale-105 transition-all duration-500 ease-in-out">
          <ImagenFront
            ruta={"../images/galeria/3.jpg"}
            alt={"Foto de Modelo"}
          />
        </figure>
        <figure className="bg-neutral-300 hover:scale-105 transition-all duration-500 ease-in-out">
          <ImagenFront
            ruta={"../images/galeria/4.jpg"}
            alt={"Foto de Modelo"}
          />
        </figure>
        <figure className="bg-neutral-300 hover:scale-105 transition-all duration-500 ease-in-out">
          <ImagenFront
            ruta={"../images/galeria/5.jpg"}
            alt={"Foto de Modelo"}
          />
        </figure>
        <figure className="bg-neutral-300 hover:scale-105 transition-all duration-500 ease-in-out">
          <ImagenFront
            ruta={"../images/galeria/6.jpg"}
            alt={"Foto de Modelo"}
          />
        </figure>
      </section>
    </div>
  );
};

export default Galeria;
