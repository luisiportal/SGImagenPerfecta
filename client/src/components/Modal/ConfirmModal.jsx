// src/components/common/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({
  isOpen,
  message,
  onConfirm, // Para errores/éxito, esta función sería el "cerrar" el modal
  onCancel, // Solo se usa para confirmaciones
  type = "confirm", // 'confirm', 'success', 'error'
  title,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";
  const isError = type === "error"; // Nueva bandera para el tipo error

  const modalTitle =
    title || (isSuccess ? "¡Éxito!" : isError ? "¡Error!" : "Confirmar Acción"); // Título dinámico

  const confirmButtonText = isSuccess || isError ? "Aceptar" : "Aceptar"; // Cambiado para que "Aceptar" sea para éxito/error
  const confirmButtonClass = isSuccess
    ? "bg-st_color text-white font-bold py-2 px-4 rounded-md hover:bg-st_color-dark transition-colors" // Cambiado a text-white para mejor contraste
    : isError
      ? "bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors" // Estilo para errores
      : "bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"; // Estilo para confirmación

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 my-8 text-center">
        <h3
          className={`text-xl font-bold mb-4 ${isSuccess ? "text-green-600" : isError ? "text-red-600" : "text-gray-800"}`} // Color del título dinámico
        >
          {modalTitle}
        </h3>
        <p className="text-gray-700 text-lg mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmButtonText}
          </button>
          {/* El botón de cancelar solo se muestra para el tipo 'confirm' */}
          {!isSuccess && !isError && (
            <button
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
