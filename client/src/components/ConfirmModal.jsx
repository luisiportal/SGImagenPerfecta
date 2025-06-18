import React from "react";

const ConfirmModal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  type = "confirm",
  title,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";
  const modalTitle = title || (isSuccess ? "¡Éxito!" : "Confirmar Acción");

  const confirmButtonText = isSuccess ? "Aceptar" : "Aceptar";
  const confirmButtonClass = isSuccess
    ? "bg-st_color text-black font-bold py-2 px-4 rounded-md hover:bg-st_color-dark transition-colors"
    : "bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 my-8 text-center">
        <h3
          className={`text-xl font-bold mb-4 ${isSuccess ? "text-green-600" : "text-gray-800"}`}
        >
          {modalTitle}
        </h3>
        <p className="text-gray-700 text-lg mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmButtonText}
          </button>
          {!isSuccess && (
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
