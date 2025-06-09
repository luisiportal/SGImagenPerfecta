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
      (item) => item.id_servicio !== servicio.id_servicio // Usar !== para comparación estricta
    );
    setOferta_personalizada(restantes);
  };

  const handleChange = (servicio, isChecked) => {
    if (isChecked) {
      setOferta_personalizada([...oferta_personalizada, servicio]);
    } else {
      quitarServicio(servicio);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowServicios(false);
    }
  };

  const calcularPrecioOfertaPersonalizada = (oferta_personalizada) => {
    return oferta_personalizada.reduce(
      (total, servicio) => total + (Number(servicio.precio_servicio) || 0),
      0
    );
  };

  // Asegúrate de que la modal solo se renderice si isOpen es true
  if (!isOpen) return null; // Esto controla que el componente no se muestre si isOpen es false

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {" "}
          Seleccionar Servicios
        </h2>
        <div>
          {serviciosStore.map((servicio) => (
            <section
              key={servicio.id_servicio}
              className="flex flex-row justify-between items-baseline py-3 border-b last:border-b-0 border-gray-200" // Añadidas clases para el estilo de fila
            >
              <input
                type="checkbox"
                name="selecc"
                checked={oferta_personalizada.some(
                  (item) => item.id_servicio === servicio.id_servicio
                )}
                onChange={(e) => handleChange(servicio, e.target.checked)}
                className="mr-2" // Pequeño margen a la derecha del checkbox
              />
              <div className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-semibold text-lg text-slate-800 flex-shrink-0">
                  {servicio.nombre_servicio}
                </h3>
                {servicio.descripcion_servicio && (
                  <p className="text-sm text-gray-500 flex-shrink-0">
                    ({servicio.descripcion_servicio})
                  </p>
                )}
                <span className="flex-grow border-b-2 border-dotted border-st_color mx-0 min-w-[30px]"></span>
              </div>
              <div className="text-lg font-bold text-st_color sm:ml-4 mt-2 sm:mt-0 flex-shrink-0">
                ${Number(servicio.precio_servicio).toFixed(2)}
              </div>
            </section>
          ))}
          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Usted ha Escogido
          </h2>
          {oferta_personalizada.map(
            (
              servicio // Cambiado 'oferta_personalizada' a 'servicio' para claridad
            ) => (
              <section
                key={servicio.id_servicio}
                className="flex flex-row justify-between items-baseline py-2 border-b last:border-b-0 border-gray-100"
              >
                <h3 className="font-semibold text-lg text-gray-700 flex-shrink-0">
                  {servicio.nombre_servicio}
                </h3>
                <span className="flex-grow border-b-2 border-dotted border-gray-300 mx-0 min-w-[20px]"></span>
                <div className="text-base font-bold text-gray-600 sm:ml-4 mt-1 sm:mt-0 flex-shrink-0">
                  ${Number(servicio.precio_servicio).toFixed(2)}
                </div>
              </section>
            )
          )}
          <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-baseline">
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
            onClick={() => navigate(`/cliente/reservar/personalizada`)}
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
