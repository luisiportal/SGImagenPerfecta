import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AgregarSVG from "../SVG/AgregarSVG";
import Modal from "../Modal/Modal";
import ServicioForm from "./ServicioForm";
import ReservarForm from "../Reserva/ReservarForm";
import ListarServicios from "./ListarServicios";
import ServicioCard from "./ServicioCard";
import { useServicios } from "../../hooks/useServicios";
import { useServiciosModals } from "../../hooks/useServiciosModals";
import ConfirmModal from "../Modal/ConfirmModal";
import { eliminarServicioRequest } from "../../api/servicios.api";

const ServiciosList = () => {
  const { isAuthenticated } = useAuth();
  const { servicios, loading, error, fetchServicios, handleDeleteSuccess } =
    useServicios();
  const {
    showEditModal,
    showCreateModal,
    showReservaModal,
    servicioToEditId,
    showServiciosModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenReservaModal,
    handleCloseReservaModal,
    handleCloseServiciosModal,
    handleOpenServiciosModal,
    handleOpenServiciosModalFromReserva,
  } = useServiciosModals();

  // Estado para el modal de información (éxito/error)
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [infoType, setInfoType] = useState("success");

  // Estado para el modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [servicioToDeleteId, setServicioToDeleteId] = useState(null);

  // Maneja la apertura del modal de confirmación
  const handleOpenDeleteModal = (id_servicio) => {
    setServicioToDeleteId(id_servicio);
    setShowDeleteModal(true);
  };

  // Maneja la confirmación de eliminación
  const handleConfirmDelete = async () => {
    try {
      await eliminarServicioRequest(servicioToDeleteId);
      handleDeleteSuccess(servicioToDeleteId);
      setInfoMessage("Servicio eliminado exitosamente.");
      setInfoType("success");
      setShowInfoModal(true);
      setShowDeleteModal(false);
      setServicioToDeleteId(null);
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      setInfoMessage(error || "Error desconocido al eliminar el servicio.");
      setInfoType("error");
      setShowInfoModal(true);
      setShowDeleteModal(false);
      setServicioToDeleteId(null);
    }
  };

  // Maneja la cancelación del modal de confirmación
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setServicioToDeleteId(null);
  };

  // Maneja el cierre del modal de información
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    setInfoMessage("");
    setInfoType("success");
  };

  const handleCloseEditModalAndRefresh = () => {
    handleCloseEditModal();
    fetchServicios();
  };

  const handleCloseCreateModalAndRefresh = () => {
    handleCloseCreateModal();
    fetchServicios();
  };

  if (loading) {
    return <p className="text-center text-gray-600">Cargando servicios...</p>;
  }

  if (!error && servicios.length === 0) {
    return (
      <p className="text-center text-gray-600">No hay servicios disponibles.</p>
    );
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
              onClick={handleOpenCreateModal}
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
            <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {servicios.map((servicio) => (
                <ServicioCard
                  key={servicio.id_servicio}
                  servicio={servicio}
                  isAuthenticated={isAuthenticated}
                  onDeleteSuccess={handleDeleteSuccess}
                  onEditClick={handleOpenEditModal}
                  onDeleteResult={handleCloseInfoModal} // No se usa directamente, pero se mantiene por compatibilidad
                  onOpenDeleteModal={handleOpenDeleteModal} // Pasa el nuevo callback
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay servicios disponibles.
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
            onClick={handleOpenServiciosModal}
            className="hover:scale-125 inline-block bg-white text-st_color hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-md"
          >
            ¡Crear AHORA!
          </button>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={showDeleteModal}
        message="¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        type="confirm"
      />

      {/* Modal de información para éxito/error */}
      <ConfirmModal
        isOpen={showInfoModal}
        message={infoMessage}
        onConfirm={handleCloseInfoModal}
        type={infoType}
      />

      {/* Modales existentes */}
      {showServiciosModal && (
        <ListarServicios
          isOpen={showServiciosModal}
          setShowServicios={handleCloseServiciosModal}
          onOpenReservaModal={handleOpenReservaModal}
        />
      )}

      <Modal
        isOpen={showEditModal}
        onClose={handleCloseEditModalAndRefresh}
        title="Editar Servicio"
      >
        <ServicioForm
          id={servicioToEditId}
          onClose={handleCloseEditModalAndRefresh}
        />
      </Modal>

      <Modal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModalAndRefresh}
        title="Crear Nuevo Servicio"
      >
        <ServicioForm onClose={handleCloseCreateModalAndRefresh} />
      </Modal>

      {showReservaModal && (
        <ReservarForm
          isModal={true}
          onCloseModal={handleCloseReservaModal}
          onSuccess={(message) => {
            alert(message);
            handleCloseReservaModal();
          }}
          onError={(error) => alert(error)}
          onGoBackToServicios={handleOpenServiciosModalFromReserva}
        />
      )}
    </section>
  );
};

export default ServiciosList;
