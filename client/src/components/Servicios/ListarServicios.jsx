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
              className="flex gap-2 bg-white p-2 rounded-lg m-1"
            >
              <input
                type="checkbox"
                name="selecc"
                // Marca el checkbox si el servicio ya está en oferta_personalizada
                checked={oferta_personalizada.some(
                  (item) => item.id_servicio === servicio.id_servicio
                )}
                onChange={(e) => handleChange(servicio, e.target.checked)}
              />

              <div className=" flex gap-2">
                <h2> {servicio.nombre_servicio}</h2>
                <h2> {servicio.precio_servicio}</h2>
              </div>
            </section>
          ))}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {" "}
            Usted ha Escogido
          </h2>
          {oferta_personalizada.map((oferta_personalizada) => (
            <section key={oferta_personalizada.id_servicio}>
              {" "}
              <h2>{oferta_personalizada.nombre_servicio}</h2>
            </section>
          ))}
          Precio: {calcularPrecioOfertaPersonalizada(oferta_personalizada)}
        </div>
        <div className="flex justify-end gap-3">
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
