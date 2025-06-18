import React from "react";
import ImagenFront from "../components/LandingPage/ImagenFront";
import Footer from "./Footer";

const Galeria = () => {
  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Nuestra Inspiración en Imágenes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explora la belleza capturada en cada sesión. <br />
            En Otra Dimensión, cada fotografía es una obra de arte que cuenta
            una historia única.
          </p>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/1.jpg"}
              alt={"Retrato artístico con iluminación dramática"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-4">
                Capturando emociones
              </p>
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/2.jpg"}
              alt={"Sesión de fotos de moda con estilo urbano"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-4">
                Estilo y creatividad
              </p>
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/3.jpg"}
              alt={"Fotografía de producto con fondo minimalista"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-4">
                Detalles que inspiran
              </p>
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/4.jpg"}
              alt={"Retrato vibrante con expresión única"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-4">
                Inmortalizando la belleza
              </p>
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/5.jpg"}
              alt={"Fotografía de paisaje con luz natural"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-4">
                Amplitud visual
              </p>
            </div>
          </figure>
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/6.jpg"}
              alt={"Arquitectura moderna con líneas limpias"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold text-center px-4">
                Diseño y composición
              </p>
            </div>
          </figure>
        </section>
      </div>
      <div className="mt-20 text-center bg-st_color p-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          ¿Listo para tu propia sesión?
        </h2>
        <p className="text-xl text-white mb-6">
          Transformamos tus ideas en imágenes impactantes. Contáctanos y
          descubre la diferencia de una fotografía profesional.
        </p>
        <a
          href="/cliente"
          className="inline-block bg-white text-st_color hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition hover:scale-125 duration-300 shadow-md"
        >
          Reserva tu Sesión Hoy
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Galeria;
