import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
        {title && (
          <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
