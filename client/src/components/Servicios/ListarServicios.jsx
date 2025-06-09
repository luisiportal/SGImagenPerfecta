// ListarServicios.jsx

import { useNavigate } from "react-router-dom";
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";
import { useState, useEffect } from "react"; // Asegúrate de importar useEffect
import { listarServiciosRequest } from "../../api/servicios.api";
import { useServiciosStore } from "../../Store/Servicios.store";

const ListarServicios = ({ isOpen, message, onConfirm, setShowServicios }) => {
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();
  // Asumimos que useServiciosStore tiene un setter, por ejemplo, setServiciosStore
  const { serviciosStore, setServiciosStore } = useServiciosStore(); // <-- Añadir setServiciosStore

  const navigate = useNavigate();

  // EFECTO PARA CARGAR LOS SERVICIOS CUANDO EL COMPONENTE SE MONTA
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await listarServiciosRequest();
        setServiciosStore(res.data); // Asume que la respuesta de la API tiene los datos en 'data'
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    // Solo cargar si serviciosStore está vacío o si necesitas recargar por alguna razón
    if (serviciosStore.length === 0) {
      // O alguna otra condición para evitar recargas excesivas
      fetchServicios();
    }
  }, [setServiciosStore, serviciosStore.length]); // Dependencias del useEffect

  const quitarServicio = (servicio) => {
    const restantes = oferta_personalizada.filter(
      (s) => s.id_servicio !== servicio.id_servicio
    );
    setOferta_personalizada(restantes);
  };

  const agregarServicio = (servicio) => {
    // Verificar si el servicio ya está en la oferta_personalizada
    const servicioExistente = oferta_personalizada.find(
      (s) => s.id_servicio === servicio.id_servicio
    );

    if (!servicioExistente) {
      // Si el servicio no existe, agrégalo
      setOferta_personalizada([...oferta_personalizada, servicio]);
    } else {
      // Si el servicio ya existe, podrías manejarlo (por ejemplo, mostrar un mensaje o no hacer nada)
      console.log("Este servicio ya ha sido agregado.");
    }
  };

  // Función para calcular el precio total de la oferta personalizada
  const calcularPrecioOfertaPersonalizada = (servicios) => {
    return servicios.reduce(
      (total, servicio) => total + (Number(servicio.precio_servicio) || 0),
      0
    );
  };

  const handleAccept = () => {
    // Pasar el array de servicios seleccionados a la ruta
    navigate(`/cliente/reservar/personalizada`, {
      state: { serviciosSeleccionados: oferta_personalizada },
    });
    setShowServicios(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-st_color mb-6">
          Seleccione los Servicios para la Oferta Personalizada
        </h2>

        {message && (
          <p className="text-center text-red-500 font-semibold mb-4">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna de Servicios Disponibles */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Servicios Disponibles
            </h3>
            {serviciosStore.length > 0 ? (
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                {serviciosStore.map((servicio) => (
                  <section
                    key={servicio.id_servicio}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => agregarServicio(servicio)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-700">
                        {servicio.nombre_servicio}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {servicio.descripcion_servicio}
                      </p>
                    </div>
                    <div className="text-base font-bold text-st_color ml-4">
                      ${Number(servicio.precio_servicio).toFixed(2)}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No hay servicios disponibles.
              </p>
            )}
          </div>

          {/* Columna de Servicios Seleccionados */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Servicios Seleccionados ({oferta_personalizada.length})
            </h3>
            {oferta_personalizada.length > 0 ? (
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                {oferta_personalizada.map((servicio) => (
                  <section
                    key={servicio.id_servicio}
                    className="flex justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100 transition-colors cursor-pointer"
                    onClick={() => quitarServicio(servicio)}
                  >
                    <h3 className="text-base font-medium text-blue-700 flex-shrink-0">
                      {servicio.nombre_servicio}
                    </h3>
                    <span className="flex-grow border-b-2 border-dotted border-gray-300 mx-0 min-w-[20px]"></span>
                    <div className="text-base font-bold text-gray-600 sm:ml-4 mt-1 sm:mt-0 flex-shrink-0">
                      ${Number(servicio.precio_servicio).toFixed(2)}
                    </div>
                  </section>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-baseline">
                  <h2 className="text-xl font-bold text-gray-800">
                    Precio Total:
                  </h2>
                  <div className="text-2xl font-extrabold text-st_color">
                    $
                    {calcularPrecioOfertaPersonalizada(
                      oferta_personalizada
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                Aún no ha seleccionado ningún servicio.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowServicios(false)}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-md bg-st_color text-white font-semibold hover:bg-st_color transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListarServicios;
