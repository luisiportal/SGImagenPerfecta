import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarServicioRequest } from "../../api/servicios.api";
import ConfirmModal from "../ConfirmModal";

const Edit_ElimBTN_Servicio = ({
  id_servicio,
  onDeleteSuccess,
  onEditClick,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await eliminarServicioRequest(id_servicio);
      onDeleteSuccess(id_servicio);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      alert(error.message || "Error al eliminar el servicio");
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={() => onEditClick(id_servicio)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          title="Editar Servicio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          title="Eliminar Servicio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        message="¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default Edit_ElimBTN_Servicio;
