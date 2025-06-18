import { useServicios } from "../hooks/useServicios";
import ServiciosList from "../components/Servicios/ServiciosList";
import Footer from "./Footer";

const Servicios = () => {
  const { servicios } = useServicios();

  return (
    <div className="bg-gray-50s">
      <div className="p-8 max-w-6xl mx-auto text-center mb-12 sm:mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Nuestros Servicios
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Ofrecemos una amplia gama de soluciones fotográficas diseñadas para
          capturar tus momentos más importantes y dar vida a tus proyectos.
        </p>
      </div>

      <div className="mt-8">
        <ServiciosList servicios={servicios} />
      </div>

      <section className="bg-sect_gray">
        <div className="grid grid-cols-1 max-w-6xl mx-auto p-8 pt-16 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Fotografía para eventos */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                <path
                  fillRule="evenodd"
                  d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
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

          {/* Estudio fotográfico */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
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

          {/* Fotografía publicitaria */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
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

          {/* Impresión y enmarcado */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                  clipRule="evenodd"
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

          {/* Edición y retoque */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                  clipRule="evenodd"
                />
                <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                <path
                  fillRule="evenodd"
                  d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                  clipRule="evenodd"
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

          {/* Asesoría */}
          <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="text-st_color mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                  clipRule="evenodd"
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
        </div>
      </section>

      <div className="max-w-6xl mx-auto pl-14 pr-14 mt-20 text-center">
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
              Tu visión es nuestra prioridad. Te ofrecemos un servicio adaptado
              a tus necesidades para que cada proyecto sea único.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center bg-st_color p-10 shadow-lg">
        <h2 className="text-4xl font-bold text-white mb-4">
          Transforma tus Ideas en Imágenes Impactantes
        </h2>
        <p className="text-xl text-white mb-6">
          Estamos listos para hacer realidad tu próximo proyecto fotográfico.
          Contáctanos hoy mismo para una consulta gratuita.
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

export default Servicios;
