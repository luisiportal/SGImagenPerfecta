import React from "react";
import ImagenFront from "../components/LandingPage/ImagenFront"; // Asegúrate de que este componente renderiza una imagen con `object-cover` y un `w-full`

const Galeria = () => {
  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      {" "}
      {/* Fondo claro y padding vertical general */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Contenedor principal centrado */}
        {/* Sección de Encabezado y Subtítulo Promocional */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Nuestra Inspiración en Imágenes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explora la belleza capturada en cada sesión. En "Otra Dimensión",
            cada fotografía es una obra de arte que cuenta una historia única.
          </p>
        </div>
        {/* Sección de la Galería de Imágenes */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {" "}
          {/* Grid más responsivo y espaciado */}
          <figure className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out group">
            <ImagenFront
              ruta={"../images/galeria/1.jpg"}
              alt={"Retrato artístico con iluminación dramática"}
            />
            {/* Overlay con texto al pasar el ratón */}
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
        {/* Bloque de Promoción Adicional / Llamada a la Acción */}
        <div className="mt-20 text-center bg-st_color p-10 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para tu propia sesión?
          </h2>
          <p className="text-xl text-white mb-6">
            Transformamos tus ideas en imágenes impactantes. Contáctanos y
            descubre la diferencia de una fotografía profesional.
          </p>
          <a
            href="/cliente" // Asegúrate de que esta ruta sea correcta para tu página de contacto
            className="inline-block bg-white text-st_color hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md"
          >
            Reserva tu Sesión Hoy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Galeria;
