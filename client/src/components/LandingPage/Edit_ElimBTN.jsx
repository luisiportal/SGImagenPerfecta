import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOfertas } from "../../context/OfertaProvider.jsx";
import ConfirmModal from "../Modal/ConfirmModal";

const Edit_ElimBTN = ({ id_oferta }) => {
  const { deleteOferta } = useOfertas();
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    await deleteOferta(id_oferta);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      {window.location.pathname === "/ofertas" && (
        <section className="flex gap-x-2">
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-full bg-red-500 text-white shadow-md
                       hover:bg-red-600 hover:scale-110 transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            aria-label="Eliminar oferta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate(`edit/${id_oferta}`)}
            className="p-2 rounded-full bg-blue-500 text-white shadow-md
                       hover:bg-blue-600 hover:scale-110 transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            aria-label="Editar oferta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </section>
      )}
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
