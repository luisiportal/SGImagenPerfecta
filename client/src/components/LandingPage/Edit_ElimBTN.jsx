import React, { useState } from "react"; // Importar useState
import { useNavigate } from "react-router-dom";
import { useOfertas } from "../../context/OfertaProvider.jsx";
import ConfirmModal from "../ConfirmModal"; // Asegúrate de que la ruta sea correcta desde Edit_ElimBTN.jsx a ConfirmModal.jsx

const Edit_ElimBTN = ({ id_oferta }) => {
  const { deleteOferta } = useOfertas();
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para controlar el modal de eliminación

  const handleDeleteClick = () => {
    setShowConfirmModal(true); // Abrir el modal al hacer clic en Eliminar
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false); // Cerrar el modal
    await deleteOferta(id_oferta); // Ejecutar la función de eliminación
    // Opcional: Podrías añadir aquí una notificación de éxito/error de eliminación si tienes un componente Notificacion.
    // navigate('/ofertas'); // Navegar si es necesario, o la función deleteOferta ya se encarga de esto.
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false); // Cerrar el modal si se cancela
  };

  return (
    <>
      {window.location.pathname === "/ofertas" && (
        <section
          className={`flex justify-center left-1/2 gap-x-1 transition-all duration-500 ease-in-out`}
        >
          <div className="bg-red-500 px-3 py-2 font-bold text-white rounded hover:bg-red-700 transition-all duration-300 ease-in-out">
            <button onClick={handleDeleteClick}>
              {" "}
              {/* Llama a la función para abrir el modal */}
              Eliminar
            </button>
          </div>
          <div className="bg-blue-500 px-3 py-2 font-bold text-white rounded hover:bg-blue-700 transition-all duration-300 ease-in-out">
            <button onClick={() => navigate(`edit/${id_oferta}`)}>
              Editar
            </button>
          </div>
        </section>
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={showConfirmModal}
        message="¿Estás seguro de que quieres eliminar esta oferta? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Edit_ElimBTN;
