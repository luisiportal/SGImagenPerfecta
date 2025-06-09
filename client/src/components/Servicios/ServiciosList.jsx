import { useState } from "react";
import ListarServicios from "./ListarServicios";

const ServiciosList = ({ servicios }) => {
  const [showServiciosModal, setShowServiciosModal] = useState(false);
  if (!servicios || servicios.length === 0) {
    return <p className="text-center text-gray-600">Cargando servicios...</p>; //
  }

  return (
    <section className="">
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-3xl font-bold text-slate-800 text-center pb-4">
          Lista de Precios de Nuestros Servicios
        </h2>
      </div>
      <div className="bg-sect_gray">
        <div className="max-w-4xl mx-auto pt-4 px-4 sm:px-6 lg:px-8 m-2">
          {servicios.length > 0 ? (
            <div className=" bg-white rounded-lg shadow-md p-6">
              {servicios.map((servicio) => (
                <div
                  key={servicio.id_servicio}
                  className="flex flex-row justify-between items-baseline py-3 border-b last:border-b-0 border-gray-200"
                >
                  {/* Contenedor para Nombre del Servicio y Descripción */}
                  <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-semibold text-lg text-slate-800 flex-shrink-0">
                      {servicio.nombre_servicio}
                    </h3>
                    {/* Descripción al lado, más pequeña y sutil */}
                    {servicio.descripcion_servicio && ( // Solo muestra si hay descripción
                      <p className="text-sm text-gray-500 flex-shrink-0">
                        ({servicio.descripcion_servicio})
                      </p>
                    )}
                    {/* Puntos suspensivos: flex-grow para ocupar espacio, border-dotted, color de st_color y grosor */}
                    <span className="flex-grow border-b-2 border-dotted border-st_color mx-0 min-w-[30px]"></span>
                  </div>
                  {/* Precio: Asegura que no se rompa el diseño con el wrap del nombre/descripción */}
                  <div className="text-lg font-bold text-st_color sm:ml-4 mt-2 sm:mt-0 flex-shrink-0">
                    ${Number(servicio.precio_servicio).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Cargando servicios...</p>
          )}
        </div>
        <div className="text-center bg-st_color shadow-lg p-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto -mt-14 scale-50" // Added -mt-4 for negative top margin
          >
            <polygon points="10,30 50,70 90,30" fill="white" />
          </svg>
          <h2 className="text-4xl font-bold text-white mb-4 -mt-2">
            Crea tu Oferta de forma Personalizada
          </h2>
          <button
            onClick={() => setShowServiciosModal(true)}
            className="hover:scale-125 inline-block bg-white text-st_color hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-md"
          >
            ¡Crear AHORA!
          </button>
        </div>
      </div>
      {showServiciosModal && (
        <ListarServicios
          isOpen={showServiciosModal}
          setShowServicios={setShowServiciosModal}
        />
      )}
    </section>
  );
};

export default ServiciosList;
