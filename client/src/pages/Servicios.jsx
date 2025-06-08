import React from "react";
import ListarServicios from "../components/Servicios/ListarServicios";

const Servicios = () => {
  return (
    <div className="bg-gray-50 py-8 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de soluciones fotográficas diseñadas para
            capturar tus momentos más importantes y dar vida a tus proyectos.
          </p>
        </div>
        <div className="text-center mb-12 sm:mb-16">
          <ListarServicios />
        </div>
        <div className="mt-2 text-center bg-st_color p-10 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            Crea tu Oferta de forma Personalizada
          </h2>
          <a
            href="/cliente" // Asegúrate de que esta ruta sea la correcta para tu página de contacto o reservas
            className="inline-block bg-white text-st_color hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md"
          >
            ¡Crear AHORA!
          </a>
        </div>
        {/* Grid de Servicios */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Tarjeta de Servicio: Fotografía para eventos */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              {/* Icono de ejemplo para Eventos - Reemplaza con un SVG real si tienes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5"
                />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2 text-center">
              Fotografía para eventos
            </h2>
            <p className="text-justify text-gray-700 leading-relaxed">
              Capturamos la esencia de tus celebraciones: bodas, cumpleaños,
              reuniones corporativas, eventos deportivos y culturales. Nos
              encargamos desde la toma de fotografías hasta la edición
              profesional para entregarte recuerdos inolvidables.
            </p>
          </article>

          {/* Tarjeta de Servicio: Estudio fotográfico en su local */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              {/* Icono de ejemplo para Estudio - Reemplaza con un SVG real si tienes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175m0 0a2.25 2.25 0 0 1 2.146-2.146M11.5 12.75l-6.049 3.49m6.049-3.49A2.25 2.25 0 0 1 15 12.75h3.375c.621 0 1.125.504 1.125 1.125v3.026c0 1.09-1.09 1.98-2.24 1.98H6.94a2.25 2.25 0 0 1-2.24-1.98V14.265c0-.621.504-1.125 1.125-1.125h3.375m-9.75-2.146-.354-.354A.75.75 0 0 0 2.25 10.5v1.5m10.5-1.5-.354-.354A.75.75 0 0 0 12 10.5v1.5"
                />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2 text-center">
              Estudio fotográfico en nuestras instalaciones
            </h2>
            <p className="text-justify text-gray-700 leading-relaxed">
              Nuestro estudio está equipado para crear el ambiente perfecto para
              tu sesión fotográfica. Ofrecemos fotomontajes creativos, edición
              avanzada, impresión de alta calidad y opciones de enmarcado para
              que tus fotos luzcan espectaculares.
            </p>
          </article>

          {/* Tarjeta de Servicio: Fotografía publicitaria */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              {/* Icono de ejemplo para Publicidad - Reemplaza con un SVG real si tienes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0h.008v.008H21zm-12 8.25h.008v.008H9zm-3 6h.008v.008H6z"
                />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2 text-center">
              Fotografía publicitaria y de producto
            </h2>
            <p className="text-justify text-gray-700 leading-relaxed">
              Creamos material fotográfico impactante para tus campañas:
              catálogos, folletos, ofertas especiales y contenido para redes
              sociales. Nos especializamos en destacar tus productos y servicios
              de manera visualmente atractiva.
            </p>
          </article>

          {/* Tarjeta de Servicio: Impresión fotográfica */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              {/* Icono de ejemplo para Impresión - Reemplaza con un SVG real si tienes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 7.5l3 3m0 0l3-3m-3 3v4.5M12 15a3 3 0 0 0 3-3V9a2.25 2.25 0 0 1-2.25-2.25V6A2.25 2.25 0 0 0 10.5 3h-6A2.25 2.25 0 0 0 2.25 6v1.25a2.25 2.25 0 0 1-2.25 2.25V12A2.25 2.25 0 0 0 2.25 14.25v2.25a2.25 2.25 0 0 0 2.25 2.25h6A2.25 2.25 0 0 0 12 18V9"
                />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2 text-center">
              Impresión y enmarcado
            </h2>
            <p className="text-justify text-gray-700 leading-relaxed">
              Transformamos tus archivos digitales en obras tangibles. Ofrecemos
              servicios de impresión, ampliación y enmarcado en diversos
              formatos y materiales, asegurando la máxima calidad y durabilidad
              para tus fotografías.
            </p>
          </article>

          {/* Tarjeta de Servicio: Servicios de edición de fotografías */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              {/* Icono de ejemplo para Edición - Reemplaza con un SVG real si tienes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2 text-center">
              Edición y retoque profesional
            </h2>
            <p className="text-justify text-gray-700 leading-relaxed">
              Nuestro equipo de expertos edita tus fotografías para mejorar su
              calidad, eliminar imperfecciones, ajustar el color, la luz y otros
              detalles. Realizamos retoques avanzados para que cada imagen
              transmita el mensaje deseado.
            </p>
          </article>

          {/* Puedes añadir más servicios aquí */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              {/* Icono de ejemplo para Consultoría - Reemplaza con un SVG real si tienes */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15.75L12 12m0 0l3.75 3.75M12 12V4.5m0 15V12"
                />
              </svg>
            </div>
            <h2 className="font-bold text-2xl text-slate-800 mb-2 text-center">
              Asesoría y consultoría
            </h2>
            <p className="text-justify text-gray-700 leading-relaxed">
              Te guiamos en la planificación de tu proyecto fotográfico, desde
              la conceptualización hasta la entrega final. Ofrecemos consultoría
              personalizada para asegurar que tus ideas se traduzcan en imágenes
              impactantes y efectivas.
            </p>
          </article>
        </section>
        {/* Sección de "Por Qué Elegirnos" / Valor Agregado */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            ¿Por qué elegir "Otra Dimensión"?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <div>
              <h3 className="text-2xl font-semibold text-st_color mb-2">
                Experiencia y Pasión
              </h3>
              <p>
                Contamos con fotógrafos expertos y apasionados por el arte de
                capturar momentos, garantizando resultados excepcionales.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-st_color mb-2">
                Tecnología de Vanguardia
              </h3>
              <p>
                Utilizamos equipos de última generación para asegurar la máxima
                calidad y detalle en cada fotografía y producción.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-st_color mb-2">
                Atención Personalizada
              </h3>
              <p>
                Tu visión es nuestra prioridad. Te ofrecemos un servicio
                adaptado a tus necesidades para que cada proyecto sea único.
              </p>
            </div>
          </div>
        </div>
        {/* Bloque de Llamada a la Acción Final */}
        <div className="mt-20 text-center bg-st_color p-10 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-white mb-4">
            Transforma tus Ideas en Imágenes Impactantes
          </h2>
          <p className="text-xl text-white mb-6">
            Estamos listos para hacer realidad tu próximo proyecto fotográfico.
            Contáctanos hoy mismo para una consulta gratuita.
          </p>
          <a
            href="/cliente" // Asegúrate de que esta ruta sea la correcta para tu página de contacto o reservas
            className="inline-block bg-white text-st_color hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md"
          >
            Reserva tu Sesión Hoy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
