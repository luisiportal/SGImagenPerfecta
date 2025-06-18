// src/components/Servicios/ListarServicios.jsx
import { useOfertaStore } from "../../Store/Oferta_personalizada.store";
import { useEffect } from "react";
import { listarServiciosRequest } from "../../api/servicios.api";
import { useServiciosStore } from "../../Store/Servicios.store";
import CantidadButtons from "./CantidadButtons";

const ListarServicios = ({
  isOpen,
  message,
  setShowServicios,
  onOpenReservaModal,
}) => {
  const { oferta_personalizada, setOferta_personalizada } = useOfertaStore();
  const { serviciosStore, setServiciosStore } = useServiciosStore();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await listarServiciosRequest();
        setServiciosStore(res.data || []);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    if (serviciosStore.length === 0) {
      fetchServicios();
    }
  }, [setServiciosStore, serviciosStore.length]);

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
    } else {
      console.log("Este servicio ya ha sido agregado.");
    }
  };

  const calcularPrecioOfertaPersonalizada = (servicios) => {
    const total = servicios.reduce(
      (total, servicio) =>
        total + (Number(servicio.precio_servicio * servicio.cantidad) || 0),
      0
    );
    return total;
  };

  const handleAccept = () => {
    if (oferta_personalizada.length === 0) {
      alert("Por favor, selecciona al menos un servicio.");
      return;
    }
    onOpenReservaModal(oferta_personalizada);
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

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Servicios Seleccionados ({oferta_personalizada.length})
            </h3>
            {oferta_personalizada.length > 0 ? (
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                {oferta_personalizada.map((servicio) => (
                  <section
                    key={servicio.id_servicio}
                    className="flex items-center gap-2"
                  >
                    <section className="flex w-full justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm hover:bg-blue-100 transition-colors cursor-pointer">
                      <CantidadButtons
                        setOferta_personalizada={setOferta_personalizada}
                        oferta_personalizada={oferta_personalizada}
                        servicio={servicio}
                      />
                      <h3 className="text-base font-bold text-blue-700 flex-shrink-0 px-2">
                        {servicio.cantidad} x{" "}
                      </h3>
                      <h3>{servicio.nombre_servicio}</h3>
                      <span className="flex-grow border-b-2 border-dotted border-gray-300 mx-0 min-w-[20px]"></span>
                      <div className="text-base font-bold text-gray-600 sm:ml-4 mt-1 sm:mt-0 flex-shrink-0">
                        ${Number(servicio.precio_servicio).toFixed(2)}
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
