import React from "react";
import MostrarError from "../validacionForm/MostrarError";

const Input = ({ type, name, value, handleChange, errors, label }) => {
  return (
    <div className="mb-4">
      {" "}
      {/* Añadido margen inferior para separar los inputs */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {" "}
        {/* Estilos mejorados para el label */}
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name} // Importante para asociar el label con el input
        className="px-3 py-2 rounded-md w-full border border-gray-300 bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 text-gray-800" // Clases mejoradas para visibilidad y estilo
        onChange={handleChange}
        value={value}
        min={new Date().toISOString().split("T")[0]}
      />
      <MostrarError errors={errors} campo={name} />
    </div>
  );
};

export default Input;
