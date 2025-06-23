import { useOfertaStore } from "../../Store/Oferta_personalizada.store";
import { useEffect, useState } from "react";
import { listarServiciosRequest } from "../../api/servicios.api";
import { useservicios } from "../../Store/Servicios.store";
import CantidadButtons from "./CantidadButtons";
import { calcularPrecioOfertaPersonalizada } from "../../utils/calculos";

const ListarServicios = ({
  isOpen,
  message,
  setShowServicios,
  onOpenReservaModal,
}) => {
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();
  const { servicios, setservicios } = useservicios();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await listarServiciosRequest();
        setservicios(res.data || []);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    if (servicios.length === 0) {
      fetchServicios();
    }
  }, [setservicios, servicios.length]);

  const quitarServicio = (servicio) => {
    const restantes = oferta_personalizada.filter(
      (s) => s.id_servicio !== servicio.id_servicio
    );
    setOferta_personalizada(restantes);
  };

  const agregarServicio = (servicio) => {
    const servicioExistente = oferta_personalizada.find(
      (s) => s.id_servicio === servicio.id_servicio
    );

    if (!servicioExistente) {
      setOferta_personalizada([
        ...oferta_personalizada,
        { ...servicio, cantidad: 1 },
      ]);
    }
    // No necesitamos un else aquí, la palomita lo indicará.
  };

  const handleAccept = () => {
    if (oferta_personalizada.length === 0) {
      setAlertMessage("Por favor, selecciona al menos un servicio.");
      setIsAlertModalOpen(true);
      return;
    }
    onOpenReservaModal(oferta_personalizada);
    setShowServicios(false);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
    setAlertMessage("");
  };

  // New function to clear all selected services
  const handleClearServicios = () => {
    setOferta_personalizada([]);
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
          {/* Servicios Disponibles */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Servicios Disponibles
            </h3>
            {servicios.length > 0 ? (
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                {servicios.map((servicio) => {
                  const isAdded = oferta_personalizada.some(
                    (s) => s.id_servicio === servicio.id_servicio
                  );

                  return (
                    <section
                      key={servicio.id_servicio}
                      className={`flex justify-between items-center p-3 rounded-lg shadow-sm transition-colors cursor-pointer 
                                ${isAdded ? "bg-green-100 hover:bg-green-200" : "bg-gray-50 hover:bg-gray-100"}`}
                      onClick={() => !isAdded && agregarServicio(servicio)}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-700">
                          {servicio.nombre_servicio}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {servicio.descripcion_servicio}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="text-base font-bold text-st_color mr-2">
                          ${Number(servicio.precio_servicio).toFixed(2)}
                        </div>
                        {isAdded && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-green-600"
                            title="Servicio agregado"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No hay servicios disponibles.
              </p>
            )}
          </div>

          {/* Servicios Seleccionados */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Servicios Seleccionados ({oferta_personalizada.length})
              </h3>
              {oferta_personalizada.length > 0 && (
                <button
                  onClick={handleClearServicios}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Quitar Todos
                </button>
              )}
            </div>
            {oferta_personalizada.length > 0 ? (
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                {oferta_personalizada.map((servicio) => (
                  <section
                    key={servicio.id_servicio}
                    className="flex items-center gap-2"
                  >
                    <section className="flex w-full justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100 transition-colors cursor-pointer">
                      {" "}
                      {/* Añadido min-h para igualar la altura */}
                      <CantidadButtons
                        setOferta_personalizada={setOferta_personalizada}
                        oferta_personalizada={oferta_personalizada}
                        servicio={servicio}
                      />
                      <div className="flex-1 min-w-0 px-4">
                        <h3 className="text-base font-medium text-gray-700">
                          {servicio.cantidad} x {servicio.nombre_servicio}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {servicio.descripcion_servicio}
                        </p>
                      </div>
                      {/* Eliminado el span con los puntos suspensivos */}
                      <div className="text-base font-bold text-st_color sm:ml-4 mt-1 sm:mt-0 flex-shrink-0">
                        {" "}
                        {/* Cambiado el color a text-st_color */}$
                        {Number(servicio.precio_servicio).toFixed(2)}
                      </div>
                    </section>
                    <button
                      onClick={() => quitarServicio(servicio)}
                      title="Quitar servicio"
                      className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-full flex justify-center items-center flex-shrink-0
                                      w-7 h-7 text-sm font-bold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                Aún no ha seleccionado ningún servicio.
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div></div>
          <div className="w-full mt-4 pt-4 border-t border-gray-300 flex justify-between items-baseline">
            <h2 className="text-xl font-bold text-gray-800">Precio Total:</h2>
            <div className="text-2xl font-extrabold text-st_color">
              $
              {calcularPrecioOfertaPersonalizada(oferta_personalizada).toFixed(
                2
              )}
            </div>
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

      {isAlertModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-st_color mb-4">Atención</h3>
            <p className="text-gray-700 mb-6">{alertMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseAlertModal}
                className="px-4 py-2 rounded-md bg-st_color text-white font-semibold hover:bg-st_color-dark transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarServicios;
