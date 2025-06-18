import { useState, useEffect } from "react";
import { listarServiciosRequest } from "../../api/servicios.api";
import Edit_ElimBTN_Servicio from "./Edit_ElimBTN_Servicio";
import ListarServicios from "./ListarServicios";
import ServicioForm from "./ServicioForm";
import ReservarForm from "../Cliente/ReservarForm";
import { useAuth } from "../../context/AuthContext";
import AgregarSVG from "../SVG/AgregarSVG";

const ServiciosList = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [servicioToEditId, setServicioToEditId] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [showServiciosModal, setShowServiciosModal] = useState(false);
  const [hoveredServicioId, setHoveredServicioId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchServicios = async () => {
    try {
      setLoading(true);
      const response = await listarServiciosRequest();
      const sortedServicios = response.sort(
        (a, b) => parseFloat(a.precio_servicio) - parseFloat(b.precio_servicio)
      );
      setServicios(sortedServicios || []);
      setError("");
    } catch (error) {
      setError(error.message || "Error al cargar servicios");
      console.error("Error al cargar servicios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleDeleteSuccess = (id_servicio) => {
    setServicios(
      servicios.filter((servicio) => servicio.id_servicio !== id_servicio)
    );
  };

  const handleEditClick = (id) => {
    setServicioToEditId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setServicioToEditId(null);
    fetchServicios();
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    fetchServicios();
  };

  const handleOpenReservaModal = (serviciosSeleccionados) => {
    setShowReservaModal(true);
  };

  const handleCloseReservaModal = () => {
    setShowReservaModal(false);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Cargando servicios...</p>;
  }

  return (
    <section className="">
      <div className="px-4 sm:p-6 lg:p-6">
        <h2 className="text-3xl font-bold text-slate-800 text-center">
          Lista de Precios de Nuestros Servicios
        </h2>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {isAuthenticated && (
          <div className="flex items-center justify-center m-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <AgregarSVG />
              Crear Nuevo Servicio
            </button>
          </div>
        )}
      </div>
      <div className="bg-sect_gray">
        <div className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8 m-2">
          {servicios.length > 0 ? (
            <div className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8 m-2">
              {servicios.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  {servicios.map((servicio) => (
                    <div
                      key={servicio.id_servicio}
                      className="relative flex flex-row justify-between items-baseline py-3 border-b last:border-b-0 border-gray-200"
                      onMouseEnter={() =>
                        setHoveredServicioId(servicio.id_servicio)
                      }
                      onMouseLeave={() => setHoveredServicioId(null)}
                    >
                      {isAuthenticated && (
                        <div
                          className={`absolute top-2 right-2 z-10 transition-opacity duration-300 ${
                            hoveredServicioId === servicio.id_servicio
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <Edit_ElimBTN_Servicio
                            id_servicio={servicio.id_servicio}
                            onDeleteSuccess={handleDeleteSuccess}
                            onEditClick={handleEditClick}
                          />
                        </div>
                      )}
                      <div className="flex flex-grow flex-col">
                        <div className="flex flex-grow items-baseline min-w-0">
                          <h3 className="font-semibold text-lg text-slate-800 flex-shrink-0">
                            {servicio.nombre_servicio}
                          </h3>
                          <div className="flex-grow border-b-2 border-dotted border-st_color mx-2"></div>
                        </div>
                        {servicio.descripcion_servicio && (
                          <p className="text-sm text-gray-500 pl-1">
                            {servicio.descripcion_servicio}
                          </p>
                        )}
                      </div>

                      <div className="flex-shrink-0 text-lg font-bold text-st_color">
                        ${Number(servicio.precio_servicio).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay servicios disponibles.</p>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay servicios disponibles
            </p>
          )}
        </div>
        <div className="text-center bg-st_color shadow-lg p-10">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto -mt-14 scale-50"
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
          onOpenReservaModal={handleOpenReservaModal}
        />
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseEditModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Editar Servicio
            </h2>
            <ServicioForm
              id={servicioToEditId}
              onClose={handleCloseEditModal}
            />
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseCreateModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Crear Nuevo Servicio
            </h2>
            <ServicioForm onClose={handleCloseCreateModal} />
          </div>
        </div>
      )}
      {showReservaModal && (
        <ReservarForm
          isModal={true}
          onCloseModal={handleCloseReservaModal}
          onSuccess={(message) => {
            alert(message);
            handleCloseReservaModal();
          }}
          onError={(error) => alert(error)}
        />
      )}
    </section>
  );
};

export default ServiciosList;
